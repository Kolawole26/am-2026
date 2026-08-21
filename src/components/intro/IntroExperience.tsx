import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { WeddingRings } from '@/components/common/WeddingRings';
import { Sparkles } from '@/components/common/Sparkles';
import { useMusic } from '@/hooks/useMusic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { wedding } from '@/data/wedding';
import { EASE_EDITORIAL } from '@/lib/motion';

/** Full sequence duration (click -> overlay unmounts) before the existing
 * fade+scale exit transition takes over. Short-circuited for reduced motion. */
const SEQUENCE_MS = 2500;
const REDUCED_SEQUENCE_MS = 200;
const GATE_REVEAL_MS = 1600;
const REDUCED_GATE_REVEAL_MS = 200;

/**
 * The cinematic opening experience: a full-screen wedding invitation
 * envelope that opens to reveal the gold rings + couple names, then hands
 * off into the existing site. It sits in a fixed overlay ABOVE the
 * fully-mounted main page (see App.tsx) — the page is never blocked from
 * rendering or fetching, this is a visual transition only. Locks scroll
 * while visible and hands off to <MusicProvider> for the actual playback
 * decision (music starts the instant "Open Invitation" is pressed).
 */
export function IntroExperience() {
  const { enter } = useMusic();
  const reduced = useReducedMotion();
  const [showGate, setShowGate] = useState(false);
  const [opened, setOpened] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const t = window.setTimeout(
      () => setShowGate(true),
      reduced ? REDUCED_GATE_REVEAL_MS : GATE_REVEAL_MS,
    );
    return () => window.clearTimeout(t);
  }, [dismissed, reduced]);

  useEffect(() => {
    document.body.style.overflow = dismissed ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [dismissed]);

  const handleOpen = (withMusic: boolean) => {
    if (opened) return;
    setOpened(true);
    enter(withMusic);
    window.setTimeout(() => setDismissed(true), reduced ? REDUCED_SEQUENCE_MS : SEQUENCE_MS);
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-wine-deep px-6 text-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 55% at 50% 38%, color-mix(in srgb, var(--color-burgundy) 55%, transparent) 0%, transparent 70%)',
            }}
          />
          <Sparkles count={18} />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_EDITORIAL }}
            className="relative z-10 flex flex-col items-center"
          >
            <span className="font-body text-[0.65rem] sm:text-xs tracking-editorial uppercase text-gold-light">
              {wedding.websiteName}
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl text-ivory">
              {wedding.bride} <span className="text-gold">&amp;</span> {wedding.groom}
            </h1>
            <span className="mt-4 block h-px w-14 bg-gold" />
            <p className="mt-4 font-body text-xs sm:text-sm tracking-editorial uppercase text-gold-light">
              {wedding.date}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: opened ? [0.9, 1.04, 1] : 1,
            }}
            transition={{ duration: opened ? 0.6 : 1, ease: EASE_EDITORIAL, delay: opened ? 0 : 0.3 }}
            className="relative z-10 mt-9 w-[min(72vw,280px)]"
            style={{ perspective: 1200 }}
          >
            {/* Envelope body */}
            <div className="relative aspect-[4/3] rounded-elegant border border-gold/60 bg-gradient-to-b from-ivory to-warm-white shadow-2xl shadow-wine-deep/50">
              {/* Inner invitation card — hidden behind the flap until opened */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={
                  opened
                    ? { opacity: 1, y: -14 }
                    : { opacity: 0, y: 18 }
                }
                transition={{ duration: 0.7, delay: opened ? 0.85 : 0, ease: EASE_EDITORIAL }}
                className="absolute inset-x-3 bottom-3 top-3 z-30 flex flex-col items-center justify-center gap-2 rounded-[calc(1rem-4px)] border border-gold/40 bg-ivory px-3 py-4"
              >
                <WeddingRings size={34} tone="gold" frame={false} />
                <p className="font-display text-sm sm:text-base text-wine">
                  {wedding.bride} &amp; {wedding.groom}
                </p>
                <p className="font-body text-[0.6rem] tracking-editorial uppercase text-burgundy">
                  {wedding.dateShort}
                </p>
              </motion.div>

              {/* Flap */}
              <motion.div
                className={`absolute inset-x-0 top-0 h-[58%] ${opened ? 'z-10' : 'z-20'}`}
                style={{
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
                animate={{ rotateX: opened ? -165 : 0 }}
                transition={{ duration: 0.85, delay: opened ? 0.35 : 0, ease: EASE_EDITORIAL }}
              >
                <div className="h-full w-full bg-gradient-to-b from-gold-light/90 to-gold/80" />
              </motion.div>

              {/* Wax-seal emblem at the flap's tip */}
              <motion.div
                animate={{ opacity: opened ? 0 : 1, scale: opened ? 0.7 : 1 }}
                transition={{ duration: 0.4, delay: opened ? 0.35 : 0.6, ease: EASE_EDITORIAL }}
                className="absolute left-1/2 top-[52%] z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-warm-white shadow-md shadow-wine-deep/30"
              >
                <WeddingRings size={22} tone="gold" frame={false} />
              </motion.div>
            </div>
          </motion.div>

          <AnimatePresence>
            {showGate && !opened && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
                className="relative z-10 mt-10 flex flex-col items-center gap-4"
              >
                <button
                  type="button"
                  onClick={() => handleOpen(true)}
                  className="rounded-full bg-gold px-9 py-3.5 text-sm tracking-[0.2em] uppercase text-wine-deep font-medium transition-colors hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  Open Invitation
                </button>
                <button
                  type="button"
                  onClick={() => handleOpen(false)}
                  className="font-body text-xs tracking-editorial uppercase text-ivory/60 underline-offset-4 hover:text-ivory hover:underline"
                >
                  Enter without music
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
