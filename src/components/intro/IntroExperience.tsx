import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Monogram } from '@/components/common/Monogram';
import { useMusic } from '@/hooks/useMusic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { wedding } from '@/data/wedding';
import { EASE_EDITORIAL } from '@/lib/motion';

/**
 * The cinematic opening experience. It sits in a fixed overlay ABOVE the
 * fully-mounted main page (see App.tsx) — the page is never blocked from
 * rendering or fetching, this is a visual transition only. Locks scroll
 * while visible and hands off to <MusicProvider> for the actual playback
 * decision.
 */
export function IntroExperience() {
  const { hasEntered, enter } = useMusic();
  const reduced = useReducedMotion();
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    if (hasEntered) return;
    const t = window.setTimeout(() => setShowGate(true), reduced ? 200 : 1800);
    return () => window.clearTimeout(t);
  }, [hasEntered, reduced]);

  useEffect(() => {
    document.body.style.overflow = hasEntered ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasEntered]);

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-wine-deep px-6 text-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE_EDITORIAL }}
          >
            <Monogram size={72} tone="gold" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_EDITORIAL }}
            className="mt-6 block h-px w-16 bg-gold"
          />

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-6 font-display text-lg sm:text-xl tracking-editorial text-ivory uppercase"
          >
            {wedding.websiteName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-3 font-body text-xs sm:text-sm tracking-editorial text-gold-light uppercase"
          >
            {wedding.tagline}
          </motion.p>

          <AnimatePresence>
            {showGate && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
                className="mt-12 flex flex-col items-center gap-4"
              >
                <p className="font-body text-sm text-ivory/80">Enter our story with music</p>
                <button
                  type="button"
                  onClick={() => enter(true)}
                  className="rounded-full bg-gold px-9 py-3.5 text-sm tracking-[0.2em] uppercase text-wine-deep font-medium transition-colors hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  Start Experience
                </button>
                <button
                  type="button"
                  onClick={() => enter(false)}
                  className="font-body text-xs tracking-editorial uppercase text-ivory/60 underline-offset-4 hover:text-ivory hover:underline"
                >
                  Continue without music
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
