import { Heart } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Button } from '@/components/common/Button';
import { buildWhatsAppLink, guestLoveConfig } from '@/config/site';

export function GuestLove() {
  return (
    <section className="bg-warm-white py-24 sm:py-28">
      <div className="container-editorial flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold">
          <Heart size={20} strokeWidth={1.4} />
        </span>
        <SectionHeading
          className="mt-6"
          eyebrow="Send Us Your Love"
          title="A Word For The Couple"
          supporting="Leave Azeezat & Muiez a congratulatory message ahead of their big day."
        />
        <ScrollReveal delay={0.15} className="mt-8">
          <Button
            href={buildWhatsAppLink(guestLoveConfig.whatsappNumber, guestLoveConfig.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            variant="outline"
          >
            Send Your Love
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
