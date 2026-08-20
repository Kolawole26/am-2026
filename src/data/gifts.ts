import type { GiftItem } from '@/types';

/** SAMPLE CONTENT — gift items are optional, and images on them are too.
 * Swap in the real registry/fund details whenever they're ready. */
export const gifts: GiftItem[] = [
  {
    id: 'honeymoon-fund',
    name: 'Honeymoon Fund',
    description: "Help send Azeezat & Muiez off on their first adventure as a married couple — Zanzibar or bust!",
    info: 'Contribute via bank transfer — details on request, or scan the QR code at the reception desk.',
  },
  {
    id: 'home-fund',
    name: 'New Home Fund',
    description: "A little help furnishing the couple's very first home together (mostly so Muiez stops buying mismatched chairs).",
    info: 'Account details available on request.',
  },
  {
    id: 'registry',
    name: 'Gift Registry',
    description: 'A curated list of things the couple would genuinely love — no guesswork required.',
    link: 'https://www.myregistry.com/',
  },
];
