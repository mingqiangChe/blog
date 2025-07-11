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
    extend: {
      typography: {
        DEFAULT: {
          css: {
            fontSize: '16px',
            lineHeight: '1.7',
            maxWidth: '100%',
            table: {
              borderCollapse: 'collapse',
              border: '1px solid #22d3ee', // cyan-400
              width: '100%',
            },
            'th, td': {
              border: '1px solid #22d3ee',
              padding: '0.5rem', // spacing.2
              textAlign: 'left',
              verticalAlign: 'middle',
            },
            th: {
              backgroundColor: '#06b6d41a', // cyan-500 + 1a 透明色
              fontWeight: '600',
              color: '#164e63', // cyan-900
            },
            td: {
              backgroundColor: '#ffffff0d', // white + 0d 透明度
              color: '#1e293b', // gray-900
            },
            'thead th': {
              fontWeight: '700',
            },
            'tbody tr:hover': {
              backgroundColor: '#bae6fd33', // cyan-100 + 33 透明度
            },
            'p, li, blockquote, table, pre': {
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              wordWrap: 'break-word',
              hyphens: 'auto',
              whiteSpace: 'normal',
            },
            img: {
              maxWidth: '100%',
              height: 'auto',
              margin: '1em 0',
              display: 'block',
              borderRadius: '0.5rem', // borderRadius.lg
            },
            pre: {
              maxWidth: '100%',
              overflowX: 'auto',
              borderRadius: '0.5rem',
            },
          },
        },
        dark: {
          css: {
            fontSize: '16px',
            lineHeight: '1.7',
            maxWidth: '100%',
            table: {
              border: '1px solid #22d3ee', // cyan-400
            },
            'th, td': {
              border: '1px solid #22d3ee',
            },
            th: {
              backgroundColor: '#0369a133', // cyan-700 + 33
              color: '#e0f2fe', // cyan-100
            },
            td: {
              backgroundColor: '#11182766', // gray-900 + 66
              color: '#d1d5db', // gray-300
            },
            'tbody tr:hover': {
              backgroundColor: '#07598555', // cyan-800 + 55
            },
            'p, li, blockquote, table, pre': {
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              hyphens: 'auto',
              whiteSpace: 'normal',
            },
            img: {
              maxWidth: '100%',
              height: 'auto',
              margin: '1em 0',
              display: 'block',
              borderRadius: '0.5rem',
            },
            pre: {
              maxWidth: '100%',
              overflowX: 'auto',
              borderRadius: '0.5rem',
            },
          },
        },
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        flicker: 'flicker 3s infinite ease-in-out',
      },
    },
  },
  plugins: [typography, require('tailwind-scrollbar')],
};

export default config;
