import { useAuth } from '../contexts/AuthContext'
import Logo from '../components/Logo'

export default function Login() {
  const { loginWithGoogle } = useAuth()
  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(170deg, #0A3D2B 0%, #1A6B42 50%, #F4FAF7 100%)',
      padding: '2rem 1.5rem',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Logo size={96} />
        <h1 style={{ fontFamily: "'DM Sans', sans-serif", color: 'white', fontSize: '2.75rem', fontWeight: 800, marginTop: '1rem', letterSpacing: '-1px' }}>
          Desfume
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginTop: '0.5rem' }}>
          Ciência e força para parar de fumar
        </p>
      </div>

      <div style={{ background: 'white', borderRadius: 20, padding: '2rem 1.5rem', width: '100%', maxWidth: 360, boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '1.5rem' }}>
          {[
            { e: '🩺', t: 'Protocolo INCA' },
            { e: '🧠', t: 'TCC validada' },
            { e: '📊', t: 'Monitoramento' },
            { e: '🏆', t: 'Gamificação' },
          ].map(item => (
            <div key={item.t} style={{ background: '#F4FAF7', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.375rem', marginBottom: 4 }}>{item.e}</div>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#0A3D2B' }}>{item.t}</div>
            </div>
          ))}
        </div>

        <button onClick={loginWithGoogle} style={{
          width: '100%', padding: '14px 20px', border: '1.5px solid #DCF0E7',
          borderRadius: 12, background: 'white', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          fontSize: '1rem', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", color: '#0A3D2B',
          transition: 'all 0.15s', boxShadow: '0 2px 8px rgba(10,61,43,0.08)'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Entrar com Google
        </button>
        <p style={{ fontSize: '0.6875rem', color: '#9BB5A4', marginTop: '1rem', textAlign: 'center', lineHeight: 1.5 }}>
          Progresso salvo na nuvem · Sincronizado entre dispositivos
        </p>
      </div>

      <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 360 }}>
        {[
          '"A disciplina é a maior forma de amor-próprio." — Epicteto',
          '"Você tem poder sobre sua mente, não sobre eventos externos." — Marco Aurélio',
        ].map((q, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>{q}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
