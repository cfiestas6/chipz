/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        'playball': ['sans-serif'],
        'overpass': ['sans-serif'],
        'heading': ['sans-serif'],
      },
      colors: {
        'white': '#fbfbfb',
        'red': '#a12034',
        'blue': '#011422',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["autumn"]
  },
}