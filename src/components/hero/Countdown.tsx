import { ScrollReveal } from '@/components/common/ScrollReveal';
import { GoldDivider } from '@/components/common/GoldDivider';
import { useCountdown } from '@/hooks/useCountdown';
import { wedding } from '@/data/wedding';

const UNITS: Array<{ key: 'days' | 'hours' | 'minutes' | 'seconds'; label: string }> = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export function Countdown() {
  const value = useCountdown(wedding.isoDate);

  return (
    <section id="countdown" className="bg-wine py-20 sm:py-28">
      <div className="container-editorial flex flex-col items-center text-center">
        <ScrollReveal>
          <span className="font-body text-xs sm:text-sm tracking-editorial uppercase text-gold-light">
            Counting down to
          </span>
          <h2 className="mt-4 font-display text-2xl sm:text-3xl text-ivory">{wedding.date}</h2>
          <GoldDivider className="mx-auto mt-5" />
        </ScrollReveal>

        {value.isPast ? (
          <ScrollReveal delay={0.15} className="mt-12">
            <p className="font-display text-2xl sm:text-3xl text-gold-light">Forever has begun.</p>
            <p className="mt-3 font-body text-sm text-ivory/75">
              Azeezat &amp; Muiez are married. Thank you for celebrating with us.
            </p>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={0.15} className="mt-12 grid grid-cols-4 gap-3 sm:gap-8">
            {UNITS.map((unit) => (
              <div key={unit.key} className="flex flex-col items-center">
                <span className="font-display text-4xl sm:text-6xl tabular-nums text-ivory">
                  {String(value[unit.key]).padStart(2, '0')}
                </span>
                <span className="mt-2 font-body text-[0.65rem] sm:text-xs tracking-editorial uppercase text-gold-light">
                  {unit.label}
                </span>
              </div>
            ))}
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
