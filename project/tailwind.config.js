/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0F172A', // Deep navy background
          900: '#1E293B', // Slightly lighter navy
          800: '#334155', // Component backgrounds
          700: '#475569', // Interactive elements
          600: '#64748B', // Borders
        },
        purple: {
          500: '#8B5CF6', // Main accent color
          600: '#7C3AED', // Hover/active state
          700: '#6D28D9', // Pressed state
        },
      },
    },
  },
  plugins: [],
};