import { SectionHeading } from '@/components/common/SectionHeading';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Button } from '@/components/common/Button';
import { buildWhatsAppLink, rsvpConfig } from '@/config/site';

export function RSVP() {
  return (
    <section id="rsvp" className="bg-ivory py-24 sm:py-32">
      <div className="container-editorial flex flex-col items-center">
        <SectionHeading
          eyebrow="Join Us"
          title="We'd Love To Celebrate With You"
          supporting="We would love to celebrate this beautiful day with you. Please reach out to RSVP."
        />
        <ScrollReveal delay={0.15} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          {rsvpConfig.contacts.map((contact, i) => (
            <Button
              key={contact.name}
              href={buildWhatsAppLink(contact.whatsappNumber, rsvpConfig.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              variant={i === 0 ? 'primary' : 'outline'}
            >
              RSVP via WhatsApp &middot; {contact.name}
            </Button>
          ))}
        </ScrollReveal>
        <p className="mt-8 font-body text-sm text-muted">
          Or call{' '}
          {rsvpConfig.contacts.map((contact, i) => (
            <span key={contact.name}>
              {i > 0 && ' · '}
              <span className="font-medium text-wine">{contact.name}</span> {contact.displayPhone}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
