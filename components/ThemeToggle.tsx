'use client'
import { useEffect, useState } from 'react'

const SunIcon = () => (
  <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
    <circle cx={12} cy={12} r={4.5}/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
)

const MoonIcon = () => (
  <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  useEffect(() => { setTheme(document.documentElement.dataset.theme || 'light') }, [])
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem('hb-theme-v2', next)
  }
  return (
    <button className="theme-toggle" onClick={toggle} type="button" aria-label="Toggle dark mode">
      <SunIcon /><MoonIcon />
    </button>
  )
}
