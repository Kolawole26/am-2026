import type { TimelineEvent } from '@/types';

/** The real order of the day, as given on the wedding invitation. */
export const timelineEvents: TimelineEvent[] = [
  { id: 'arrival', time: '01', title: 'Guest Arrival', description: '12:00 PM' },
  { id: 'welcome', time: '02', title: 'Welcome Address', description: 'Traditional Wedding Begins' },
  { id: 'introductions', time: '03', title: 'Introduction of Families' },
  { id: 'entrance', time: '04', title: "Couple's Grand Entrance" },
  { id: 'reception', time: '05', title: 'Wedding Reception' },
  { id: 'food', time: '06', title: 'Food & Refreshment' },
  { id: 'first-dance', time: '07', title: "Couple's First Dance" },
  { id: 'cake', time: '08', title: 'Cutting of Cake' },
  { id: 'games', time: '09', title: 'Games & Entertainment' },
  { id: 'gifts', time: '10', title: 'Presentation of Gifts' },
  { id: 'spraying', time: '11', title: 'Dance & Spraying' },
  { id: 'thanks', time: '12', title: 'Vote of Thanks' },
];
