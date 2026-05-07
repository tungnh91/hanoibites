'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'

const UBER = 'https://www.ubereats.com/ca/store/hanoi-bites-waterworks/PniiG2piVuSMeTtGp6S_nw'
const DOORDASH = 'https://www.doordash.com/en-CA/store/hanoi-bites-toronto-26020699/32546554/'
const RITUAL = 'https://ritual.co/order/hanoi-bites-waterworks-food-hall-toronto/c01f90'
const IG = 'https://www.instagram.com/hanoibites/'

const InstagramSVG = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M46.91 25.816c-.073-1.597-.326-2.687-.697-3.641-.383-.986-.896-1.823-1.73-2.657-.834-.834-1.67-1.347-2.657-1.73-.954-.371-2.045-.624-3.641-.697C36.585 17.017 36.074 17 32 17s-4.585.017-6.184.09c-1.597.073-2.687.326-3.641.697-.986.383-1.823.896-2.657 1.73-.834.834-1.347 1.67-1.73 2.657-.371.954-.624 2.045-.697 3.641C17.017 27.415 17 27.926 17 32c0 4.074.017 4.585.09 6.184.073 1.597.326 2.687.697 3.641.383.986.896 1.823 1.73 2.657.834.834 1.67 1.347 2.657 1.73.954.371 2.045.624 3.641.697C27.415 46.983 27.926 47 32 47s4.585-.017 6.184-.09c1.597-.073 2.687-.326 3.641-.697.986-.383 1.823-.896 2.657-1.73.834-.834 1.347-1.67 1.73-2.657.371-.954.624-2.045.697-3.641C46.983 36.585 47 36.074 47 32s-.017-4.585-.09-6.184ZM32 39.703c-4.254 0-7.703-3.449-7.703-7.703S27.746 24.297 32 24.297 39.703 27.746 39.703 32 36.254 39.703 32 39.703Zm8.007-13.91c-.994 0-1.8-.806-1.8-1.8s.806-1.8 1.8-1.8 1.8.806 1.8 1.8-.806 1.8-1.8 1.8Z"/>
  </svg>
)

// Simplified provider mark icons — stroke-based, currentColor, same visual weight
const ForkIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="13" y1="7" x2="13" y2="17"/>
    <line x1="20" y1="7" x2="20" y2="17"/>
    <line x1="27" y1="7" x2="27" y2="17"/>
    <path d="M13 17 Q13 23 20 23 Q27 23 27 17"/>
    <line x1="20" y1="23" x2="20" y2="36"/>
  </svg>
)

const BagIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 18 L10 34 Q10 36 12 36 L28 36 Q30 36 30 34 L32 18 Z"/>
    <path d="M15 18 L15 13 Q15 8 20 8 Q25 8 25 13 L25 18"/>
    <line x1="8" y1="23" x2="32" y2="23"/>
  </svg>
)

const CupIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18 L11 34 Q11 36 13 36 L27 36 Q29 36 29 34 L31 18 Z"/>
    <line x1="9" y1="18" x2="31" y2="18"/>
    <path d="M29 22 Q35 22 35 27 Q35 32 29 32"/>
    <path d="M16 14 Q17 11 16 8"/>
    <path d="M20 14 Q21 11 20 8"/>
    <path d="M24 14 Q25 11 24 8"/>
  </svg>
)

const ORDER_OPTIONS = [
  { label: 'Uber Eats', url: UBER, Icon: ForkIcon },
  { label: 'DoorDash', url: DOORDASH, Icon: BagIcon },
  { label: 'Ritual', url: RITUAL, Icon: CupIcon },
]

export function Header() {
  const path = usePathname()
  const [orderOpen, setOrderOpen] = useState(false)

  useEffect(() => {
    if (!orderOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOrderOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [orderOpen])

  const nav = (href: string, label: string) => {
    const active = (href === '/' ? path === '/' : path.startsWith(href))
    return <Link href={href} className={`nav-link${active ? ' active' : ''}`}>{label}</Link>
  }

  return (
    <header className="site-header">
      <nav className="nav-left" aria-label="Primary navigation">
        {nav('/', 'Home')}
        {nav('/menu', 'Menu')}
        {nav('/about', 'About')}
      </nav>
      <Link href="/" className="logo-link" aria-label="Hanoi Bites home">
        <Image className="logo" src="/assets/logo.png" alt="Your shortest way to Northern Vietnamese Cuisine" width={88} height={88} priority />
      </Link>
      <div className="nav-right">
        <a className="instagram" href={IG} target="_blank" rel="noreferrer" aria-label="Instagram">
          <InstagramSVG />
        </a>
        <button
          className={`order-button${orderOpen ? ' open' : ''}`}
          onClick={() => setOrderOpen(o => !o)}
          aria-expanded={orderOpen}
          aria-haspopup="dialog"
        >
          Order now
        </button>
        <ThemeToggle />
      </div>

      {orderOpen && (
        <div className="order-overlay" onClick={() => setOrderOpen(false)} role="dialog" aria-modal="true" aria-label="Choose ordering platform">
          <button className="order-close" onClick={() => setOrderOpen(false)} aria-label="Close">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <line x1="4" y1="4" x2="16" y2="16"/>
              <line x1="16" y1="4" x2="4" y2="16"/>
            </svg>
          </button>
          <div className="order-content" onClick={e => e.stopPropagation()}>
            <p className="order-eyebrow">Choose where to order</p>
            <div className="order-cards">
              {ORDER_OPTIONS.map(({ label, url, Icon }, i) => (
                <a
                  key={label}
                  className="order-card"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOrderOpen(false)}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="order-card-icon"><Icon /></div>
                  <p className="order-card-name">{label}</p>
                  <span className="order-card-cta">Order →</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
