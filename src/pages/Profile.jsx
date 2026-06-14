// src/pages/Profile.jsx
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Profile({ data, update }) {
  const { user, logout } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...data.profile })
  const [toast, setToast] = useState('')
  const [showLogout, setShowLogout] = useState(false)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const saveProfile = async () => {
    await update({
      profile: {
        ...data.profile,
        ...form,
        packPrice: parseFloat(form.packPrice) || 12,
        cigarettesPerPack: parseInt(form.cigarettesPerPack) || 20,
        cigarettesPerDay: parseInt(form.cigarettesPerDay) || 20,
      },
    })
    setEditing(false)
    showToast('Perfil atualizado!')
  }

  const cpd = parseInt(form.cigarettesPerDay) || 20
  const packPrice = parseFloat(form.packPrice) || 12
  const cpp = parseInt(form.cigarettesPerPack) || 20
  const pricePerCig = packPrice / cpp
  const monthly = cpd * 30
  const monthlyCost = (monthly / cpp) * packPrice
  const yearlyCost = monthlyCost * 12

  const yearsSmking = form.smokingSince ? new Date().getFullYear() - parseInt(form.smokingSince) : 0
  const lifetimeCigs = yearsSmking > 0 ? cpd * 365 * yearsSmking : null
  const lifetimeCost = lifetimeCigs ? lifetimeCigs * pricePerCig : null
  const minutesLost = lifetimeCigs ? lifetimeCigs * 5 : null

  return (
    <div className="page-padded">
      {toast && <div className="toast">{toast}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1.5rem' }}>
        <img src={user?.photoURL} alt="" style={{ width: 52, height: 52, borderRadius: '50%', border: '3px solid var(--forest-muted)' }} onError={e => e.target.style.display = 'none'} />
        <div>
          <h1 style={{ fontSize: '1.25rem' }}>{user?.displayName}</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ink-soft)' }}>{user?.email}</p>
        </div>
      </div>

      <div className="card card-forest" style={{ marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>Resumo do seu perfil</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Por dia</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{cpd} cig.</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Por mês</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{monthly}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Custo/mês</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>R${monthlyCost.toFixed(0)}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Custo/ano</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>R${yearlyCost.toFixed(0)}</p>
          </div>
        </div>
      </div>

      {lifetimeCigs && (
        <div className="card card-ember" style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ember)', marginBottom: 10 }}>📊 Estimativa de vida como fumante ({yearsSmking} anos)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['Cigarros fumados na vida', `≈ ${lifetimeCigs.toLocaleString('pt-BR')}`],
              ['Gasto estimado total', `R$ ${lifetimeCost.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`],
              ['Minutos de vida estimados perdidos*', `≈ ${Math.round(minutesLost / 60).toLocaleString('pt-BR')} horas`],
            ].map(([lbl, val]) => (
              <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--ink-mid)' }}>{lbl}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--ember)' }}>{val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.6875rem', color: 'var(--ink-soft)', marginTop: 8 }}>* Baseado em estimativa de 5 min de vida perdidos por cigarro (CDC)</p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h2>Perfil de fumante</h2>
        {!editing && <button className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: '0.8125rem' }} onClick={() => { setForm({ ...data.profile }); setEditing(true) }}>Editar</button>}
      </div>

      {!editing ? (
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          {[
            ['Marca', form.cigaretteBrand || '—'],
            ['Preço do maço', `R$ ${parseFloat(form.packPrice || 12).toFixed(2)}`],
            ['Cigarros por maço', form.cigarettesPerPack || '20'],
            ['Cigarros por dia', form.cigarettesPerDay || '20'],
            ['Fumante desde', form.smokingSince || '—'],
          ].map(([lbl, val]) => (
            <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--ink-soft)' }}>{lbl}</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' }}>{val}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          <div className="field">
            <label>Marca do cigarro</label>
            <input value={form.cigaretteBrand || ''} onChange={e => setForm(f => ({ ...f, cigaretteBrand: e.target.value }))} placeholder="Marlboro, L&M, Hollywood..." />
          </div>
          <div className="field-row">
            <div className="field" style={{ margin: 0 }}>
              <label>Preço do maço (R$)</label>
              <input type="number" value={form.packPrice || ''} onChange={e => setForm(f => ({ ...f, packPrice: e.target.value }))} step="0.5" min="1" />
            </div>
            <div className="field" style={{ margin: 0 }}>
              <label>Cig. por maço</label>
              <input type="number" value={form.cigarettesPerPack || ''} onChange={e => setForm(f => ({ ...f, cigarettesPerPack: e.target.value }))} min="1" />
            </div>
          </div>
          <div className="field">
            <label>Cigarros por dia</label>
            <input type="number" value={form.cigarettesPerDay || ''} onChange={e => setForm(f => ({ ...f, cigarettesPerDay: e.target.value }))} min="1" />
          </div>
          <div className="field">
            <label>Fumante desde (ano)</label>
            <input type="number" value={form.smokingSince || ''} onChange={e => setForm(f => ({ ...f, smokingSince: e.target.value }))} min="1950" max={new Date().getFullYear()} placeholder="Ex: 2005" />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline btn-full" onClick={() => setEditing(false)}>Cancelar</button>
            <button className="btn btn-forest btn-full" onClick={saveProfile}>Salvar</button>
          </div>
        </div>
      )}

      {data.fagerScore != null && data.richScore != null && (
        <div className="card card-pale" style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--forest)', marginBottom: 10 }}>🩺 Avaliação clínica</p>
          <div style={{ display: 'flex', gap: 16 }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>Fagerström</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--forest)' }}>{data.fagerScore}/10</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>Richmond</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--sky)' }}>{data.richScore}/10</p>
            </div>
          </div>
        </div>
      )}

      <button
        className="btn btn-full"
        style={{ background: 'transparent', border: '1.5px solid var(--border-strong)', color: 'var(--ink-soft)', marginBottom: '1rem' }}
        onClick={() => setShowLogout(true)}
      >
        Sair da conta
      </button>

      {showLogout && (
        <div className="overlay" onClick={() => setShowLogout(false)}>
          <div className="overlay-sheet" onClick={e => e.stopPropagation()}>
            <div className="overlay-handle" />
            <h2 style={{ marginBottom: '0.5rem' }}>Sair da conta</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>Seu progresso está salvo na nuvem. Você pode entrar novamente a qualquer momento.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline btn-full" onClick={() => setShowLogout(false)}>Cancelar</button>
              <button className="btn btn-ember btn-full" onClick={logout}>Sair</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
