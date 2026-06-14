// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import PanicModal from '../components/PanicModal'

const INSIGHTS = [
  { tag: 'tag-forest', emoji: '🫁', title: 'Seus pulmões já estão melhorando', body: 'A cada hora sem fumar, seus cílios pulmonares recuperam movimento. Eles removem muco e bactérias — sua defesa natural está voltando.' },
  { tag: 'tag-sky', emoji: '🧠', title: 'A fissura é apenas química', body: 'O que você sente agora é dopamina caindo. Não é fraqueza — é seu cérebro se reconectando. Em 2 semanas, o pico de abstinência passa.' },
  { tag: 'tag-gold', emoji: '💰', title: 'Cada cigarro recusado é dinheiro seu', body: 'Fumantes gastam em média R$ 300–500 por mês. Em 1 ano sem fumar, você pode ter mais de R$ 4.000 no bolso.' },
  { tag: 'tag-ember', emoji: '❤️', title: 'Seu coração agradece agora mesmo', body: 'Em 24 horas sem fumar, seu risco de infarto já começa a cair. Em 1 ano, é metade do de um fumante ativo.' },
]

function formatElapsed(ms) {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (d >= 1) return { main: `${d}d ${h % 24}h`, sub: `${m % 60}min` }
  if (h >= 1) return { main: `${h}h ${m % 60}m`, sub: `${s % 60}s` }
  return { main: `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`, sub: 'min : seg' }
}

export default function Home({ data, update, logCigarette }) {
  const { user } = useAuth()
  const [elapsed, setElapsed] = useState(0)
  const [showPanic, setShowPanic] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [insightIdx, setInsightIdx] = useState(0)
  const [toast, setToast] = useState('')

  const lastStart = data.profile?.lastSmokeFreeStart || Date.now()
  const todayKey = new Date().toISOString().split('T')[0]
  const todayCount = data.smoking?.logByDay?.[todayKey] || 0

  useEffect(() => {
    const iv = setInterval(() => setElapsed(Date.now() - lastStart), 1000)
    return () => clearInterval(iv)
  }, [lastStart])

  useEffect(() => {
    const iv = setInterval(() => setInsightIdx(i => (i + 1) % INSIGHTS.length), 25000)
    return () => clearInterval(iv)
  }, [])

  const handleSmoke = async () => {
    await logCigarette()
    setShowConfirm(false)
    showToast('Registrado. Respira fundo — você vai conseguir.')
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }

  const { main, sub } = formatElapsed(elapsed)
  const cleanDays = Math.floor(elapsed / 86400000)

  const cpd = data.profile?.cigarettesPerDay || 20
  const packPrice = data.profile?.packPrice || 12
  const cpp = data.profile?.cigarettesPerPack || 20
  const pricePerCig = packPrice / cpp
  const cigsNotSmoked = Math.max(0, Math.floor(elapsed / 86400000) * cpd)
  const moneySaved = (cigsNotSmoked * pricePerCig)

  const insight = INSIGHTS[insightIdx % INSIGHTS.length]

  return (
    <div className="page-padded">
      {toast && <div className="toast">{toast}</div>}
      <PanicModal open={showPanic} onClose={() => setShowPanic(false)} />

      {showConfirm && (
        <div className="overlay" onClick={() => setShowConfirm(false)}>
          <div className="overlay-sheet" onClick={e => e.stopPropagation()}>
            <div className="overlay-handle" />
            <div style={{ textAlign: 'center', padding: '0.5rem 0 1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🚬</div>
              <h2 style={{ marginBottom: '0.5rem' }}>Fumou um cigarro?</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Tudo bem. Recaídas fazem parte da jornada — 70% das pessoas precisam de várias tentativas. Registrar é honesto e te ajuda a entender seus gatilhos.
              </p>
              <div className="quote-card" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                <p className="quote-text">"Cai sete vezes, levanta oito."</p>
                <p className="quote-author">— Provérbio japonês</p>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-outline btn-full" onClick={() => setShowConfirm(false)}>Não fumei</button>
                <button className="btn btn-ember btn-full" onClick={handleSmoke}>Sim, registrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', fontWeight: 600 }}>OLÁ, {user?.displayName?.split(' ')[0]?.toUpperCase()}</p>
          <h1 style={{ fontSize: '1.375rem' }}>Sem fumar há</h1>
        </div>
        <Link to="/perfil" style={{ textDecoration: 'none' }}>
          <img src={user?.photoURL} alt="Perfil" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid var(--forest-muted)' }} onError={e => { e.target.style.display = 'none' }} />
        </Link>
      </div>

      <div className="card card-forest" style={{ textAlign: 'center', padding: '1.75rem 1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '3.25rem', fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: -1, fontFamily: "'Playfair Display', serif" }}>{main}</div>
        <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{sub}</div>
        {cleanDays >= 1 && (
          <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '6px 14px', display: 'inline-block' }}>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8125rem', fontWeight: 600 }}>🏆 {cleanDays} {cleanDays === 1 ? 'dia limpo' : 'dias limpos'}</span>
          </div>
        )}
      </div>

      <div className="stat-grid" style={{ marginBottom: '1rem' }}>
        <div className="stat-box">
          <div className="stat-val" style={{ color: todayCount > 0 ? 'var(--ember)' : 'var(--forest)' }}>{todayCount}</div>
          <div className="stat-lbl">hoje</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{cigsNotSmoked}</div>
          <div className="stat-lbl">não fumados</div>
        </div>
        <div className="stat-box">
          <div className="stat-val" style={{ color: 'var(--gold)', fontSize: '1.1rem' }}>R${moneySaved.toFixed(0)}</div>
          <div className="stat-lbl">economizado</div>
        </div>
      </div>

      <button
        className="btn btn-full btn-lg"
        style={{ background: '#FFF0EB', border: '2px solid var(--ember)', color: 'var(--ember)', marginBottom: '0.75rem', fontSize: '1rem' }}
        onClick={() => setShowPanic(true)}
      >
        🆘 Estou com fissura — ajuda!
      </button>

      <button
        className="btn btn-full"
        style={{ background: 'transparent', border: '1.5px solid var(--border-strong)', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}
        onClick={() => setShowConfirm(true)}
      >
        🚬 Fumei um cigarro
      </button>

      <div style={{ marginBottom: '1.25rem' }}>
        <div className="section-head">
          <h2>Insight do momento</h2>
          <button onClick={() => setInsightIdx(i => i + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--forest)', fontSize: '0.8125rem', fontWeight: 600 }}>Próximo →</button>
        </div>
        <div className={`card ${insight.tag === 'tag-forest' ? 'card-pale' : insight.tag === 'tag-sky' ? 'card-sky' : insight.tag === 'tag-gold' ? 'card-gold' : 'card-ember'}`}>
          <div className="tag" style={{ marginBottom: 8 }}>
            <span>{insight.emoji}</span>
          </div>
          <h3 style={{ marginBottom: 6 }}>{insight.title}</h3>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>{insight.body}</p>
        </div>
      </div>

      {data.fagerScore != null && (
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Fagerström</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--forest)' }}>{data.fagerScore}/10</p>
            </div>
            <Link to="/testes" style={{ textDecoration: 'none' }}>
              <button className="btn btn-ghost" style={{ fontSize: '0.8125rem', padding: '8px 14px' }}>Ver análise →</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
