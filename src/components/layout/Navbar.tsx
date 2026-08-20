import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Monogram } from '@/components/common/Monogram';
import { Sparkles } from '@/components/common/Sparkles';
import { useScrollNav } from '@/hooks/useScrollNav';
import { wedding } from '@/data/wedding';

const NAV_LINKS = [
  { href: '#story', label: 'Our Story' },
  { href: '#the-wedding', label: 'The Wedding' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#gifting', label: 'Gifting' },
  { href: '#rsvp', label: 'RSVP' },
];

export function Navbar() {
  const scrolled = useScrollNav(48);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Mobile/tablet keep a translucent wine bar at all times (a transparent
  // bar over a hero photo was unreadable on phones) — only the desktop nav
  // (lg+) gets the fully transparent-over-hero look before scrolling.
  const barTone = scrolled || menuOpen
    ? 'bg-ivory/95 backdrop-blur-sm shadow-sm shadow-wine/5'
    : 'bg-wine-deep/55 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none';
  const textTone = scrolled || menuOpen ? 'text-wine' : 'text-ivory';

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${barTone}`}>
        <nav className="container-editorial flex h-18 items-center justify-between py-4" aria-label="Primary">
          <a
            href="#top"
            className={`flex items-center gap-2.5 font-display text-sm sm:text-base tracking-editorial uppercase transition-colors duration-500 ${textTone}`}
          >
            <Monogram size={30} tone={scrolled || menuOpen ? 'wine' : 'gold'} ring={false} />
            <span className="hidden sm:inline">{wedding.websiteName}</span>
          </a>

          <ul className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-body text-xs tracking-editorial uppercase transition-colors duration-500 hover:text-gold ${textTone}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`lg:hidden flex h-11 w-11 items-center justify-center transition-colors duration-500 ${textTone}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={26} strokeWidth={1.4} /> : <Menu size={26} strokeWidth={1.4} />}
          </button>
        </nav>
      </header>

      {/* Rendered as a sibling of <header>, not a child — a `backdrop-blur`
          on an ancestor creates a new containing block for `position: fixed`
          descendants, which was collapsing this panel to zero height when
          it lived inside the (blurred) header. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 top-18 z-40 flex flex-col overflow-hidden bg-wine-deep lg:hidden"
          >
            <Sparkles count={12} />
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex justify-center pt-10"
            >
              <Monogram size={44} tone="gold" />
            </motion.div>
            <ul className="flex flex-1 flex-col items-center justify-center gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 + 0.06 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl text-ivory transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="pb-10 text-center font-body text-xs tracking-editorial uppercase text-gold-light/80">
              {wedding.coupleShort} &middot; {wedding.dateShort}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
