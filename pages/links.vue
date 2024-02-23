<script setup lang="ts">

import {useGetLinks} from "~/apis";
useHead({
  title:'友情链接',
})
const state:any = reactive({
  data:[]
})

onMounted(async ()=>{
  await method.init()
})
const method = {
  init:async ()=>{
   await method.getLinksData()
  },
  getLinksData:async ()=>{
    const { data } = await useGetLinks()
    if (data.data != null){
      state.data = data.data
    }
  }
}
</script>

<template>
  <text style="text-align: center">朋友们</text>
  <div class="divider"></div>
  <div class="article-content" itemprop="articleBody">
    <ul id="article-cards columns reset-ul"
        class="article-cards article-links columns reset-ul">
      <li v-for="(item, index) in state.data" :key="index" class="column col-4 col-sm-6 p-2">
        <a class="card uni-card uni-shadow flex-center text-center" :href="item.url" target="_blank">
          <span class="text-break mt-2">{{item.nickname}}</span>
          <span class="text-gray text-tiny text-break mb-2">{{item.description}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>