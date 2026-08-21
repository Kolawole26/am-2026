import { SectionHeading } from '@/components/common/SectionHeading';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Image } from '@/components/common/Image';
import { toBasePath } from '@/lib/paths';
import { storyIntro, storyMilestones } from '@/data/story';

export function OurStory() {
  return (
    <section id="story" className="bg-ivory py-24 sm:py-32">
      <div className="container-editorial">
        <SectionHeading eyebrow={storyIntro.eyebrow} title="Our Story" supporting={storyIntro.body} />

        <div className="mt-20 flex flex-col gap-20 sm:gap-28">
          {storyMilestones.map((milestone, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={milestone.id}
                className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16 ${
                  reversed ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                {milestone.image && (
                  <ScrollReveal>
                    <div className="overflow-hidden rounded-elegant">
                      <Image
                        basePath={toBasePath(milestone.image.src)}
                        width={milestone.image.width}
                        height={milestone.image.height}
                        alt={milestone.image.alt}
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </ScrollReveal>
                )}
                <ScrollReveal delay={0.1}>
                  <span className="font-body text-xs tracking-editorial uppercase text-burgundy">
                    {milestone.date}
                  </span>
                  <h3 className="mt-3 font-display text-2xl sm:text-3xl text-wine">{milestone.title}</h3>
                  <p className="mt-4 max-w-md font-body text-base leading-relaxed text-muted">{milestone.text}</p>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
