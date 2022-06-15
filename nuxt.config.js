export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'blog-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oxygen&display=swap",
      },
    ],
    script: [
      {
        src: "/js/bootstrap.bundle.min.js",
      },
      {
        src: "/js/jquery-3.6.0.min.js",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    "~/assets/bootstrap.min.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '~/modules/material-design-icons.js'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [

  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
