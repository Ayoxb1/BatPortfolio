import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#ffffff',
          light: '#f4f4f5',
          dark: '#71717a',
          glow: '#ffffff',
        },
        stealth: {
          black: '#000000',
          dark: '#080808',
          surface: '#111111',
          card: '#161616',
          border: '#27272a',
        },
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 255, 255, 0.25)',
        'glow-lg': '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.08)',
        'glow-sm': '0 0 10px rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
