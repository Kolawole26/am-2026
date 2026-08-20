import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE_EDITORIAL } from '@/lib/motion';

interface GoldDividerProps {
  className?: string;
  width?: number;
}

/** The thin gold line-reveal used throughout the site (intro, section
 * headings, footer) — draws itself in once, then stays put. */
export function GoldDivider({ className = '', width = 64 }: GoldDividerProps) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`block h-px bg-gold ${className}`}
      style={{ width }}
      initial={reduced ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
    />
  );
}
