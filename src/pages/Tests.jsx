import { useState } from 'react'

const FAGER_QS = [
  { q: 'Em quanto tempo após acordar você fuma o primeiro cigarro?', opts: [['Dentro de 5 minutos',3],['6 a 30 minutos',2],['31 a 60 minutos',1],['Após 60 minutos',0]] },
  { q: 'Você acha difícil não fumar em locais proibidos?', opts: [['Sim',1],['Não',0]] },
  { q: 'Qual cigarro do dia é o mais difícil de abandonar?', opts: [['O primeiro da manhã',1],['Qualquer outro',0]] },
  { q: 'Quantos cigarros você fuma por dia?', opts: [['31 ou mais',3],['21 a 30',2],['11 a 20',1],['10 ou menos',0]] },
  { q: 'Você fuma mais nas primeiras horas após acordar do que no restante do dia?', opts: [['Sim',1],['Não',0]] },
  { q: 'Você fuma mesmo estando doente e acamado?', opts: [['Sim',1],['Não',0]] },
]
const RICH_QS = [
  { q: 'Você gostaria de parar de fumar se pudesse fazê-lo facilmente?', opts: [['Não',0],['Sim',1]] },
  { q: 'O quanto você quer parar de fumar?', opts: [['Não quero',0],['Pouco',1],['Razoavelmente',2],['Muito',3]] },
  { q: 'Você vai tentar parar nas próximas duas semanas?', opts: [['Definitivamente não',0],['Talvez',1],['Sim',2],['Definitivamente sim',3]] },
  { q: 'Qual a chance de você ser não fumante em 6 meses?', opts: [['Nenhuma',0],['Possível',1],['Provável',2],['Definitivamente',3]] },
]
const TRIGGERS = [
  {id:'cafe',e:'☕',l:'Café da manhã',s:'Troque o café por chá verde por 2 semanas. Mude a sequência matinal.'},
  {id:'stress',e:'😰',l:'Estresse',s:'Use a respiração 4-7-8 ANTES de qualquer reação estressante. Pratique diariamente.'},
  {id:'alcool',e:'🍺',l:'Álcool',s:'Em eventos, avise antecipadamente que está parando. Sempre tenha água na mão.'},
  {id:'refeicao',e:'🍽️',l:'Após refeições',s:'Escove os dentes imediatamente após comer. O sabor de menta inibe o desejo.'},
  {id:'telefone',e:'📱',l:'Ao telefone',s:'Segure uma caneta ou objeto na mão ao telefone. Substitui o cigarro sensorialmente.'},
  {id:'tedio',e:'😑',l:'Tédio',s:'Crie uma lista de 5 atividades de 3 minutos: música, 10 flexões, mensagem para alguém.'},
  {id:'social',e:'👥',l:'Com amigos',s:'Diga às pessoas próximas que está parando. Apoio social dobra as chances de sucesso.'},
  {id:'direcao',e:'🚗',l:'Dirigindo',s:'Ponha balas de menta no carro. Coloque cigarros no porta-malas — dificulta o acesso.'},
  {id:'trabalho',e:'💼',l:'No trabalho',s:'Substitua a pausa do cigarro por 3 min de caminhada. Mesma pausa, sem o veneno.'},
  {id:'tristeza',e:'😔',l:'Tristeza',s:'O cigarro não resolve emoções — mascara. Identifique a emoção e use o botão de pânico.'},
  {id:'ansiedade',e:'😟',l:'Ansiedade',s:'Respiração 4-7-8 reduz ansiedade em 60 segundos. Mais eficaz que um cigarro.'},
  {id:'acorda',e:'🌅',l:'Ao acordar',s:'Ponha água na cabeceira. Beba imediatamente ao acordar, antes de qualquer outro pensamento.'},
]

