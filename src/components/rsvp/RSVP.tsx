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
          supporting="We would love to celebrate this beautiful day with you. Please let us know if you'll be joining us."
        />
        <ScrollReveal delay={0.15} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button href={rsvpConfig.formUrl} target="_blank" rel="noreferrer" variant="primary">
            RSVP Now
          </Button>
          <Button
            href={buildWhatsAppLink(rsvpConfig.whatsappNumber, rsvpConfig.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            variant="outline"
          >
            RSVP via WhatsApp
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
