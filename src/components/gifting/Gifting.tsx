import { Gift as GiftIcon, ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Image } from '@/components/common/Image';
import { toBasePath } from '@/lib/paths';
import { gifts } from '@/data/gifts';

export function Gifting() {
  return (
    <section id="gifting" className="bg-wine py-24 sm:py-32">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="With Love"
          title="Your Presence, Our Gift"
          supporting="Your presence is already the greatest gift. For those who've asked, here are a few options."
          tone="light"
        />

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gifts.map((gift, i) => (
            <ScrollReveal key={gift.id} delay={i * 0.08}>
              <article className="flex h-full flex-col gap-4 border border-gold/25 bg-wine-deep/40 p-7">
                {gift.image ? (
                  <div className="overflow-hidden rounded-sm">
                    <Image
                      basePath={toBasePath(gift.image.src)}
                      width={gift.image.width}
                      height={gift.image.height}
                      alt={gift.image.alt}
                      sizes="(min-width: 1024px) 25vw, 90vw"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <GiftIcon size={20} strokeWidth={1.4} />
                  </span>
                )}
                <h3 className="font-display text-xl text-ivory">{gift.name}</h3>
                {gift.description && <p className="font-body text-sm text-ivory/75">{gift.description}</p>}
                {gift.info && <p className="font-body text-xs text-gold-light">{gift.info}</p>}
                {gift.link && (
                  <a
                    href={gift.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 font-body text-xs tracking-editorial uppercase text-gold hover:text-gold-light"
                  >
                    View Registry <ExternalLink size={13} strokeWidth={1.6} />
                  </a>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
