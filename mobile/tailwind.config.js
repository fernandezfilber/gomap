/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0d1117',
        cardBg: '#161b22',
        forwardBlue: '#58a6ff',
        forwardGreen: '#238636',
      }
    },
  },
  plugins: [],
}