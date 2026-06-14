// src/pages/Progress.jsx
import { useMemo } from 'react'
import { format, subDays, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const BADGES = [
  { id: 'h1', icon: '⏱️', label: '1 hora', ms: 3_600_000 },
  { id: 'h8', icon: '🌅', label: '8 horas', ms: 28_800_000 },
  { id: 'd1', icon: '☀️', label: '1 dia', ms: 86_400_000 },
  { id: 'd3', icon: '🌱', label: '3 dias', ms: 259_200_000 },
  { id: 'd7', icon: '🏅', label: '1 semana', ms: 604_800_000 },
  { id: 'd14', icon: '💪', label: '2 semanas', ms: 1_209_600_000 },
  { id: 'd30', icon: '🏆', label: '1 mês', ms: 2_592_000_000 },
  { id: 'd100', icon: '👑', label: '100 dias', ms: 8_640_000_000 },
]

const TIMELINE = [
  { t: '20 min', ms: 1_200_000, body: 'Pressão arterial e frequência cardíaca voltam ao normal' },
  { t: '8 horas', ms: 28_800_000, body: 'Monóxido de carbono cai pela metade; oxigenação normaliza' },
  { t: '24 horas', ms: 86_400_000, body: 'Risco de infarto já começa a diminuir' },
  { t: '48 horas', ms: 172_800_000, body: 'Terminações nervosas do olfato e paladar se regeneram' },
  { t: '72 horas', ms: 259_200_000, body: 'Bronquíolos relaxam, respiração mais fácil' },
  { t: '2 semanas', ms: 1_209_600_000, body: 'Circulação melhora significativamente; pulmões começam a limpar' },
  { t: '1 a 9 meses', ms: 2_592_000_000, body: 'Tosse e falta de ar diminuem; cílios pulmonares recuperados' },
  { t: '1 ano', ms: 31_536_000_000, body: 'Risco de doença cardíaca coronária é metade do de um fumante' },
  { t: '5 anos', ms: 157_680_000_000, body: 'Risco de AVC igual ao de não fumante' },
  { t: '10 anos', ms: 315_360_000_000, body: 'Risco de câncer de pulmão cai pela metade' },
  { t: '15 anos', ms: 473_040_000_000, body: 'Risco cardíaco igual ao de quem nunca fumou' },
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

  const monthlySpend = (cpd / cpp) * packPrice * 30
  const yearlySpend = monthlySpend * 12

  const last14 = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const d = subDays(new Date(), 13 - i)
      const key = format(d, 'yyyy-MM-dd')
      return {
        key,
        label: format(d, 'dd/MM'),
        count: data.smoking?.logByDay?.[key] || 0,
        isToday: i === 13,
      }
    })
  }, [data.smoking?.logByDay])

  const maxCount = Math.max(...last14.map(d => d.count), 1)

  const monthlyData = useMemo(() => {
    const months = {}
    Object.entries(data.smoking?.logByDay || {}).forEach(([date, count]) => {
      const month = date.slice(0, 7)
      months[month] = (months[month] || 0) + count
    })
    return Object.entries(months).sort().slice(-6).map(([month, count]) => ({
      label: format(parseISO(month + '-01'), 'MMM', { locale: ptBR }),
      count,
    }))
  }, [data.smoking?.logByDay])

  const totalLogged = data.smoking?.totalLogged || 0

  return (
    <div className="page-padded">
      <h1 style={{ marginBottom: '1.25rem' }}>Seu progresso</h1>

      <div className="card card-forest" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <p style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 600, textTransform: 'uppercase' }}>Economizado</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>R$ {moneySaved.toFixed(2)}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 600, textTransform: 'uppercase' }}>Não fumados</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>{cigsNotSmoked}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 600, textTransform: 'uppercase' }}>Dias limpos</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>{daysClean}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 600, textTransform: 'uppercase' }}>Total registrado</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>{totalLogged}</p>
          </div>
        </div>
      </div>

      <div className="card card-gold" style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>💰 Análise financeira</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            ['Custo por cigarro', `R$ ${pricePerCig.toFixed(2)}`],
            ['Gasto mensal estimado', `R$ ${monthlySpend.toFixed(2)}`],
            ['Gasto anual estimado', `R$ ${yearlySpend.toFixed(2)}`],
            ['Em 5 anos de cigarro', `R$ ${(yearlySpend * 5).toFixed(2)}`],
          ].map(([lbl, val]) => (
            <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--ink-mid)' }}>{lbl}</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gold)' }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ marginBottom: '0.75rem' }}>Cigarros por dia (14 dias)</h2>
        <div className="card">
          <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 100 }}>
            {last14.map(day => (
              <div key={day.key} className="chart-bar-wrap">
                <div style={{ fontSize: '0.5625rem', color: 'var(--forest)', fontWeight: 700 }}>{day.count > 0 ? day.count : ''}</div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', height: 72 }}>
                  <div
                    className={`chart-bar-inner${day.isToday ? ' highlight' : ''}`}
                    style={{ height: day.count > 0 ? `${Math.round((day.count / maxCount) * 100)}%` : '2px', width: '100%' }}
                  />
                </div>
                <div style={{ fontSize: '0.5rem', color: 'var(--ink-soft)', transform: 'rotate(-45deg)', whiteSpace: 'nowrap', marginTop: 2 }}>{day.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {monthlyData.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>Por mês</h2>
          <div className="card">
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80 }}>
              {monthlyData.map(m => {
                const max = Math.max(...monthlyData.map(d => d.count), 1)
                return (
                  <div key={m.label} className="chart-bar-wrap">
                    <div style={{ fontSize: '0.625rem', color: 'var(--forest)', fontWeight: 700 }}>{m.count}</div>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', height: 56 }}>
                      <div className="chart-bar-inner" style={{ height: `${Math.round((m.count / max) * 100)}%`, width: '100%' }} />
                    </div>
                    <div className="chart-bar-label">{m.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

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

      <div style={{ marginBottom: '1rem' }}>
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
                <div className="tl-body">
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
