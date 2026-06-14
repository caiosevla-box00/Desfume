// src/components/Shell.jsx
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Início', icon: (active) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9"/>
    </svg>
  )},
  { to: '/progresso', label: 'Progresso', icon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l4-8 4 5 3-4 4 7"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21H3"/>
    </svg>
  )},
  { to: '/testes', label: 'Testes', icon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
    </svg>
  )},
  { to: '/remedios', label: 'Remédios', icon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m7.5-7.5v15"/>
      <rect x="3" y="3" width="18" height="18" rx="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { to: '/cartilha', label: 'Cartilha', icon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
    </svg>
  )},
]

export default function Shell({ children }) {
  return (
    <div className="app-shell">
      <div className="page">{children}</div>
      <nav className="bottom-nav">
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            {({ isActive }) => <>{item.icon(isActive)}<span>{item.label}</span></>}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
