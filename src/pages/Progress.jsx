import { useMemo } from 'react'
import { format, subDays } from 'date-fns'
import { calcStats, brl, num } from '../lib/stats'

const BADGES = [
  {id:'h1',icon:'⏱️',label:'1 hora',ms:3_600_000},
  {id:'h8',icon:'🌅',label:'8 horas',ms:28_800_000},
  {id:'d1',icon:'☀️',label:'1 dia',ms:86_400_000},
  {id:'d3',icon:'🌱',label:'3 dias',ms:259_200_000},
  {id:'d7',icon:'🏅',label:'1 semana',ms:604_800_000},
  {id:'d14',icon:'💪',label:'2 semanas',ms:1_209_600_000},
  {id:'d30',icon:'🏆',label:'1 mês',ms:2_592_000_000},
  {id:'d100',icon:'👑',label:'100 dias',ms:8_640_000_000},
]

const TIMELINE = [
  {t:'20 min',ms:1_200_000,body:'Pressão arterial e frequência cardíaca voltam ao normal'},
  {t:'8 horas',ms:28_800_000,body:'Monóxido de carbono cai à metade — oxigenação normaliza'},
  {t:'24 horas',ms:86_400_000,body:'Risco de infarto começa a diminuir'},
  {t:'48 horas',ms:172_800_000,body:'Olfato e paladar se regeneram — comida fica mais saborosa'},
  {t:'72 horas',ms:259_200_000,body:'Bronquíolos relaxam; respirar fica visivelmente mais fácil'},
  {t:'2 semanas',ms:1_209_600_000,body:'Circulação melhora; pulmões eliminam resíduos'},
  {t:'1–9 meses',ms:2_592_000_000,body:'Tosse e falta de ar diminuem; energia aumenta'},
  {t:'1 ano',ms:31_536_000_000,body:'Risco cardíaco é metade do de um fumante ativo'},
  {t:'5 anos',ms:157_680_000_000,body:'Risco de AVC igual ao de não fumante'},
  {t:'10 anos',ms:315_360_000_000,body:'Risco de câncer de pulmão cai à metade'},
  {t:'15 anos',ms:473_040_000_000,body:'Risco cardíaco igual ao de quem nunca fumou'},
]

