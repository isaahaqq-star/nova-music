module.exports = {
  content: [
    './player/app/**/*.{js,ts,jsx,tsx}',
    './player/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'nova-accent': '#ff006e',
        'nova-dark': '#0a0a0a',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
