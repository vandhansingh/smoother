import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Cursor from '@/components/layout/Cursor';

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
  weight: ['400', '500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://signalarc.example'),
  title: {
    default: 'Signalarc — Creative intelligence for modern advertising',
    template: '%s · Signalarc',
  },
  description:
    'Signalarc connects creative production, media activation and performance intelligence in one continuous system, so every campaign learns from the last.',
  keywords: [
    'creative intelligence',
    'advertising platform',
    'media activation',
    'creative automation',
    'performance marketing',
  ],
  openGraph: {
    title: 'Signalarc — Creative intelligence for modern advertising',
    description:
      'One continuous system for creative production, media activation and performance intelligence.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#f3efe7',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only rounded-sm bg-ink px-4 py-2 text-bg focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Cursor />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
