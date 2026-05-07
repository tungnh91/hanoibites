# Hanoi Bites — Codex

Restaurant website for **Hanoi Bites**, a Northern Vietnamese restaurant at Waterworks Food Hall, Toronto.

- **Production:** https://hanoibites.vercel.app
- **Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind (reset only) · Vercel
- **Fonts:** Libre Baskerville (serif display) + Almarai (sans UI) via Google Fonts

## Sub-docs

| Area | Doc |
|------|-----|
| Pages & CSS architecture | [`app/README.md`](app/README.md) |
| Components | [`components/README.md`](components/README.md) |

---

## Project structure

```
app/
  layout.tsx          Root layout — fonts, OG metadata, Header + Footer shell
  globals.css         All styles (no CSS modules). Single file, ~500 lines.
  page.tsx            Home page — hero, cursor effects, parallax
  menu/page.tsx       Menu page — restaurant-style item list
  about/page.tsx      About page — two-column editorial grid
  icon.png            Favicon (Next.js App Router convention)

components/
  Header.tsx          Nav + ORDER NOW modal (client)
  Footer.tsx          Location / Hours / Contact (server)
  ThemeToggle.tsx     Light/dark toggle (client)
  BodyClass.tsx       Injects class/data attrs onto <body> (client)
  CursorEffects.tsx   Particle gravity field + custom cursor (client)
  HeroParallax.tsx    Mouse-tracking parallax wrapper (client)

public/assets/
  hero.jpeg           Home page hero image
  about.png           About page photo
  logo.png            Logo (also used as OG image)

research/css/         Original static site CSS — reference only, not imported
scripts/              screenshot.ts, serve-dist.ts — dev utilities
tests/static.test.ts  Playwright smoke tests
```

---

## Design system

### Color variables (`globals.css` `:root`)

| Variable | Light | Dark | Used for |
|----------|-------|------|---------|
| `--white-hsl` | `42 35.71% 94.51%` (warm cream) | `28 10% 9%` (near-black) | Page background |
| `--black-hsl` | `30 12.5% 18.82%` (warm brown) | `40 30% 92%` (cream) | Body text, buttons |
| `--accent-hsl` | `30.73 22.65% 64.51%` (tan) | `30.73 25% 68%` | Cursor, hero text, accents |
| `--light-accent-hsl` | `33.33 32.14% 89.02%` (pale cream) | `28 12% 16%` (warm dark) | Footer background |
| `--dark-accent-hsl` | `32.5 16% 29.41%` (dark brown) | `32 22% 78%` (light tan) | Section labels, icon color |

> **Key invariant:** In dark mode `--black-hsl` ↔ `--white-hsl` effectively swap. Any element using `hsl(var(--black-hsl))` for text automatically reads as light in dark mode. Don't hardcode `#fff` or `#000` — use the variables.

### Typography rules

- **Display / headings:** Libre Baskerville, `letter-spacing: -0.02em`
- **UI / labels / prices:** Almarai sans-serif
- **Section eyebrows:** Almarai, `10.5px`, `font-weight: 700`, `letter-spacing: 0.14–0.18em`, `text-transform: uppercase`, color `hsl(var(--dark-accent-hsl))`
- **Body text:** 16–17.5px, `line-height: 1.7`

### Border-radius conventions

| Element | Radius |
|---------|--------|
| Hero image | `18px` |
| About image | `18px` |
| Logo | `14px` |
| Order modal cards | `22px` (desktop), `16px` (mobile) |
| ORDER NOW button | `6px` |

---

## Theme persistence

- Stored in `localStorage` key `hb-theme-v2` (values: `'light'` / `'dark'`).
- FOUC prevention: inline `<script>` in `<head>` reads localStorage and sets `document.documentElement.dataset.theme` before paint.
- CSS selectors: `:root` = light defaults; `[data-theme="dark"]` overrides.

---

## Deploy

```bash
vercel --prod
```

Builds with `next build` (static export + serverless functions). All pages are statically pre-rendered (`○ Static`).

---

## Dev

```bash
npm run dev     # localhost:3000
npm run build   # production build check
```

Visual verification after deploys uses Playwright (see `scripts/screenshot.ts`).

---

## Content & business info

- **Address:** K5 – 50 Brant St, Toronto, ON M5V 3G9 (Waterworks Food Hall, King West)
- **Hours:** Sun–Mon 11:00 AM–8:45 PM · Tue–Sat 11:00 AM–9:00 PM
- **Email:** hanoibites@gmail.com · **Phone:** (416) 892-8563
- **Instagram:** @hanoibites
- **Order links:** Uber Eats, DoorDash, Ritual (see `components/Header.tsx`)
