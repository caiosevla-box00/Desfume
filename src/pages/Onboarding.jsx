import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Logo from '../components/Logo'
import { brl } from '../lib/stats'

const FAGER_QS = [
  { q: 'Em quanto tempo após acordar você fuma o primeiro cigarro?', opts: [['Dentro de 5 minutos',3],['6 a 30 minutos',2],['31 a 60 minutos',1],['Após 60 minutos',0]] },
  { q: 'Você acha difícil não fumar em locais proibidos?', opts: [['Sim',1],['Não',0]] },
  { q: 'Qual cigarro do dia é o mais difícil de abandonar?', opts: [['O primeiro da manhã',1],['Qualquer outro',0]] },
  { q: 'Quantos cigarros você fuma por dia?', opts: [['31 ou mais',3],['21 a 30',2],['11 a 20',1],['10 ou menos',0]] },
  { q: 'Você fuma mais nas primeiras horas após acordar do que no restante do dia?', opts: [['Sim',1],['Não',0]] },
  { q: 'Você fuma mesmo estando doente e acamado?', opts: [['Sim',1],['Não',0]] },
]

function getFagerLevel(score) {
  if(score<=2) return { label:'Muito baixa', color:'#1A6B42', bg:'#DCF0E7', text:'Sua dependência física é baixa. O maior desafio é psicológico e comportamental. Foco em gatilhos e TCC.' }
  if(score<=4) return { label:'Baixa', color:'#2ECC71', bg:'#E8F5EE', text:'Dependência física baixa. Foco em identificar gatilhos e construir novos hábitos.' }
  if(score===5) return { label:'Moderada', color:'#C47E00', bg:'#FFFBEB', text:'Pode se beneficiar de reposição de nicotina (adesivos/gomas). Consulte seu médico ou UBS — gratuito pelo SUS.' }
  if(score<=7) return { label:'Alta', color:'#E05C2A', bg:'#FFF0EB', text:'Terapia farmacológica recomendada: bupropiona ou vareniclina. Busque seu médico. Tratamento gratuito pelo SUS.' }
  return { label:'Muito alta', color:'#DC2626', bg:'#FEF2F2', text:'Tratamento combinado: medicação + suporte psicológico. Você merece toda a ajuda disponível. SUS oferece tratamento gratuito.' }
}

const btn = {
  base: { width:'100%', padding:'14px 18px', border:'1.5px solid #DCF0E7', borderRadius:10, background:'white', cursor:'pointer', fontSize:'0.9375rem', fontFamily:'inherit', color:'#0A3D2B', textAlign:'left', fontWeight:600, transition:'all .15s', marginBottom:10, display:'block' },
}

