<script lang="ts" setup>
import  { useGetArticleDetail} from "~/apis";

import { format } from 'timeago.js'
import dayjs from "dayjs";
const route = useRoute()
const {type,id} = route.params
const state = reactive({
  data:{
    title:'',
    create_time:0,
    content:'',
    result:{
      like:[],

      author:{
        nickname:''
      }
    }
  },
  content:''

})



onMounted(async ()=>{
  await method.init()
})

const method = {
  init:async ()=>{
    await method.getArticleData()
    console.log(state.data.content)
  },
  getArticleData:async ()=>{
    const { data } = await useGetArticleDetail(id)
    state.data = data
    console.log(data)
    state.content  = method.getPostsToc(data.content)
    useHead({
      title:data.title
    })
    return data.content
  },
  onPraise:()=>{
  //   点赞
  },
  timeago:(time:number):string=>{
    return format(time * 1000 , "ZH_CN",{ relativeDate: '2018-11-11' })
  },
  getPostsToc:(str:string):string=>{
  //   todo 获取文章目录 只获取h1，如果没有h1，则aside 设置为不显示
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    const h1Tags = doc.querySelectorAll('h1');
    const h1Values: object[] = [];

    // 遍历h1标签，添加id并获取值
    h1Tags.forEach((h1Tag, index) => {
      // 生成唯一的id（这里使用了简单的递增索引，但在实际应用中你可能需要更复杂的唯一性保证）
      const uniqueId = `anchor-${index}`;
      h1Tag.setAttribute('id', uniqueId);
      // 获取h1标签的文本内容
      h1Values.push({title:h1Tag.textContent || '',anchor:uniqueId});
    });

    // 使用serializer将修改后的Document对象转换回HTML字符串
    const serializer = new XMLSerializer();
     let content = serializer.serializeToString(doc);

    // 返回修改后的HTML和所有h1标签的值
    return content
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
      <div v-if="state.data?.editor == 'tinymce'" id="lightgallery" class="markdown" v-html="state.content" v-highLight v-lightgallery></div>

      <markdown-it v-if="state.data?.editor != 'tinymce'" :content="state.data.content"/>
    </div>
  </article>
</template>

<style scoped>

</style>