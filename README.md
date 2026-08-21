# The Olaniyis Wedding

**Azeezat & Muiez — 28 November 2026 — The Beginning of Forever**

A premium, single-page wedding website. React + TypeScript + Vite + Tailwind
CSS + Framer Motion + Three.js (React Three Fiber). Frontend-only — no
backend, no database, static hosting.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

## Content

All real content is wired in — Azeezat & Muiez's story, the real venue and
family details, the real gallery photography, and the real music track.
Everything below is a matter of editing data files; no component code needs
to change.

| What | Where to edit |
|---|---|
| Couple names, date, tagline | `src/data/wedding.ts` |
| "Our Story" copy + milestone photos | `src/data/story.ts` |
| Ceremony/reception/dress code details | `src/data/details.ts` |
| Family names | `src/data/family.ts` |
| Order-of-day timeline | `src/data/timeline.ts` |
| Gallery photos | `src/data/gallery.ts` |
| Gift list | `src/data/gifts.ts` |
| RSVP contacts / WhatsApp numbers | `src/config/site.ts` |
| Hero + final-message photos | `src/data/media.ts` |
| Background music | `public/audio/wedding-music.mp3` |

### Photography pipeline

Every photo (hero, story, gallery, final message) is exported at
`{name}-480.{avif,webp,jpg}` plus a width-less `{name}.jpg` fallback — the
`<Image>` component (`src/components/common/Image.tsx`) expects exactly
that convention, requesting only the breakpoints at or below the image's
declared intrinsic `width`. To swap in higher-resolution originals later,
export the same widths × three formats (AVIF/WebP/JPEG) into
`public/images/...` and update the matching `width`/`height` in the data
file — those drive the `<img>`'s intrinsic size so nothing shifts as images
load. `scripts/generate-placeholders.mjs` is no longer used for photography
but still generates the favicon/social-preview assets.

### Music

`public/audio/wedding-music.mp3` is the couple's real track. It only starts
once a visitor presses "Open Invitation" on the intro envelope — never on
autoplay.

### RSVP / gifting / guest-love links

This is a static, backend-free site by design — RSVP and "send your love"
hand off to an external service instead of submitting to a server. Point
`rsvpConfig` and `guestLoveConfig` in `src/config/site.ts` at a real Google
Form / Tally / WhatsApp number.

## Project structure

```
src/
  components/    One folder per section (hero, story, gallery, rsvp, ...)
  components/common/   Shared primitives: Monogram, Image, Button, ScrollReveal...
  components/three/    The lazy-loaded 3D gold wedding rings + WebGL fallback
  data/          Structured content — this is what you edit for real content
  config/        Site-wide constants (external links)
  hooks/         useCountdown, useMusic, useReducedMotion, useScrollNav
  lib/           Small pure helpers (motion easing constant, path helper)
  types/         Shared content TypeScript types
scripts/
  generate-placeholders.mjs   Regenerates every placeholder image/favicon/OG asset
```

## Design system

Colors, fonts and the gold wedding rings emblem are defined once and reused everywhere:

- Colors: `src/index.css` (`@theme` block) — wine, wine-deep, burgundy, gold,
  gold-light, ivory, warm-white, dark, muted.
- Fonts: Prata (display) + Plus Jakarta Sans (body — stands in for
  "Satoshi", which isn't distributable via npm; swap the `@import`s at the
  top of `src/index.css` if you get a licensed Satoshi file).
- Image corners: a single `.rounded-elegant` utility (`src/index.css`) is
  used everywhere a real photo is framed (gallery, story, lightbox) — keeps
  one consistent radius instead of ad-hoc values.
- Wedding rings emblem: `src/components/common/WeddingRings.tsx` (2D, pure
  SVG, no font/image dependency) and `src/components/three/WeddingRingsScene.tsx` (3D).

## Performance & resilience notes

- The intro overlay never blocks the page underneath from mounting or
  fetching — it's a purely visual layer (`src/components/intro/IntroExperience.tsx`).
- The 3D wedding rings are code-split into their own chunk, lazy-loaded, and
  only mount after confirming WebGL support; they fall back to the static 2D
  mark on failure, low-power devices, or `prefers-reduced-motion`.
- Background music uses `preload="none"` until the visitor opts in, and the
  floating control disappears entirely if the audio fails to load.
- All animation respects `prefers-reduced-motion` (see the media query in
  `src/index.css` plus `useReducedMotion`).
- Gallery/hero images ship as responsive AVIF/WebP/JPEG with explicit
  width/height (no layout shift) and lazy-load below the fold.

## Deploying

`npm run build` produces a fully static `dist/` folder — deploy it to
Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any static host.
