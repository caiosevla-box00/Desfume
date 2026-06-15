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
      <h1 style={{marginBottom:'1.25rem'}}>Seu progresso</h1>

      {/* Main stats */}
      <div className="card card-green" style={{marginBottom:'1rem'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {[
            ['Economizado', brl(stats.moneySaved)],
            ['Não fumados', num(stats.cigsNotSmoked)],
            ['Dias limpos', stats.cleanDays],
            ['Fumados total', num(stats.actualSmoked)],
          ].map(([lbl,val])=>(
            <div key={lbl}>
              <p style={{fontSize:'0.6875rem',color:'rgba(255,255,255,0.6)',fontWeight:700,textTransform:'uppercase',marginBottom:2}}>{lbl}</p>
              <p style={{fontSize:'1.5rem',fontWeight:800,color:'white',lineHeight:1}}>{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reduction summary */}
      <div className="card card-mint" style={{marginBottom:'1rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
          <p style={{fontSize:'0.8125rem',fontWeight:700,color:'#0A3D2B',margin:0}}>📉 Redução total no consumo</p>
          <span style={{fontSize:'1.5rem',fontWeight:800,color:'#1A6B42'}}>{stats.reductionPct}%</span>
        </div>
        <div className="progress-track" style={{marginBottom:8}}>
          <div className="progress-fill" style={{width:`${Math.min(stats.reductionPct,100)}%`}}/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
          {[
            ['Esperado',num(stats.expectedTotal),'cig'],
            ['Fumado',num(stats.actualSmoked),'cig'],
            ['Evitado',num(stats.cigsNotSmoked),'cig'],
          ].map(([lbl,val,unit])=>(
            <div key={lbl} style={{background:'white',borderRadius:8,padding:'8px',textAlign:'center'}}>
              <div style={{fontSize:'1.125rem',fontWeight:800,color:'#0A3D2B'}}>{val}</div>
              <div style={{fontSize:'0.625rem',color:'#6B8A74',fontWeight:600}}>{lbl} ({unit})</div>
            </div>
          ))}
        </div>
      </div>

      {/* Time recovered */}
      <div className="card card-sky" style={{marginBottom:'1rem'}}>
        <p style={{fontSize:'0.75rem',fontWeight:700,color:'#1A6B9A',textTransform:'uppercase',letterSpacing:0.5,marginBottom:10}}>⏱️ Tempo de vida recuperado</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <div style={{background:'white',borderRadius:8,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:'1.375rem',fontWeight:800,color:'#1A6B9A'}}>{stats.hoursRecovered}h</div>
            <div style={{fontSize:'0.625rem',color:'#6B8A74',fontWeight:600}}>horas recuperadas</div>
          </div>
          <div style={{background:'white',borderRadius:8,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:'1.375rem',fontWeight:800,color:'#1A6B9A'}}>{num(stats.minutesRecovered)} min</div>
            <div style={{fontSize:'0.625rem',color:'#6B8A74',fontWeight:600}}>minutos de vida</div>
          </div>
        </div>
      </div>

      {/* Financial impact */}
      <div className="card card-ember" style={{marginBottom:'1rem'}}>
        <p style={{fontSize:'0.75rem',fontWeight:700,color:'#E05C2A',textTransform:'uppercase',letterSpacing:0.5,marginBottom:10}}>💸 Impacto financeiro</p>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {[
            ['Economizado até agora', brl(stats.moneySaved),'#1A6B42'],
            ['Custo mensal (padrão)', brl(stats.monthlyCost),'#E05C2A'],
            ['Custo anual (padrão)', brl(stats.yearlyCost),'#E05C2A'],
            ['Economia mensal atual', brl(stats.monthlySaving),'#1A6B42'],
            ['Economia anual projetada', brl(stats.yearlySaving),'#1A6B42'],
            ['Em 5 anos (se parar hoje)', brl(stats.yearlyCost*5),'#DC2626'],
            ['Em 10 anos (se parar hoje)', brl(stats.yearlyCost*10),'#DC2626'],
          ].map(([lbl,val,color])=>(
            <div key={lbl} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderBottom:'1px solid rgba(224,92,42,0.1)'}}>
              <span style={{fontSize:'0.8125rem',color:'#6B8A74'}}>{lbl}</span>
              <span style={{fontSize:'0.9375rem',fontWeight:800,color}}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Health impact */}
      <div className="card card-red" style={{marginBottom:'1rem'}}>
        <p style={{fontSize:'0.75rem',fontWeight:700,color:'#DC2626',textTransform:'uppercase',letterSpacing:0.5,marginBottom:10}}>⚠️ Impacto à saúde (baseline)</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {[
            [brl(stats.yearlyCost),'gasto/ano com cigarro'],
            [`${num(stats.cpd*365)} cig`,'por ano no padrão'],
            [`${Math.round(stats.cpd*5*365/60/24)} dias`,'de vida/ano perdidos'],
            ['70%','fumantes terão doença grave'],
          ].map(([val,lbl])=>(
            <div key={lbl} style={{background:'white',borderRadius:8,padding:'10px',textAlign:'center',border:'1px solid rgba(220,38,38,0.1)'}}>
              <div style={{fontSize:'1rem',fontWeight:800,color:'#DC2626',lineHeight:1}}>{val}</div>
              <div style={{fontSize:'0.625rem',color:'#6B8A74',marginTop:3,fontWeight:600}}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{marginBottom:'1.25rem'}}>
        <h2 style={{marginBottom:'0.75rem'}}>Cigarros por dia — 14 dias</h2>
        <div className="card">
          <div style={{display:'flex',gap:3,alignItems:'flex-end',height:110,paddingBottom:4}}>
            {last14.map(day=>(
              <div key={day.key} className="chart-bar-wrap">
                <div style={{fontSize:'0.5rem',color:day.count>stats.cpd?'#DC2626':day.count>0?'#E05C2A':'#DCF0E7',fontWeight:700,minHeight:10}}>{day.count>0?day.count:''}</div>
                <div style={{width:'100%',display:'flex',alignItems:'flex-end',height:72,position:'relative'}}>
                  {/* baseline marker */}
                  <div style={{position:'absolute',width:'100%',height:2,background:'#DCF0E7',bottom:`${(stats.cpd/maxCount)*72}px`}}/>
                  <div className={`chart-bar-inner${day.isToday?' today':day.count>stats.cpd?' smoked':''}`}
                    style={{height:day.count>0?`${Math.round((day.count/maxCount)*100)}%`:'3px',width:'100%'}}/>
                </div>
                <div style={{fontSize:'0.5rem',color:'#9BB5A4',transform:'rotate(-45deg)',whiteSpace:'nowrap',marginTop:2}}>{day.label}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginTop:8}}>
            <div style={{width:12,height:2,background:'#DCF0E7'}}/>
            <span style={{fontSize:'0.6875rem',color:'#9BB5A4'}}>linha = seu padrão diário ({stats.cpd} cig)</span>
          </div>
        </div>
      </div>

      {/* Badges */}
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
