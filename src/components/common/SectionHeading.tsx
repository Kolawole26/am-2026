import type { ReactNode } from 'react';
import { GoldDivider } from './GoldDivider';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  supporting?: ReactNode;
  align?: 'center' | 'left';
  tone?: 'dark' | 'light';
  className?: string;
}

/** The repeated "eyebrow / title / gold divider / supporting line" pattern
 * used to open every section — keeps that rhythm consistent site-wide. */
export function SectionHeading({
  eyebrow,
  title,
  supporting,
  align = 'center',
  tone = 'dark',
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  const titleColor = tone === 'dark' ? 'text-wine' : 'text-ivory';
  const eyebrowColor = tone === 'dark' ? 'text-burgundy' : 'text-gold-light';
  const supportingColor = tone === 'dark' ? 'text-muted' : 'text-ivory/75';

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && (
        <span className={`text-xs sm:text-sm font-body font-semibold tracking-editorial uppercase ${eyebrowColor}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl md:text-5xl leading-tight font-display ${titleColor}`}>{title}</h2>
      <GoldDivider />
      {supporting && (
        <p className={`max-w-xl text-base sm:text-lg font-body ${supportingColor}`}>{supporting}</p>
      )}
    </div>
  );
}
