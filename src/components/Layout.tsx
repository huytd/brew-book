import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { usePersistentState } from '../lib/storage'
import { IconBook, IconHeart, IconMoon, IconSun, IconWand } from './Icons'

const TABS = [
  { to: '/', label: 'Browse', icon: IconBook, end: true },
  { to: '/brew', label: 'What to Brew', icon: IconWand, end: false },
  { to: '/saved', label: 'Saved', icon: IconHeart, end: false },
]

type Theme = 'light' | 'dark' | 'system'

export function Layout() {
  const [theme, setTheme] = usePersistentState<Theme>('brewbook:theme', 'system')
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches)

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <NavLink to="/" className="brand" aria-label="Brew Book home">
          <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
            <ellipse cx="16" cy="16" rx="10" ry="13" fill="var(--primary)" transform="rotate(30 16 16)" />
            <path d="M11 6c5 6 5 14 10 20" stroke="var(--bg)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </svg>
          <span>Brew Book</span>
        </NavLink>
        <nav className="topnav" aria-label="Main">
          {TABS.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.end} className="topnav-link">
              {t.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="icon-btn"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label={isDark ? 'Switch to light roast (light mode)' : 'Switch to dark roast (dark mode)'}
        >
          {isDark ? <IconSun /> : <IconMoon />}
        </button>
      </header>

      <main id="main" className="main">
        <Outlet />
      </main>

      <nav className="tabbar" aria-label="Main">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="tab">
            <Icon width={22} height={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
