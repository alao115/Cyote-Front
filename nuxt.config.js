/* import hooks from './hooks' */

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'coyote',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap',
        rel: 'stylesheet',
      },
      {
        href: '/css/bootstrap.min.css',
        rel: 'stylesheet',
      },
    ],
    script: [
      {
        src: '/js/bootstrap.bundle.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/fontawesome.js', '~/plugins/api.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // @nuxtjs/auth-next configurations
  auth: {
    redirect: {
      login: '/signin',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    strategies: {
      customStrategy: {
        scheme: '~/authSchemes/customScheme',
        token: {
          property: 'accessToken',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: {
            url: '/auth/local/signin',
            method: 'post',
          },
          logout: false,
          user: { url: '/users/me', method: 'get' },
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:3001/api',
  },

  // TailwindCSS configurations go here
  tailwind: {
    config: {},
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {},
  /* hooks: hooks(this), */
  purgeCSS: {
    whitelistPatterns: [/svg.*/, /fa.*/],
  },
}
