import { createContext } from 'react';

export type MusicStatus = 'idle' | 'playing' | 'paused' | 'muted' | 'unavailable';

export interface MusicContextValue {
  status: MusicStatus;
  /** True once the visitor has passed the intro gate (with or without music). */
  hasEntered: boolean;
  /** Called by the intro gate. Enters the site and, if `withMusic`, attempts playback. */
  enter: (withMusic: boolean) => void;
  togglePlay: () => void;
  toggleMute: () => void;
}

// Split into its own module (rather than living in MusicProvider.tsx) so
// that file only exports the component — keeps React Fast Refresh happy.
export const MusicContext = createContext<MusicContextValue | null>(null);