const getFagerLevel = s => {
  if(s<=2) return {l:'Muito baixa',c:'#1A6B42',bg:'#DCF0E7',t:'Dependência física baixa. O maior desafio para você é psicológico e comportamental. Foque em identificar gatilhos.'}
  if(s<=4) return {l:'Baixa',c:'#2ECC71',bg:'#E8F5EE',t:'Dependência física baixa. Reposição de nicotina provavelmente não é necessária. Foque na TCC.'}
  if(s===5) return {l:'Moderada',c:'#C47E00',bg:'#FFFBEB',t:'Pode se beneficiar de reposição de nicotina (adesivos/gomas). Consulte seu médico ou UBS mais próxima — é gratuito pelo SUS.'}
  if(s<=7) return {l:'Alta',c:'#E05C2A',bg:'#FFF0EB',t:'Terapia farmacológica recomendada pelo INCA: bupropiona ou vareniclina. Busque seu médico. Tratamento gratuito pelo SUS.'}
  return {l:'Muito alta',c:'#DC2626',bg:'#FEF2F2',t:'Tratamento combinado: medicação + suporte psicológico tem as maiores taxas de sucesso. Você merece toda ajuda disponível. SUS oferece tratamento gratuito.'}
}

const getRichLevel = s => {
  if(s<=5) return {l:'Baixa motivação',c:'#E05C2A',t:'Liste 10 motivos pessoais e específicos para parar. Leia-os todo dia. Identifique o que te impede e trabalhe nisso diretamente.'}
  if(s<=7) return {l:'Motivação moderada',c:'#C47E00',t:'Você está no caminho. Defina uma data concreta de parada e compartilhe com alguém de confiança. Compromisso público aumenta a adesão.'}
  return {l:'Alta motivação',c:'#1A6B42',t:'Ótima disposição! Combine com um plano concreto: data de parada, estratégias anti-gatilho e suporte. A motivação precisa de estrutura.'}
}

