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
  contacts: [
    { name: 'Teslim', whatsappNumber: '2348143245848', displayPhone: '0814 324 5848' },
    { name: 'Fatimah', whatsappNumber: '2349063527457', displayPhone: '0906 352 7457' },
  ],
  whatsappMessage:
    "Hi! I'd love to RSVP for Azeezat & Muiez's wedding on 28 November 2026.",
} as const;

export const guestLoveConfig = {
  whatsappNumber: rsvpConfig.contacts[0].whatsappNumber,
  whatsappMessage:
    'Hi Azeezat & Muiez! Congratulations on your wedding — sending you so much love ❤️',
} as const;

/** Builds a wa.me deep link from a number + prefilled message. */
export function buildWhatsAppLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
