import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--rgb-background) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--rgb-background-secondary) / <alpha-value>)',
        surface: 'rgb(var(--rgb-surface) / <alpha-value>)',
        'surface-alt': 'rgb(var(--rgb-surface-alt) / <alpha-value>)',
        primary: 'rgb(var(--rgb-primary) / <alpha-value>)',
        'primary-dark': 'rgb(var(--rgb-primary-dark) / <alpha-value>)',
        /* clay lifted for dark grounds, where the base tone falls under 4.5:1 */
        'primary-lift': 'rgb(216 111 76 / <alpha-value>)',
        secondary: 'rgb(var(--rgb-secondary) / <alpha-value>)',
        accent: 'rgb(var(--rgb-accent) / <alpha-value>)',
        ink: 'rgb(var(--rgb-text) / <alpha-value>)',
        muted: 'rgb(var(--rgb-text-muted) / <alpha-value>)',
        line: 'rgb(var(--rgb-border) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-inter-tight)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        text: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(4rem, 9vw, 10rem)', { lineHeight: '0.9', letterSpacing: '-0.045em' }],
        section: ['clamp(3rem, 6vw, 7rem)', { lineHeight: '0.94', letterSpacing: '-0.04em' }],
        statement: ['clamp(3rem, 7vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.042em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em' }],
        'label-lg': ['0.8125rem', { lineHeight: '1.1', letterSpacing: '0.12em' }],
        lead: ['clamp(1.0625rem, 1.35vw, 1.25rem)', { lineHeight: '1.55', letterSpacing: '-0.011em' }],
      },
      maxWidth: {
        shell: '1560px',
        prose: '68ch',
      },
      spacing: {
        section: 'clamp(4rem, 11vw, 12.5rem)',
        'section-sm': 'clamp(3.5rem, 7vw, 7rem)',
        gutter: 'clamp(1.25rem, 4vw, 4rem)',
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '14px',
        lg: '22px',
        xl: '34px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(23 19 16 / 0.04), 0 8px 24px -12px rgb(23 19 16 / 0.14)',
        lift: '0 2px 4px rgb(23 19 16 / 0.05), 0 26px 54px -24px rgb(23 19 16 / 0.28)',
        panel: '0 40px 90px -50px rgb(23 19 16 / 0.5)',
        inset: 'inset 0 1px 0 0 rgb(255 255 255 / 0.6)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'premium-in': 'cubic-bezier(0.62, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '160ms',
        medium: '380ms',
        slow: '750ms',
      },
      screens: {
        xs: '480px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
};

export default config;
