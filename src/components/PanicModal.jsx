import { useState, useEffect, useRef } from 'react'
import { STOIC, FAITH, SCIENCE, MOTIVATIONAL } from '../lib/messages'
import { GAME_WORDS } from '../lib/words'

export default function PanicModal({ open, onClose }) {
  const [mode, setMode] = useState('menu')
  const [breathePhase, setBreathePhase] = useState(0)
  const [breatheCount, setBreatheCount] = useState(4)
  const [breatheCycles, setBreatheCycles] = useState(0)
  const [quoteType, setQuoteType] = useState('stoic')
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [gameWord, setGameWord] = useState('')
  const [gameShuffled, setGameShuffled] = useState('')
  const [gameInput, setGameInput] = useState('')
  const [gameScore, setGameScore] = useState(0)
  const [gameMsg, setGameMsg] = useState('')
  const [waterCount, setWaterCount] = useState(30)
  const [waterDone, setWaterDone] = useState(false)
  const interval = useRef(null)

  useEffect(() => { if (!open) { setMode('menu'); clearInterval(interval.current) } }, [open])

  useEffect(() => {
    if (mode !== 'breathe') return
    const phases = [{ label: 'Inspire', d: 4 }, { label: 'Segure', d: 7 }, { label: 'Expire', d: 8 }]
    let p = 0, c = phases[0].d
    setBreathePhase(0); setBreatheCount(phases[0].d); setBreatheCycles(0)
    interval.current = setInterval(() => {
      c--
      if (c <= 0) {
        p = (p + 1) % 3
        if (p === 0) setBreatheCycles(prev => prev + 1)
        c = phases[p].d
        setBreathePhase(p)
      }
      setBreatheCount(c)
    }, 1000)
    return () => clearInterval(interval.current)
  }, [mode])

  useEffect(() => {
    if (mode !== 'water') return
    let c = 30; setWaterCount(30); setWaterDone(false)
    interval.current = setInterval(() => {
      c--; setWaterCount(c)
      if (c <= 0) { clearInterval(interval.current); setWaterDone(true) }
    }, 1000)
    return () => clearInterval(interval.current)
  }, [mode])

  const startGame = () => {
    const word = GAME_WORDS[Math.floor(Math.random() * GAME_WORDS.length)]
    const shuffled = word.split('').sort(() => Math.random() - 0.5).join('')
    setGameWord(word); setGameShuffled(shuffled); setGameInput(''); setGameMsg('')
    setMode('game')
  }

  const checkWord = (val) => {
    setGameInput(val)
    if (val.toUpperCase() === gameWord) {
      setGameScore(s => s + 1); setGameMsg('✅ Acertou! Próxima...')
      setTimeout(startGame, 1200)
    }
  }

  const quoteBank = { stoic: STOIC, faith: FAITH, motivational: MOTIVATIONAL }
  const currentQuotes = quoteType === 'science' ? SCIENCE : quoteBank[quoteType] || STOIC
  const currentQuote = currentQuotes[quoteIdx % currentQuotes.length]
  const breatheLabels = ['Inspire', 'Segure', 'Expire devagar']
  const breatheScale = breathePhase === 0 ? 'scale(1.3)' : breathePhase === 1 ? 'scale(1.3)' : 'scale(1)'
  const breatheBg = breathePhase === 0 ? '#DCF0E7' : breathePhase === 1 ? '#B0D4BF' : '#F4FAF7'

  if (!open) return null

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="overlay-sheet">
        <div className="overlay-handle" />

        {mode === 'menu' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#0A3D2B' }}>🆘 Modo pânico</h2>
              <p style={{ fontSize: '0.875rem', marginTop: 4 }}>A fissura dura <strong>3 minutos</strong>. Escolha uma estratégia:</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '1rem' }}>
              {[
                { e: '🌬️', t: 'Respiração 4-7-8', s: 'Anti-ansiedade comprovada', a: () => setMode('breathe') },
                { e: '🧩', t: 'Jogo de palavras', s: 'Distração mental rápida', a: startGame },
                { e: '💬', t: 'Força e sabedoria', s: 'Filosofia, fé e ciência', a: () => { setQuoteIdx(Math.floor(Math.random() * 10)); setMode('quote') } },
                { e: '💧', t: 'Beba água agora', s: 'Hidratação anti-fissura', a: () => setMode('water') },
              ].map(opt => (
                <button key={opt.t} onClick={opt.a} style={{ padding: '14px 10px', border: '1.5px solid #DCF0E7', borderRadius: 12, background: '#F4FAF7', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s', fontFamily: 'inherit' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: 6 }}>{opt.e}</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0A3D2B' }}>{opt.t}</div>
                  <div style={{ fontSize: '0.6875rem', color: '#6B8A74', marginTop: 2 }}>{opt.s}</div>
                </button>
              ))}
            </div>
            <div style={{ padding: '10px 14px', background: '#DCF0E7', borderRadius: 10, marginBottom: 8 }}>
              <p style={{ fontSize: '0.8125rem', color: '#0A3D2B', lineHeight: 1.5 }}>
                💡 <strong>Dica clínica (TCC):</strong> Mude de ambiente imediatamente. Levante, vá a outro cômodo. A mudança física quebra o ciclo do gatilho.
              </p>
            </div>
          </>
        )}

        {mode === 'breathe' && (
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B8A74', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 4 }}>← Voltar</button>
            <h2 style={{ marginBottom: '0.25rem' }}>Respiração 4-7-8</h2>
            <p style={{ fontSize: '0.8125rem', color: '#6B8A74', marginBottom: '1.5rem' }}>Ativa o sistema parassimpático — reduz ansiedade em 60 segundos</p>
            <div style={{ width: 140, height: 140, borderRadius: '50%', background: breatheBg, border: '3px solid #1A6B42', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transform: breatheScale, transition: 'transform 1s ease, background 0.5s' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0A3D2B' }}>{breatheLabels[breathePhase]}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1A6B42', lineHeight: 1 }}>{breatheCount}</div>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#6B8A74' }}>Ciclos completados: <strong style={{ color: '#1A6B42' }}>{breatheCycles}</strong></p>
            <p style={{ fontSize: '0.75rem', color: '#9BB5A4', marginTop: 8 }}>Inspire pelo nariz · Segure · Expire pela boca</p>
          </div>
        )}

        {mode === 'game' && (
          <div>
            <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B8A74', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 4 }}>← Voltar</button>
            <h2 style={{ marginBottom: '0.25rem' }}>Desvende a palavra</h2>
            <p style={{ fontSize: '0.8125rem', color: '#6B8A74', marginBottom: '1.25rem' }}>Palavras de saúde e liberdade — ⭐ {gameScore} pontos</p>
            <div style={{ background: '#DCF0E7', borderRadius: 12, padding: '1.25rem', textAlign: 'center', marginBottom: '1rem', letterSpacing: 10, fontSize: '1.5rem', fontWeight: 800, color: '#0A3D2B' }}>
              {gameShuffled}
            </div>
            <input value={gameInput} onChange={e => checkWord(e.target.value)}
              placeholder="Digite a palavra..." style={{ textTransform: 'uppercase', letterSpacing: 3, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}
              autoFocus autoCapitalize="characters" autoComplete="off" />
            {gameMsg && <p style={{ color: '#1A6B42', fontWeight: 700, textAlign: 'center' }}>{gameMsg}</p>}
            <p style={{ fontSize: '0.75rem', color: '#9BB5A4', textAlign: 'center', marginTop: 8 }}>
              {gameWord.length} letras · foque aqui, a fissura está passando
            </p>
          </div>
        )}

        {mode === 'quote' && (
          <div>
            <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B8A74', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 4 }}>← Voltar</button>
            <h2 style={{ marginBottom: '0.75rem' }}>Força e sabedoria</h2>
            <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {[['stoic','🏛️ Estoicismo'], ['faith','🙏 Espiritualidade'], ['science','🔬 Ciência'], ['motivational','💪 Motivação']].map(([type, label]) => (
                <button key={type} onClick={() => { setQuoteType(type); setQuoteIdx(0) }}
                  style={{ padding: '5px 12px', borderRadius: 99, border: `1.5px solid ${quoteType === type ? '#1A6B42' : '#DCF0E7'}`, background: quoteType === type ? '#DCF0E7' : 'white', color: quoteType === type ? '#0A3D2B' : '#6B8A74', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {label}
                </button>
              ))}
            </div>
            <div className="quote-card" style={{ marginBottom: '1.25rem' }}>
              {quoteType === 'science' ? (
                <p style={{ fontSize: '0.9375rem', color: '#0A3D2B', lineHeight: 1.6 }}>🔬 {currentQuote}</p>
              ) : (
                <>
                  <p className="quote-text">"{currentQuote.text}"</p>
                  <p className="quote-author">— {currentQuote.author}</p>
                </>
              )}
            </div>
            <button className="btn btn-ghost btn-full" onClick={() => setQuoteIdx(i => i + 1)}>
              Próxima mensagem →
            </button>
          </div>
        )}

        {mode === 'water' && (
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B8A74', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 4 }}>← Voltar</button>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>💧</div>
            <h2 style={{ marginBottom: '0.5rem' }}>Beba um copo d'água</h2>
            <p style={{ fontSize: '0.875rem', color: '#6B8A74', marginBottom: '1.5rem', lineHeight: 1.5 }}>A hidratação reduz a fissura. Respire enquanto bebe.</p>
            {!waterDone ? (
              <>
                <div style={{ fontSize: '4.5rem', fontWeight: 800, color: '#1A6B42', lineHeight: 1 }}>{waterCount}</div>
                <p style={{ color: '#6B8A74', marginTop: 4 }}>segundos — a fissura está diminuindo</p>
              </>
            ) : (
              <div style={{ background: '#DCF0E7', borderRadius: 12, padding: '1.25rem' }}>
                <p style={{ fontWeight: 700, color: '#0A3D2B', fontSize: '1rem' }}>✅ Parabéns! A fissura passou.</p>
                <p style={{ fontSize: '0.8125rem', color: '#4A8C6F', marginTop: 6 }}>Cada vez que você resiste, o vício fica mais fraco.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
