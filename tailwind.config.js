/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#081b33',
          800: '#0f2a56',
          700: '#16417a',
          600: '#1f5da8'
        }
      }
    }
  },
  plugins: [],
};
