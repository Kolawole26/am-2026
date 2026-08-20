import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE_EDITORIAL } from '@/lib/motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** A thin Framer Motion wrapper for the "fade + rise into view" reveal used
 * across every section. Centralising it means one place to tune easing/
 * duration, and one place that already respects reduced-motion. */
export function ScrollReveal({ children, className, delay = 0, y = 28, once = true }: ScrollRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: EASE_EDITORIAL }}
    >
      {children}
    </motion.div>
  );
}
