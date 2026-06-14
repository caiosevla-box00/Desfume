// src/pages/Medications.jsx
import { useState } from 'react'
import { useNotifications } from '../hooks/useNotifications'

const COMMON_MEDS = [
  { name: 'Bupropiona', dose: '150mg', notes: 'Antidepressivo que reduz o desejo de fumar. Prescrição médica necessária.' },
  { name: 'Vareniclina (Champix)', dose: '1mg', notes: 'Agonista parcial da nicotina. Alta eficácia. Prescrição médica.' },
  { name: 'Adesivo de nicotina', dose: '14mg/24h', notes: 'TRN — reposição transdérmica de nicotina.' },
  { name: 'Goma de nicotina', dose: '2mg', notes: 'TRN — uso quando sentir fissura.' },
  { name: 'Pastilha de nicotina', dose: '2mg', notes: 'TRN — dissolve lentamente na boca.' },
]

export default function Medications({ data, update }) {
  const { requestPermission, scheduleDaily } = useNotifications()
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', dosage: '', times: ['08:00'], notes: '' })
  const [notifEnabled, setNotifEnabled] = useState(data.notificationsEnabled || false)
  const [toast, setToast] = useState('')

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const addMed = async () => {
    if (!form.name) return
    const med = { ...form, id: Date.now().toString() }
    const updated = [...(data.medications || []), med]
    await update({ medications: updated })
    if (notifEnabled) scheduleDaily([med])
    setForm({ name: '', dosage: '', times: ['08:00'], notes: '' })
    setShowAdd(false)
    showToast(`${med.name} adicionado com notificações!`)
  }

  const removeMed = async (id) => {
    await update({ medications: (data.medications || []).filter(m => m.id !== id) })
  }

  const enableNotifications = async () => {
    const granted = await requestPermission()
    if (granted) {
      setNotifEnabled(true)
      await update({ notificationsEnabled: true })
      scheduleDaily(data.medications || [])
      showToast('Notificações ativadas!')
    } else {
      showToast('Permissão de notificação negada. Verifique as configurações do navegador.')
    }
  }

  const addTime = () => {
    setForm(f => ({ ...f, times: [...f.times, '12:00'] }))
  }

  const updateTime = (idx, val) => {
    setForm(f => ({ ...f, times: f.times.map((t, i) => i === idx ? val : t) }))
  }

  const removeTime = (idx) => {
    setForm(f => ({ ...f, times: f.times.filter((_, i) => i !== idx) }))
  }

  return (
    <div className="page-padded">
      {toast && <div className="toast">{toast}</div>}
      <h1 style={{ marginBottom: '0.25rem' }}>Remédios</h1>
      <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>Registre seus medicamentos e configure lembretes</p>

      {!notifEnabled && (
        <div className="card card-gold" style={{ marginBottom: '1rem' }}>
          <p style={{ fontWeight: 600, color: 'var(--gold)', marginBottom: 6 }}>🔔 Ativar lembretes</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ink-mid)', marginBottom: 12, lineHeight: 1.5 }}>
            Receba notificações nos horários certos para não esquecer nenhum medicamento.
          </p>
          <button className="btn btn-gold btn-full" onClick={enableNotifications}>Ativar notificações</button>
        </div>
      )}

      {notifEnabled && (
        <div className="card card-pale" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.25rem' }}>🔔</span>
          <p style={{ fontSize: '0.875rem', color: 'var(--forest)', fontWeight: 600 }}>Notificações ativas</p>
        </div>
      )}

      {(data.medications || []).length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💊</div>
          <h3 style={{ marginBottom: 8 }}>Nenhum medicamento cadastrado</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', marginBottom: 16 }}>Adicione seus remédios para receber lembretes</p>
        </div>
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          {(data.medications || []).map(med => (
            <div key={med.id} className="card" style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: 2 }}>{med.name}</h3>
                  {med.dosage && <span className="tag tag-forest" style={{ marginBottom: 6 }}>{med.dosage}</span>}
                  {med.notes && <p style={{ fontSize: '0.8125rem', color: 'var(--ink-soft)', marginBottom: 8 }}>{med.notes}</p>}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(med.times || []).map((t, i) => (
                      <div key={i} style={{ background: 'var(--forest-pale)', borderRadius: 6, padding: '4px 10px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--forest)' }}>
                        🕐 {t}
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => removeMed(med.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-soft)', fontSize: '1.125rem', padding: 4 }}>×</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-forest btn-full" onClick={() => setShowAdd(true)} style={{ marginBottom: '1.5rem' }}>
        + Adicionar medicamento
      </button>

      <div>
        <h2 style={{ marginBottom: '0.75rem' }}>Medicamentos comuns para tabagismo</h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--ink-soft)', marginBottom: '1rem', lineHeight: 1.5 }}>
          ⚠️ Todos exigem avaliação médica. Este app não substitui orientação profissional.
        </p>
        {COMMON_MEDS.map(med => (
          <div key={med.name} className="card" style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div>
                <h3 style={{ marginBottom: 4 }}>{med.name}</h3>
                <span className="tag tag-sky" style={{ marginBottom: 6 }}>{med.dose}</span>
                <p style={{ fontSize: '0.8125rem', color: 'var(--ink-soft)', lineHeight: 1.4 }}>{med.notes}</p>
              </div>
              <button
                onClick={() => setForm(f => ({ ...f, name: med.name, dosage: med.dose, notes: med.notes }))}
                className="btn btn-ghost" style={{ fontSize: '0.75rem', padding: '6px 12px', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                Usar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="overlay" onClick={() => setShowAdd(false)}>
          <div className="overlay-sheet" onClick={e => e.stopPropagation()}>
            <div className="overlay-handle" />
            <h2 style={{ marginBottom: '1rem' }}>Adicionar medicamento</h2>

            <div className="field">
              <label>Nome do medicamento *</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Ex: Bupropiona" autoFocus />
            </div>
            <div className="field">
              <label>Dosagem</label>
              <input value={form.dosage} onChange={e => setForm(f => ({ ...f, dosage: e.target.value }))} placeholder="Ex: 150mg, 1 comprimido..." />
            </div>

            <div className="field">
              <label>Horários de tomar</label>
              {form.times.map((time, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input type="time" value={time} onChange={e => updateTime(i, e.target.value)} style={{ flex: 1 }} />
                  {form.times.length > 1 && (
                    <button onClick={() => removeTime(i)} style={{ background: 'var(--ember-pale)', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', color: 'var(--ember)', fontWeight: 700 }}>×</button>
                  )}
                </div>
              ))}
              <button onClick={addTime} className="btn btn-ghost" style={{ fontSize: '0.8125rem', padding: '8px 14px' }}>+ Adicionar horário</button>
            </div>

            <div className="field">
              <label>Observações</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Instruções, lembrete do médico..." rows={2} style={{ resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline btn-full" onClick={() => setShowAdd(false)}>Cancelar</button>
              <button className="btn btn-forest btn-full" onClick={addMed} disabled={!form.name}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
