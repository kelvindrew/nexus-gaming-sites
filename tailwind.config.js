/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#080b10',
          card: 'rgba(15, 21, 34, 0.75)',
          cyan: '#00f0ff',
          purple: '#9d00ff',
          green: '#00ff9d',
          rose: '#ff0055',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        cyber: ['Rajdhani', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
