// Generates every placeholder raster asset the site needs so it runs and
// looks intentional before real photography/branding exists:
//   - favicon-derived PNGs, apple-touch-icon, site.webmanifest icons
//   - social share preview (OG image)
//   - gallery / hero / story / final-message placeholder photography
//     (wine gradient "frames" with the A × M monogram watermark), each
//     exported as AVIF + WebP + JPEG at responsive widths.
//
// Run with: node scripts/generate-placeholders.mjs
// Safe to delete once real assets are dropped in — nothing else depends on
// this file at build/runtime.

import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const galleryDir = path.join(publicDir, 'images', 'gallery');
const heroDir = path.join(publicDir, 'images', 'hero');
const finalDir = path.join(publicDir, 'images', 'final');

const WINE = '#5A1024';
const WINE_DEEP = '#3B0716';
const GOLD = '#C9A45C';
const GOLD_LIGHT = '#E2C98A';
const IVORY = '#FFFDF8';
const BLUSH = '#E8B7A0';
const BURGUNDY = '#741B35';
const AMBER = '#B8823A';

// A handful of warm gradient pairings so the placeholder set feels varied
// and lively rather than one flat wine rectangle repeated nine times.
const PALETTES = [
  [WINE, WINE_DEEP],
  [BURGUNDY, WINE_DEEP],
  [AMBER, WINE],
  ['#9C3B4E', WINE_DEEP],
  [WINE, '#22060F'],
];

function paletteFor(index) {
  return PALETTES[index % PALETTES.length];
}

// Simple seeded PRNG so the "confetti/fairy-light" bokeh dots are varied
// but reproducible across runs (no external randomness dependency).
function makeRng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Soft scattered "fairy light" bokeh dots — a warm, festive touch that
 * reads as lively/celebratory rather than a flat corporate placeholder. */
