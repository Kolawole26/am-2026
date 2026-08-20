import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-gold/20 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4';

const variants = {
  primary: 'bg-gold text-wine-deep hover:bg-gold-light',
  outline: 'border border-gold text-gold hover:bg-gold hover:text-wine-deep',
  ghost: 'text-ivory hover:text-gold',
} as const;

type Variant = keyof typeof variants;

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/** A single button primitive that renders as either a <button> or an <a>
 * (for external RSVP / WhatsApp links) while keeping identical styling. */
export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ('href' in props && props.href) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
