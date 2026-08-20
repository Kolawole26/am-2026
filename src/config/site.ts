/**
 * Site-wide configuration & external destinations.
 *
 * Nothing here talks to a backend — this project is frontend-only. RSVP and
 * "send your love" simply hand off to an external service (WhatsApp / a
 * form) that Desmond can point anywhere without touching component code.
 */

export const siteConfig = {
  url: 'https://theolaniyiswedding.com',
  name: 'The Olaniyis Wedding',
  shortName: 'A × M',
} as const;

export const rsvpConfig = {
  /** Swap this for the real Google Form / Tally / etc. link when ready. */
  formUrl: 'https://forms.gle/REPLACE_WITH_RSVP_FORM',
  /** Used as a fallback / alternate RSVP channel. */
  whatsappNumber: '2340000000000', // international format, no leading +/0
  whatsappMessage:
    "Hi! I'd love to RSVP for Azeezat & Muiez's wedding on 28 November 2026.",
} as const;

export const guestLoveConfig = {
  whatsappNumber: '2340000000000',
  whatsappMessage:
    'Hi Azeezat & Muiez! Congratulations on your wedding — sending you so much love ❤️',
} as const;

/** Builds a wa.me deep link from a number + prefilled message. */
export function buildWhatsAppLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