export default function Tests({ data, update }) {
  const [tab, setTab] = useState('fager')
  const [fagerA, setFagerA] = useState({})
  const [richA, setRichA] = useState({})
  const [fagerQ, setFagerQ] = useState(0)
  const [richQ, setRichQ] = useState(0)
  const [fagerR, setFagerR] = useState(data.fagerScore)
  const [richR, setRichR] = useState(data.richScore)

  const handleFager = (val) => {
    const updated = {...fagerA, [fagerQ]: val}
    setFagerA(updated)
    if(fagerQ < FAGER_QS.length-1) setFagerQ(fagerQ+1)
    else { const score = Object.values(updated).reduce((a,b)=>a+b,0); setFagerR(score); update({fagerScore:score}) }
  }
  const handleRich = (val) => {
    const updated = {...richA, [richQ]: val}
    setRichA(updated)
    if(richQ < RICH_QS.length-1) setRichQ(richQ+1)
    else { const score = Object.values(updated).reduce((a,b)=>a+b,0); setRichR(score); update({richScore:score}) }
  }
  const toggleTrigger = (id) => {
    const c = data.triggers||[]
    update({triggers: c.includes(id) ? c.filter(t=>t!==id) : [...c,id]})
  }

  return (
    <div className="page-padded">
      <h1 style={{marginBottom:'0.25rem'}}>Avaliação clínica</h1>
      <p style={{fontSize:'0.875rem',marginBottom:'1.25rem'}}>Protocolos do INCA — Ministério da Saúde</p>
      <div className="tabs">
        {[['fager','Fagerström'],['rich','Richmond'],['gatilhos','Gatilhos']].map(([id,lbl])=>(
          <button key={id} className={`tab-btn ${tab===id?'active':''}`} onClick={()=>setTab(id)}>{lbl}</button>
        ))}
      </div>

      {tab==='fager' && (
        fagerR!=null ? (
          <div>
            <div style={{textAlign:'center',padding:'1.5rem 0 1rem'}}>
              <div style={{fontSize:'0.75rem',fontWeight:700,color:'#6B8A74',textTransform:'uppercase',letterSpacing:1,marginBottom:6}}>DEPENDÊNCIA À NICOTINA</div>
              <div style={{fontSize:'4.5rem',fontWeight:800,color:getFagerLevel(fagerR).c,lineHeight:1}}>{fagerR}</div>
              <div style={{fontSize:'1rem',color:'#9BB5A4',margin:'4px 0 12px'}}>/ 10 pontos</div>
              <div style={{background:getFagerLevel(fagerR).bg,borderRadius:8,padding:'6px 20px',display:'inline-block'}}>
                <span style={{fontWeight:700,color:getFagerLevel(fagerR).c}}>{getFagerLevel(fagerR).l}</span>
              </div>
            </div>
            <div className="card" style={{marginBottom:'1rem'}}>
              <p style={{fontSize:'0.875rem',lineHeight:1.6,color:'#2D4A38'}}>{getFagerLevel(fagerR).t}</p>
            </div>
            <div className="card card-mint" style={{marginBottom:'1rem'}}>
              <p style={{fontSize:'0.75rem',fontWeight:700,color:'#0A3D2B',marginBottom:8}}>🩺 Interpretação clínica (INCA)</p>
              {[[0,2,'Muito baixa','Foco em TCC e gatilhos'],[3,4,'Baixa','Foco comportamental'],[5,5,'Moderada','TRN pode ajudar'],[6,7,'Alta','Bupropiona recomendada'],[8,10,'Muito alta','Vareniclina + suporte intensivo']].map(([min,max,lbl,desc])=>(
                <div key={lbl} style={{display:'flex',gap:10,padding:'4px 0',borderBottom:'1px solid #DCF0E7'}}>
                  <span style={{fontSize:'0.75rem',fontWeight:700,minWidth:32,color:'#1A6B42'}}>{min}-{max}</span>
                  <p style={{fontSize:'0.75rem',margin:0}}><strong>{lbl}:</strong> {desc}</p>
                </div>
              ))}
            </div>
            <button className="btn btn-outline btn-full" onClick={()=>{setFagerR(null);setFagerA({});setFagerQ(0)}}>Refazer teste</button>
          </div>
        ) : (
          <div>
            <div style={{marginBottom:'1rem'}}>
              <div className="progress-track"><div className="progress-fill" style={{width:`${(fagerQ/FAGER_QS.length)*100}%`}}/></div>
              <p style={{fontSize:'0.75rem',color:'#9BB5A4',marginTop:6}}>Pergunta {fagerQ+1} de {FAGER_QS.length}</p>
            </div>
            <h2 style={{marginBottom:'1.25rem',lineHeight:1.5,fontSize:'1rem'}}>{FAGER_QS[fagerQ].q}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {FAGER_QS[fagerQ].opts.map(([lbl,val])=>(
                <button key={lbl} onClick={()=>handleFager(val)}
                  style={{padding:'13px 16px',border:'1.5px solid #DCF0E7',borderRadius:10,background:'white',cursor:'pointer',fontSize:'0.9375rem',fontFamily:'inherit',color:'#0A3D2B',textAlign:'left',fontWeight:600,transition:'all .15s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='#1A6B42';e.currentTarget.style.background='#F4FAF7'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='#DCF0E7';e.currentTarget.style.background='white'}}
                >{lbl}</button>
              ))}
            </div>
          </div>
        )
      )}

      {tab==='rich' && (
        richR!=null ? (
          <div>
            <div style={{textAlign:'center',padding:'1.5rem 0 1rem'}}>
              <div style={{fontSize:'0.75rem',fontWeight:700,color:'#6B8A74',textTransform:'uppercase',letterSpacing:1,marginBottom:6}}>MOTIVAÇÃO PARA PARAR</div>
              <div style={{fontSize:'4.5rem',fontWeight:800,color:getRichLevel(richR).c,lineHeight:1}}>{richR}</div>
              <div style={{fontSize:'1rem',color:'#9BB5A4',margin:'4px 0 12px'}}>/ 10 pontos</div>
            </div>
            <div className="card card-sky" style={{marginBottom:'1rem'}}>
              <p style={{fontWeight:700,color:'#1A6B9A',marginBottom:6}}>{getRichLevel(richR).l}</p>
              <p style={{fontSize:'0.875rem',lineHeight:1.6}}>{getRichLevel(richR).t}</p>
            </div>
            <button className="btn btn-outline btn-full" onClick={()=>{setRichR(null);setRichA({});setRichQ(0)}}>Refazer teste</button>
          </div>
        ) : (
          <div>
            <div style={{marginBottom:'1rem'}}>
              <div className="progress-track"><div className="progress-fill" style={{width:`${(richQ/RICH_QS.length)*100}%`}}/></div>
              <p style={{fontSize:'0.75rem',color:'#9BB5A4',marginTop:6}}>Pergunta {richQ+1} de {RICH_QS.length}</p>
            </div>
            <h2 style={{marginBottom:'1.25rem',lineHeight:1.5,fontSize:'1rem'}}>{RICH_QS[richQ].q}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {RICH_QS[richQ].opts.map(([lbl,val])=>(
                <button key={lbl} onClick={()=>handleRich(val)}
                  style={{padding:'13px 16px',border:'1.5px solid #DCF0E7',borderRadius:10,background:'white',cursor:'pointer',fontSize:'0.9375rem',fontFamily:'inherit',color:'#0A3D2B',textAlign:'left',fontWeight:600,transition:'all .15s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='#1A6B9A';e.currentTarget.style.background='#EAF4FB'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='#DCF0E7';e.currentTarget.style.background='white'}}
                >{lbl}</button>
              ))}
            </div>
          </div>
        )
      )}

      {tab==='gatilhos' && (
        <div>
          <p style={{fontSize:'0.875rem',color:'#6B8A74',marginBottom:'0.75rem',lineHeight:1.5}}>Selecione seus gatilhos. Cada um gera um plano de ação personalizado baseado na TCC.</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:'1.25rem'}}>
            {TRIGGERS.map(t=>{
              const on=(data.triggers||[]).includes(t.id)
              return (
                <button key={t.id} onClick={()=>toggleTrigger(t.id)} style={{padding:'12px 10px',border:`1.5px solid ${on?'#1A6B42':'#DCF0E7'}`,borderRadius:10,background:on?'#DCF0E7':'white',cursor:'pointer',display:'flex',alignItems:'center',gap:8,fontFamily:'inherit',transition:'all .15s'}}>
                  <span style={{fontSize:'1.25rem'}}>{t.e}</span>
                  <span style={{fontSize:'0.875rem',fontWeight:on?700:500,color:on?'#0A3D2B':'#2D4A38'}}>{t.l}</span>
                </button>
              )
            })}
          </div>
          {(data.triggers||[]).length>0 && (
            <div className="card card-mint">
              <p style={{fontSize:'0.75rem',fontWeight:700,color:'#0A3D2B',marginBottom:10}}>🛡️ Seu plano de ação personalizado</p>
              {(data.triggers||[]).map(id=>{
                const t=TRIGGERS.find(x=>x.id===id)
                return t ? (
                  <div key={id} style={{display:'flex',gap:10,padding:'10px 0',borderBottom:'1px solid #DCF0E7'}}>
                    <span style={{fontSize:'1.25rem',flexShrink:0}}>{t.e}</span>
                    <div>
                      <p style={{fontSize:'0.8125rem',fontWeight:700,color:'#0A3D2B',marginBottom:3}}>{t.l}</p>
                      <p style={{fontSize:'0.8125rem',color:'#4A8C6F',lineHeight:1.4,margin:0}}>{t.s}</p>
                    </div>
                  </div>
                ) : null
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