export default function Progress({ data }) {
  const elapsed = Date.now() - (data.profile?.lastSmokeFreeStart || Date.now())
  const stats = calcStats({ data, elapsed })

  const last14 = useMemo(() => Array.from({length:14},(_,i) => {
    const d = subDays(new Date(), 13-i)
    const key = format(d,'yyyy-MM-dd')
    return { key, label:format(d,'dd/M'), count:data.smoking?.logByDay?.[key]||0, isToday:i===13 }
  }), [data.smoking?.logByDay])

  const maxCount = Math.max(...last14.map(d => d.count), stats.cpd, 1)

  return (
    <div className="page-padded">
      <h1 style={{marginBottom:'1.25rem'}}>Progresso</h1>

      {/* Redução real */}
      <div className="card card-green" style={{marginBottom:'1rem'}}>
        <p style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.6)',fontWeight:700,textTransform:'uppercase',marginBottom:12}}>Sua evolução desde o início</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <div>
            <p style={{fontSize:'0.6875rem',color:'rgba(255,255,255,0.55)',fontWeight:600,marginBottom:2}}>PADRÃO INICIAL</p>
            <p style={{fontSize:'1.5rem',fontWeight:800,color:'white',lineHeight:1}}>{stats.cpd} cig/dia</p>
          </div>
          <div>
            <p style={{fontSize:'0.6875rem',color:'rgba(255,255,255,0.55)',fontWeight:600,marginBottom:2}}>MÉDIA ATUAL</p>
            <p style={{fontSize:'1.5rem',fontWeight:800,color:'#2ECC71',lineHeight:1}}>{stats.dailyAvgSmoked} cig/dia</p>
          </div>
          <div>
            <p style={{fontSize:'0.6875rem',color:'rgba(255,255,255,0.55)',fontWeight:600,marginBottom:2}}>REDUÇÃO</p>
            <p style={{fontSize:'1.5rem',fontWeight:800,color:'#2ECC71',lineHeight:1}}>{stats.reductionPct}%</p>
          </div>
          <div>
            <p style={{fontSize:'0.6875rem',color:'rgba(255,255,255,0.55)',fontWeight:600,marginBottom:2}}>NÃO FUMADOS</p>
            <p style={{fontSize:'1.5rem',fontWeight:800,color:'white',lineHeight:1}}>{num(stats.cigsNotSmoked)}</p>
          </div>
        </div>
        <div style={{marginTop:14}}>
          <div style={{height:6,background:'rgba(255,255,255,0.15)',borderRadius:3,overflow:'hidden'}}>
            <div style={{height:'100%',background:'#2ECC71',borderRadius:3,width:`${Math.min(stats.reductionPct,100)}%`,transition:'width .6s'}}/>
          </div>
        </div>
      </div>

      {/* Economia real baseada na redução */}
      <div className="card card-gold" style={{marginBottom:'1rem'}}>
        <p style={{fontSize:'0.75rem',fontWeight:700,color:'#C47E00',textTransform:'uppercase',letterSpacing:0.5,marginBottom:10}}>💰 Economia real com a redução</p>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {[
            ['Economizado até agora', brl(stats.moneySaved), '#1A6B42'],
            ['Economia semanal atual', brl(stats.weeklySaving), '#1A6B42'],
            ['Economia mensal atual', brl(stats.monthlySaving), '#1A6B42'],
            ['Economia anual projetada', brl(stats.yearlySavingCurrent), '#C47E00'],
          ].map(([lbl,val,color]) => (
            <div key={lbl} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid rgba(196,126,0,0.1)'}}>
              <span style={{fontSize:'0.8125rem',color:'#6B8A74'}}>{lbl}</span>
              <span style={{fontSize:'0.9375rem',fontWeight:800,color}}>{val}</span>
            </div>
          ))}
        </div>
        <p style={{fontSize:'0.6875rem',color:'#9BB5A4',marginTop:8}}>
          Baseado na redução de {stats.dailyReduction > 0 ? stats.dailyReduction.toFixed(1) : '0'} cig/dia em relação ao padrão inicial
        </p>
      </div>

      {/* Impacto financeiro projetado */}
      <div className="card card-ember" style={{marginBottom:'1rem'}}>
        <p style={{fontSize:'0.75rem',fontWeight:700,color:'#E05C2A',textTransform:'uppercase',letterSpacing:0.5,marginBottom:10}}>💸 O que o cigarro custaria</p>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {[
            ['Custo mensal (padrão)', brl(stats.monthlyCost)],
            ['Custo anual (padrão)', brl(stats.yearlyCost)],
            ['Em 5 anos', brl(stats.yearlyCost * 5)],
            stats.yearsSmking > 0 && ['Em '+stats.yearsSmking+' anos fumando', brl(stats.lifetimeCost || 0)],
          ].filter(Boolean).map(([lbl,val]) => (
            <div key={lbl} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid rgba(224,92,42,0.1)'}}>
              <span style={{fontSize:'0.8125rem',color:'#6B8A74'}}>{lbl}</span>
              <span style={{fontSize:'0.9375rem',fontWeight:800,color:'#E05C2A'}}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Impacto saúde — dias de vida */}
      <div className="card card-red" style={{marginBottom:'1rem'}}>
        <p style={{fontSize:'0.75rem',fontWeight:700,color:'#DC2626',textTransform:'uppercase',letterSpacing:0.5,marginBottom:10}}>⚠️ Impacto à saúde</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {[
            [`${Math.round(stats.dailyAvgSmoked * 5)} min/dia`, 'de vida perdidos (média atual)'],
            [`${Math.round(stats.cpd * 5)} min/dia`, 'de vida (padrão inicial)'],
            stats.lifetimeMinutes && [`≈ ${num(Math.round(stats.lifetimeMinutes/60/24))} dias`, `perdidos em ${stats.yearsSmking} anos`],
            stats.minutesRecovered > 0 && [`${stats.hoursRecovered}h`, 'de vida recuperadas'],
          ].filter(Boolean).map(([val, lbl]) => (
            <div key={lbl} style={{background:'white',borderRadius:8,padding:'10px',textAlign:'center',border:'1px solid rgba(220,38,38,0.1)'}}>
              <div style={{fontSize:'1rem',fontWeight:800,color:'#DC2626',lineHeight:1}}>{val}</div>
              <div style={{fontSize:'0.625rem',color:'#6B8A74',marginTop:3,fontWeight:600}}>{lbl}</div>
            </div>
          ))}
        </div>
        <p style={{fontSize:'0.6875rem',color:'#9BB5A4',marginTop:8}}>* 5 min de vida por cigarro (fonte: CDC)</p>
      </div>

      {/* Gráfico 14 dias */}
      <div style={{marginBottom:'1.25rem'}}>
        <h2 style={{marginBottom:'0.75rem'}}>Cigarros por dia — 14 dias</h2>
        <div className="card">
          <div style={{display:'flex',gap:3,alignItems:'flex-end',height:110,paddingBottom:4}}>
            {last14.map(day => (
              <div key={day.key} className="chart-bar-wrap">
                <div style={{fontSize:'0.5rem',color:day.count>stats.cpd?'#DC2626':day.count>0?'#E05C2A':'#DCF0E7',fontWeight:700,minHeight:10}}>{day.count>0?day.count:''}</div>
                <div style={{width:'100%',display:'flex',alignItems:'flex-end',height:72,position:'relative'}}>
                  <div style={{position:'absolute',width:'100%',height:2,background:'rgba(26,107,66,0.2)',bottom:`${Math.round((stats.cpd/maxCount)*72)}px`}}/>
                  <div className={`chart-bar-inner${day.isToday?' today':day.count>stats.cpd?' smoked':''}`}
                    style={{height:day.count>0?`${Math.round((day.count/maxCount)*100)}%`:'3px',width:'100%'}}/>
                </div>
                <div style={{fontSize:'0.5rem',color:'#9BB5A4',transform:'rotate(-45deg)',whiteSpace:'nowrap',marginTop:2}}>{day.label}</div>
              </div>
            ))}
          </div>
          <p style={{fontSize:'0.6875rem',color:'#9BB5A4',marginTop:6}}>— linha verde = seu padrão ({stats.cpd} cig/dia)</p>
        </div>
      </div>

      {/* Conquistas */}
      <div style={{marginBottom:'1.25rem'}}>
        <h2 style={{marginBottom:'0.75rem'}}>Conquistas</h2>
        <div className="badge-grid">
          {BADGES.map(b => {
            const earned = elapsed >= b.ms
            return (
              <div key={b.id} className={`badge-item ${earned?'earned':'locked'}`}>
                <div className="badge-icon">{b.icon}</div>
                <div className="badge-name">{b.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Timeline */}
      <div style={{marginBottom:'1.5rem'}}>
        <h2 style={{marginBottom:'0.75rem'}}>O que muda no seu corpo</h2>
        <ul className="timeline">
          {TIMELINE.map((item,i) => {
            const done = elapsed >= item.ms
            return (
              <li key={item.t} className="tl-item">
                <div className="tl-dot-wrap">
                  <div className={`tl-dot ${done?'done':''}`}/>
                  {i < TIMELINE.length-1 && <div className="tl-line" style={{flex:1}}/>}
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
