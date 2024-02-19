export default defineEventHandler(async (event)=>{
    const reqHeaders = getHeaders(event)
    const ssrHeader = new Headers()
    const config = useRuntimeConfig()


    ssrHeader.set('i-api-key', config.apiSecret)
    ssrHeader.set('cookie', <string>reqHeaders.Cookie)

    // ssrHeader.set('x-xsrf-token', app['XSRF_HEADER'])
    // ssrHeader.set('client-id', await getFingerPrint())
    event.context.headers = ssrHeader
    event.context.baseUrl = config.apiBase
})