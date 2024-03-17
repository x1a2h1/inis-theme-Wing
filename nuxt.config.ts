// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/image",'@nuxtjs/color-mode','@unocss/nuxt',],
  app:{
    pageTransition: { name: 'page',mode: 'out-in' },
    head:{
      titleTemplate: '%s - 固定标题',
      title: 'inis',
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'zh-cn'
      },
      meta: [
        { name: 'description', content: 'seo描述' },
        { name: 'keywords', content: 'seo关键词' }
      ],
    }

  },
  runtimeConfig:{
    apiBase:'',
    apiSecret: '',
  },
  colorMode:{
    classSuffix: ''
  },

  devtools: { enabled: true },
})