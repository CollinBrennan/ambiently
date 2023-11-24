/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut .5s ease-in-out',
      },

      // that is actual animation
      keyframes: () => ({
        fadeOut: {
          '0%': { filter: 'brightness(0)' },
          '100%': { filter: 'brightness(1)' },
        },
      }),
    },
  },
  plugins: [],
}
