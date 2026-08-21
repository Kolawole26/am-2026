import { WeddingRings } from '@/components/common/WeddingRings';
import { wedding } from '@/data/wedding';

export function Footer() {
  return (
    <footer className="bg-wine-deep py-16">
      <div className="container-editorial flex flex-col items-center gap-5 text-center">
        <WeddingRings size={44} tone="gold" />
        <p className="font-display text-lg tracking-[0.08em] text-ivory">{wedding.websiteName}</p>
        <p className="font-body text-sm text-ivory/70">
          {wedding.bride} &amp; {wedding.groom} &middot; {wedding.dateShort}
        </p>
        <p className="font-body text-xs tracking-editorial uppercase text-gold-light">{wedding.tagline}</p>
      </div>
    </footer>
  );
}