function bokehDots(w, h, seed) {
  const rng = makeRng(seed + 1);
  const colors = [GOLD_LIGHT, GOLD, BLUSH, IVORY];
  const count = 16;
  let dots = '';
  for (let i = 0; i < count; i++) {
    const x = rng() * w;
    const y = rng() * h;
    const r = (0.006 + rng() * 0.02) * Math.min(w, h);
    const color = colors[Math.floor(rng() * colors.length)];
    const opacity = 0.25 + rng() * 0.5;
    dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="${opacity.toFixed(2)}" />`;
  }
  return dots;
}

function monogramPaths(cx, cy, scale, color, strokeWidth) {
  // Same geometry as src/components/common/Monogram.tsx, just parameterised
  // for arbitrary placement/scale inside a larger canvas.
  const t = (x, y) => `${cx + (x - 50) * scale},${cy + (y - 50) * scale}`;
  const sw = strokeWidth;
  return `
    <path d="M${t(40, 24)} L${t(22, 76)} M${t(40, 24)} L${t(58, 76)} M${t(28.84, 56.24)} L${t(51.16, 56.24)}"
      fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M${t(42, 76)} L${t(42, 26)} L${t(60, 50)} L${t(78, 26)} L${t(78, 76)}"
      fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" />
  `;
}

/** A warm, festive gradient frame with scattered fairy-light bokeh and a
 * faint monogram watermark — reads as an intentional, lively placeholder
 * rather than a flat corporate rectangle. */
function placeholderSvg(w, h, opts = {}) {
  const { label: rawLabel = '', dense = false, paletteIndex = 0, seed = 0 } = opts;
  const label = rawLabel.replace(/&/g, '&amp;');
  const mono = Math.min(w, h) * 0.42;
  const cx = w / 2;
  const cy = h / 2;
  const scale = mono / 100;
  const [from, to] = paletteFor(paletteIndex);

  return `
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${from}" />
        <stop offset="100%" stop-color="${to}" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="30%" r="80%">
        <stop offset="0%" stop-color="${GOLD_LIGHT}" stop-opacity="0.28" />
        <stop offset="100%" stop-color="${GOLD_LIGHT}" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)" />
    <rect width="${w}" height="${h}" fill="url(#glow)" />
    ${bokehDots(w, h, seed)}
    ${dense ? `<rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="${GOLD_LIGHT}" stroke-opacity="0.3" stroke-width="${Math.max(2, w * 0.004)}" />` : ''}
    <g opacity="0.4">${monogramPaths(cx, cy, scale, GOLD_LIGHT, Math.max(1.2, w * 0.0028))}</g>
    ${
      label
        ? `<text x="${w / 2}" y="${h - Math.max(24, h * 0.06)}" text-anchor="middle"
            font-family="Georgia, serif" font-size="${Math.max(14, Math.min(w, h) * 0.032)}"
            fill="${GOLD_LIGHT}" fill-opacity="0.85" letter-spacing="${Math.max(2, w * 0.004)}">${label}</text>`
        : ''
    }
  </svg>`;
}

const WIDTHS = [480, 768, 1200, 1600];

async function exportResponsiveSet(svg, baseName, dir, widths = WIDTHS) {
  await mkdir(dir, { recursive: true });
  const svgBuffer = Buffer.from(svg);
  const base = sharp(svgBuffer);
  const meta = await base.metadata();
  const results = [];
  for (const w of widths) {
    if (w > (meta.width ?? w)) continue;
    const resized = sharp(svgBuffer).resize({ width: w });
    const jpg = resized.clone().jpeg({ quality: 72, mozjpeg: true });
    const webp = resized.clone().webp({ quality: 68 });
    const avif = resized.clone().avif({ quality: 55, effort: 2 });
    await Promise.all([
      jpg.toFile(path.join(dir, `${baseName}-${w}.jpg`)),
      webp.toFile(path.join(dir, `${baseName}-${w}.webp`)),
      avif.toFile(path.join(dir, `${baseName}-${w}.avif`)),
    ]);
    results.push(w);
    console.log(`  ✓ ${baseName}-${w} (jpg/webp/avif)`);
  }
  // A default (largest requested) width with no suffix, for simple <img src>.
  const fallbackWidth = widths[widths.length - 1];
  await sharp(svgBuffer)
    .resize({ width: fallbackWidth })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(path.join(dir, `${baseName}.jpg`));
  return results;
}

async function main() {
  // ---- Gallery placeholders -------------------------------------------
  const galleryFrames = [
    { id: 'placeholder-01', w: 1200, h: 1500, label: 'AZEEZAT & MUIEZ' },
    { id: 'placeholder-02', w: 1600, h: 1067, label: 'THE BEGINNING OF FOREVER' },
    { id: 'placeholder-03', w: 1200, h: 1200, label: '28 · 11 · 2026' },
    { id: 'placeholder-04', w: 1200, h: 1500, label: 'AZEEZAT & MUIEZ' },
    { id: 'placeholder-05', w: 1600, h: 1067, label: 'THE OLANIYIS WEDDING' },
    { id: 'placeholder-06', w: 1200, h: 1200, label: '28 · 11 · 2026' },
    { id: 'placeholder-07', w: 1200, h: 1500, label: 'THE BEGINNING OF FOREVER' },
    { id: 'placeholder-08', w: 1600, h: 1067, label: 'AZEEZAT & MUIEZ' },
    { id: 'placeholder-09', w: 1200, h: 1200, label: 'THE OLANIYIS WEDDING' },
  ];
  for (const [i, frame] of galleryFrames.entries()) {
    const svg = placeholderSvg(frame.w, frame.h, { label: frame.label, dense: true, paletteIndex: i, seed: i * 97 + 3 });
    await exportResponsiveSet(svg, frame.id, galleryDir, WIDTHS.filter((w) => w <= frame.w));
  }

  // ---- Hero image (portrait-friendly crop, tall canvas) -----------------
  // No baked label here — this is a full-bleed background that real copy
  // renders on top of, so a caption baked into the placeholder itself just
  // risks peeking out from behind the overlay at odd crops/breakpoints.
  const heroSvg = placeholderSvg(1600, 2000, { paletteIndex: 0, seed: 11 });
  await exportResponsiveSet(heroSvg, 'hero', heroDir, [480, 768, 1200, 1600]);

  // ---- Final message image ----------------------------------------------
  const finalSvg = placeholderSvg(1600, 1200, { paletteIndex: 3, seed: 42 });
  await exportResponsiveSet(finalSvg, 'final', finalDir, [480, 768, 1200, 1600]);

  // ---- Social share preview (1200x630, flattened — OG needs a single file)
  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${WINE}" />
        <stop offset="100%" stop-color="${WINE_DEEP}" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)" />
    <g transform="translate(600,235)">${monogramPaths(0, 0, 1.1, GOLD, 3)}</g>
    <text x="600" y="420" text-anchor="middle" font-family="Georgia, serif" font-size="54" fill="${IVORY}" letter-spacing="2">AZEEZAT &amp; MUIEZ</text>
    <text x="600" y="466" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="${GOLD_LIGHT}" letter-spacing="6">THE OLANIYIS WEDDING</text>
    <text x="600" y="512" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="${GOLD_LIGHT}" letter-spacing="4" opacity="0.85">28 NOVEMBER 2026 · THE BEGINNING OF FOREVER</text>
  </svg>`;
  await sharp(Buffer.from(ogSvg)).jpeg({ quality: 82 }).toFile(path.join(publicDir, 'social-preview.jpg'));

  // ---- Favicon-derived assets --------------------------------------------
  const faviconSvg = `
  <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <rect width="256" height="256" rx="0" fill="${WINE}" />
    <g transform="translate(128,128)">${monogramPaths(0, 0, 2.2, GOLD, 6)}</g>
  </svg>`;
  await sharp(Buffer.from(faviconSvg)).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32.png'));
  await sharp(Buffer.from(faviconSvg)).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
  await sharp(Buffer.from(faviconSvg)).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));

  const manifest = {
    name: 'The Olaniyis Wedding',
    short_name: 'A × M',
    description: 'Azeezat & Muiez — 28 November 2026. The Beginning of Forever.',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#5A1024',
    background_color: '#FFFDF8',
    display: 'standalone',
  };
  await writeFile(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

  console.log('Placeholder assets generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
