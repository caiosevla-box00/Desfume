import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Shell from './components/Shell'
import Home from './pages/Home'
import Progress from './pages/Progress'
import Tests from './pages/Tests'
import Cartilha from './pages/Cartilha'
import Medications from './pages/Medications'
import Profile from './pages/Profile'
import { useUserData } from './hooks/useUserData'

function ProtectedApp() {
  const { data, loaded, update, logCigarette } = useUserData()

  if (!loaded) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100dvh', flexDirection:'column', gap:16, background:'#F4FAF7' }}>
      <div style={{ width:44, height:44, border:'3px solid #DCF0E7', borderTopColor:'#1A6B42', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <p style={{ color:'#6B8A74', fontSize:14, fontFamily:"'DM Sans', sans-serif", fontWeight:600 }}>Carregando seu progresso...</p>
    </div>
  )

  if (!data.onboardingDone) return <Onboarding data={data} update={update} />

  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home data={data} update={update} logCigarette={logCigarette} />} />
        <Route path="/progresso" element={<Progress data={data} />} />
        <Route path="/testes" element={<Tests data={data} update={update} />} />
        <Route path="/cartilha" element={<Cartilha />} />
        <Route path="/remedios" element={<Medications data={data} update={update} />} />
        <Route path="/perfil" element={<Profile data={data} update={update} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Shell>
  )
}

export default function App() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Login />
  return <ProtectedApp />
}
