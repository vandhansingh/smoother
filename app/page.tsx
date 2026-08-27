import Hero from '@/components/sections/Hero';
import IntroStatement from '@/components/sections/IntroStatement';
import Ecosystem from '@/components/sections/Ecosystem';
import Creative from '@/components/sections/Creative';
import Media from '@/components/sections/Media';
import Intelligence from '@/components/sections/Intelligence';
import PathStory from '@/components/sections/PathStory';
import Stats from '@/components/sections/Stats';
import CaseStudies from '@/components/sections/CaseStudies';
import Customers from '@/components/sections/Customers';
import Statement from '@/components/sections/Statement';
import FinalCTA from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <Ecosystem />
      <Creative />
      <Media />
      <Intelligence />
      <PathStory />
      <Stats />
      <CaseStudies />
      <Customers />
      <Statement />
      <FinalCTA />
    </>
  );
}
