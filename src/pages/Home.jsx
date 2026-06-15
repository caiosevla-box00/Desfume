import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import PanicModal from '../components/PanicModal'
import Logo from '../components/Logo'

const INSIGHTS = [
  { tag: 'Saúde', color: 'tag-green', title: 'Seus pulmões já estão melhorando', body: 'A cada hora sem fumar, seus cílios pulmonares recuperam movimento. Eles limpam o muco e bactérias — sua defesa natural está voltando agora.' },
  { tag: 'Ciência', color: 'tag-sky', title: 'A fissura dura 3 minutos', body: 'O pico do desejo de fumar dura no máximo 3 minutos. Se você aguentar esse período, ele passa. Use o botão de pânico nesse momento.' },
  { tag: 'Finanças', color: 'tag-gold', title: 'Cada cigarro recusado é dinheiro seu', body: 'Um fumante médio no Brasil gasta R$ 300–500 por mês. Em 1 ano sem fumar você pode ter mais de R$ 4.000 no bolso.' },
  { tag: 'Coração', color: 'tag-ember', title: 'Seu coração agradece agora mesmo', body: 'Em 24 horas sem fumar, seu risco de infarto já começa a cair. Em 1 ano, é metade do de um fumante ativo.' },
  { tag: 'Mente', color: 'tag-green', title: 'O cigarro criava a tensão que aliviava', body: 'A nicotina causa a ansiedade durante a abstinência. A "calma" que você sentia era apenas a ansiedade sendo saciada. Sem o cigarro, você fica mais calmo de verdade.' },
  { tag: 'Tempo', color: 'tag-sky', title: 'Você está ganhando tempo de vida', body: 'Cada cigarro consume em média 5 minutos de vida. Você está recuperando esse tempo agora, segundo a segundo.' },
]

function formatElapsed(ms) {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (d >= 1) return { main: `${d}d ${h % 24}h`, sub: `${m % 60} min` }
  if (h >= 1) return { main: `${h}h ${m % 60}m`, sub: `${s % 60}s` }
  return { main: `${String(m).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`, sub: 'min : seg' }
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
  const cpd = data.profile?.cigarettesPerDay || 20
  const packPrice = data.profile?.packPrice || 12
  const cpp = data.profile?.cigarettesPerPack || 20
  const pricePerCig = packPrice / cpp
  const cigsNotSmoked = Math.max(0, Math.floor(elapsed / 86400000) * cpd)
  const moneySaved = (cigsNotSmoked * pricePerCig)

  useEffect(() => {
    const iv = setInterval(() => setElapsed(Date.now() - lastStart), 1000)
    return () => clearInterval(iv)
  }, [lastStart])

  useEffect(() => {
    const iv = setInterval(() => setInsightIdx(i => (i + 1) % INSIGHTS.length), 20000)
    return () => clearInterval(iv)
  }, [])

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500) }

  const handleSmoke = async () => {
    await logCigarette()
    setShowConfirm(false)
    showToast('Registrado. Respira fundo — você vai conseguir.')
  }

  const { main, sub } = formatElapsed(elapsed)
  const insight = INSIGHTS[insightIdx]
  const cleanDays = Math.floor(elapsed / 86400000)

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
              <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Tudo bem. 70% das pessoas precisam de várias tentativas. Registrar é honesto e te ajuda a entender seus gatilhos.
              </p>
              <div className="quote-card" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                <p className="quote-text">"Cai sete vezes, levanta oito. Cada tentativa te deixa mais preparado."</p>
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

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={32} />
          <div>
            <p style={{ fontSize: '0.6875rem', color: '#6B8A74', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Olá, {user?.displayName?.split(' ')[0]}</p>
            <h1 style={{ fontSize: '1.125rem', margin: 0 }}>Sem fumar há</h1>
          </div>
        </div>
        <Link to="/perfil" style={{ textDecoration: 'none' }}>
          <img src={user?.photoURL} alt="" style={{ width: 40, height: 40, borderRadius: '50%', border: '2.5px solid #DCF0E7' }} onError={e => e.target.style.display='none'} />
        </Link>
      </div>

      {/* Timer */}
      <div className="card card-green" style={{ textAlign: 'center', padding: '1.75rem 1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: -2 }}>{main}</div>
        <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{sub}</div>
        {cleanDays >= 1 && (
          <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '6px 16px', display: 'inline-block' }}>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8125rem', fontWeight: 700 }}>🏆 {cleanDays} {cleanDays === 1 ? 'dia limpo' : 'dias limpos'}</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="stat-grid" style={{ marginBottom: '1rem' }}>
        <div className="stat-box">
          <div className="stat-val" style={{ color: todayCount > 0 ? '#E05C2A' : '#1A6B42' }}>{todayCount}</div>
          <div className="stat-lbl">hoje</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{cigsNotSmoked}</div>
          <div className="stat-lbl">não fumados</div>
        </div>
        <div className="stat-box">
          <div className="stat-val" style={{ color: '#C47E00', fontSize: '1.25rem' }}>R${moneySaved.toFixed(0)}</div>
          <div className="stat-lbl">economizado</div>
        </div>
      </div>

      {/* Panic button */}
      <button className="btn btn-full btn-lg" style={{ background: '#E05C2A', color: 'white', marginBottom: '0.75rem', boxShadow: '0 4px 16px rgba(224,92,42,0.3)' }} onClick={() => setShowPanic(true)}>
        🆘 Estou com fissura — ajuda!
      </button>

      {/* Smoked button */}
      <button className="btn btn-full btn-outline-ember" style={{ marginBottom: '1.5rem' }} onClick={() => setShowConfirm(true)}>
        🚬 Fumei um cigarro
      </button>

      {/* Impact box */}
      <div className="card card-red" style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>⚠️ O que o cigarro custa</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ background: 'white', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#DC2626' }}>R${((cpd/cpp)*packPrice*365).toFixed(0)}</div>
            <div style={{ fontSize: '0.6875rem', color: '#6B8A74', fontWeight: 600 }}>por ano em cigarros</div>
          </div>
          <div style={{ background: 'white', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#DC2626' }}>{cpd * 5}min</div>
            <div style={{ fontSize: '0.6875rem', color: '#6B8A74', fontWeight: 600 }}>de vida por dia</div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="section-head">
          <h2>Insight do momento</h2>
          <button onClick={() => setInsightIdx(i => i + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A6B42', fontSize: '0.8125rem', fontWeight: 700 }}>Próximo →</button>
        </div>
        <div className="card card-mint">
          <span className={`tag ${insight.color}`} style={{ marginBottom: 8 }}>{insight.tag}</span>
          <h3 style={{ marginBottom: 6 }}>{insight.title}</h3>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.55 }}>{insight.body}</p>
        </div>
      </div>

      {/* Fagerström badge */}
      {data.fagerScore != null && (
        <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#9BB5A4', textTransform: 'uppercase', letterSpacing: 0.5 }}>Fagerström</p>
            <p style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1A6B42' }}>{data.fagerScore}/10</p>
          </div>
          <Link to="/testes" style={{ textDecoration: 'none' }}>
            <button className="btn btn-ghost" style={{ fontSize: '0.8125rem', padding: '8px 14px' }}>Ver análise →</button>
          </Link>
        </div>
      )}
    </div>
  )
}
