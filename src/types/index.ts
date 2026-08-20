/** Shared content types for The Olaniyis Wedding. Keeping these separate
 * from the data files makes it painless to swap placeholder content for
 * the real thing later without touching any component code. */

export interface ImageAsset {
  /** Fallback / default src (used by <img> and as the base for srcSet). */
  src: string;
  /** Human description for screen readers. Required — never leave blank. */
  alt: string;
  /** Intrinsic width in px, used to reserve layout space (prevents CLS). */
  width: number;
  /** Intrinsic height in px, used to reserve layout space (prevents CLS). */
  height: number;
}

export interface StoryMilestone {
  id: string;
  date: string;
  title: string;
  text: string;
  image?: ImageAsset;
}

export interface WeddingDetailItem {
  id: string;
  label: string;
  title: string;
  time?: string;
  venueName?: string;
  address?: string;
  note?: string;
  mapUrl?: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description?: string;
}

export interface GalleryImage extends ImageAsset {
  id: string;
  /** Controls masonry sizing — "tall" | "wide" | "square" spans. */
  orientation: 'tall' | 'wide' | 'square';
  /** First-screen images get eager/priority loading; the rest lazy-load. */
  priority?: boolean;
}

export interface GiftItem {
  id: string;
  name: string;
  description?: string;
  image?: ImageAsset;
  info?: string;
  link?: string;
}
