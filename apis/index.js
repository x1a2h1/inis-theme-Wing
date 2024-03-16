
export function useGetNotes() {
    return useHttpGet('getPostNote','/api/common/PostNote',{
        lazy:true
    })
}
export function useGetSearch(keywords){
    const encodedSearchTerm = encodeURIComponent(keywords);   
    return useHttpGet('getPostNote',`/api/common/PostNote?page=1&limit=10&where[0][0]=audit&where[0][1]==&where[0][2]=1&order=create_time desc&like[0][0]=content&like[0][1]=%25${encodedSearchTerm}%25&like[1][0]=title&like[1][1]=%25${encodedSearchTerm}%25&like[2][0]=tags&like[2][1]=%25${encodedSearchTerm}%25`,{
        lazy:true
    })
}

export function useGetTagCount(id){
    const encodedSearchTerm = encodeURIComponent(id);   
    return useHttpGet('getPostNote',`/api/common/PostNote?like[0][0]=tags&like[0][1]=%25${encodedSearchTerm}%25`,{
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