export default function Onboarding({ data, update }) {
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [fagerAnswers, setFagerAnswers] = useState({})
  const [fagerScore, setFagerScore] = useState(null)
  const [fagerQ, setFagerQ] = useState(0)
  const [profile, setProfile] = useState({ cigaretteBrand:'', packPrice:'12', cigarettesPerPack:'20', cigarettesPerDay:'20', smokingSince:'' })

  const handleFagerAnswer = (val) => {
    const updated = {...fagerAnswers, [fagerQ]: val}
    setFagerAnswers(updated)
    if(fagerQ < FAGER_QS.length-1) setFagerQ(fagerQ+1)
    else { const score = Object.values(updated).reduce((a,b)=>a+b,0); setFagerScore(score) }
  }

  const handleFinish = async () => {
    const now = Date.now()
    await update({
      onboardingDone: true,
      fagerScore,
      profile: {
        ...data.profile,
        ...profile,
        packPrice: parseFloat(profile.packPrice)||12,
        cigarettesPerPack: parseInt(profile.cigarettesPerPack)||20,
        cigarettesPerDay: parseInt(profile.cigarettesPerDay)||20,
        startedAt: now,
        lastSmokeFreeStart: now,
        quitDate: null,
      }
    })
  }

  const cpd = parseInt(profile.cigarettesPerDay)||20
  const pp = parseFloat(profile.packPrice)||12
  const cpp = parseInt(profile.cigarettesPerPack)||20
  const monthlyCigs = cpd * 30
  const monthlyCost = (monthlyCigs / cpp) * pp

  // Step 0 — Welcome
  if(step===0) return (
    <div style={{ minHeight:'100dvh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'linear-gradient(170deg, #0A3D2B 0%, #1A6B42 55%, #F4FAF7 100%)', padding:'2rem 1.5rem' }}>
      <div style={{textAlign:'center', marginBottom:'2rem'}}>
        <Logo size={88} />
        <h1 style={{fontFamily:"'DM Sans',sans-serif", color:'white', fontSize:'2.75rem', fontWeight:800, marginTop:'1rem', letterSpacing:'-1px'}}>Desfume</h1>
        <p style={{color:'rgba(255,255,255,0.7)', fontSize:'1rem', marginTop:'0.5rem'}}>Ciência e força para parar de fumar</p>
      </div>
      <div style={{background:'white', borderRadius:20, padding:'2rem 1.5rem', width:'100%', maxWidth:360, boxShadow:'0 24px 64px rgba(0,0,0,0.2)'}}>
        <p style={{fontSize:'0.9375rem', color:'#2D4A38', marginBottom:'1.25rem', lineHeight:1.6, textAlign:'center'}}>
          Olá, <strong>{user?.displayName?.split(' ')[0]}</strong>! Vamos começar com uma avaliação clínica — leva menos de 2 minutos.
        </p>
        <div style={{background:'#F4FAF7', borderRadius:12, padding:'1rem', marginBottom:'1.5rem'}}>
          {['1. Teste de Fagerström — dependência à nicotina','2. Seu perfil de fumante e cálculo de custos','3. Início da sua jornada'].map(t=>(
            <p key={t} style={{fontSize:'0.8125rem', color:'#0A3D2B', padding:'4px 0', fontWeight:500}}>{t}</p>
          ))}
        </div>
        <button className="btn btn-green btn-full btn-lg" onClick={()=>setStep(1)}>Começar avaliação →</button>
      </div>
    </div>
  )

  // Step 1 — Fagerström
  if(step===1) return (
    <div style={{minHeight:'100dvh', display:'flex', flexDirection:'column', background:'#F4FAF7', padding:'2rem 1.25rem'}}>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:'1.5rem'}}>
        <Logo size={28}/>
        <span style={{fontWeight:800, fontSize:'1rem', color:'#0A3D2B'}}>Desfume</span>
      </div>
      <div style={{marginBottom:'1.5rem'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
          <span style={{fontSize:'0.75rem', fontWeight:700, color:'#6B8A74', textTransform:'uppercase', letterSpacing:1}}>FAGERSTRÖM — DEPENDÊNCIA À NICOTINA</span>
          <span style={{fontSize:'0.75rem', color:'#9BB5A4', fontWeight:600}}>{fagerScore===null ? `${fagerQ+1}/6` : '✓'}</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{width:`${fagerScore!==null ? 100 : (fagerQ/FAGER_QS.length)*100}%`}}/>
        </div>
      </div>

      {fagerScore===null ? (
        <div style={{flex:1}}>
          <h2 style={{fontSize:'1.125rem', marginBottom:'1.75rem', lineHeight:1.5, color:'#0A3D2B'}}>{FAGER_QS[fagerQ].q}</h2>
          <div>
            {FAGER_QS[fagerQ].opts.map(([label,val])=>(
              <button key={label} onClick={()=>handleFagerAnswer(val)}
                style={btn.base}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#1A6B42';e.currentTarget.style.background='#DCF0E7'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='#DCF0E7';e.currentTarget.style.background='white'}}
              >{label}</button>
            ))}
          </div>
        </div>
      ) : (() => {
        const level = getFagerLevel(fagerScore)
        return (
          <div style={{flex:1, display:'flex', flexDirection:'column'}}>
            <div style={{background:level.bg, borderRadius:16, padding:'1.5rem', marginBottom:'1.25rem', textAlign:'center'}}>
              <div style={{fontSize:'0.75rem', fontWeight:700, color:level.color, textTransform:'uppercase', letterSpacing:1, marginBottom:6}}>DEPENDÊNCIA {level.label.toUpperCase()}</div>
              <div style={{fontSize:'4rem', fontWeight:800, color:level.color, lineHeight:1}}>{fagerScore}</div>
              <div style={{fontSize:'0.875rem', color:'#9BB5A4', marginTop:4}}>pontos de 10</div>
            </div>
            <div className="card" style={{marginBottom:'1rem'}}>
              <p style={{fontSize:'0.875rem', lineHeight:1.6, color:'#2D4A38'}}>{level.text}</p>
            </div>
            <div className="quote-card" style={{marginBottom:'auto'}}>
              <p className="quote-text">"A disciplina é a maior forma de amor-próprio. Você não se castiga quando escolhe parar — você se honra."</p>
              <p className="quote-author">— Epicteto</p>
            </div>
            <button className="btn btn-green btn-full btn-lg" style={{marginTop:'1.5rem'}} onClick={()=>setStep(2)}>Continuar →</button>
          </div>
        )
      })()}
    </div>
  )

  // Step 2 — Profile
  if(step===2) return (
    <div style={{minHeight:'100dvh', background:'#F4FAF7', padding:'2rem 1.25rem', overflowY:'auto'}}>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:'1.5rem'}}>
        <Logo size={28}/>
        <span style={{fontWeight:800, fontSize:'1rem', color:'#0A3D2B'}}>Desfume</span>
      </div>
      <div style={{marginBottom:'1.5rem'}}>
        <span className="tag tag-green" style={{marginBottom:10}}>Passo 2 de 2</span>
        <h2 style={{color:'#0A3D2B'}}>Seu perfil de fumante</h2>
        <p style={{fontSize:'0.875rem', marginTop:4}}>Esses dados calculam quanto você gasta e quantos cigarros evita</p>
      </div>

      <div className="field">
        <label>Marca do cigarro (opcional)</label>
        <input value={profile.cigaretteBrand} onChange={e=>setProfile(p=>({...p,cigaretteBrand:e.target.value}))} placeholder="Ex: Marlboro, L&M, Hollywood..."/>
      </div>
      <div className="field-row">
        <div className="field" style={{margin:0}}>
          <label>Preço do maço (R$)</label>
          <input type="number" value={profile.packPrice} onChange={e=>setProfile(p=>({...p,packPrice:e.target.value}))} placeholder="12" min="1" step="0.5"/>
        </div>
        <div className="field" style={{margin:0}}>
          <label>Cigarros por maço</label>
          <input type="number" value={profile.cigarettesPerPack} onChange={e=>setProfile(p=>({...p,cigarettesPerPack:e.target.value}))} placeholder="20" min="1"/>
        </div>
      </div>
      <div className="field">
        <label>Quantos cigarros você fuma por dia?</label>
        <input type="number" value={profile.cigarettesPerDay} onChange={e=>setProfile(p=>({...p,cigarettesPerDay:e.target.value}))} placeholder="20" min="1"/>
      </div>
      <div className="field">
        <label>Fumante desde (ano)</label>
        <input type="number" value={profile.smokingSince} onChange={e=>setProfile(p=>({...p,smokingSince:e.target.value}))} placeholder="Ex: 2005" min="1950" max={new Date().getFullYear()}/>
      </div>

      {profile.cigarettesPerDay && profile.packPrice && (
        <div className="card card-ember" style={{marginBottom:'1.5rem'}}>
          <p style={{fontSize:'0.75rem', fontWeight:700, color:'#E05C2A', marginBottom:10}}>📊 Seus números mensais</p>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
            <div style={{background:'white', borderRadius:8, padding:'10px', textAlign:'center'}}>
              <div style={{fontSize:'1.375rem', fontWeight:800, color:'#0A3D2B'}}>{monthlyCigs}</div>
              <div style={{fontSize:'0.6875rem', color:'#6B8A74', fontWeight:600}}>cigarros/mês</div>
            </div>
            <div style={{background:'white', borderRadius:8, padding:'10px', textAlign:'center'}}>
              <div style={{fontSize:'1.375rem', fontWeight:800, color:'#E05C2A'}}>{brl(monthlyCost)}</div>
              <div style={{fontSize:'0.6875rem', color:'#6B8A74', fontWeight:600}}>gastos/mês</div>
            </div>
          </div>
        </div>
      )}

      <button className="btn btn-green btn-full btn-lg" onClick={handleFinish}>
        🕊️ Começar minha jornada
      </button>
    </div>
  )

  return null
}
