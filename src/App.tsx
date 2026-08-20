import { MusicProvider } from '@/components/music/MusicProvider';
import { MusicControl } from '@/components/music/MusicControl';
import { IntroExperience } from '@/components/intro/IntroExperience';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/hero/Hero';
import { Countdown } from '@/components/hero/Countdown';
import { OurStory } from '@/components/story/OurStory';
import { WeddingDetails } from '@/components/details/WeddingDetails';
import { Timeline } from '@/components/timeline/Timeline';
import { Gallery } from '@/components/gallery/Gallery';
import { Gifting } from '@/components/gifting/Gifting';
import { RSVP } from '@/components/rsvp/RSVP';
import { GuestLove } from '@/components/guestlove/GuestLove';
import { FinalMessage } from '@/components/finalmessage/FinalMessage';

// The main page is always fully mounted — the intro overlay is a purely
// visual layer on top of it (see IntroExperience), so nothing here is ever
// blocked from rendering or fetching while the intro plays.
function App() {
  return (
    <MusicProvider>
      <IntroExperience />
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <OurStory />
        <WeddingDetails />
        <Timeline />
        <Gallery />
        <Gifting />
        <RSVP />
        <GuestLove />
        <FinalMessage />
      </main>
      <Footer />
      <MusicControl />
    </MusicProvider>
  );
}

export default App;
