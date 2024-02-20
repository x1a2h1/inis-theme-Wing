// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
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
    apiBase:'https://wing.crunl.cn/api',
    apiSecret: 'J0RIWGTUUWBU9KB1TZPQ9VO7DR9D8I8L',
    public: {
      apiBase:'',
      apiSecret: '',

    }
  },

  devtools: { enabled: true },
  modules: ["@nuxt/image"]
})