/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        text: 'var(--color-text)',
      },
      fontFamily: {
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)'],
      },
    },
  },
  plugins: [],
}

