// src/pages/Onboarding.jsx
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const FAGER_QS = [
  { q: 'Em quanto tempo após acordar você fuma o primeiro cigarro?', opts: [['Dentro de 5 minutos', 3], ['6 a 30 minutos', 2], ['31 a 60 minutos', 1], ['Após 60 minutos', 0]] },
  { q: 'Você acha difícil não fumar em locais proibidos?', opts: [['Sim', 1], ['Não', 0]] },
  { q: 'Qual cigarro do dia é o mais difícil de abandonar?', opts: [['O primeiro da manhã', 1], ['Qualquer outro', 0]] },
  { q: 'Quantos cigarros você fuma por dia?', opts: [['31 ou mais', 3], ['21 a 30', 2], ['11 a 20', 1], ['10 ou menos', 0]] },
  { q: 'Você fuma mais nas primeiras horas após acordar do que no restante do dia?', opts: [['Sim', 1], ['Não', 0]] },
  { q: 'Você fuma mesmo estando doente e acamado?', opts: [['Sim', 1], ['Não', 0]] },
]

function getFagerLevel(score) {
  if (score <= 2) return { label: 'Muito baixa', color: '#1D9E75', bg: '#E8F5F0', text: 'Sua dependência física é baixa. O desafio principal provavelmente é psicológico e comportamental.' }
  if (score <= 4) return { label: 'Baixa', color: '#1D6B52', bg: '#E8F5F0', text: 'Boa notícia: dependência física baixa. Foco nas situações gatilho e hábitos.' }
  if (score === 5) return { label: 'Moderada', color: '#B07D2E', bg: '#FBF5E6', text: 'Dependência moderada. Pode se beneficiar de reposição de nicotina (adesivos, gomas). Consulte seu médico.' }
  if (score <= 7) return { label: 'Alta', color: '#C94B1E', bg: '#FDF0EB', text: 'Dependência alta. Terapia farmacológica (bupropiona ou vareniclina) é recomendada pelo INCA. Busque seu médico.' }
  return { label: 'Muito alta', color: '#9B2A10', bg: '#FDF0EB', text: 'Dependência muito alta. Tratamento médico combinado com suporte psicológico tem as maiores taxas de sucesso. Você merece toda a ajuda disponível.' }
}

