/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Custom purple palette
        'primary': {
          100: '#e9d8fd', // very light purple
          200: '#d6bcfa', // light purple
          300: '#B3A2D3', // medium light purple
          400: '#9f7aea', // medium purple
          500: '#A29AFF', // main purple (primary)
          600: '#6b46c1', // medium dark purple
          700: '#553c9a', // dark purple
          800: '#44337a', // very dark purple
          900: '#322659', // extremely dark purple
        },
        // Dark theme background colors
        'dark': {
          100: '#374151', // lighter dark
          200: '#1f2937', // medium dark
          300: '#111827', // dark
          400: '#030712', // very dark
        }
      },
    },
  },
  plugins: [],
}