<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import  { useGetArticleDetail} from "~/apis";
import { format } from 'timeago.js'
import dayjs from "dayjs";
const route = useRoute()
const {type,id} = route.params
const state = reactive({
  data:{
    title:String,
    create_time:0,
    content:String,
    result:{
      like:[],

      author:{
        nickname:String
      }
    }
  }

})



onMounted(async ()=>{
  await nextTick()
  await method.init()
})

const method = {
  init:async ()=>{
    await method.getArticleData()
  },
  getArticleData:async ()=>{
    const { data } = await useGetArticleDetail(id)
    console.log(data)
    state.data = data.value
    useHead({
      title:data.value.title
    })
    // await useGetArticleDetail(params).then((res:any)=>{
    //   console.log(res.data.value)
    //   state.data = res.data.value
    // })
  },
  onPraise:()=>{
  //   点赞
  },
  timeago:(time:number):string=>{
    return format(time * 1000 , "ZH_CN",{ relativeDate: '2018-11-11' })
  }
}
</script>

<template>
  <article class="article" itemscope="itemscope" itemtype="http://schema.org/Article">
    <header class="article-header">
      <h1 itemprop="headline" class="article-title h2 mb-2">{{state.data.title}}</h1>
      <ul class="article-info d-flex text-gray reset-ul m-0">
        <li>
          <i class="czs-forum"></i>
          <span>{{ state.data.result?.author?.nickname }}</span>
        </li>
        <li>
          <i class="czs-time"></i>
          <time datetime="" itemprop="datePublished"
                pubdate>{{ dayjs.unix(state.data.create_time).format('YYYY-MM-DD HH:mm')}}</time>
        </li>
        <li class="c-hand" onclick="">
          <i class="czs-heart"></i>
          <span class="praise-">{{ state.data.result?.like?.length }}</span>
        </li>
      </ul>
      <div class="divider"></div>

<!--      <meta itemprop="author" content="231">-->
<!--      <meta itemprop="publisher" content="Riecko">-->
<!--      <meta itemprop="dateModified" content="time">-->
<!--      <meta itemprop="image" content="">-->
    </header>
    <div class="article-content" itemprop="articleBody">
      <div class="markdown" v-html="state.data.content" v-highLight></div>
    </div>
  </article>
</template>

<style scoped>

</style>