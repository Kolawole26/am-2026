import { Gift as GiftIcon } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { gifts } from '@/data/gifts';

export function Gifting() {
  return (
    <section id="gifting" className="bg-wine py-24 sm:py-32">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="With Love"
          title="Giving"
          supporting="Your presence is already the greatest gift."
          tone="light"
        />

        <ScrollReveal delay={0.1} className="mx-auto mt-14 max-w-md">
          <ul className="flex flex-col divide-y divide-gold/20 border-y border-gold/20">
            {gifts.map((gift) => (
              <li key={gift.id} className="flex items-start gap-4 py-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                  <GiftIcon size={16} strokeWidth={1.4} />
                </span>
                <div>
                  <span className="font-body text-base text-ivory/90">{gift.name}</span>
                  {gift.details && (
                    <ul className="mt-1 flex flex-col gap-0.5">
                      {gift.details.map((detail) => (
                        <li key={detail} className="font-body text-xs text-gold-light">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
