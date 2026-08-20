import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useMusic } from '@/hooks/useMusic';
import { EASE_EDITORIAL } from '@/lib/motion';

/** Small, fixed, circular music control. Renders nothing if the audio
 * failed to load (graceful degradation) or before the visitor has entered
 * the site through the intro gate. */
export function MusicControl() {
  const { status, hasEntered, togglePlay, toggleMute } = useMusic();

  if (!hasEntered || status === 'unavailable') return null;

  const isPlaying = status === 'playing';
  const isMuted = status === 'muted';

  const handleClick = () => {
    if (isMuted) {
      toggleMute();
      return;
    }
    if (isPlaying) {
      toggleMute();
    } else {
      togglePlay();
    }
  };

  return (
    <AnimatePresence>
      <motion.button
        type="button"
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
        className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-gold/70 bg-wine-deep/90 text-gold shadow-lg shadow-wine-deep/30 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
        aria-label={isPlaying ? 'Pause wedding music' : isMuted ? 'Unmute wedding music' : 'Play wedding music'}
        aria-pressed={isPlaying}
      >
        {isPlaying ? (
          <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
            <span className="w-[3px] animate-equalize rounded-full bg-gold [animation-delay:-0.3s]" style={{ height: '100%' }} />
            <span className="w-[3px] animate-equalize rounded-full bg-gold [animation-delay:-0.1s]" style={{ height: '100%' }} />
            <span className="w-[3px] animate-equalize rounded-full bg-gold [animation-delay:-0.5s]" style={{ height: '100%' }} />
          </span>
        ) : isMuted ? (
          <VolumeX size={20} strokeWidth={1.5} />
        ) : (
          <Volume2 size={20} strokeWidth={1.5} />
        )}
      </motion.button>
    </AnimatePresence>
  );
}
