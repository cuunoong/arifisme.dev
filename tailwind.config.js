module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: '#EF5DA8',
        text: '#393F48',
        purple: '#9B51E0',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
