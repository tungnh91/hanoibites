# components/ — Component Reference

See also: [`../README.md`](../README.md) · [`../app/README.md`](../app/README.md)

All components are in the root `components/` directory and imported via the `@/components/` alias.

---

## Header.tsx `'use client'`

**Renders:** site navigation, centered logo, ORDER NOW button, Instagram link, theme toggle.

**State:** `orderOpen: boolean` — toggles the order platform modal.

**Effects:**
- When `orderOpen` is true: locks `document.body.style.overflow = 'hidden'`, adds `keydown` listener for Escape to close.

**Order modal (`order-overlay`):**
- `position: fixed; inset: 0` — full viewport, above all content (`z-index: 500`).
- `backdrop-filter: blur(28px)` blurs the page behind it.
- Three platform cards: **Uber Eats** (fork icon), **DoorDash** (bag icon), **Ritual** (cup icon).
- Icons are inline SVGs (`fill="none"`, `stroke="currentColor"`, `strokeWidth="1.4"`) — adapt to light/dark mode via `color: hsl(var(--dark-accent-hsl))`.
- Cards animate in with staggered `animationDelay` (0, 0.08s, 0.16s) using `card-in` keyframe (scale + translate).
- Click outside cards (on overlay backdrop) closes the modal. ✕ button top-right also closes.

**Active nav logic:**
```ts
const active = href === '/' ? path === '/' : path.startsWith(href)
// Home uses strict equality to avoid matching /menu, /about
```

**URLs (hardcoded constants):**
```
UBER     = ubereats.com/ca/store/hanoi-bites-waterworks/PniiG2piVuSMeTtGp6S_nw
DOORDASH = doordash.com/en-CA/store/hanoi-bites-toronto-26020699/32546554/
RITUAL   = ritual.co/order/hanoi-bites-waterworks-food-hall-toronto/c01f90
IG       = instagram.com/hanoibites/
```

---

## Footer.tsx (server component)

**Renders:** three-column grid — Location, Hours, Contact.

Static. No state, no interactivity.

Background adapts to theme via `hsl(var(--light-accent-hsl))` — cream in light mode, warm dark in dark mode.

Hours use a `<dl>` with CSS grid (`grid-template-columns: auto auto`) so times never wrap.

---

## ThemeToggle.tsx `'use client'`

Toggle button that switches between light and dark mode.

**Persistence:** reads/writes `localStorage` key `hb-theme-v2`. Sets `document.documentElement.dataset.theme`.

**Icons:** Two SVGs (`icon-sun`, `icon-moon`) always in the DOM. CSS controls visibility:
```css
.theme-toggle .icon-moon { display: none; }
[data-theme="dark"] .theme-toggle .icon-sun { display: none; }
[data-theme="dark"] .theme-toggle .icon-moon { display: block; }
```
The specificity is intentionally `.theme-toggle .icon-*` (0,2,0) to beat `.theme-toggle svg { display: block }` (0,1,1).

---

## BodyClass.tsx `'use client'`

Utility component for injecting classes or `data-*` attributes onto `<body>` from within a page component (which can't directly access `<body>`).

```tsx
<BodyClass className="page-home" />
// or
<BodyClass dataset={{ prototype: 'micro' }} />
```

Cleans up on unmount. Used by the home page to add `page-home` class, which enables the cursor system and prototype-layer CSS.

---

## CursorEffects.tsx `'use client'`

Renders three overlays on the home page:
1. **`<canvas className="cursor-gravity">`** — 55 particle gravity field. Particles are attracted to the cursor when it's inside the viewport. Particles wrap at edges.
2. **`<div className="cursor-dot">`** — 7px dot that follows the cursor exactly.
3. **`<div className="cursor-ring">`** — 28px ring that lerps toward the cursor (lag factor 0.11), stretches in the direction of movement (`scaleX` based on velocity).

**Key constants:**
```ts
PARTICLE_COUNT = 55
GRAVITY        = 270   // attraction strength
MAX_FORCE      = 2.1   // velocity cap per tick
DAMPING        = 0.91  // velocity decay
GLOW_R         = 115   // px radius for cursor glow on particles
PARTICLE_RGB   = '185,165,144'  // warm tan, matches --accent-hsl
```

**Interactive state:** when cursor is over `a, button, .hero-frame, .footer-block`, both dot and ring get `.is-interactive` class (CSS scales them up / changes blend mode).

**Click ripple:** on any click, a `.cursor-ripple` div is appended to `<body>` and removed when its CSS animation ends.

Only mounted on the home page (rendered inside `app/page.tsx`).

---

## HeroParallax.tsx `'use client'`

Thin wrapper around the hero image frame. Tracks mouse position within the frame and sets `--hero-x` / `--hero-y` CSS custom properties (range −0.5 to +0.5).

The prototype-layer CSS (`globals.css`) uses these properties to apply 3-layer parallax:
```css
.hero-frame        { transform: translate(calc(var(--hero-x) * -8px), ...) }
.hero-frame img    { transform: scale(1.035) translate(calc(var(--hero-x) * 15px), ...) }
.hero-copy         { transform: translateY(-50%) translate(calc(var(--hero-x) * 18px), ...) }
```

Resets to 0 on `mouseleave`.

---

## Adding a new component

1. Create `components/MyComponent.tsx`. Add `'use client'` only if it needs browser APIs or state.
2. Import via `@/components/MyComponent`.
3. CSS goes in `app/globals.css` — add a comment block with the component name.
4. Update this README.
