'use client'
import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 55
const GRAVITY = 270
const MAX_FORCE = 2.1
const DAMPING = 0.91
const GLOW_R = 115
const PARTICLE_RGB = '185,165,144'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export function CursorEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!canvas || !dot || !ring) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let gw = 0, gh = 0
    let gParticles: Particle[] = []
    let mouseX = -1000, mouseY = -1000
    let mouseIn = false
    let ringX = -1000, ringY = -1000
    let rafId = 0

    function initParticles() {
      gw = canvas!.width = window.innerWidth
      gh = canvas!.height = window.innerHeight
      gParticles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * gw,
        y: Math.random() * gh,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 1.5 + Math.random() * 2,
      }))
    }

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function animate() {
      // Gravity field tick
      if (ctx && gw) {
        ctx.clearRect(0, 0, gw, gh)
        for (const p of gParticles) {
          if (mouseIn) {
            const dx = mouseX - p.x, dy = mouseY - p.y
            const dist = Math.sqrt(dx * dx + dy * dy) || 1
            const force = Math.min(GRAVITY / (dist * dist), MAX_FORCE)
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
          p.vx *= DAMPING; p.vy *= DAMPING
          p.x += p.vx; p.y += p.vy
          p.x = ((p.x % gw) + gw) % gw
          p.y = ((p.y % gh) + gh) % gh

          const dx = mouseX - p.x, dy = mouseY - p.y
          const dist = mouseIn ? Math.sqrt(dx * dx + dy * dy) : 999
          const glow = Math.max(0, 1 - dist / GLOW_R)
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r + glow * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${PARTICLE_RGB},${0.35 + glow * 0.65})`
          ctx.fill()
        }
      }

      // Cursor ring lerp + stretch
      ringX = lerp(ringX, mouseX, 0.11)
      ringY = lerp(ringY, mouseY, 0.11)
      const dx = mouseX - ringX, dy = mouseY - ringY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const angle = dist > 1 ? Math.atan2(dy, dx) : 0
      const stretch = 1 + Math.min(dist * 0.022, 1.4)

      if (dot) dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`
      if (ring) ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%)) rotate(${angle}rad) scaleX(${stretch})`

      rafId = requestAnimationFrame(animate)
    }

    initParticles()
    rafId = requestAnimationFrame(animate)
    window.addEventListener('resize', initParticles)

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      mouseIn = true
      document.body.style.setProperty('--cursor-x', `${e.clientX}px`)
      document.body.style.setProperty('--cursor-y', `${e.clientY}px`)
      const interactive = (e.target as Element).closest('a, button, .hero-frame, .footer-block')
      dot?.classList.toggle('is-interactive', Boolean(interactive))
      ring?.classList.toggle('is-interactive', Boolean(interactive))
    }

    function onMouseOut(e: MouseEvent) {
      if (!e.relatedTarget) {
        mouseIn = false
        dot?.classList.remove('is-interactive')
        ring?.classList.remove('is-interactive')
      }
    }

    function onClick(e: MouseEvent) {
      const ripple = document.createElement('div')
      ripple.className = 'cursor-ripple'
      ripple.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;`
      document.body.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove())
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseout', onMouseOut)
    window.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', initParticles)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="cursor-gravity" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
