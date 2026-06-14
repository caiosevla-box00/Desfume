// src/pages/Tests.jsx
import { useState } from 'react'

const FAGER_QS = [
  { q: 'Em quanto tempo após acordar você fuma o primeiro cigarro?', opts: [['Dentro de 5 minutos', 3], ['6 a 30 minutos', 2], ['31 a 60 minutos', 1], ['Após 60 minutos', 0]] },
  { q: 'Você acha difícil não fumar em locais proibidos?', opts: [['Sim', 1], ['Não', 0]] },
  { q: 'Qual cigarro do dia é o mais difícil de abandonar?', opts: [['O primeiro da manhã', 1], ['Qualquer outro', 0]] },
  { q: 'Quantos cigarros você fuma por dia?', opts: [['31 ou mais', 3], ['21 a 30', 2], ['11 a 20', 1], ['10 ou menos', 0]] },
  { q: 'Você fuma mais nas primeiras horas após acordar do que no restante do dia?', opts: [['Sim', 1], ['Não', 0]] },
  { q: 'Você fuma mesmo estando doente e acamado?', opts: [['Sim', 1], ['Não', 0]] },
]

const RICH_QS = [
  { q: 'Você gostaria de parar de fumar se pudesse fazê-lo facilmente?', opts: [['Não', 0], ['Sim', 1]] },
  { q: 'O quanto você quer parar de fumar?', opts: [['Não quero', 0], ['Pouco', 1], ['Razoavelmente', 2], ['Muito', 3]] },
  { q: 'Você vai tentar parar de fumar nas próximas duas semanas?', opts: [['Definitivamente não', 0], ['Talvez', 1], ['Sim', 2], ['Definitivamente sim', 3]] },
  { q: 'Qual é a chance de você ser não fumante em 6 meses?', opts: [['Nenhuma', 0], ['Possível', 1], ['Provável', 2], ['Definitivamente', 3]] },
]

const TRIGGERS = [
  { id: 'cafe', emoji: '☕', label: 'Café da manhã' },
  { id: 'stress', emoji: '😰', label: 'Estresse' },
  { id: 'alcool', emoji: '🍺', label: 'Álcool' },
  { id: 'refeicao', emoji: '🍽️', label: 'Após refeições' },
  { id: 'telefone', emoji: '📱', label: 'Ao telefone' },
  { id: 'tedio', emoji: '😑', label: 'Tédio' },
  { id: 'social', emoji: '👥', label: 'Com amigos' },
  { id: 'direcao', emoji: '🚗', label: 'Dirigindo' },
  { id: 'trabalho', emoji: '💼', label: 'Trabalho' },
  { id: 'tristeza', emoji: '😔', label: 'Tristeza' },
  { id: 'ansiedade', emoji: '😟', label: 'Ansiedade' },
  { id: 'acorda', emoji: '🌅', label: 'Ao acordar' },
]

function getFagerLevel(s) {
  if (s <= 2) return { label: 'Muito baixa', color: '#1D6B52', text: 'Dependência física baixa. O desafio principal é psicológico e comportamental.' }
  if (s <= 4) return { label: 'Baixa', color: '#1D9E75', text: 'Boa notícia. Foque em identificar gatilhos e construir novos hábitos.' }
  if (s === 5) return { label: 'Moderada', color: '#B07D2E', text: 'Pode se beneficiar de reposição de nicotina (adesivos/gomas). Consulte seu médico.' }
  if (s <= 7) return { label: 'Alta', color: '#C94B1E', text: 'Terapia farmacológica recomendada pelo INCA: bupropiona ou vareniclina. Busque seu médico.' }
  return { label: 'Muito alta', color: '#9B2A10', text: 'Tratamento combinado: medicação + suporte psicológico. Você merece toda a ajuda disponível.' }
}

function getRichLevel(s) {
  if (s <= 5) return { label: 'Baixa motivação', color: '#C94B1E', text: 'Liste 10 motivos para parar e deixe-os visíveis. Identifique o que te impede e aborde diretamente.' }
  if (s <= 7) return { label: 'Motivação moderada', color: '#B07D2E', text: 'Você está no caminho. Defina uma data concreta de parada e compartilhe com alguém de confiança.' }
  return { label: 'Alta motivação', color: '#1D6B52', text: 'Excelente disposição! Combine com um plano de ação concreto: data de parada, estratégias anti-gatilho e suporte.' }
}

