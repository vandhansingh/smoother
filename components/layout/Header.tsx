'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Logo from './Logo';
import MagneticButton from '@/components/motion/MagneticButton';
import { EASE_PREMIUM, heroBeats } from '@/lib/motion';

const nav = [
  {
    label: 'Platform',
    href: '#ecosystem',
    children: [
      { label: 'Creative', href: '#creative', note: 'Produce every variant from one master.' },
      { label: 'Media', href: '#media', note: 'Activate across every channel from one plan.' },
      { label: 'Intelligence', href: '#intelligence', note: 'Read what worked, and why.' },
    ],
  },
  { label: 'Work', href: '#work' },
  { label: 'Results', href: '#results' },
  { label: 'Company', href: '#footer' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setMenu(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: heroBeats.logo, ease: EASE_PREMIUM as unknown as number[] }}
      className={[
        'fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,box-shadow,height] duration-[380ms] ease-premium',
        scrolled
          ? 'border-b border-line/80 bg-bg/85 shadow-[0_1px_0_0_rgb(23_19_16/0.03),0_10px_30px_-24px_rgb(23_19_16/0.35)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
      onMouseLeave={() => setMenu(null)}
    >
      <div
        className="shell flex items-center justify-between transition-[height] duration-[380ms] ease-premium"
        style={{ height: scrolled ? 'var(--header-height-condensed)' : 'var(--header-height)' }}
      >
        <a href="#main" aria-label="Signalarc home" className="text-ink transition-opacity duration-fast hover:opacity-70">
          <Logo />
        </a>

        {/* desktop navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: heroBeats.nav, ease: EASE_PREMIUM as unknown as number[] }}
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setMenu(item.children ? item.label : null)}
            >
              <a
                href={item.href}
                className="group relative flex items-center rounded-sm px-3.5 py-2 text-[0.9375rem] tracking-[-0.01em] text-ink/80 transition-colors duration-fast hover:text-ink"
                aria-expanded={item.children ? menu === item.label : undefined}
                onFocus={() => setMenu(item.children ? item.label : null)}
              >
                {item.label}
                <span className="absolute inset-x-3.5 bottom-1.5 h-px origin-left scale-x-0 bg-ink/40 transition-transform duration-[220ms] ease-premium group-hover:scale-x-100" />
              </a>

              <AnimatePresence>
                {item.children && menu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.99, transition: { duration: 0.14 } }}
                    transition={{ duration: 0.26, ease: EASE_PREMIUM as unknown as number[] }}
                    className="absolute left-0 top-[calc(100%+6px)] w-[22rem] origin-top-left rounded-md border border-line bg-surface p-2 shadow-lift"
                  >
                    {item.children.map((child, i) => (
                      <motion.a
                        key={child.label}
                        href={child.href}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.04 + i * 0.04,
                          ease: EASE_PREMIUM as unknown as number[],
                        }}
                        className="group flex flex-col gap-0.5 rounded-sm px-3.5 py-3 transition-colors duration-fast hover:bg-bg-secondary"
                        onClick={() => setMenu(null)}
                      >
                        <span className="flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink">
                          {child.label}
                          <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-[200ms] ease-premium group-hover:translate-x-0 group-hover:opacity-100" />
                        </span>
                        <span className="text-[0.8125rem] leading-snug text-muted">{child.note}</span>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.nav>

        {/* actions */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: heroBeats.nav + 0.04, ease: EASE_PREMIUM as unknown as number[] }}
          className="flex items-center gap-2"
        >
          <a
            href="#footer"
            className="hidden rounded-sm px-3.5 py-2 text-[0.9375rem] text-ink/70 transition-colors duration-fast hover:text-ink md:block"
          >
            Sign in
          </a>
          <MagneticButton
            href="#cta"
            className="group hidden items-center rounded-pill bg-ink px-5 py-2.5 text-[0.9375rem] font-medium text-bg transition-colors duration-medium ease-premium hover:bg-primary sm:inline-flex"
            data-cursor
          >
            Book a demo
            <ArrowUpRight className="h-4 w-4 transition-transform duration-[200ms] ease-premium group-hover:translate-x-[3px] group-hover:-translate-y-[2px]" />
          </MagneticButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-sm text-ink transition-colors duration-fast hover:bg-bg-secondary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.div>
      </div>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.24 } }}
            transition={{ duration: 0.42, ease: EASE_PREMIUM as unknown as number[] }}
            className="border-t border-line bg-bg lg:hidden"
          >
            <nav className="shell flex flex-col py-6" aria-label="Mobile">
              {nav.flatMap((item) => [item, ...(item.children ?? [])]).map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.36,
                    delay: 0.05 + i * 0.035,
                    ease: EASE_PREMIUM as unknown as number[],
                  }}
                  className={[
                    'flex items-center justify-between border-b border-line/70 py-4 tracking-[-0.02em] last:border-0',
                    'note' in item ? 'pl-4 text-[1.0625rem] text-muted' : 'text-[1.375rem] text-ink',
                  ].join(' ')}
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 opacity-40" />
                </motion.a>
              ))}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="mt-6 flex items-center justify-center gap-2 rounded-pill bg-ink px-6 py-4 font-medium text-bg"
              >
                Book a demo
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
