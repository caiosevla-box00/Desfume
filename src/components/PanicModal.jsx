// src/components/PanicModal.jsx
import { useState, useEffect, useRef } from 'react'

const STOIC_QUOTES = [
  { text: 'Você tem poder sobre sua mente, não sobre eventos externos. Realize isso, e você encontrará força.', author: 'Marco Aurélio, Meditações' },
  { text: 'A disciplina é a maior forma de amor-próprio. Você não se castiga quando escolhe parar — você se honra.', author: 'Epicteto' },
  { text: 'Não é o que acontece com você, mas como você reage que importa.', author: 'Epicteto, Enchiridion' },
  { text: 'Cada dia é uma nova oportunidade de ser melhor do que você era ontem.', author: 'Marco Aurélio' },
  { text: 'A fraqueza de caráter é o único verdadeiro defeito. E o cigarro não tem poder sobre seu caráter.', author: 'Zenão de Cítio' },
]

const RELIGION_QUOTES = [
  { text: 'O Senhor é a minha força e o meu escudo; o meu coração nele confiou, e fui ajudado.', author: 'Salmos 28:7' },
  { text: 'Tudo posso naquele que me fortalece.', author: 'Filipenses 4:13' },
  { text: 'Não vos conformeis com este século, mas transformai-vos pela renovação do vosso entendimento.', author: 'Romanos 12:2' },
  { text: 'Não há nenhum fardo tão pesado que o amor e a fé não possam tornar mais leve.', author: 'Provérbio budista' },
  { text: 'A paciência é amarga, mas seu fruto é doce.', author: 'Provérbio islâmico' },
]

const SCIENCE_FACTS = [
  'A fissura dura no máximo 3 minutos — mesmo que pareça uma eternidade.',
  'Cada cigarro recusado enfraquece fisicamente o vício. Seu cérebro está literalmente se reconfigurando.',
  'Em 20 minutos sem fumar, sua pressão arterial já volta ao normal.',
  'O desejo intenso que você sente agora é apenas seu cérebro pedindo nicotina — ele vai parar de pedir.',
  'Fumantes que usam um app têm 2x mais chance de sucesso do que os que tentam sozinhos.',
]

const WORDS = ['SAÚDE', 'LIBERDADE', 'FORÇA', 'RESPIRO', 'VITÓRIA', 'FAMÍLIA', 'FUTURO', 'ENERGIA', 'PUREZA', 'CALMA', 'PULMÃO', 'ALEGRIA', 'BELEZA', 'CORAGEM', 'ESPERANÇA']

