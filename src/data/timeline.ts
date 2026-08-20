import type { TimelineEvent } from '@/types';

/** SAMPLE CONTENT — swap in the real order of the day whenever it's set. */
export const timelineEvents: TimelineEvent[] = [
  { id: 'arrival', time: '12:00 PM', title: 'Guests Arrive', description: 'Find your seat, grab a welcome drink, and settle in — the fun is about to start.' },
  { id: 'ceremony', time: '12:30 PM', title: 'Nikkah Ceremony', description: 'The formal union of Azeezat & Muiez — bring tissues, happy ones.' },
  { id: 'photos', time: '2:00 PM', title: 'Couple Photographs', description: 'Family & bridal party photographs while the newlyweds soak it all in.' },
  { id: 'reception', time: '4:00 PM', title: 'Reception Begins', description: "Doors open, music's on, and the real celebration kicks off." },
  { id: 'dinner', time: '6:00 PM', title: 'Dinner Is Served', description: 'A feast fit for the occasion — second helpings very much encouraged.' },
  { id: 'toasts', time: '7:30 PM', title: 'Toasts & Speeches', description: 'Laughter, love, and probably a few embarrassing stories from the wedding party.' },
  { id: 'dance', time: '8:30 PM', title: 'First Dance & Celebration', description: "The dance floor opens and doesn't close until the very last song." },
];
