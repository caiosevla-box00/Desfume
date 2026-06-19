import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import PanicModal from '../components/PanicModal'
import Logo from '../components/Logo'
import { calcStats, brl, num } from '../lib/stats'
import { useSmokingSchedule } from '../hooks/useSmokingSchedule'
import { useFCM } from '../hooks/useFCM'

const INSIGHTS = [
  { tag:'Saúde', color:'tag-green', title:'Seus pulmões já estão se curando', body:'A cada hora sem fumar, seus cílios pulmonares recuperam movimento. Eles limpam muco e bactérias — sua defesa natural está voltando agora mesmo.' },
  { tag:'Ciência', color:'tag-sky', title:'A fissura dura no máximo 3 minutos', body:'O pico do desejo de fumar tem duração máxima de 3 minutos. Se você aguentar esse período, ele passa. Sempre. Use o botão de pânico.' },
  { tag:'Finanças', color:'tag-gold', title:'Cada cigarro recusado é dinheiro seu', body:'Um fumante médio no Brasil gasta R$ 300–500 por mês. Em 1 ano sem fumar você pode ter mais de R$ 4.000 no bolso.' },
  { tag:'Coração', color:'tag-ember', title:'Seu coração agradece agora mesmo', body:'Em 24 horas sem fumar, o risco de infarto já começa a cair. Em 1 ano, é metade do de um fumante ativo.' },
  { tag:'Mente', color:'tag-green', title:'O cigarro criava a tensão que aliviava', body:'A nicotina causa ansiedade durante a abstinência. A "calma" que você sentia era apenas a ansiedade sendo saciada. Sem o cigarro, você fica mais calmo de verdade.' },
  { tag:'Tempo', color:'tag-sky', title:'Você está recuperando tempo de vida', body:'Cada cigarro consome em média 5 minutos de vida. Você está recuperando esse tempo agora, segundo a segundo.' },
  { tag:'Família', color:'tag-ember', title:'As pessoas ao seu redor também ganham', body:'Fumantes passivos têm 20-30% mais risco de câncer de pulmão. Cada cigarro que você não fuma protege quem você ama.' },
  { tag:'Pele', color:'tag-green', title:'Sua aparência está melhorando', body:'Com mais oxigênio na corrente sanguínea, a pele recebe mais nutrição. O envelhecimento precoce causado pelo tabaco começa a desacelerar.' },
]

function formatElapsed(ms) {
  const s = Math.floor(ms/1000), m = Math.floor(s/60), h = Math.floor(m/60), d = Math.floor(h/24)
  if(d>=1) return { main:`${d}d ${h%24}h`, sub:`${m%60} min` }
  if(h>=1) return { main:`${h}h ${m%60}m`, sub:`${s%60}s` }
  return { main:`${String(m).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`, sub:'min : seg' }
}

function formatCountdown(ms) {
  if(ms <= 0) return 'agora'
  const m = Math.floor(ms / 60000)
  const h = Math.floor(m / 60)
  if(h >= 1) return `${h}h ${m % 60}min`
  return `${m} min`
}

