import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { Image } from '@/components/common/Image';
import { toBasePath } from '@/lib/paths';
import { EASE_EDITORIAL } from '@/lib/motion';
import type { GalleryImage } from '@/types';

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

/** Accessible fullscreen lightbox. Only the current (and, for smooth
 * transitions, the adjacent) images are mounted — the whole gallery's full
 * resolution set is never loaded up front. */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const goNext = useCallback(() => onNavigate((index + 1) % images.length), [index, images.length, onNavigate]);
  const goPrev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, goNext, goPrev]);

  const image = images[index];

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Photo gallery viewer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-wine-deep/97 px-3 sm:px-6"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(delta) > 50) (delta > 0 ? goPrev : goNext)();
          touchStartX.current = null;
        }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute right-4 top-4 sm:right-8 sm:top-8 z-10 flex h-11 w-11 items-center justify-center rounded-full text-ivory hover:text-gold"
        >
          <X size={26} strokeWidth={1.4} />
        </button>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous photo"
          className="absolute left-2 sm:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full text-ivory hover:text-gold"
        >
          <ChevronLeft size={30} strokeWidth={1.2} />
        </button>

        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
          className="flex max-h-[85svh] max-w-[92vw] flex-col items-center gap-4 sm:max-w-[80vw]"
        >
          <Image
            basePath={toBasePath(image.src)}
            width={image.width}
            height={image.height}
            alt={image.alt}
            priority
            sizes="90vw"
            className="max-h-[75svh] w-auto rounded-sm object-contain"
          />
          <p className="font-body text-xs tracking-editorial uppercase text-ivory/60">
            {index + 1} / {images.length}
          </p>
        </motion.div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next photo"
          className="absolute right-2 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full text-ivory hover:text-gold"
        >
          <ChevronRight size={30} strokeWidth={1.2} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
