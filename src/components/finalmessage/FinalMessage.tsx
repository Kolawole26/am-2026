import { Image } from '@/components/common/Image';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Monogram } from '@/components/common/Monogram';
import { Sparkles } from '@/components/common/Sparkles';
import { finalImage } from '@/data/media';
import { wedding } from '@/data/wedding';

export function FinalMessage() {
  return (
    <section className="relative flex min-h-[85svh] items-center justify-center overflow-hidden py-24">
      <div className="absolute inset-0">
        <Image
          basePath={finalImage.basePath}
          width={finalImage.width}
          height={finalImage.height}
          alt={finalImage.alt}
          sizes="100vw"
          className="h-full w-full object-cover object-[50%_15%]"
        />
        <div className="absolute inset-0 bg-wine-deep/80" />
      </div>

      <Sparkles count={14} />

      <ScrollReveal className="relative z-10 flex flex-col items-center px-6 text-center">
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl leading-tight text-ivory text-balance">
          And So, Our Forever Begins&hellip;
        </h2>
        <div className="mt-8">
          <Monogram size={52} tone="gold" />
        </div>
        <p className="mt-8 font-display text-xl sm:text-2xl tracking-[0.1em] text-gold-light">
          {wedding.bride} &amp; {wedding.groom}
        </p>
        <p className="mt-2 font-body text-sm tracking-editorial text-ivory/70">{wedding.dateShort}</p>
        <p className="mt-8 max-w-md font-body text-base text-ivory/85">
          Thank you for being part of our story.
        </p>
      </ScrollReveal>
    </section>
  );
}
