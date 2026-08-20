import type { WeddingDetailItem } from '@/types';

/** SAMPLE CONTENT — fictional venue names so the page reads as finished.
 * Swap in the real ceremony/reception details whenever they're confirmed. */
export const weddingDetails: WeddingDetailItem[] = [
  {
    id: 'ceremony',
    label: 'Ceremony',
    title: 'Nikkah Ceremony',
    time: '12:00 PM — Saturday, 28 November 2026',
    venueName: 'The Grand Pearl Events Centre',
    address: '14 Ahmadu Bello Way, Victoria Island, Lagos',
    note: 'Guests are kindly asked to arrive 30 minutes early — we start right on time!',
    mapUrl: 'https://maps.google.com/?q=Victoria+Island+Lagos',
  },
  {
    id: 'reception',
    label: 'Reception',
    title: 'Wedding Reception',
    time: '4:00 PM — Saturday, 28 November 2026',
    venueName: 'The Palm Grove Ballroom',
    address: '22 Kofo Abayomi Street, Victoria Island, Lagos',
    note: 'Doors open at 3:30 PM. Come hungry, come ready to dance.',
    mapUrl: 'https://maps.google.com/?q=Victoria+Island+Lagos',
  },
  {
    id: 'dress-code',
    label: 'Dress Code',
    title: 'Wine, Gold & Ivory',
    note: "We'd love to see our colours on you! Think elegant and festive — traditional or contemporary, all we ask is you bring your best dancing shoes.",
  },
  {
    id: 'more-info',
    label: 'Good To Know',
    title: 'A Few More Details',
    note: "Valet parking is available on-site. We've blocked rooms at a couple of nearby hotels for out-of-town guests — details in your invite. And yes, plus-ones are welcome if noted on your invitation!",
  },
];
