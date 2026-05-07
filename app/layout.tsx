import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CursorEffects } from '@/components/CursorEffects'

export const metadata: Metadata = {
  title: 'Hanoi Bites — Authentic Banh Mi & Bun Cha in Toronto | King West',
  description: 'Authentic Northern Vietnamese cuisine at Waterworks Food Hall on King West.',
  openGraph: {
    title: 'Hanoi Bites — Authentic Banh Mi & Bun Cha in Toronto',
    description: 'Authentic Northern Vietnamese cuisine at Waterworks Food Hall on King West.',
    url: 'https://hanoibites.vercel.app',
    siteName: 'Hanoi Bites',
    images: [{ url: 'https://hanoibites.vercel.app/assets/logo.png', width: 1500, height: 1498 }],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Hanoi Bites — Authentic Banh Mi & Bun Cha in Toronto',
    description: 'Authentic Northern Vietnamese cuisine at Waterworks Food Hall on King West.',
    images: ['https://hanoibites.vercel.app/assets/logo.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* FOUC prevention — always default to light */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.dataset.theme=localStorage.getItem('hb-theme-v2')||'light'` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Almarai:ital,wght@0,400;0,700&display=swap" rel="stylesheet" />
      </head>
      <body data-prototype="micro">
        <CursorEffects />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
