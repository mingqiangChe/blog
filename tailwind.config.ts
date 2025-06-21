import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx,html,css}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [typography, require('tailwind-scrollbar')],
};

export default config;