export default function PanicModal({ open, onClose }) {
  const [mode, setMode] = useState('menu') // menu | breathe | game | quote | water
  const [breathePhase, setBreathePhase] = useState(0) // 0=inspire, 1=hold, 2=expire
  const [breatheCount, setBreatheCount] = useState(4)
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [quoteType, setQuoteType] = useState('stoic')
  const [gameWord, setGameWord] = useState('')
  const [gameShuffled, setGameShuffled] = useState('')
  const [gameInput, setGameInput] = useState('')
  const [gameScore, setGameScore] = useState(0)
  const [gameStatus, setGameStatus] = useState('')
  const [waterCount, setWaterCount] = useState(30)
  const intervalRef = useRef(null)
  const allQuotes = [...STOIC_QUOTES, ...RELIGION_QUOTES]

  useEffect(() => {
    if (!open) { setMode('menu'); clearInterval(intervalRef.current) }
  }, [open])

  useEffect(() => {
    if (mode !== 'breathe') return
    const phases = [
      { label: 'Inspire', duration: 4 },
      { label: 'Segure', duration: 7 },
      { label: 'Expire devagar', duration: 8 },
    ]
    let p = 0, c = phases[0].duration
    setBreathePhase(0); setBreatheCount(phases[0].duration)
    intervalRef.current = setInterval(() => {
      c--
      if (c <= 0) { p = (p + 1) % 3; c = phases[p].duration; setBreathePhase(p) }
      setBreatheCount(c)
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [mode])

  useEffect(() => {
    if (mode !== 'water') return
    let c = 30; setWaterCount(30)
    intervalRef.current = setInterval(() => { c--; setWaterCount(c); if (c <= 0) clearInterval(intervalRef.current) }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [mode])

  const startGame = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)]
    const shuffled = word.split('').sort(() => Math.random() - 0.5).join('')
    setGameWord(word); setGameShuffled(shuffled); setGameInput(''); setGameStatus(''); setMode('game')
  }

  const checkGameInput = (val) => {
    setGameInput(val)
    if (val.toUpperCase() === gameWord) {
      setGameScore(s => s + 1); setGameStatus('✅ Acertou!')
      setTimeout(startGame, 1200)
    }
  }

  const breatheLabels = ['Inspire', 'Segure', 'Expire devagar']
  const breatheExpanding = breathePhase === 0
  const breatheShrinking = breathePhase === 2

  if (!open) return null

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="overlay-sheet">
        <div className="overlay-handle" />

        {mode === 'menu' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem' }}>🆘 Modo pânico</h2>
              <p style={{ fontSize: '0.875rem', marginTop: 4 }}>A fissura passa em <strong>3 minutos</strong>. Escolha uma estratégia:</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '1rem' }}>
              {[
                { icon: '🌬️', label: 'Respiração 4-7-8', sub: 'Reduz ansiedade', action: () => setMode('breathe') },
                { icon: '🧩', label: 'Jogo de palavras', sub: 'Distração mental', action: startGame },
                { icon: '💬', label: 'Força filosófica', sub: 'Estoicismo & fé', action: () => { setQuoteIdx(Math.floor(Math.random() * allQuotes.length)); setMode('quote') } },
                { icon: '💧', label: 'Beba água', sub: 'Hidratação anti-fissura', action: () => setMode('water') },
              ].map(opt => (
                <button key={opt.label} onClick={opt.action} style={{
                  padding: '14px 10px', border: '1px solid var(--border)', borderRadius: 12,
                  background: 'var(--surface)', cursor: 'pointer', textAlign: 'center',
                  transition: 'all 0.15s', fontFamily: 'inherit'
                }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: 4 }}>{opt.icon}</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink)' }}>{opt.label}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--ink-soft)', marginTop: 2 }}>{opt.sub}</div>
                </button>
              ))}
            </div>
            <div style={{ padding: '10px 14px', background: 'var(--forest-pale)', borderRadius: 10 }}>
              <p style={{ fontSize: '0.8125rem', color: 'var(--forest)', lineHeight: 1.5 }}>
                💡 <strong>Dica clínica:</strong> Mude de ambiente agora. Levante, vá a outro cômodo, beba água. A mudança física quebra o ciclo do gatilho.
              </p>
            </div>
          </>
        )}

        {mode === 'breathe' && (
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-soft)', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 4 }}>← Voltar</button>
            <h2 style={{ marginBottom: '0.25rem' }}>Respiração 4-7-8</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>Técnica do Dr. Andrew Weil — ativa o sistema parassimpático</p>
            <div
              className={`breathe-circle${breatheExpanding ? ' expanding' : breatheShrinking ? ' shrinking' : ''}`}
              style={{ transform: `scale(${breathePhase === 0 ? '1.3' : breathePhase === 1 ? '1.3' : '1'})` }}
            >
              <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--forest)' }}>{breatheLabels[breathePhase]}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--forest-mid)' }}>{breatheCount}</div>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', marginTop: '1rem' }}>Inspire pelo nariz · Segure · Expire pela boca</p>
          </div>
        )}

        {mode === 'game' && (
          <div>
            <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-soft)', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 4 }}>← Voltar</button>
            <h2 style={{ marginBottom: '0.25rem' }}>Desvende a palavra</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>Palavras de força e saúde — ⭐ {gameScore} pontos</p>
            <div style={{ background: 'var(--forest-pale)', borderRadius: 12, padding: '1.25rem', textAlign: 'center', marginBottom: '1rem', letterSpacing: 8, fontSize: '1.375rem', fontWeight: 700, color: 'var(--forest)' }}>
              {gameShuffled}
            </div>
            <input className="game-input" value={gameInput} onChange={e => checkGameInput(e.target.value)}
              placeholder="Digite a palavra..." style={{ textTransform: 'uppercase', letterSpacing: 2 }}
              autoFocus autoCapitalize="characters" autoComplete="off" />
            {gameStatus && <p style={{ color: 'var(--forest)', fontWeight: 600, textAlign: 'center', marginTop: 8 }}>{gameStatus}</p>}
          </div>
        )}

        {mode === 'quote' && (
          <div>
            <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-soft)', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 4 }}>← Voltar</button>
            <h2 style={{ marginBottom: '0.5rem' }}>Força e sabedoria</h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: '1.25rem' }}>
              {[['stoic', 'Estoicismo'], ['science', 'Ciência'], ['faith', 'Espiritualidade']].map(([type, label]) => (
                <button key={type} onClick={() => setQuoteType(type)} className={`tag ${quoteType === type ? 'tag-forest' : ''}`} style={{ cursor: 'pointer', border: quoteType === type ? 'none' : '1px solid var(--border)', background: quoteType === type ? undefined : 'transparent', fontFamily: 'inherit' }}>{label}</button>
              ))}
            </div>
            <div className="quote-card" style={{ marginBottom: '1.25rem' }}>
              {quoteType === 'stoic' && (() => {
                const q = STOIC_QUOTES[quoteIdx % STOIC_QUOTES.length]
                return <><p className="quote-text">"{q.text}"</p><p className="quote-author">— {q.author}</p></>
              })()}
              {quoteType === 'faith' && (() => {
                const q = RELIGION_QUOTES[quoteIdx % RELIGION_QUOTES.length]
                return <><p className="quote-text">"{q.text}"</p><p className="quote-author">— {q.author}</p></>
              })()}
              {quoteType === 'science' && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'normal', fontSize: '0.9375rem', color: 'var(--forest)', lineHeight: 1.6 }}>🔬 {SCIENCE_FACTS[quoteIdx % SCIENCE_FACTS.length]}</p>
              )}
            </div>
            <button className="btn btn-ghost btn-full" onClick={() => setQuoteIdx(i => i + 1)}>
              Próxima mensagem →
            </button>
          </div>
        )}

        {mode === 'water' && (
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-soft)', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 4 }}>← Voltar</button>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>💧</div>
            <h2 style={{ marginBottom: '0.5rem' }}>Beba um copo d'água</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', marginBottom: '1.5rem', lineHeight: 1.5 }}>A hidratação reduz a fissura. Enquanto bebe, respire devagar. O desejo já está diminuindo.</p>
            <div style={{ fontSize: '4rem', fontWeight: 700, color: waterCount > 10 ? 'var(--sky)' : 'var(--forest)', lineHeight: 1, marginBottom: '0.25rem' }}>{waterCount}</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)' }}>segundos</p>
            {waterCount <= 0 && (
              <div style={{ marginTop: '1rem', background: 'var(--forest-pale)', borderRadius: 10, padding: '0.75rem' }}>
                <p style={{ color: 'var(--forest)', fontWeight: 600, fontSize: '0.9375rem' }}>✅ Muito bem! A fissura passou.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
