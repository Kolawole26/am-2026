import { useEffect, useState } from 'react';

/** Reports whether the page has scrolled past `threshold`, so the navbar
 * can transition from transparent-over-hero to a solid, sticky bar.
 * Uses a passive scroll listener with rAF throttling — cheap enough to run
 * for the life of the page. */
export function useScrollNav(threshold = 64): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrolled(window.scrollY > threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
