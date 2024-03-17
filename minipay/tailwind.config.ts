/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        'playball': ['Playball', 'cursive'],
        'overpass': ['Overpass', 'sans-serif'],
        'heading': ['Courgette'],
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