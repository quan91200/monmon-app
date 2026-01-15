/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 10s linear infinite',
        'pulse-scale': 'pulseScale 1s infinite',
      },
      fontFamily: {
        zendots: ['Zendots', 'sans-serif'],
        jersey: ['Jersey', 'sans-serif'],
        bungee: ['Bungee', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        pulseScale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      screens: {
        'laptop': '1280px',
        'ipad-h': '1024px', // horizontal - ngang
        'ipad-v': '768px', // vertical - dọc
        'mobile': '375px'
      }
    },
  },
  plugins: [],
}
