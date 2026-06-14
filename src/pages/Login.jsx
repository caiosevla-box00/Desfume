// src/pages/Login.jsx
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { loginWithGoogle } = useAuth()
  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg, #0F4C3A 0%, #1D6B52 55%, #E8F5F0 100%)',
      padding: '2rem 1.5rem', textAlign: 'center'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '0.75rem' }}>🕊️</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: 'white', fontSize: '2.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Desfume
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', maxWidth: 280, margin: '0 auto' }}>
          Seu companheiro científico e humano para parar de fumar
        </p>
      </div>

      <div style={{ background: 'white', borderRadius: 20, padding: '2rem 1.5rem', width: '100%', maxWidth: 360, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: '1rem' }}>
            {['🧬','🧠','💊','🏆'].map(e => (
              <div key={e} style={{ fontSize: '1.5rem', background: '#E8F5F0', width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{e}</div>
            ))}
          </div>
          <p style={{ fontSize: '0.8125rem', color: '#6B7C74', lineHeight: 1.5 }}>
            Protocolos INCA · Teste de Fagerström · TCC · Gamificação · Filosofia Estoica
          </p>
        </div>

        <button
          onClick={loginWithGoogle}
          style={{
            width: '100%', padding: '13px 20px', border: '1.5px solid #e0e0e0',
            borderRadius: 10, background: 'white', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontSize: '0.9375rem', fontWeight: 600, fontFamily: 'inherit', color: '#1A1F1D',
            transition: 'all 0.15s'
          }}
          onMouseEnter={e => e.target.style.background = '#f5f5f5'}
          onMouseLeave={e => e.target.style.background = 'white'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Entrar com Google
        </button>

        <p style={{ fontSize: '0.6875rem', color: '#9eaaa5', marginTop: '1rem', lineHeight: 1.5 }}>
          Seu progresso será salvo na nuvem e sincronizado entre dispositivos
        </p>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          '"A única coisa boa é a virtude, e o único mal é o vício." — Marco Aurélio',
          '"Você tem poder sobre sua mente, não sobre eventos externos." — Epicteto',
        ].map((q, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 14px', maxWidth: 320, textAlign: 'left' }}>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem', fontStyle: 'italic', lineHeight: 1.5 }}>{q}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
