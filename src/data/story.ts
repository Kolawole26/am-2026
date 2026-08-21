import type { StoryMilestone } from '@/types';

export const storyIntro = {
  eyebrow: 'Our Story ❤️',
  supporting: 'From a picture on Twitter to forever.',
  body: "What started with a picture on Twitter turned into a DM, a few months of talking, a friendship, and eventually something much more. We met, gave love a chance, and somehow that simple Twitter connection brought us all the way here.",
};

export const storyMilestones: StoryMilestone[] = [
  {
    id: 'how-we-met',
    date: 'How It Started',
    title: 'How We Met',
    text: "Apparently, my picture caught his attention on Twitter, so he decided to send me a DM. After chatting for a while, he asked for my phone number, and our conversations moved from Twitter to WhatsApp. A few months later, we finally met in person, and it felt surprisingly natural.",
    image: {
      src: '/images/story/how-we-met.jpg',
      alt: 'The ring reveal',
      width: 575,
      height: 768,
    },
  },
  {
    id: 'falling-in-love',
    date: 'Along The Way',
    title: 'Falling In Love ❤️',
    text: "What started as friendship slowly became something deeper. We enjoyed talking, laughing, spending time together and simply being ourselves around each other. Before we knew it, we weren't just talking anymore — we were building something real. And somewhere along the way, we fell in love.",
    image: {
      src: '/images/story/falling-in-love.jpg',
      alt: 'Azeezat & Muiez',
      width: 615,
      height: 768,
    },
  },
  {
    id: 'the-proposal',
    date: 'The Turning Point',
    title: 'The Proposal 💍',
    text: "It was my birthday, and I thought the plan was simple: go out, have fun and enjoy my day. But this man had other plans. He somehow convinced me to follow him to a hotel, and I had no idea what was waiting for me. The moment I walked into the room, I saw it was beautifully decorated. Then came the real surprise — he proposed! So while I thought I was just going out to celebrate another birthday, he had secretly planned a whole new chapter of our lives. Best birthday surprise ever. 🥹💍❤️",
    image: {
      src: '/images/story/proposal.jpg',
      alt: 'The engagement ring',
      width: 575,
      height: 768,
    },
  },
];
