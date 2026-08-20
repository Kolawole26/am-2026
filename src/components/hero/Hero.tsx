import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Image } from '@/components/common/Image';
import { Sparkles } from '@/components/common/Sparkles';
import { Monogram3D } from '@/components/three/Monogram3D';
import { wedding } from '@/data/wedding';
import { heroImage } from '@/data/media';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE_EDITORIAL } from '@/lib/motion';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_EDITORIAL } },
};

const lineItem = {
  hidden: { opacity: 0, scaleX: 0 },
  show: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: EASE_EDITORIAL } },
};

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Background photograph — this is the LCP element, so it loads eager
          + high priority and nothing above it blocks paint. */}
      <div className="absolute inset-0">
        <Image
          basePath={heroImage.basePath}
          width={heroImage.width}
          height={heroImage.height}
          alt={heroImage.alt}
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/80 via-wine/55 to-wine-deep/90" />
      </div>

      <Sparkles count={16} />

      <motion.div
        variants={reduced ? undefined : container}
        initial={reduced ? undefined : 'hidden'}
        animate={reduced ? undefined : 'show'}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.p
          variants={reduced ? undefined : item}
          className="font-body text-xs sm:text-sm tracking-editorial uppercase text-gold-light"
        >
          {wedding.heroKicker}
        </motion.p>

        <motion.div variants={reduced ? undefined : item} className="mt-4">
          <Monogram3D className="w-[clamp(160px,34vw,260px)] aspect-square" />
        </motion.div>

        <motion.h1
          variants={reduced ? undefined : item}
          className="mt-7 font-display text-4xl sm:text-6xl md:text-7xl leading-[1.05] text-ivory text-balance"
        >
          {wedding.bride} <span className="text-gold">&amp;</span> {wedding.groom}
        </motion.h1>

        <motion.span variants={reduced ? undefined : lineItem} className="mt-7 block h-px w-20 bg-gold" />

        <motion.p
          variants={reduced ? undefined : item}
          className="mt-7 font-display text-lg sm:text-2xl tracking-[0.15em] text-ivory/90"
        >
          {wedding.date}
        </motion.p>

        <motion.p
          variants={reduced ? undefined : item}
          className="mt-4 font-body text-xs sm:text-sm tracking-editorial uppercase text-gold-light"
        >
          {wedding.tagline}
        </motion.p>
      </motion.div>

      <motion.a
        href="#countdown"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold-light"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={reduced ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block"
        >
          <ChevronDown size={26} strokeWidth={1.2} />
        </motion.span>
      </motion.a>
    </section>
  );
}
