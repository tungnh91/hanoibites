import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Hanoi Bites — Our Story | Hanoi to Toronto',
  description: 'The Hanoi Bites story: authentic Northern Vietnamese flavours from Hanoi to Toronto.',
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-grid" aria-label="Who we are">
        <p className="about-eyebrow">Our Story</p>
        <h1 className="about-title">Who we are</h1>
        <div className="about-copy">
          <p className="about-lead">I grew up in Hanoi, where we pour our hearts into every dish.</p>
          <p>When I moved to Toronto in 2018, I found a city full of food lovers — but it was missing the authentic, original flavours of my home.</p>
          <p>Hanoi Bites was born to fill that gap.</p>
          <p>You might notice our menu is short. That&apos;s intentional. In Hanoi, restaurants don&apos;t try to do everything. The best ones spend generations perfecting one or two dishes — a single bowl of bún chả, one type of phở, one banh mi. That focus is what makes the food extraordinary.</p>
          <p>We brought the same philosophy to Toronto. A few signature dishes, made the way we&apos;d serve them in Hanoi. Small menu, big care.</p>
          <p>This is our taste of home, shared with you.</p>
          <p className="about-cta">Follow our kitchen → @hanoibites</p>
        </div>
        <div className="about-image-wrap">
          <Image src="/assets/about.png" alt="Tết 2025 Party hosted by Hanoi Bites" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
        </div>
      </section>
    </main>
  )
}
