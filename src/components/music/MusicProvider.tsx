import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { MusicContext, type MusicContextValue, type MusicStatus } from '@/context/MusicContext';

const STORAGE_KEY = 'olaniyis-wedding:music-preference';

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<MusicStatus>('idle');
  const [hasEntered, setHasEntered] = useState(false);

  // The <audio> element is created exactly once and never recreated by
  // re-renders — everything below reads/writes this same ref.
  useEffect(() => {
    const audio = new Audio();
    audio.src = '/audio/wedding-music.mp3';
    audio.loop = true;
    audio.preload = 'none'; // don't spend bandwidth until the visitor opts in
    audio.volume = 0.55;

    const onError = () => setStatus('unavailable');
    audio.addEventListener('error', onError);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener('error', onError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const enter = useCallback((withMusic: boolean) => {
    setHasEntered(true);
    const audio = audioRef.current;
    if (!withMusic || !audio) {
      setStatus((s) => (s === 'unavailable' ? s : 'paused'));
      return;
    }
    audio.preload = 'auto';
    audio
      .play()
      .then(() => {
        setStatus('playing');
        sessionStorage.setItem(STORAGE_KEY, 'on');
      })
      .catch(() => {
        // Autoplay was blocked despite the gesture (rare, but browsers
        // vary) — fail quietly, the floating control still lets them start it.
        setStatus('paused');
      });
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || status === 'unavailable') return;
    if (status === 'playing') {
      audio.pause();
      setStatus('paused');
    } else {
      audio
        .play()
        .then(() => setStatus('playing'))
        .catch(() => setStatus('paused'));
    }
  }, [status]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || status === 'unavailable') return;
    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    sessionStorage.setItem(STORAGE_KEY, nextMuted ? 'off' : 'on');
    setStatus(nextMuted ? 'muted' : audio.paused ? 'paused' : 'playing');
  }, [status]);

  const value = useMemo<MusicContextValue>(
    () => ({ status, hasEntered, enter, togglePlay, toggleMute }),
    [status, hasEntered, enter, togglePlay, toggleMute],
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}
