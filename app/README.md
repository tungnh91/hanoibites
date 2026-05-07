# app/ — Pages & CSS Architecture

See also: [`../README.md`](../README.md) · [`../components/README.md`](../components/README.md)

---

## Routes

| Route | File | Notes |
|-------|------|-------|
| `/` | `page.tsx` | Home — hero image, cursor effects, parallax. Adds `page-home` class to `<body>` via `BodyClass`. |
| `/menu` | `menu/page.tsx` | Restaurant menu — 3 sections (Banh Mi, Vermicelli Bowl, Drinks). Static. |
| `/about` | `about/page.tsx` | About page — 2-column editorial grid (copy left, image right). |

All pages are statically pre-rendered. No API routes or server actions.

---

## layout.tsx

Wraps every page. Responsibilities:
- Loads Google Fonts (Libre Baskerville + Almarai)
- Inline FOUC-prevention script (reads `hb-theme-v2` from localStorage, sets `data-theme` before paint)
- Renders `<Header>` and `<Footer>` around `{children}`
- Global OG / Twitter Card metadata
- `<body data-prototype="micro">` — controls which home-page prototype variant is active

**To change the active home prototype**, edit `data-prototype` on `<body>` in `layout.tsx`:
```
micro | quiet | postcard | foodhall | minimal
```

---

## globals.css

Single CSS file, ~500 lines. No CSS modules, no scoped styles. Structure:

### 1. Design tokens (`:root` / `[data-theme="dark"]`) — lines 1–26
CSS custom properties for the color system. See color table in root README.

### 2. Base resets & typography — lines 27–44
Global element styles. `h1–h4` default to Libre Baskerville. `p { margin: 0 }`.

### 3. Header — lines 46–88
`.site-header` is `position: relative; z-index: 100; height: 108px`. Logo is `position: absolute; top: 50%; left: 50%` (centered). Both navs are `position: absolute; top: 50%` (left/right edges).

**ORDER NOW button** (`order-button`): plain `<button>`, toggles `order-overlay` modal. Dark mode: background switches to `hsl(var(--accent-hsl))` (tan) with dark text.

**Order modal** (`order-overlay`): `position: fixed; inset: 0; backdrop-filter: blur(28px)`. Three platform cards (Uber Eats, DoorDash, Ritual) animate in with staggered `card-in` keyframe. Click outside or Escape closes. Body scroll locked while open.

### 4. Footer — lines 98–106
`.footer` background: `hsl(var(--light-accent-hsl))` — this adapts automatically (cream in light mode, warm dark in dark mode). Three-column grid desktop, stacked mobile.

### 5. Menu page — lines 108–121
Narrow container (`min(640px, ...)`). Left-aligned. Items use flexbox row for name+price, description below. Thin `1px` rules between items. Section labels are uppercase Almarai eyebrows.

### 6. About page — lines 123–133
Two-column CSS grid (`1fr 1fr`). Copy (eyebrow → title → paragraphs → CTA) in column 1; image spans all rows in column 2. Image is `height: 825px; border-radius: 18px`.

### 7. Mobile overrides (`@media (max-width: 767px)`) — lines 135–235
Header becomes flex-wrap row: logo left (`margin-right: auto`), nav-right right, nav-left full-width second row centered. Instagram icon hidden on mobile; ORDER NOW stays visible.

### 8. Home prototype layer — lines 237–510
**Only applies when `<body class="page-home">`** (set by `BodyClass` in `app/page.tsx`).

Sub-sections:
- Shared transitions for logo/nav/button (slow ease)
- Cursor system: `.cursor-gravity` canvas, `.cursor-dot`, `.cursor-ring`
- Cursor states: `.is-interactive` grows cursor; `.cursor-ripple` on click
- Home nav active fix: `.page-home .nav-link.active { text-decoration: underline }` (higher specificity needed because the prototype hover rule would otherwise win)
- Five prototype variants (`quiet`, `postcard`, `foodhall`, `minimal`, `micro`) each override hero/header/footer appearance

### Key specificity notes

| Issue | Cause | Fix applied |
|-------|-------|-------------|
| Active `Home` nav link no underline | `.page-home .nav-link:hover { text-decoration: none }` (specificity 0,2,1) beat `.nav-link.active` (0,2,0) on mobile tap | Added `.page-home .nav-link.active { text-decoration: underline }` and changed hover to `:not(.active):hover` |
| Moon icon showing in light mode | `.theme-toggle svg { display: block }` (specificity 0,1,1) beat `.icon-moon { display: none }` (0,1,0) | Fixed by using `.theme-toggle .icon-moon { display: none }` (0,2,0) |
| ORDER NOW invisible in dark mode | `--white-hsl` inverts to near-black in dark mode | Dark mode override uses `hsl(var(--accent-hsl))` background instead |
| Order panel clipped by hero | Hero `position: relative` painted over panel (later in DOM) | Added `z-index: 100` to `.site-header` |

---

## Metadata

Each page exports its own `metadata` object. Root `layout.tsx` provides OG/Twitter defaults. The OG image is `https://hanoibites.vercel.app/assets/logo.png` (1500×1498). Favicon is `app/icon.png` (Next.js App Router convention, copied from the logo).
