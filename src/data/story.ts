import type { StoryMilestone } from '@/types';

/**
 * SAMPLE CONTENT — a fun, warm placeholder story so the site reads as a
 * finished, lively page rather than a form full of instructions. Swap in
 * Azeezat & Muiez's real story whenever it's ready; the <OurStory>
 * component only cares about this array's shape, so nothing else changes.
 */

export const storyIntro = {
  eyebrow: 'Our Story',
  supporting: 'Every forever has a beginning.',
  body: "It started with a mutual friend, a wedding neither of us wanted to go to alone, and a playlist argument that lasted three hours. Somewhere between then and now, \"just friends\" turned into forever. This is (a very fun, very abbreviated version of) how we got here.",
};

export const storyMilestones: StoryMilestone[] = [
  {
    id: 'how-we-met',
    date: 'Where it began',
    title: 'How We Met',
    text: 'A mutual friend\'s birthday party, a shared plate of suya, and a debate about who makes the best jollof rice that neither of us was willing to lose. Muiez says it was love at first argument. Azeezat says he was just hungry.',
    image: {
      src: '/images/gallery/placeholder-01.jpg',
      alt: 'Sample placeholder photo for "How We Met"',
      width: 1200,
      height: 1500,
    },
  },
  {
    id: 'falling-in-love',
    date: 'Along the way',
    title: 'Falling In Love',
    text: "A spontaneous road trip, a playlist that somehow never got old, and one very long phone call at 2am that turned into a nightly habit neither of us wanted to break. That's when we both knew this was more than just fun.",
    image: {
      src: '/images/gallery/placeholder-02.jpg',
      alt: 'Sample placeholder photo for "Falling In Love"',
      width: 1200,
      height: 900,
    },
  },
  {
    id: 'the-proposal',
    date: 'The turning point',
    title: 'The Proposal',
    text: "A \"casual dinner\" that was anything but. Somewhere between dessert and a ring hidden in a napkin, Muiez got down on one knee and Azeezat said yes before he finished the sentence. There may have been happy tears. There was definitely a lot of screaming.",
    image: {
      src: '/images/gallery/placeholder-03.jpg',
      alt: 'Sample placeholder photo for "The Proposal"',
      width: 1200,
      height: 1500,
    },
  },
  {
    id: 'today',
    date: 'And now',
    title: 'Forever Begins',
    text: "Here we are — counting down the days, arguing about seating charts, and more excited than we know how to put into words. Thank you for being part of the story so far. The best chapter is just getting started.",
    image: {
      src: '/images/gallery/placeholder-04.jpg',
      alt: 'Sample placeholder photo for "Forever Begins"',
      width: 1200,
      height: 900,
    },
  },
];
