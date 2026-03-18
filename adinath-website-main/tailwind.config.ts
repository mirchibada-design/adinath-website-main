import type { Config } from 'tailwindcss';

const config: Config = {
  // Only process files in these directories (keeps build fast)
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Brand Colors ───────────────────────────────────────────────────
      colors: {
        gold: {
          DEFAULT: '#DFC15E',
          light: '#EDD98A',
          dark: '#B89B3A',
        },
        dark: {
          DEFAULT: '#0A0A0A',
          2: '#111111',
          3: '#1A1A1A',
          4: '#222222',
        },
      },

      // ─── Typography ──────────────────────────────────────────────────────
      fontFamily: {
        // Playfair Display: Used for all headings
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        // DM Sans: Used for body text, captions, UI labels
        'dm-sans': ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },

      // ─── Custom font sizes for cinematic headings ─────────────────────
      fontSize: {
        'display-xl': ['clamp(4rem, 12vw, 10rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.05' }],
      },

      // ─── Spacing extensions ───────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      // ─── Custom animations ────────────────────────────────────────────
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'scroll-down': 'scrollDown 1.5s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scrollDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(6px)', opacity: '0.4' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
      },

      // ─── Backdrop blur extensions ─────────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },

      // ─── Custom screen breakpoints ────────────────────────────────────
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

export default config;
