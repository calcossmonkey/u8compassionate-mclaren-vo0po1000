export default {
  head: {
    title: 'Hypertabs',
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
      { rel: 'icon', type: 'image/png', href: '/icon.png' }
    ]
  },

  googleFonts: {
    families: {
      Barlow: [200]
    }
  },

  css: ['~/assets/css/main.css'],

  components: true,

  plugins: [{ src: '~/plugins/vue-tabs-chrome.js', mode: 'client' }],

  modules: ['@nuxt/http'],

  buildModules: ['@nuxtjs/google-fonts', '@nuxtjs/color-mode', '@nuxtjs/svg']
}
