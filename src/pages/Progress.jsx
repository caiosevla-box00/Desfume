import { useMemo } from 'react'
import { format, subDays } from 'date-fns'

const BADGES = [
  { id:'h1', icon:'⏱️', label:'1 hora', ms:3_600_000 },
  { id:'h8', icon:'🌅', label:'8 horas', ms:28_800_000 },
  { id:'d1', icon:'☀️', label:'1 dia', ms:86_400_000 },
  { id:'d3', icon:'🌱', label:'3 dias', ms:259_200_000 },
  { id:'d7', icon:'🏅', label:'1 semana', ms:604_800_000 },
  { id:'d14', icon:'💪', label:'2 semanas', ms:1_209_600_000 },
  { id:'d30', icon:'🏆', label:'1 mês', ms:2_592_000_000 },
  { id:'d100', icon:'👑', label:'100 dias', ms:8_640_000_000 },
]

const TIMELINE = [
  { t:'20 min', ms:1_200_000, body:'Pressão arterial e frequência cardíaca voltam ao normal' },
  { t:'8 horas', ms:28_800_000, body:'Monóxido de carbono cai à metade; oxigenação normaliza' },
  { t:'24 horas', ms:86_400_000, body:'Risco de infarto já começa a diminuir' },
  { t:'48 horas', ms:172_800_000, body:'Olfato e paladar começam a se regenerar — comida fica mais saborosa' },
  { t:'72 horas', ms:259_200_000, body:'Bronquíolos relaxam; respirar fica visivelmente mais fácil' },
  { t:'2 semanas', ms:1_209_600_000, body:'Circulação melhora; pulmões começam a eliminar resíduos' },
  { t:'1 a 9 meses', ms:2_592_000_000, body:'Tosse e falta de ar diminuem; energia aumenta consideravelmente' },
  { t:'1 ano', ms:31_536_000_000, body:'Risco de doença cardíaca coronária é metade do de um fumante' },
  { t:'5 anos', ms:157_680_000_000, body:'Risco de AVC igual ao de não fumante' },
  { t:'10 anos', ms:315_360_000_000, body:'Risco de câncer de pulmão cai à metade' },
  { t:'15 anos', ms:473_040_000_000, body:'Risco cardíaco igual ao de quem nunca fumou' },
]

export default function Progress({ data }) {
  const lastStart = data.profile?.lastSmokeFreeStart || Date.now()
  const elapsed = Date.now() - lastStart
  const cpd = data.profile?.cigarettesPerDay || 20
  const packPrice = data.profile?.packPrice || 12
  const cpp = data.profile?.cigarettesPerPack || 20
  const pricePerCig = packPrice / cpp
  const cigsNotSmoked = Math.max(0, Math.floor(elapsed / 86400000) * cpd)
  const moneySaved = cigsNotSmoked * pricePerCig
  const daysClean = Math.floor(elapsed / 86400000)
  const monthlyCost = (cpd / cpp) * packPrice * 30
  const yearlyCost = monthlyCost * 12

  const last14 = useMemo(() => Array.from({ length: 14 }, (_, i) => {
    const d = subDays(new Date(), 13 - i)
    const key = format(d, 'yyyy-MM-dd')
    return { key, label: format(d, 'dd/M'), count: data.smoking?.logByDay?.[key] || 0, isToday: i === 13 }
  }), [data.smoking?.logByDay])

  const maxCount = Math.max(...last14.map(d => d.count), 1)

  return (
    <div className="page-padded">
      <h1 style={{ marginBottom: '1.25rem' }}>Seu progresso</h1>

      {/* Main stats */}
      <div className="card card-green" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            ['Economizado', `R$ ${moneySaved.toFixed(2)}`],
            ['Não fumados', cigsNotSmoked],
            ['Dias limpos', daysClean],
            ['Registrados', data.smoking?.totalLogged || 0],
          ].map(([lbl, val]) => (
            <div key={lbl}>
              <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>{lbl}</p>
              <p style={{ fontSize: '1.625rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Financial impact */}
      <div className="card card-ember" style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#E05C2A', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>💸 O que o cigarro custava</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Por cigarro', `R$ ${pricePerCig.toFixed(2)}`],
            ['Por mês', `R$ ${monthlyCost.toFixed(2)}`],
            ['Por ano', `R$ ${yearlyCost.toFixed(2)}`],
            ['Em 5 anos', `R$ ${(yearlyCost * 5).toFixed(2)}`],
            ['Em 10 anos', `R$ ${(yearlyCost * 10).toFixed(2)}`],
          ].map(([lbl, val]) => (
            <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid rgba(224,92,42,0.1)' }}>
              <span style={{ fontSize: '0.875rem', color: '#6B8A74' }}>{lbl}</span>
              <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#E05C2A' }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Health impact */}
      <div className="card card-red" style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>⚠️ Impacto à saúde</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            [`${cpd * 5} min`, 'de vida por dia'],
            [`${(cpd * 5 * 365 / 60 / 24).toFixed(0)} dias`, 'de vida por ano'],
            [`${(cpd * 5 * 365 * 10 / 60 / 24 / 365).toFixed(1)} anos`, 'em 10 anos de cigarro'],
            ['70%', 'dos fumantes desenvolvem doença grave'],
          ].map(([val, lbl]) => (
            <div key={lbl} style={{ background: 'white', borderRadius: 8, padding: '10px', textAlign: 'center', border: '1px solid rgba(220,38,38,0.1)' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#DC2626', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: '0.625rem', color: '#6B8A74', marginTop: 3, fontWeight: 600 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ marginBottom: '0.75rem' }}>Cigarros por dia (14 dias)</h2>
        <div className="card">
          <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 100, paddingBottom: 4 }}>
            {last14.map(day => (
              <div key={day.key} className="chart-bar-wrap">
                <div style={{ fontSize: '0.5rem', color: day.count > 0 ? '#E05C2A' : '#DCF0E7', fontWeight: 700, minHeight: 10 }}>{day.count > 0 ? day.count : ''}</div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', height: 72 }}>
                  <div className={`chart-bar-inner${day.isToday ? ' today' : day.count > 0 ? ' smoked' : ''}`}
                    style={{ height: day.count > 0 ? `${Math.round((day.count / maxCount) * 100)}%` : '3px', width: '100%' }} />
                </div>
                <div style={{ fontSize: '0.5rem', color: '#9BB5A4', transform: 'rotate(-45deg)', whiteSpace: 'nowrap', marginTop: 2 }}>{day.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ marginBottom: '0.75rem' }}>Conquistas</h2>
        <div className="badge-grid">
          {BADGES.map(b => {
            const earned = elapsed >= b.ms
            return (
              <div key={b.id} className={`badge-item ${earned ? 'earned' : 'locked'}`}>
                <div className="badge-icon">{b.icon}</div>
                <div className="badge-name">{b.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '0.75rem' }}>O que muda no seu corpo</h2>
        <ul className="timeline">
          {TIMELINE.map((item, i) => {
            const done = elapsed >= item.ms
            return (
              <li key={item.t} className="tl-item">
                <div className="tl-dot-wrap">
                  <div className={`tl-dot ${done ? 'done' : ''}`} />
                  {i < TIMELINE.length - 1 && <div className="tl-line" style={{ flex: 1 }} />}
                </div>
                <div>
                  <div className="tl-time">{item.t}</div>
                  <div className="tl-text">{item.body}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
