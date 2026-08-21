import { ScrollReveal } from '@/components/common/ScrollReveal';
import { families } from '@/data/family';

/** A small, elegant "with families" subsection — styled to match the
 * existing detail cards rather than introducing a new visual language. */
export function FamilyInfo() {
  return (
    <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
      {families.map((family, i) => (
        <ScrollReveal key={family.id} delay={i * 0.08}>
          <div className="flex h-full flex-col items-center gap-2 border border-gold/30 bg-warm-white px-7 py-7 text-center">
            <span className="font-body text-[0.65rem] tracking-editorial uppercase text-burgundy">
              {family.label}
            </span>
            <p className="font-display text-lg sm:text-xl text-wine">{family.names}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
