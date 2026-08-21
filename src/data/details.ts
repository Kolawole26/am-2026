import type { WeddingDetailItem } from '@/types';

const VENUE_NAME = 'Ronite Event Centre';
const VENUE_ADDRESS = 'Camp Davies Way, Isefun Road, Sabo Bus Stop, Ayobo, Lagos';
const VENUE_MAP_URL = 'https://maps.google.com/?q=Ronite+Event+Centre+Camp+Davies+Way+Isefun+Road+Sabo+Bus+Stop+Ayobo+Lagos';

export const weddingDetails: WeddingDetailItem[] = [
  {
    id: 'traditional-wedding',
    label: 'Traditional Wedding',
    title: 'Traditional Wedding',
    time: '12:00 PM — Saturday, 28 November 2026',
    venueName: VENUE_NAME,
    address: VENUE_ADDRESS,
    mapUrl: VENUE_MAP_URL,
  },
  {
    id: 'reception',
    label: 'Wedding Reception',
    title: 'Wedding Reception',
    time: '2:00 PM — Saturday, 28 November 2026',
    venueName: VENUE_NAME,
    address: VENUE_ADDRESS,
    note: 'Both events take place at the same venue.',
    mapUrl: VENUE_MAP_URL,
  },
  {
    id: 'dress-code',
    label: 'Dress Code',
    title: 'Wine, Gold & White',
    note: "We'd love to see our colours on you — wine, gold and white. Think elegant and festive, and bring your best dancing shoes.",
    swatches: ['var(--color-wine)', 'var(--color-gold)', '#ffffff'],
  },
];
