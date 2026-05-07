'use client'
import { useRef, useCallback } from 'react'

export function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect()
    ref.current!.style.setProperty('--hero-x', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    ref.current!.style.setProperty('--hero-y', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }, [])
  const onLeave = useCallback(() => {
    ref.current!.style.setProperty('--hero-x', '0')
    ref.current!.style.setProperty('--hero-y', '0')
  }, [])
  return <div ref={ref} className="hero-frame" onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>
}
