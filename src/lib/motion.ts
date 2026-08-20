/** The one easing curve used across every entrance animation on the site —
 * slow enough to feel luxurious, quick enough to feel responsive. Typed as
 * an explicit tuple (rather than `as const`, which yields a readonly
 * tuple) so it satisfies Framer Motion's `Easing` type everywhere. */
export const EASE_EDITORIAL: [number, number, number, number] = [0.22, 1, 0.36, 1];
