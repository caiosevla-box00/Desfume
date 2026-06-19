// src/pages/Settings.jsx
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useFCM } from '../hooks/useFCM'
import { useSmokingSchedule, INTERVAL_OPTIONS } from '../hooks/useSmokingSchedule'
import { brl } from '../lib/stats'
import Logo from '../components/Logo'

export default function Settings({ data, update }) {
  const { user } = useAuth()
  const { supported, requestFCMPermission, sendLocalNotification } = useFCM(user?.uid)
  const {
    interval, dailyGoal, updateInterval, updateDailyGoal
  } = useSmokingSchedule({ data, update, sendLocalNotification })

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
      showToast('❌ Permissão negada. Ative nas configurações do navegador.')
    } else if (result.reason === 'not_supported') {
      showToast('⚠️ Seu navegador não suporta notificações push.')
    } else {
      showToast('⚠️ Erro ao ativar. Verifique se o VAPID Key está configurado.')
    }
  }

  const handleSaveGoal = async () => {
    const val = parseInt(localGoal)
    if (!val || val < 1) return
    await updateDailyGoal(val)
    showToast('Meta diária salva!')
  }

  const notifEnabled = data.notificationsEnabled || false
  const cpd = data.profile?.cigarettesPerDay || 20
  const packPrice = data.profile?.packPrice || 12
  const cpp = data.profile?.cigarettesPerPack || 20
  const pricePerCig = packPrice / cpp

  // Projeção com novo intervalo
  const projectedDaily = Math.floor(16 * 60 / interval) // horas acordado / intervalo
  const projectedSaving = Math.max(0, (cpd - projectedDaily) * pricePerCig)

  return (
    <div className="page-padded">
      {toast && <div className="toast">{toast}</div>}

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
        <Logo size={28} />
        <h1 style={{ fontSize: '1.375rem', margin: 0 }}>Configurações</h1>
      </div>

      {/* === NOTIFICAÇÕES === */}
      <h2 style={{ marginBottom: '0.75rem', fontSize: '1rem', color: '#0A3D2B' }}>🔔 Notificações</h2>

      {!notifEnabled ? (
        <div className="card card-gold" style={{ marginBottom: '1rem' }}>
          <p style={{ fontWeight: 700, color: '#C47E00', marginBottom: 6 }}>Ativar notificações reais</p>
          <p style={{ fontSize: '0.8125rem', color: '#6B8A74', marginBottom: 12, lineHeight: 1.5 }}>
            Com o Firebase Cloud Messaging, você recebe alertas mesmo com o app fechado — quando for hora de fumar e lembretes de remédio.
          </p>
          {!supported ? (
            <div style={{ background: '#FEF2F2', borderRadius: 8, padding: '10px 12px' }}>
              <p style={{ fontSize: '0.8125rem', color: '#DC2626', fontWeight: 600 }}>Seu navegador não suporta notificações push. Use Chrome ou Safari no iOS 16.4+.</p>
            </div>
          ) : (
            <button className="btn btn-gold btn-full" onClick={handleEnableNotifications} disabled={fcmLoading}>
              {fcmLoading ? 'Ativando...' : 'Ativar notificações'}
            </button>
          )}
        </div>
      ) : (
        <div className="card card-mint" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.5rem' }}>🔔</span>
          <div>
            <p style={{ fontWeight: 700, color: '#0A3D2B', margin: 0 }}>Notificações ativas</p>
            <p style={{ fontSize: '0.75rem', color: '#4A8C6F', margin: 0 }}>Você receberá alertas mesmo com o app fechado</p>
          </div>
        </div>
      )}

      {/* VAPID KEY info */}
      <div className="card card-sky" style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1A6B9A', marginBottom: 6 }}>⚙️ Configuração necessária no Firebase</p>
        <p style={{ fontSize: '0.8125rem', color: '#6B8A74', lineHeight: 1.5, marginBottom: 8 }}>
          Para as notificações funcionarem, você precisa adicionar a <strong>VAPID Key</strong> na Vercel:
        </p>
        {[
          '1. Firebase Console → Project Settings → Cloud Messaging',
          '2. Em "Web configuration", clique em "Generate key pair"',
          '3. Copie a chave gerada',
          '4. Vercel → Settings → Environment Variables',
          '5. Adicione: VITE_FIREBASE_VAPID_KEY = (a chave copiada)',
          '6. Redeploy na Vercel',
        ].map(s => (
          <p key={s} style={{ fontSize: '0.75rem', color: '#1A6B9A', padding: '3px 0', fontWeight: 500 }}>{s}</p>
        ))}
      </div>

      {/* === INTERVALO ENTRE CIGARROS === */}
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#0A3D2B' }}>⏱️ Intervalo entre cigarros</h2>
      <p style={{ fontSize: '0.8125rem', color: '#6B8A74', marginBottom: '1rem', lineHeight: 1.5 }}>
        O app vai te notificar quando o intervalo passar — você decide se fuma ou não. O objetivo é aumentar gradualmente.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1rem' }}>
        {INTERVAL_OPTIONS.map(opt => {
          const selected = interval === opt.value
          const proj = Math.floor(16 * 60 / opt.value)
          return (
            <button
              key={opt.value}
              onClick={() => updateInterval(opt.value)}
              style={{
                padding: '12px 16px', border: `1.5px solid ${selected ? '#1A6B42' : '#DCF0E7'}`,
                borderRadius: 12, background: selected ? '#DCF0E7' : 'white',
                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all .15s'
              }}
            >
              <div>
                <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: selected ? '#0A3D2B' : '#2D4A38' }}>{opt.label}</span>
                <span style={{ fontSize: '0.75rem', color: '#6B8A74', marginLeft: 8 }}>{opt.description}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: selected ? '#1A6B42' : '#9BB5A4' }}>≈ {proj} cig/dia</div>
                {selected && <div style={{ fontSize: '0.6875rem', color: '#2ECC71', fontWeight: 700 }}>✓ selecionado</div>}
              </div>
            </button>
          )
        })}
      </div>

      {/* Projeção */}
      {projectedDaily < cpd && (
        <div className="card card-mint" style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0A3D2B', marginBottom: 8 }}>📊 Projeção com esse intervalo</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ background: 'white', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A6B42' }}>{projectedDaily}</div>
              <div style={{ fontSize: '0.625rem', color: '#6B8A74', fontWeight: 600 }}>cigarros/dia projetado</div>
            </div>
            <div style={{ background: 'white', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#C47E00' }}>{brl(projectedSaving * 30)}</div>
              <div style={{ fontSize: '0.625rem', color: '#6B8A74', fontWeight: 600 }}>economia/mês</div>
            </div>
          </div>
        </div>
      )}

      {/* === META DIÁRIA === */}
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#0A3D2B' }}>🎯 Meta diária de cigarros</h2>
      <p style={{ fontSize: '0.8125rem', color: '#6B8A74', marginBottom: '1rem', lineHeight: 1.5 }}>
        Seu padrão atual é <strong>{cpd} cigarros/dia</strong>. Defina uma meta menor para reduzir gradualmente.
      </p>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <label style={{ marginBottom: 8 }}>Meta máxima de cigarros por dia</label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="number" value={localGoal}
            onChange={e => setLocalGoal(e.target.value)}
            min="1" max={cpd}
            style={{ flex: 1 }}
          />
          <button className="btn btn-green" style={{ padding: '11px 20px' }} onClick={handleSaveGoal}>
            Salvar
          </button>
        </div>
        {parseInt(localGoal) < cpd && parseInt(localGoal) > 0 && (
          <div style={{ marginTop: 10, background: '#DCF0E7', borderRadius: 8, padding: '8px 12px' }}>
            <p style={{ fontSize: '0.8125rem', color: '#0A3D2B', fontWeight: 600 }}>
              Redução de {cpd - parseInt(localGoal)} cigarros/dia = {brl((cpd - parseInt(localGoal)) * pricePerCig * 30)} a menos por mês
            </p>
          </div>
        )}
      </div>

      {/* Metas rápidas */}
      <p style={{ fontSize: '0.8125rem', color: '#6B8A74', marginBottom: '0.75rem', fontWeight: 600 }}>Metas sugeridas:</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.5rem' }}>
        {[
          { label: 'Redução 25%', value: Math.ceil(cpd * 0.75) },
          { label: 'Redução 50%', value: Math.ceil(cpd * 0.5) },
          { label: 'Redução 75%', value: Math.ceil(cpd * 0.25) },
          { label: 'Parar de vez', value: 0 },
        ].map(opt => (
          <button
            key={opt.label}
            onClick={() => { setLocalGoal(String(opt.value || 1)); updateDailyGoal(opt.value || 1) }}
            style={{
              padding: '10px 12px', border: '1.5px solid #DCF0E7', borderRadius: 10,
              background: dailyGoal === (opt.value || 1) ? '#DCF0E7' : 'white',
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0A3D2B' }}>{opt.label}</div>
            <div style={{ fontSize: '0.75rem', color: '#6B8A74' }}>{opt.value} cig/dia</div>
          </button>
        ))}
      </div>
    </div>
  )
}