export default function Home({ data, update, logCigarette }) {
  const { user } = useAuth()
  const { sendLocalNotification } = useFCM(user?.uid)
  const [elapsed, setElapsed] = useState(0)
  const [countdown, setCountdown] = useState(0)
  const [showPanic, setShowPanic] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [insightIdx, setInsightIdx] = useState(0)
  const [toast, setToast] = useState('')

  const schedule = useSmokingSchedule({ data, update, sendLocalNotification })
  const lastStart = data.profile?.lastSmokeFreeStart || Date.now()

  useEffect(() => {
    const iv = setInterval(() => {
      setElapsed(Date.now() - lastStart)
      const next = schedule.nextSmokeTime
      if(next) setCountdown(Math.max(0, next - Date.now()))
    }, 1000)
    return () => clearInterval(iv)
  }, [lastStart, schedule.nextSmokeTime])

  useEffect(() => {
    const iv = setInterval(() => setInsightIdx(i => (i+1) % INSIGHTS.length), 20000)
    return () => clearInterval(iv)
  }, [])

  const stats = calcStats({ data, elapsed })
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500) }

  const handleSmoke = async () => {
    await logCigarette()
    setShowConfirm(false)
    showToast('Registrado. Respira fundo — você vai conseguir.')
  }

  const { main, sub } = formatElapsed(elapsed)
  const insight = INSIGHTS[insightIdx]

  return (
    <div className="page-padded">
      {toast && <div className="toast">{toast}</div>}
      <PanicModal open={showPanic} onClose={() => setShowPanic(false)} />

      {showConfirm && (
        <div className="overlay" onClick={() => setShowConfirm(false)}>
          <div className="overlay-sheet" onClick={e => e.stopPropagation()}>
            <div className="overlay-handle" />
            <div style={{textAlign:'center',padding:'0.5rem 0 1rem'}}>
              <div style={{fontSize:'2.5rem',marginBottom:'0.75rem'}}>🚬</div>
              <h2 style={{marginBottom:'0.5rem'}}>Fumou um cigarro?</h2>
              <p style={{fontSize:'0.875rem',marginBottom:'1.25rem',lineHeight:1.6}}>
                Tudo bem. Registrar é honesto e te ajuda a entender seus padrões.
              </p>
              <div className="quote-card" style={{marginBottom:'1.5rem',textAlign:'left'}}>
                <p className="quote-text">"Cai sete vezes, levanta oito."</p>
                <p className="quote-author">— Provérbio japonês</p>
              </div>
              <div style={{display:'flex',gap:10}}>
                <button className="btn btn-outline btn-full" onClick={() => setShowConfirm(false)}>Não fumei</button>
                <button className="btn btn-ember btn-full" onClick={handleSmoke}>Sim, registrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.25rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <Logo size={32} />
          <div>
            <p style={{fontSize:'0.6875rem',color:'#6B8A74',fontWeight:700,textTransform:'uppercase',letterSpacing:0.5}}>Olá, {user?.displayName?.split(' ')[0]}</p>
            <h1 style={{fontSize:'1.125rem',margin:0}}>Sem fumar há</h1>
          </div>
        </div>
        <Link to="/perfil" style={{textDecoration:'none'}}>
          <img src={user?.photoURL} alt="" style={{width:40,height:40,borderRadius:'50%',border:'2.5px solid #DCF0E7'}} onError={e=>e.target.style.display='none'} />
        </Link>
      </div>

      {/* Timer */}
      <div className="card card-green" style={{textAlign:'center',padding:'1.5rem 1.25rem',marginBottom:'1rem'}}>
        <div style={{fontSize:'3rem',fontWeight:800,color:'white',lineHeight:1,letterSpacing:-2}}>{main}</div>
        <div style={{fontSize:'0.875rem',color:'rgba(255,255,255,0.55)',marginTop:4}}>{sub}</div>
        {stats.cleanDays >= 1 && (
          <div style={{marginTop:10,background:'rgba(255,255,255,0.15)',borderRadius:8,padding:'5px 14px',display:'inline-block'}}>
            <span style={{color:'rgba(255,255,255,0.9)',fontSize:'0.8125rem',fontWeight:700}}>🏆 {stats.cleanDays} {stats.cleanDays===1?'dia limpo':'dias limpos'}</span>
          </div>
        )}
      </div>

      {/* Intervalo */}
      {(() => {
        const extraTime = schedule.canSmokeNow ? Math.floor((Date.now() - (schedule.nextSmokeTime || Date.now())) / 60000) : 0
        const encouragements = [
          'Cada minuto a mais é uma vitória real.',
          'Você está mais forte do que pensa.',
          'A fissura já passou — continue assim.',
          'Seu corpo está agradecendo agora.',
          'Prove para si mesmo que consegue mais.',
        ]
        const msg = encouragements[Math.floor(extraTime / 3) % encouragements.length]
        return (
          <div className={`card ${schedule.canSmokeNow ? 'card-mint' : 'card-sky'}`} style={{marginBottom:'1rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{flex:1}}>
                <p style={{fontSize:'0.75rem',fontWeight:700,color:schedule.canSmokeNow?'#1A6B42':'#1A6B9A',textTransform:'uppercase',letterSpacing:0.5,marginBottom:3}}>
                  {schedule.canSmokeNow ? '💪 Você superou o intervalo!' : '⏳ Próximo intervalo em'}
                </p>
                <p style={{fontSize:'1.5rem',fontWeight:800,color:schedule.canSmokeNow?'#0A3D2B':'#1A6B9A',lineHeight:1.2}}>
                  {schedule.canSmokeNow
                    ? `+${extraTime} min além da meta`
                    : formatCountdown(countdown)}
                </p>
                {schedule.canSmokeNow ? (
                  <p style={{fontSize:'0.8125rem',color:'#1A6B42',marginTop:5,fontStyle:'italic'}}>{msg}</p>
                ) : (
                  <p style={{fontSize:'0.6875rem',color:'#6B8A74',marginTop:3}}>
                    Intervalo: {schedule.interval >= 60 ? `${Math.floor(schedule.interval/60)}h${schedule.interval%60>0?` ${schedule.interval%60}min`:''}` : `${schedule.interval} min`}
                  </p>
                )}
              </div>
              <Link to="/configuracoes" style={{textDecoration:'none',marginLeft:10}}>
                <button className="btn btn-ghost" style={{fontSize:'0.75rem',padding:'7px 12px'}}>⚙️</button>
              </Link>
            </div>
          </div>
        )
      })()}

      {/* Meta diária */}
      <div className={`card ${stats.todayOverGoal > 0 ? 'card-red' : 'card-mint'}`} style={{marginBottom:'1rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <p style={{fontSize:'0.8125rem',fontWeight:700,color:stats.todayOverGoal>0?'#DC2626':'#0A3D2B',margin:0}}>
            {stats.todayOverGoal > 0 ? `⚠️ ${stats.todayOverGoal} além da meta` : '🎯 Meta do dia'}
          </p>
          <span style={{fontSize:'1rem',fontWeight:800,color:stats.todayOverGoal>0?'#DC2626':'#1A6B42'}}>
            {stats.todayCount}/{stats.dailyGoal}
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{width:`${Math.min(Math.round((stats.todayCount/stats.dailyGoal)*100),100)}%`,background:stats.todayOverGoal>0?'#DC2626':undefined}}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
          <p style={{fontSize:'0.75rem',color:stats.todayOverGoal>0?'#DC2626':'#4A8C6F',margin:0}}>
            {stats.todayOverGoal > 0
              ? `Gasto extra: ${brl(stats.todayExtraMoney)}`
              : stats.todaySaved === 0 ? '🎉 Meta atingida!'
              : `Restam ${stats.todaySaved} cigarros`}
          </p>
          {stats.todaySaved > 0 && stats.todayOverGoal === 0 && (
            <p style={{fontSize:'0.75rem',color:'#1A6B42',fontWeight:700,margin:0}}>
              +{brl(stats.todaySavedMoney)} economizado hoje
            </p>
          )}
        </div>
      </div>

      {/* Stats principais */}
      <div className="stat-grid" style={{marginBottom:'1rem'}}>
        <div className="stat-box">
          <div className="stat-val" style={{color:stats.todayOverGoal>0?'#DC2626':stats.todayCount>0?'#E05C2A':'#1A6B42'}}>{stats.todayCount}</div>
          <div className="stat-lbl">fumei hoje</div>
        </div>
        <div className="stat-box">
          <div className="stat-val" style={{color:'#1A6B42',fontSize:'1.1rem'}}>{num(stats.cigsNotSmoked)}</div>
          <div className="stat-lbl">não fumei</div>
        </div>
        <div className="stat-box">
          <div className="stat-val" style={{color:'#C47E00',fontSize:'1rem'}}>{brl(stats.moneySaved)}</div>
          <div className="stat-lbl">economizado</div>
        </div>
      </div>

      {/* Redução */}
      {stats.reductionPct > 0 && (
        <div className="card card-mint" style={{marginBottom:'1rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
            <p style={{fontSize:'0.8125rem',fontWeight:700,color:'#0A3D2B',margin:0}}>📉 Redução total</p>
            <span style={{fontSize:'1.25rem',fontWeight:800,color:'#1A6B42'}}>{stats.reductionPct}%</span>
          </div>
          <div className="progress-track"><div className="progress-fill" style={{width:`${Math.min(stats.reductionPct,100)}%`}}/></div>
          <p style={{fontSize:'0.75rem',color:'#4A8C6F',marginTop:5}}>
            Média atual: {stats.dailyAvgSmoked} cig/dia · padrão: {stats.cpd} · {num(stats.cigsNotSmoked)} a menos no total
          </p>
        </div>
      )}

      {/* Botões de ação */}
      <button className="btn btn-full btn-lg" style={{background:'#E05C2A',color:'white',marginBottom:'0.75rem',boxShadow:'0 4px 16px rgba(224,92,42,0.3)'}} onClick={() => setShowPanic(true)}>
        🆘 Estou com fissura — ajuda!
      </button>
      <button className="btn btn-full btn-outline-ember" style={{marginBottom:'1.5rem'}} onClick={() => setShowConfirm(true)}>
        🚬 Fumei um cigarro
      </button>

      {/* Impacto */}
      <div className="card card-red" style={{marginBottom:'1rem'}}>
        <p style={{fontSize:'0.75rem',fontWeight:700,color:'#DC2626',textTransform:'uppercase',letterSpacing:0.5,marginBottom:10}}>⚠️ Custo do cigarro por ano</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <div style={{background:'white',borderRadius:8,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:'1.125rem',fontWeight:800,color:'#DC2626'}}>{brl(stats.yearlyCost)}</div>
            <div style={{fontSize:'0.625rem',color:'#6B8A74',marginTop:3,fontWeight:600}}>em dinheiro/ano</div>
          </div>
          <div style={{background:'white',borderRadius:8,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:'1.125rem',fontWeight:800,color:'#DC2626'}}>{Math.round(stats.cpd*5*365/60/24)} dias</div>
            <div style={{fontSize:'0.625rem',color:'#6B8A74',marginTop:3,fontWeight:600}}>de vida/ano perdidos</div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div style={{marginBottom:'1.5rem'}}>
        <div className="section-head">
          <h2>Insight</h2>
          <button onClick={() => setInsightIdx(i=>i+1)} style={{background:'none',border:'none',cursor:'pointer',color:'#1A6B42',fontSize:'0.8125rem',fontWeight:700}}>Próximo →</button>
        </div>
        <div className="card card-mint">
          <span className={`tag ${insight.color}`} style={{marginBottom:8}}>{insight.tag}</span>
          <h3 style={{marginBottom:6}}>{insight.title}</h3>
          <p style={{fontSize:'0.875rem',lineHeight:1.55}}>{insight.body}</p>
        </div>
      </div>

      {data.fagerScore != null && (
        <div className="card" style={{marginBottom:'1.5rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <p style={{fontSize:'0.6875rem',fontWeight:700,color:'#9BB5A4',textTransform:'uppercase',letterSpacing:0.5}}>Fagerström</p>
            <p style={{fontSize:'1.375rem',fontWeight:800,color:'#1A6B42'}}>{data.fagerScore}/10</p>
          </div>
          <Link to="/testes" style={{textDecoration:'none'}}>
            <button className="btn btn-ghost" style={{fontSize:'0.8125rem',padding:'8px 14px'}}>Ver análise →</button>
          </Link>
        </div>
      )}
    </div>
  )
}
