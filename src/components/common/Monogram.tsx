/**
 * The A × M monogram — the site-wide mark used in the navbar, footer, intro
 * envelope, and final message.
 *
 * A stylised, interlocking "A" and "M" rendered as pure thin-stroke line
 * art (no font dependency, so it rasterises identically everywhere).
 */

export type MonogramTone = 'gold' | 'wine' | 'ivory';

const toneColor: Record<MonogramTone, string> = {
  gold: 'var(--color-gold)',
  wine: 'var(--color-wine)',
  ivory: 'var(--color-ivory)',
};

interface MonogramProps {
  size?: number;
  tone?: MonogramTone;
  ring?: boolean;
  className?: string;
  title?: string;
}

export function Monogram({
  size = 56,
  tone = 'gold',
  ring = true,
  className,
  title = 'A × M monogram',
}: MonogramProps) {
  const color = toneColor[tone];

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      {ring && (
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={color}
          strokeWidth="1.1"
          opacity="0.85"
        />
      )}
      {/* A */}
      <path
        d="M40 24 L22 76 M40 24 L58 76 M28.84 56.24 L51.16 56.24"
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* M — deliberately overlaps the A's right leg to read as interlocked */}
      <path
        d="M42 76 L42 26 L60 50 L78 26 L78 76"
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
