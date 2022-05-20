module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        page: '83ch',
      },
      screens: {
        xm: '370px',
        sm: '480px',
      },
      boxShadow: {
        headers: '0 2px 0 var(--brand)',
      },
      colors: {
        bg: '#161515',
        text: '#ffffff',
        secondary: '#80848d',
        header: 'rgb(21 20 20)',
        brand: '#00aaff',
      },
      fontFamily: {
        'gt-walsheim-pro': `"GT Walsheim Pro",-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif`,
      },
    },
  },
  plugins: [],
}
