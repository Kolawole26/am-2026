/**
 * The wedding rings emblem — the primary visual identity of the wedding.
 *
 * Two interlocking bands rendered as pure SVG (metallic gold gradient, no
 * font/image dependency) — rasterises identically everywhere: navbar, hero,
 * footer, intro envelope, and final message.
 */

import { useId } from 'react';

export type RingsTone = 'gold' | 'wine' | 'ivory';

const toneStroke: Record<RingsTone, string> = {
  gold: 'url(#wedding-rings-gold)',
  wine: 'var(--color-wine)',
  ivory: 'var(--color-ivory)',
};

const toneHighlight: Record<RingsTone, string> = {
  gold: 'var(--color-gold-light)',
  wine: 'var(--color-burgundy)',
  ivory: 'var(--color-ivory)',
};

interface WeddingRingsProps {
  size?: number;
  tone?: RingsTone;
  /** A faint outer frame circle behind the rings — adds presence at larger sizes. */
  frame?: boolean;
  className?: string;
  title?: string;
}

export function WeddingRings({
  size = 56,
  tone = 'gold',
  frame = true,
  className,
  title = 'Two interlocking gold wedding rings',
}: WeddingRingsProps) {
  const gradientId = `wedding-rings-gold-${useId()}`;
  const stroke = tone === 'gold' ? `url(#${gradientId})` : toneStroke[tone];
  const highlight = toneHighlight[tone];

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={gradientId} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="var(--color-gold-light)" />
          <stop offset="55%" stopColor="var(--color-gold)" />
          <stop offset="100%" stopColor="#8a6a34" />
        </linearGradient>
      </defs>

      {frame && (
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.1"
          opacity="0.5"
        />
      )}

      {/* Back ring */}
      <circle cx="41" cy="58" r="24" fill="none" stroke={stroke} strokeWidth="5.5" />
      <path
        d="M 25 47 A 24 24 0 0 1 55 41"
        fill="none"
        stroke={highlight}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Front ring */}
      <circle cx="61" cy="43" r="24" fill="none" stroke={stroke} strokeWidth="5.5" />
      <path
        d="M 45 32 A 24 24 0 0 1 75 26"
        fill="none"
        stroke={highlight}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
