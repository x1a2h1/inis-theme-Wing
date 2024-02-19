function useGetFetchOptions(options:any) {
        const config = useRuntimeConfig()
    options.baseURL = options.baseURL ?? config.apiBase

    // 请求headers配置
    options.headers = options.headers ?? {
        'qq-key':config.apiSecreta
    }
    options.initialCache = options.initialCache ?? false
    options.lazy = options.lazy ?? false

    // 用户登录，默认传token
    const token = useCookie('token')
    if (token.value) {
        options.headers.token = token.value
    }
    return options
}
export async function useHttp(key:string, url:string, options:any = {}) {
    options = useGetFetchOptions(options)
    options.key = key

    if (options.$) {
        const data = ref(null)
        const error = ref(null)
        return await $fetch(url, options)
            .then((res:any) =>{
                    data.value = res.data
                    return {
                        data,
                        error
                    }
                }
            )
            .catch((err) => {
                const msg = err?.data?.data
                if (process.client) {
                    // const { message } = createDiscreteApi(['message'])
                    // message.error(msg || '服务端错误')
                    console.log(msg||'服务端错误')
                }
                error.value = msg
                return {
                    data,
                    error
                }
            })
    }

    let res = await useFetch(url, {
        ...options,
        // 相当于响应拦截器
        transform: (res:any|object) => {
            return res.data
        }
    })

    // 客户端错误处理
    if (process.client && res.error.value) {
        const msg = res.error.value?.data?.data
        if (!options.lazy) {
            // const { message } = createDiscreteApi(['message'])
            // message.error(msg || '服务端错误')
            console.log(msg||'服务端错误')
        }
    }

    return res

}

// GET请求
export function useHttpGet(key:string, url:string, options:any = {}) {
    options.method = 'GET'
    return useHttp(key, url, options)
}

// POST请求
export function useHttpPost(key:string, url:string, options:any = {}) {
    options.method = 'POST'
    return useHttp(key, url, options)
}