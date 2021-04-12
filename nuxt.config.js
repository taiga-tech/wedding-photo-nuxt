import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  server: { host: '0', port: 3000 },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#',
    },
    titleTemplate: '%s - wedding-photop-app',
    title: 'wedding-photop-app',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0',
      },
      { hid: 'description', name: 'description', content: '' },

      // global OGP
      { hid: 'og:title', property: 'og:title', content: 'wedding-photop-app' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      // { hid: 'og:url', property: 'og:url', content: '' },
      // {
      //   hid: 'og:image',
      //   property: 'og:image',
      //   content: '',
      // },
      { property: 'og:site_name', content: 'wedding-photop-app' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '',
      },
      // Twitter OGP
      { name: 'twitter:card', content: 'summary' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  pwa: {
    manifest: {
      name: 'WPA',
      short_name: 'WPA',
      lang: 'ja',
      useWebmanifestExtension: false,
      background_color: '#000',
      theme_color: '#000',
      viewport: 'width=device-width,initial-scale=1.0,minimum-scale=1.0',
      description: 'description',
    },
  },

  router: { middleware: 'maintenance' },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/nuxt-client-init.js', ssr: false },
    { src: '~/plugins/vue-masonry', ssr: false },
    '~/plugins/axios',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',

    '@nuxtjs/moment',
  ],

  moment: { locales: ['ja'] },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxtjs/proxy',

    '@nuxtjs/dotenv',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    baseURL: process.env.BASE_URL,
    credentials: true,
  },

  proxy: { '/api': process.env.BASE_URL },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: false,
    },

    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isDev, isClient }) {
      if (isClient) {
        config.devtool = 'source-map'
      }
    },
  },

  env: {
    BASE_URL: process.env.BASE_URL,
    AWS_CDN_URL: process.env.AWS_CDN_URL, // awscloudfront url
    MAINTENANCE_MODE: process.env.MAINTENANCE_MODE, // true : false
  },
}
