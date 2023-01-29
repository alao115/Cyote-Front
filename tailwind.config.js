module.exports = {
  purge: [
    'components/**/*.{vue,js}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.{js,ts}',
    'nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        coyoGreen: '#64E61E',
        coyoWhite: '#F2F2F2',
        coyoBlack: '#1E1E24',
        coyoPink: '#E6567D',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
