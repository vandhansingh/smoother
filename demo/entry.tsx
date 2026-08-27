/* Client-only entry for the single-file demo build.
   Mirrors app/layout.tsx and app/page.tsx, minus the pieces that only
   exist server-side (metadata, next/font). Fonts and design tokens come
   from the stylesheet the static export already produced. */

import { createRoot } from 'react-dom/client';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Cursor from '@/components/layout/Cursor';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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

function Site() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-sm bg-ink px-4 py-2 text-bg focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
      >
        Skip to content
      </a>
      <SmoothScroll>
        <Cursor />
        <Header />
        <main id="main">
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
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}

const mount = document.getElementById('signalarc');
if (mount) createRoot(mount).render(<Site />);
