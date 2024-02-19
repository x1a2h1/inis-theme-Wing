
export default defineEventHandler(async (event)=>{

    const method:any = getMethod(event).toUpperCase()
    let body
    if (method !== 'GET') body = await readRawBody(event)
    const res = await $fetch('/article/all', {
        method,
        baseURL: event.context.baseUrl,
        headers: event.context.headers,
        params: getQuery(event),
        body
    })

    return res
})