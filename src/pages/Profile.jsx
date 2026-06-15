import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { calcStats, brl, num } from '../lib/stats'
import Logo from '../components/Logo'

export default function Profile({ data, update }) {
  const { user, logout } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({...data.profile})
  const [toast, setToast] = useState('')
  const [showLogout, setShowLogout] = useState(false)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const saveProfile = async () => {
    await update({
      profile: {
        ...data.profile, ...form,
        packPrice: parseFloat(form.packPrice)||12,
        cigarettesPerPack: parseInt(form.cigarettesPerPack)||20,
        cigarettesPerDay: parseInt(form.cigarettesPerDay)||20,
      }
    })
    setEditing(false)
    showToast('Perfil atualizado!')
  }

  const elapsed = Date.now() - (data.profile?.lastSmokeFreeStart || Date.now())
  const stats = calcStats({ data, elapsed })

  const yearsSmking = form.smokingSince ? new Date().getFullYear() - parseInt(form.smokingSince) : 0
  const lifetimeCigs = yearsSmking > 0 ? stats.cpd * 365 * yearsSmking : null
  const lifetimeCost = lifetimeCigs ? lifetimeCigs * stats.pricePerCig : null
  const lifetimeMinutes = lifetimeCigs ? lifetimeCigs * 5 : null

  return (
    <div className="page-padded">
      {toast && <div className="toast">{toast}</div>}

      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:'1.5rem'}}>
        <img src={user?.photoURL} alt="" style={{width:56,height:56,borderRadius:'50%',border:'3px solid #DCF0E7'}} onError={e=>e.target.style.display='none'}/>
        <div>
          <h1 style={{fontSize:'1.25rem'}}>{user?.displayName}</h1>
          <p style={{fontSize:'0.8125rem',color:'#6B8A74'}}>{user?.email}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="card card-green" style={{marginBottom:'1.25rem'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {[
            ['Por dia',`${stats.cpd} cig.`],
            ['Por mês',`${num(stats.cpd*30)} cig.`],
            ['Custo/mês',brl(stats.monthlyCost)],
            ['Custo/ano',brl(stats.yearlyCost)],
          ].map(([lbl,val])=>(
            <div key={lbl}>
              <p style={{fontSize:'0.6875rem',color:'rgba(255,255,255,0.6)',fontWeight:700,textTransform:'uppercase',marginBottom:2}}>{lbl}</p>
              <p style={{fontSize:'1.375rem',fontWeight:800,color:'white',lineHeight:1}}>{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lifetime estimate */}
      {lifetimeCigs && (
        <div className="card card-ember" style={{marginBottom:'1.25rem'}}>
          <p style={{fontSize:'0.75rem',fontWeight:700,color:'#E05C2A',marginBottom:10}}>📊 Estimativa como fumante ({yearsSmking} anos)</p>
          {[
            ['Cigarros fumados na vida',`≈ ${num(lifetimeCigs)}`],
            ['Dinheiro gasto estimado',brl(lifetimeCost)],
            ['Minutos de vida perdidos',`≈ ${num(lifetimeMinutes)} min`],
            ['Horas de vida perdidas',`≈ ${num(lifetimeMinutes/60)} horas`],
            ['Dias de vida perdidos',`≈ ${num(lifetimeMinutes/60/24)} dias`],
          ].map(([lbl,val])=>(
            <div key={lbl} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid rgba(224,92,42,0.1)'}}>
              <span style={{fontSize:'0.8125rem',color:'#6B8A74'}}>{lbl}</span>
              <span style={{fontSize:'0.875rem',fontWeight:800,color:'#E05C2A'}}>{val}</span>
            </div>
          ))}
          <p style={{fontSize:'0.6875rem',color:'#9BB5A4',marginTop:8}}>* 5 min de vida por cigarro (fonte: CDC)</p>
        </div>
      )}

      {/* Edit profile */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
        <h2>Perfil de fumante</h2>
        {!editing && <button className="btn btn-ghost" style={{padding:'6px 14px',fontSize:'0.8125rem'}} onClick={()=>{setForm({...data.profile});setEditing(true)}}>Editar</button>}
      </div>

      {!editing ? (
        <div className="card" style={{marginBottom:'1.25rem'}}>
          {[
            ['Marca',form.cigaretteBrand||'—'],
            ['Preço do maço',brl(parseFloat(form.packPrice||12))],
            ['Cigarros por maço',form.cigarettesPerPack||'20'],
            ['Cigarros por dia',form.cigarettesPerDay||'20'],
            ['Fumante desde',form.smokingSince||'—'],
          ].map(([lbl,val])=>(
            <div key={lbl} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #DCF0E7'}}>
              <span style={{fontSize:'0.875rem',color:'#6B8A74'}}>{lbl}</span>
              <span style={{fontSize:'0.875rem',fontWeight:700,color:'#0A3D2B'}}>{val}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{marginBottom:'1.25rem'}}>
          <div className="field">
            <label>Marca do cigarro</label>
            <input value={form.cigaretteBrand||''} onChange={e=>setForm(f=>({...f,cigaretteBrand:e.target.value}))} placeholder="Marlboro, L&M..."/>
          </div>
          <div className="field-row">
            <div className="field" style={{margin:0}}>
              <label>Preço do maço (R$)</label>
              <input type="number" value={form.packPrice||''} onChange={e=>setForm(f=>({...f,packPrice:e.target.value}))} step="0.50" min="1"/>
            </div>
            <div className="field" style={{margin:0}}>
              <label>Cig. por maço</label>
              <input type="number" value={form.cigarettesPerPack||''} onChange={e=>setForm(f=>({...f,cigarettesPerPack:e.target.value}))} min="1"/>
            </div>
          </div>
          <div className="field">
            <label>Cigarros por dia</label>
            <input type="number" value={form.cigarettesPerDay||''} onChange={e=>setForm(f=>({...f,cigarettesPerDay:e.target.value}))} min="1"/>
          </div>
          <div className="field">
            <label>Fumante desde (ano)</label>
            <input type="number" value={form.smokingSince||''} onChange={e=>setForm(f=>({...f,smokingSince:e.target.value}))} min="1950" max={new Date().getFullYear()} placeholder="Ex: 2005"/>
          </div>
          <div style={{display:'flex',gap:10}}>
            <button className="btn btn-outline btn-full" onClick={()=>setEditing(false)}>Cancelar</button>
            <button className="btn btn-green btn-full" onClick={saveProfile}>Salvar</button>
          </div>
        </div>
      )}

      {data.fagerScore!=null && data.richScore!=null && (
        <div className="card card-mint" style={{marginBottom:'1.25rem'}}>
          <p style={{fontSize:'0.75rem',fontWeight:700,color:'#0A3D2B',marginBottom:10}}>🩺 Avaliação clínica</p>
          <div style={{display:'flex',gap:16}}>
            <div>
              <p style={{fontSize:'0.75rem',color:'#6B8A74'}}>Fagerström</p>
              <p style={{fontSize:'1.5rem',fontWeight:800,color:'#1A6B42'}}>{data.fagerScore}/10</p>
            </div>
            <div>
              <p style={{fontSize:'0.75rem',color:'#6B8A74'}}>Richmond</p>
              <p style={{fontSize:'1.5rem',fontWeight:800,color:'#1A6B9A'}}>{data.richScore}/10</p>
            </div>
          </div>
        </div>
      )}

      <button className="btn btn-full" style={{background:'transparent',border:'1.5px solid #DCF0E7',color:'#6B8A74',marginBottom:'1rem'}} onClick={()=>setShowLogout(true)}>
        Sair da conta
      </button>

      {showLogout && (
        <div className="overlay" onClick={()=>setShowLogout(false)}>
          <div className="overlay-sheet" onClick={e=>e.stopPropagation()}>
            <div className="overlay-handle"/>
            <h2 style={{marginBottom:'0.5rem'}}>Sair da conta</h2>
            <p style={{fontSize:'0.875rem',color:'#6B8A74',marginBottom:'1.5rem'}}>Seu progresso está salvo na nuvem.</p>
            <div style={{display:'flex',gap:10}}>
              <button className="btn btn-outline btn-full" onClick={()=>setShowLogout(false)}>Cancelar</button>
              <button className="btn btn-ember btn-full" onClick={logout}>Sair</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
