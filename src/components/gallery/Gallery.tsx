import { useState } from 'react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Image } from '@/components/common/Image';
import { toBasePath } from '@/lib/paths';
import { galleryImages } from '@/data/gallery';
import { Lightbox } from './Lightbox';

const spanClasses: Record<(typeof galleryImages)[number]['orientation'], string> = {
  tall: 'row-span-2',
  wide: 'col-span-2',
  square: '',
};

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-warm-white py-24 sm:py-32">
      <div className="container-editorial">
        <SectionHeading eyebrow="Gallery" title="Moments" supporting="A few frames from their story so far." />

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 [grid-auto-flow:dense] [grid-auto-rows:11rem] sm:[grid-auto-rows:14rem] lg:grid-cols-4">
          {galleryImages.map((image, i) => (
            <ScrollReveal key={image.id} delay={Math.min(i, 6) * 0.05} className={spanClasses[image.orientation]}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group relative block h-full w-full overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
                aria-label={`Open photo ${i + 1} of ${galleryImages.length}`}
              >
                <Image
                  basePath={toBasePath(image.src)}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  priority={image.priority}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-wine-deep/0 transition-colors duration-500 group-hover:bg-wine-deep/10" />
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}
