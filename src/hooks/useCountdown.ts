import { useEffect, useState } from 'react';

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function diff(targetMs: number): CountdownValue {
  const now = Date.now();
  const delta = Math.max(0, targetMs - now);
  const isPast = targetMs - now <= 0;

  const seconds = Math.floor((delta / 1000) % 60);
  const minutes = Math.floor((delta / 1000 / 60) % 60);
  const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
  const days = Math.floor(delta / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isPast };
}

/** Live countdown to an ISO date string. Updates once per second and never
 * goes negative — once the date passes, `isPast` flips and callers should
 * swap in a celebratory message instead of the ticking numbers. */
export function useCountdown(isoDate: string): CountdownValue {
  const targetMs = new Date(isoDate).getTime();
  const [value, setValue] = useState(() => diff(targetMs));

  useEffect(() => {
    if (Number.isNaN(targetMs)) return;
    const id = window.setInterval(() => setValue(diff(targetMs)), 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  return value;
}
