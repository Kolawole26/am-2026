import { SectionHeading } from '@/components/common/SectionHeading';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { timelineEvents } from '@/data/timeline';

export function Timeline() {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="container-editorial">
        <SectionHeading eyebrow="Our Celebration" title="The Order Of The Day" />

        <ol className="relative mt-16 flex flex-col gap-10 sm:gap-12">
          {/* The connecting line. Positioned left on mobile, centered on desktop. */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-gold/40 md:left-1/2 md:-translate-x-1/2" />

          {timelineEvents.map((event, i) => {
            const reversed = i % 2 === 1;
            return (
              <ScrollReveal key={event.id} delay={i * 0.05}>
                <li
                  className={`relative grid grid-cols-[1.25rem_1fr] items-start gap-x-5 md:grid-cols-[1fr_1.25rem_1fr] md:gap-x-10`}
                >
                  <span
                    aria-hidden="true"
                    className="relative top-1.5 col-start-1 row-start-1 z-10 h-3.5 w-3.5 justify-self-start rounded-full border-2 border-gold bg-ivory md:col-start-2 md:justify-self-center"
                  />
                  <div
                    className={
                      reversed
                        ? 'col-start-2 row-start-1 md:col-start-1 md:row-start-1 md:text-right'
                        : 'col-start-2 row-start-1 md:col-start-3'
                    }
                  >
                    <span className="font-body text-xs tracking-editorial uppercase text-burgundy">{event.time}</span>
                    <h3 className="mt-1 font-display text-lg sm:text-xl text-wine">{event.title}</h3>
                    {event.description && (
                      <p className="mt-1.5 font-body text-sm text-muted">{event.description}</p>
                    )}
                  </div>
                </li>
              </ScrollReveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
