import type { Metadata } from 'next'
import Image from 'next/image'
import { BodyClass } from '@/components/BodyClass'
import { CursorEffects } from '@/components/CursorEffects'
import { HeroParallax } from '@/components/HeroParallax'

export const metadata: Metadata = {
  title: 'Hanoi Bites — Authentic Banh Mi & Bun Cha in Toronto | King West',
}

const UBER = 'https://www.ubereats.com/ca/store/hanoi-bites-waterworks/PniiG2piVuSMeTtGp6S_nw'

export default function HomePage() {
  return (
    <>
      <BodyClass className="page-home" />
      <CursorEffects />
      <main className="main">
        <section className="home-hero" aria-label="Hanoi Bites hero">
          <div className="home-kicker">Northern Vietnamese Cuisine · Toronto</div>
          <HeroParallax>
            <span className="postcard-stamp" aria-hidden="true">Hanoi<br />Bites</span>
            <Image
              src="/assets/hero.jpeg"
              alt="Interior of a casual restaurant or cafe with a Hanoi Bites sign"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
            <div className="hero-copy">
              <span className="hero-eyebrow">Waterworks Food Hall</span>
              <h1>The flavours of our Hanoi home</h1>
              <p>Authentic Northern Vietnamese cuisine at Waterworks Food Hall on King West. Bánh mì, Bún Chả Bowl, and Vietnamese Iced Coffee made the way we&apos;d serve them in Hanoi.</p>
              <a className="hero-order-link" href={UBER} target="_blank" rel="noreferrer">Order now</a>
            </div>
          </HeroParallax>
        </section>
      </main>
    </>
  )
}
