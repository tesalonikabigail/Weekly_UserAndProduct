export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'project',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/global-components.js',
    '~/plugins/axios.js',
    '~/plugins/vee-validate.js',
    '~/plugins/filters.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/router',
    // '@nuxtjs/auth-next',
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules']
  },

  router: { 
    middleware: ['auth'] 
  }

  // auth: {
  //   redirect: {
  //     login: '/login', //http://localhost:3000,
  //     logout: '/login',
  //     home: '/users'
  //   },
  //   strategies: {
  //     local: {
  //       token: {
  //         name: 'token',
  //         required: true,
  //         type: '', 
  //         property: 'accessToken'
  //       },
  //       endpoints: {
  //         login: { 
  //           url: 'http://localhost:8080/login',
  //           method: 'post'
  //         },
  //         logout: {
  //           url: 'http://localhost:8080/logout',
  //           method: 'post'
  //         },
  //         user: false
  //       }
  //     },
  //   }
  // },

  // router: {
  //   middleware: ['auth'] // buat klo blm login gbs ke /users, trs klo udh login gbs login lgi; pke yg export default auth: 'guest' 
  // }                      // atau true atau false (bisa sbgai 'guest' ataupun true -> true itu klo udh login, guest klo blm login,
                            // nah false itu bisa kedua nya)

}
