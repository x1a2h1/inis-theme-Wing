export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()


    console.log('API 基础 URL:', config.public.apiBase)
});