export default function Onboarding({ data, update }) {
  const { user } = useAuth()
  const [step, setStep] = useState(0) // 0=welcome, 1=fager, 2=profile, 3=done
  const [fagerAnswers, setFagerAnswers] = useState({})
  const [fagerScore, setFagerScore] = useState(null)
  const [fagerQ, setFagerQ] = useState(0)
  const [profile, setProfile] = useState({
    cigaretteBrand: '',
    packPrice: '12',
    cigarettesPerPack: '20',
    cigarettesPerDay: '20',
    smokingSince: '',
  })

  const handleFagerAnswer = (val) => {
    const updated = { ...fagerAnswers, [fagerQ]: val }
    setFagerAnswers(updated)
    if (fagerQ < FAGER_QS.length - 1) {
      setFagerQ(fagerQ + 1)
    } else {
      const score = Object.values(updated).reduce((a, b) => a + b, 0)
      setFagerScore(score)
    }
  }

  const handleFinish = async () => {
    await update({
      onboardingDone: true,
      fagerScore,
      profile: {
        ...data.profile,
        ...profile,
        packPrice: parseFloat(profile.packPrice) || 12,
        cigarettesPerPack: parseInt(profile.cigarettesPerPack) || 20,
        cigarettesPerDay: parseInt(profile.cigarettesPerDay) || 20,
        lastSmokeFreeStart: Date.now(),
        quitDate: null,
      },
    })
  }

  if (step === 0) return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', background: 'var(--surface-card)' }}>
      <div style={{ textAlign: 'center', maxWidth: 340 }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🕊️</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '0.75rem' }}>
          Olá, {user?.displayName?.split(' ')[0]}!
        </h1>
        <p style={{ color: 'var(--ink-soft)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Vamos começar com uma avaliação clínica baseada nos protocolos do INCA — leva menos de 2 minutos e vai personalizar todo seu tratamento.
        </p>
        <div style={{ background: 'var(--forest-pale)', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--forest)', fontWeight: 600, marginBottom: 8 }}>O que vamos fazer:</p>
          {['1. Teste de Fagerström (dependência à nicotina)', '2. Configurar seu perfil de fumante', '3. Definir sua data de parada'].map(t => (
            <p key={t} style={{ fontSize: '0.8125rem', color: 'var(--ink-mid)', padding: '4px 0' }}>{t}</p>
          ))}
        </div>
        <button className="btn btn-forest btn-full btn-lg" onClick={() => setStep(1)}>
          Começar avaliação →
        </button>
      </div>
    </div>
  )

  if (step === 1) {
    const progress = fagerQ / FAGER_QS.length
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', padding: '2rem 1.25rem', background: 'var(--surface-card)' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-soft)' }}>FAGERSTRÖM — DEPENDÊNCIA À NICOTINA</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{fagerQ + 1}/6</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>

        {fagerScore === null ? (
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              {FAGER_QS[fagerQ].q}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FAGER_QS[fagerQ].opts.map(([label, val]) => (
                <button key={label}
                  onClick={() => handleFagerAnswer(val)}
                  style={{
                    padding: '14px 18px', border: '1.5px solid var(--border-strong)', borderRadius: 10,
                    background: 'var(--surface-card)', cursor: 'pointer', fontSize: '0.9375rem',
                    fontFamily: 'inherit', color: 'var(--ink)', textAlign: 'left', fontWeight: 500,
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--forest)'; e.target.style.background = 'var(--forest-pale)' }}
                  onMouseLeave={e => { e.target.style.borderColor = 'var(--border-strong)'; e.target.style.background = 'var(--surface-card)' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : (() => {
          const level = getFagerLevel(fagerScore)
          return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: level.bg, borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{fagerScore <= 4 ? '🌱' : fagerScore <= 6 ? '⚡' : '🔥'}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: level.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                  DEPENDÊNCIA {level.label.toUpperCase()}
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 700, color: level.color, lineHeight: 1 }}>{fagerScore}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ink-soft)', marginTop: 2 }}>pontos de 10</div>
              </div>
              <div className="card" style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink-mid)' }}>{level.text}</p>
              </div>
              <div className="quote-card" style={{ marginBottom: 'auto' }}>
                <p className="quote-text">"O que nos perturba não são as coisas, mas as opiniões que temos sobre elas."</p>
                <p className="quote-author">— Epicteto, filósofo estoico</p>
              </div>
              <button className="btn btn-forest btn-full btn-lg" style={{ marginTop: '1.5rem' }} onClick={() => setStep(2)}>
                Continuar →
              </button>
            </div>
          )
        })()}
      </div>
    )
  }

  if (step === 2) return (
    <div style={{ minHeight: '100dvh', padding: '2rem 1.25rem', background: 'var(--surface-card)', overflowY: 'auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="tag tag-forest" style={{ marginBottom: 10 }}>Passo 2 de 2</div>
        <h2>Seu perfil de fumante</h2>
        <p style={{ fontSize: '0.875rem', marginTop: 4 }}>Esses dados calculam quanto você gasta e quantos cigarros evita</p>
      </div>

      <div className="field">
        <label>Marca do cigarro (opcional)</label>
        <input value={profile.cigaretteBrand} onChange={e => setProfile(p => ({ ...p, cigaretteBrand: e.target.value }))} placeholder="Ex: Marlboro, L&M, Hollywood..." />
      </div>
      <div className="field-row" style={{ marginBottom: '1rem' }}>
        <div className="field" style={{ margin: 0 }}>
          <label>Preço do maço (R$)</label>
          <input type="number" value={profile.packPrice} onChange={e => setProfile(p => ({ ...p, packPrice: e.target.value }))} placeholder="12" min="1" step="0.5" />
        </div>
        <div className="field" style={{ margin: 0 }}>
          <label>Cigarros por maço</label>
          <input type="number" value={profile.cigarettesPerPack} onChange={e => setProfile(p => ({ ...p, cigarettesPerPack: e.target.value }))} placeholder="20" min="1" />
        </div>
      </div>
      <div className="field">
        <label>Quantos cigarros você fuma por dia?</label>
        <input type="number" value={profile.cigarettesPerDay} onChange={e => setProfile(p => ({ ...p, cigarettesPerDay: e.target.value }))} placeholder="20" min="1" />
      </div>
      <div className="field">
        <label>Fumante desde</label>
        <input type="number" value={profile.smokingSince} onChange={e => setProfile(p => ({ ...p, smokingSince: e.target.value }))} placeholder="Ano em que começou a fumar (ex: 2005)" min="1950" max={new Date().getFullYear()} />
      </div>

      {profile.cigarettesPerDay && profile.packPrice && profile.cigarettesPerPack && (
        <div className="card card-pale" style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--forest)', fontWeight: 600, marginBottom: 8 }}>📊 Seus números mensais</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ background: 'white', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--forest)' }}>
                {(parseInt(profile.cigarettesPerDay) * 30).toLocaleString('pt-BR')}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ink-soft)', fontWeight: 600 }}>cigarros/mês</div>
            </div>
            <div style={{ background: 'white', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ember)' }}>
                R$ {((parseInt(profile.cigarettesPerDay) / parseInt(profile.cigarettesPerPack)) * parseFloat(profile.packPrice) * 30).toFixed(2)}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ink-soft)', fontWeight: 600 }}>gastos/mês</div>
            </div>
          </div>
        </div>
      )}

      <button className="btn btn-forest btn-full btn-lg" onClick={handleFinish}>
        Começar minha jornada 🕊️
      </button>
    </div>
  )

  return null
}
