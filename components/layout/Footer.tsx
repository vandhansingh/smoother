'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Logo from './Logo';
import FadeUp from '@/components/motion/FadeUp';
import { EASE_PREMIUM } from '@/lib/motion';

const columns = [
  {
    title: 'Platform',
    links: ['Creative', 'Media', 'Intelligence', 'Integrations', 'Security'],
  },
  {
    title: 'Solutions',
    links: ['Retail', 'Financial services', 'Consumer goods', 'Agencies', 'Enterprise'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Newsroom', 'Partners', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Benchmarks report', 'Guides', 'Changelog', 'Status'],
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="on-dark relative overflow-hidden border-t border-line bg-surface-alt pb-10 pt-section-sm text-ink"
    >
      <div className="shell">
        <div className="grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <FadeUp className="lg:col-span-4">
            <Logo className="text-ink" />
            <p className="mt-6 max-w-[30ch] font-text text-[0.9375rem] leading-relaxed text-muted">
              Creative intelligence for teams that would rather know than guess.
            </p>
            <ul className="mt-9 flex flex-col gap-2 text-[0.8125rem] text-muted">
              {[
                ['London', 'Clerkenwell'],
                ['New York', 'Tribeca'],
                ['Singapore', 'Tanjong Pagar'],
              ].map(([city, area]) => (
                <li key={city} className="flex items-baseline gap-3">
                  <span className="w-24 text-ink/80">{city}</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>

            <p className="mt-9 flex items-center gap-2.5 text-[0.75rem] text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-pill bg-accent" />
              </span>
              All systems operational
            </p>
          </FadeUp>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:grid-cols-4">
            {columns.map((col, ci) => (
              <FadeUp key={col.title} delay={ci * 0.045}>
                <h2 className="text-label uppercase tracking-[0.16em] text-muted">{col.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#footer"
                        className="group relative inline-block text-[0.9375rem] text-ink/75 transition-colors duration-fast hover:text-ink"
                      >
                        {link}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-[240ms] ease-premium group-hover:scale-x-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* final visual detail: the arc, drawn one last time */}
        <motion.svg
          aria-hidden
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="mt-[clamp(3.5rem,7vw,6rem)] h-14 w-full text-line"
        >
          <motion.path
            d="M0 58 C 260 58, 300 6, 600 6 C 900 6, 940 58, 1200 58"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.3, ease: EASE_PREMIUM as unknown as number[] }}
          />
        </motion.svg>

        <div className="mt-8 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-muted">
            © {new Date().getFullYear()} Signalarc. A fictional product, built as a design study.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map((l) => (
              <a
                key={l}
                href="#footer"
                className="text-[0.75rem] text-muted transition-colors duration-fast hover:text-ink"
              >
                {l}
              </a>
            ))}
            <a
              href="#main"
              className="group ml-auto flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.14em] text-muted transition-colors duration-fast hover:text-ink sm:ml-0"
            >
              Back to top
              <span className="flex h-7 w-7 items-center justify-center rounded-pill border border-line transition-colors duration-medium ease-premium group-hover:border-ink/40">
                <ArrowUp className="h-3.5 w-3.5 transition-transform duration-[220ms] ease-premium group-hover:-translate-y-[2px]" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
