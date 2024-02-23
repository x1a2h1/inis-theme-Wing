
export function useGetNotes() {
    return useHttpGet('getPostNote','/api/common/PostNote',{
        lazy:true
    })
}

export function useGetArticleDetail(id) {
    return useHttpGet('PostDetail',`/api/common/PostDetail?id=${id}`,{
        lazy:true
    })
}

export function useGetRandTags(){
    return useHttpGet('rendTags','/api/common/randTags')
}


export function useGetConfig(key){
    return useHttpGet('getConfig',`/api/common/getConfig?key=${key}`)
}

export function useGetPage(key){
    return useHttpGet('getPage',`/api/common/getPage?key=${key}`)
}

export function useGetBanner(){
    return useHttpGet('getBanner','/api/common/getBanner')
}

export function useGetLinks(){
    return useHttpGet('getLink','/api/common/getLinks')
}