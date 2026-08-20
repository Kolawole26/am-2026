import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SparklesProps {
  count?: number;
  className?: string;
}

// Deterministic pseudo-random so server/client (and repeated renders) agree
// — avoids hydration mismatches without needing real randomness.
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 999.7) * 10000;
  return x - Math.floor(x);
}

/**
 * A small field of drifting gold/blush sparkles — purely decorative, used
 * to add a touch of warmth and life to otherwise-still wine backgrounds
 * (hero, final message). Kept subtle and sparse on purpose: this is a
 * classy accent, not a particle-system effect.
 */
export function Sparkles({ count = 14, className = '' }: SparklesProps) {
  const reduced = useReducedMotion();

  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: seededRandom(i + 1) * 100,
        top: seededRandom(i + 20) * 100,
        size: 2 + seededRandom(i + 40) * 3.5,
        duration: 5 + seededRandom(i + 60) * 6,
        delay: seededRandom(i + 80) * 6,
        blush: seededRandom(i + 100) > 0.65,
      })),
    [count],
  );

  if (reduced) return null;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: dot.size,
            height: dot.size,
            background: dot.blush ? 'var(--color-blush)' : 'var(--color-gold-light)',
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.9, 0], y: [-6, -22] }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
