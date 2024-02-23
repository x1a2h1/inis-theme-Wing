<script setup lang="ts">

import {useGetBanner} from "~/apis";
import {format} from "timeago.js";
useHead({
  title:'我的作品',
})
const state:any = reactive({
 data:[]
})
onMounted(async ()=>{
  method.init()
})

const method = {
  init:()=>{
    method.getWorks()
  },
  getWorks:async ()=>{
    const { data } = await useGetBanner()
    if (data.data != null){
      state.data = data.data
    }
  }
}
</script>

<template>
  <div class="article-list">
    <article v-if="state.data.length != 0" v-for="(item, index) in state.data" :key="index" class="article-item" itemscope="itemscope" itemtype="http://schema.org/Article">
      <a :href="item.url" class="article-mask" :target="item.target" :title="item.title">
        <div class="article-thumbnail" :style="`background-image: url(${item.image})`"></div>
        <header class="article-header">
          <h2 class="article-title h5 text-dark text-ellipsis" itemprop="headline">{{ item.title }}</h2>
          <div class="article-subtitle text-gray">
            <ul class="d-flex text-tiny text-gray reset-ul">
              <li class="time">
                <i class="czs-time"></i>
                <time datetime="" itemprop="datePublished"
                      pubdate>{{format(item.create_time * 1000, 'zh_CN')}}</time>
              </li>
              <li class="comments">
                <i class="czs-comment"></i>
                50
              </li>
              <li class="likes">
                <i class="czs-heart"></i>
                99
              </li>
            </ul>
          </div>
        </header>
      </a>
    </article>

    <article v-if="state.data.length === 0" class="meta flex-center w-100" style="padding: 20% 0;flex-direction: column;">
      <h1>404</h1>
      <p>该页面没有您要查找的内容。</p>
    </article>
  </div>
</template>

<style scoped>

</style>