export default function Tests({ data, update }) {
  const [activeTab, setActiveTab] = useState('fager')
  const [fagerAnswers, setFagerAnswers] = useState({})
  const [richAnswers, setRichAnswers] = useState({})
  const [fagerQ, setFagerQ] = useState(0)
  const [richQ, setRichQ] = useState(0)
  const [fagerResult, setFagerResult] = useState(data.fagerScore)
  const [richResult, setRichResult] = useState(data.richScore)

  const handleFagerAnswer = (val) => {
    const updated = { ...fagerAnswers, [fagerQ]: val }
    setFagerAnswers(updated)
    if (fagerQ < FAGER_QS.length - 1) {
      setFagerQ(fagerQ + 1)
    } else {
      const score = Object.values(updated).reduce((a, b) => a + b, 0)
      setFagerResult(score)
      update({ fagerScore: score })
    }
  }

  const handleRichAnswer = (val) => {
    const updated = { ...richAnswers, [richQ]: val }
    setRichAnswers(updated)
    if (richQ < RICH_QS.length - 1) {
      setRichQ(richQ + 1)
    } else {
      const score = Object.values(updated).reduce((a, b) => a + b, 0)
      setRichResult(score)
      update({ richScore: score })
    }
  }

  const toggleTrigger = (id) => {
    const current = data.triggers || []
    const updated = current.includes(id) ? current.filter(t => t !== id) : [...current, id]
    update({ triggers: updated })
  }

  return (
    <div className="page-padded">
      <h1 style={{ marginBottom: '0.25rem' }}>Avaliação clínica</h1>
      <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>Protocolos do INCA — Ministério da Saúde</p>

      <div className="tabs">
        {[['fager', 'Fagerström'], ['rich', 'Richmond'], ['gatilhos', 'Gatilhos']].map(([id, label]) => (
          <button key={id} className={`tab-btn ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>{label}</button>
        ))}
      </div>

      {activeTab === 'fager' && (
        <div>
          {fagerResult != null ? (
            <div>
              <div style={{ textAlign: 'center', padding: '1.5rem 0 1rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                  DEPENDÊNCIA À NICOTINA
                </div>
                <div style={{ fontSize: '4rem', fontWeight: 700, color: getFagerLevel(fagerResult).color, lineHeight: 1 }}>{fagerResult}</div>
                <div style={{ fontSize: '1rem', color: 'var(--ink-soft)', margin: '4px 0 12px' }}>/ 10 pontos</div>
                <div style={{ background: '#f5f5f5', borderRadius: 8, padding: '8px 20px', display: 'inline-block' }}>
                  <span style={{ fontWeight: 700, color: getFagerLevel(fagerResult).color }}>{getFagerLevel(fagerResult).label}</span>
                </div>
              </div>
              <div className="card" style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink-mid)' }}>{getFagerLevel(fagerResult).text}</p>
              </div>
              <div className="card card-pale" style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--forest)', marginBottom: 8 }}>🩺 O que o escore significa</p>
                {[[0,2,'Muito baixa','Dependência principalmente psicológica'],[3,4,'Baixa','Alguns hábitos físicos, foco comportamental'],[5,5,'Moderada','TRN (adesivos/gomas) pode ajudar'],[6,7,'Alta','Bupropiona ou TRN combinada recomendada'],[8,10,'Muito alta','Vareniclina + suporte intensivo indicados']].map(([min,max,lbl,desc]) => (
                  <div key={lbl} style={{ display: 'flex', gap: 10, padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, minWidth: 32, color: 'var(--forest)' }}>{min}-{max}</span>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink)' }}>{lbl}: </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline btn-full" onClick={() => { setFagerResult(null); setFagerAnswers({}); setFagerQ(0) }}>Refazer teste</button>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${(fagerQ / FAGER_QS.length) * 100}%` }} />
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', marginTop: 6 }}>Pergunta {fagerQ + 1} de {FAGER_QS.length}</p>
              </div>
              <h2 style={{ marginBottom: '1.25rem', lineHeight: 1.5, fontSize: '1rem' }}>{FAGER_QS[fagerQ].q}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {FAGER_QS[fagerQ].opts.map(([label, val]) => (
                  <button key={label} onClick={() => handleFagerAnswer(val)}
                    style={{ padding: '13px 16px', border: '1.5px solid var(--border-strong)', borderRadius: 10, background: 'var(--surface-card)', cursor: 'pointer', fontSize: '0.9375rem', fontFamily: 'inherit', color: 'var(--ink)', textAlign: 'left', fontWeight: 500 }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--forest)'; e.currentTarget.style.background = 'var(--forest-pale)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'var(--surface-card)' }}
                  >{label}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'rich' && (
        <div>
          {richResult != null ? (
            <div>
              <div style={{ textAlign: 'center', padding: '1.5rem 0 1rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>MOTIVAÇÃO PARA PARAR</div>
                <div style={{ fontSize: '4rem', fontWeight: 700, color: getRichLevel(richResult).color, lineHeight: 1 }}>{richResult}</div>
                <div style={{ fontSize: '1rem', color: 'var(--ink-soft)', margin: '4px 0 12px' }}>/ 10 pontos</div>
              </div>
              <div className="card card-sky" style={{ marginBottom: '1rem' }}>
                <p style={{ fontWeight: 700, color: 'var(--sky)', marginBottom: 6 }}>{getRichLevel(richResult).label}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-mid)', lineHeight: 1.6 }}>{getRichLevel(richResult).text}</p>
              </div>
              <button className="btn btn-outline btn-full" onClick={() => { setRichResult(null); setRichAnswers({}); setRichQ(0) }}>Refazer teste</button>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${(richQ / RICH_QS.length) * 100}%` }} />
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', marginTop: 6 }}>Pergunta {richQ + 1} de {RICH_QS.length}</p>
              </div>
              <h2 style={{ marginBottom: '1.25rem', lineHeight: 1.5, fontSize: '1rem' }}>{RICH_QS[richQ].q}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {RICH_QS[richQ].opts.map(([label, val]) => (
                  <button key={label} onClick={() => handleRichAnswer(val)}
                    style={{ padding: '13px 16px', border: '1.5px solid var(--border-strong)', borderRadius: 10, background: 'var(--surface-card)', cursor: 'pointer', fontSize: '0.9375rem', fontFamily: 'inherit', color: 'var(--ink)', textAlign: 'left', fontWeight: 500 }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sky)'; e.currentTarget.style.background = 'var(--sky-pale)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'var(--surface-card)' }}
                  >{label}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'gatilhos' && (
        <div>
          <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Selecione suas situações de risco. Isso personaliza suas estratégias de enfrentamento (TCC — INCA).
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.25rem' }}>
            {TRIGGERS.map(t => {
              const on = (data.triggers || []).includes(t.id)
              return (
                <button key={t.id} onClick={() => toggleTrigger(t.id)} style={{
                  padding: '12px 10px', border: `1.5px solid ${on ? 'var(--forest)' : 'var(--border-strong)'}`,
                  borderRadius: 10, background: on ? 'var(--forest-pale)' : 'var(--surface-card)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit', transition: 'all 0.15s'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>{t.emoji}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: on ? 600 : 400, color: on ? 'var(--forest)' : 'var(--ink)' }}>{t.label}</span>
                </button>
              )
            })}
          </div>
          {(data.triggers || []).length > 0 && (
            <div className="card card-pale">
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--forest)', marginBottom: 10 }}>🛡️ Estratégias para seus gatilhos</p>
              {(data.triggers || []).map(id => {
                const t = TRIGGERS.find(x => x.id === id)
                const strategies = {
                  cafe: 'Troque o café da manhã por chá. Mude a sequência matinal.',
                  stress: 'Respire profundamente 4 vezes antes de qualquer reação. Use o botão de pânico.',
                  alcool: 'Em eventos com álcool, avise antecipadamente que está parando. Tenha água na mão.',
                  refeicao: 'Após comer, levante e escove os dentes imediatamente.',
                  telefone: 'Segure uma caneta ou objeto na mão ao telefone.',
                  tedio: 'Tenha uma lista de 3 atividades rápidas: música, 10 flexões, mensagem para alguém.',
                  social: 'Diga às pessoas próximas. O apoio social dobra as chances de sucesso.',
                  direcao: 'Mantenha balas de menta no carro. Coloque o pacote de cigarros no porta-malas.',
                  trabalho: 'Substitua a "pausa do cigarro" por caminhada de 3 min.',
                  tristeza: 'Identifique a emoção. O cigarro não resolve — apenas mascara. Use o pânico.',
                  ansiedade: 'Respiração 4-7-8 reduz a ansiedade em 60 segundos. Pratique agora.',
                  acorda: 'Coloque água na cabeceira. Beba antes de qualquer coisa ao acordar.',
                }
                return t ? (
                  <div key={id} style={{ display: 'flex', gap: 8, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <span>{t.emoji}</span>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{t.label}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', lineHeight: 1.4 }}>{strategies[id]}</p>
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
