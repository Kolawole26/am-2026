import { MapPin } from 'lucide-react';
import type { WeddingDetailItem } from '@/types';
import { ScrollReveal } from '@/components/common/ScrollReveal';

export function DetailCard({ detail, delay = 0 }: { detail: WeddingDetailItem; delay?: number }) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <article className="flex h-full flex-col gap-3 border border-gold/30 bg-warm-white px-7 py-8 sm:px-9 sm:py-10">
        <span className="font-body text-[0.65rem] tracking-editorial uppercase text-burgundy">{detail.label}</span>
        <h3 className="font-display text-xl sm:text-2xl text-wine">{detail.title}</h3>
        {detail.time && <p className="font-body text-sm text-dark">{detail.time}</p>}
        {detail.venueName && <p className="font-body text-sm font-medium text-dark">{detail.venueName}</p>}
        {detail.address && <p className="font-body text-sm text-muted">{detail.address}</p>}
        {detail.note && <p className="font-body text-sm leading-relaxed text-muted">{detail.note}</p>}
        {detail.swatches && (
          <div className="mt-1 flex items-center gap-2.5" aria-hidden="true">
            {detail.swatches.map((color, i) => (
              <span
                key={i}
                className="h-6 w-6 rounded-full border border-gold/40 shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
        {detail.mapUrl && (
          <a
            href={detail.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex w-fit items-center gap-1.5 font-body text-xs tracking-editorial uppercase text-gold hover:text-burgundy"
          >
            <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
            View Map
          </a>
        )}
      </article>
    </ScrollReveal>
  );
}
