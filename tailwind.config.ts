import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      black: { DEFAULT: '#000000' },
      white: { DEFAULT: '#FFFFFF' },
      grey: {
        DEFAULT: '#F0F0F0',
        dark: '#aaaaaa'
      }
    }
  },

  plugins: []
} satisfies Config
