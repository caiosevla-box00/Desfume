import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useFCM } from '../hooks/useFCM'
import { useSmokingSchedule, INTERVAL_OPTIONS } from '../hooks/useSmokingSchedule'
import { brl } from '../lib/stats'

export default function Settings({ data, update }) {
  const { user } = useAuth()
  const { supported, requestFCMPermission, sendLocalNotification } = useFCM(user?.uid)
  const { interval, dailyGoal, updateInterval, updateDailyGoal } = useSmokingSchedule({ data, update, sendLocalNotification })
  const [toast, setToast] = useState('')
  const [fcmLoading, setFcmLoading] = useState(false)
  const [localGoal, setLocalGoal] = useState(String(dailyGoal))

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const handleEnableNotifications = async () => {
    setFcmLoading(true)
    const result = await requestFCMPermission()
    setFcmLoading(false)
    if (result.success) {
      await update({ notificationsEnabled: true })
      showToast('✅ Notificações ativadas!')
    } else if (result.reason === 'denied') {
      showToast('Permissão negada. Ative nas configurações do navegador.')
    } else {
      showToast('Configure a VAPID Key no Firebase para ativar.')
    }
  }

  const handleSaveGoal = async () => {
    const val = parseInt(localGoal)
    if (!val || val < 1) return
    await updateDailyGoal(val)
    showToast('Meta salva!')
  }

  const notifEnabled = data.notificationsEnabled || false
  const cpd = data.profile?.cigarettesPerDay || 20
  const packPrice = data.profile?.packPrice || 12
  const cpp = data.profile?.cigarettesPerPack || 20
  const pricePerCig = packPrice / cpp
  const projectedDaily = Math.floor(16 * 60 / interval)
  const projectedSaving = Math.max(0, (cpd - projectedDaily) * pricePerCig)

  return (
    <div className="page-padded">
      {toast && <div className="toast">{toast}</div>}

      <h1 style={{ marginBottom: '1.5rem' }}>Configurações</h1>

      {/* NOTIFICAÇÕES */}
      <h2 style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>🔔 Notificações</h2>
      {!notifEnabled ? (
        <div className="card card-gold" style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontWeight: 700, color: '#C47E00', marginBottom: 6 }}>Ativar alertas no celular</p>
          <p style={{ fontSize: '0.8125rem', color: '#6B8A74', marginBottom: 12, lineHeight: 1.5 }}>
            Receba alertas quando o intervalo passar e lembretes de remédio, mesmo com o app fechado.
          </p>
          {!supported ? (
            <p style={{ fontSize: '0.8125rem', color: '#DC2626', fontWeight: 600 }}>
              Use Chrome (Android) ou Safari iOS 16.4+ para notificações push.
            </p>
          ) : (
            <button className="btn btn-gold btn-full" onClick={handleEnableNotifications} disabled={fcmLoading}>
              {fcmLoading ? 'Ativando...' : 'Ativar notificações'}
            </button>
          )}
        </div>
      ) : (
        <div className="card card-mint" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.5rem' }}>🔔</span>
          <div>
            <p style={{ fontWeight: 700, color: '#0A3D2B', margin: 0 }}>Notificações ativas</p>
            <p style={{ fontSize: '0.75rem', color: '#4A8C6F', margin: 0 }}>Alertas mesmo com o app fechado</p>
          </div>
        </div>
      )}

      {/* INTERVALO */}
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>⏱️ Intervalo entre cigarros</h2>
      <p style={{ fontSize: '0.8125rem', color: '#6B8A74', marginBottom: '1rem', lineHeight: 1.5 }}>
        O app te notifica quando o intervalo passar. Você decide se fuma ou não. Aumente gradualmente para reduzir o consumo.
      </p>

      {/* Intervalo personalizado */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <label style={{ marginBottom: 8 }}>Intervalo personalizado (em minutos)</label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="number"
            placeholder="Ex: 75 para 1h15min"
            min="5"
            max="1440"
            style={{ flex: 1 }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const val = parseInt(e.target.value)
                if (val >= 5) { updateInterval(val); showToast(`Intervalo de ${val} min ativado!`) }
              }
            }}
            onChange={e => {
              const val = parseInt(e.target.value)
              if (val >= 5 && val <= 1440) updateInterval(val)
            }}
          />
          <button className="btn btn-green" style={{ padding: '11px 16px', whiteSpace: 'nowrap' }}
            onClick={e => {
              const input = e.target.closest('.card').querySelector('input')
              const val = parseInt(input.value)
              if (val >= 5) { updateInterval(val); showToast(`Intervalo de ${val} min ativado!`) }
            }}>
            Aplicar
          </button>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#9BB5A4', marginTop: 6 }}>
          Ativo agora: <strong style={{ color: '#1A6B42' }}>
            {interval >= 60 ? `${Math.floor(interval/60)}h${interval%60>0?` ${interval%60}min`:''}` : `${interval} min`}
          </strong>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1rem' }}>
        {INTERVAL_OPTIONS.map(opt => {
          const selected = interval === opt.value
          const proj = Math.floor(16 * 60 / opt.value)
          return (
            <button key={opt.value} onClick={() => updateInterval(opt.value)} style={{
              padding: '12px 16px', border: `1.5px solid ${selected ? '#1A6B42' : '#DCF0E7'}`,
              borderRadius: 12, background: selected ? '#DCF0E7' : 'white',
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: selected ? '#0A3D2B' : '#2D4A38' }}>{opt.label}</span>
                <span style={{ fontSize: '0.75rem', color: '#6B8A74', marginLeft: 8 }}>{opt.description}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: selected ? '#1A6B42' : '#9BB5A4' }}>≈ {proj} cig/dia</div>
                {selected && <div style={{ fontSize: '0.6875rem', color: '#2ECC71', fontWeight: 700 }}>✓ ativo</div>}
              </div>
            </button>
          )
        })}
      </div>
      {projectedDaily < cpd && (
        <div className="card card-mint" style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0A3D2B', marginBottom: 8 }}>📊 Com esse intervalo</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ background: 'white', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A6B42' }}>{projectedDaily}</div>
              <div style={{ fontSize: '0.625rem', color: '#6B8A74', fontWeight: 600 }}>cigarros/dia proj.</div>
            </div>
            <div style={{ background: 'white', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#C47E00' }}>{brl(projectedSaving * 30)}</div>
              <div style={{ fontSize: '0.625rem', color: '#6B8A74', fontWeight: 600 }}>economia/mês</div>
            </div>
          </div>
        </div>
      )}

      {/* META DIÁRIA */}
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>🎯 Meta diária</h2>
      <p style={{ fontSize: '0.8125rem', color: '#6B8A74', marginBottom: '1rem', lineHeight: 1.5 }}>
        Padrão atual: <strong>{cpd} cigarros/dia</strong>. A meta serve de referência para calcular o que você economizou.
      </p>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <label style={{ marginBottom: 8 }}>Máximo de cigarros por dia</label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input type="number" value={localGoal} onChange={e => setLocalGoal(e.target.value)} min="1" max={cpd} style={{ flex: 1 }} />
          <button className="btn btn-green" style={{ padding: '11px 20px' }} onClick={handleSaveGoal}>Salvar</button>
        </div>
        {parseInt(localGoal) < cpd && parseInt(localGoal) > 0 && (
          <p style={{ fontSize: '0.8125rem', color: '#1A6B42', fontWeight: 600, marginTop: 8 }}>
            Redução de {cpd - parseInt(localGoal)} cig/dia = {brl((cpd - parseInt(localGoal)) * pricePerCig * 30)}/mês
          </p>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.5rem' }}>
        {[
          { label: 'Redução 25%', value: Math.ceil(cpd * 0.75) },
          { label: 'Redução 50%', value: Math.ceil(cpd * 0.5) },
          { label: 'Redução 75%', value: Math.ceil(cpd * 0.25) },
          { label: 'Zerar', value: 0 },
        ].map(opt => (
          <button key={opt.label} onClick={() => { setLocalGoal(String(opt.value || 1)); updateDailyGoal(opt.value || 1) }}
            style={{ padding: '10px 12px', border: `1.5px solid ${dailyGoal === (opt.value || 1) ? '#1A6B42' : '#DCF0E7'}`, borderRadius: 10, background: dailyGoal === (opt.value || 1) ? '#DCF0E7' : 'white', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0A3D2B' }}>{opt.label}</div>
            <div style={{ fontSize: '0.75rem', color: '#6B8A74' }}>{opt.value} cig/dia</div>
          </button>
        ))}
      </div>
    </div>
  )
}
