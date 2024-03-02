<script lang="ts" setup>
import {useGetPage} from "~/apis";
useHead({
  title:'关于博主'
})
const state:object | any = reactive({
  data:Object
})
onBeforeMount(async ()=>{
  await nextTick()
  await method.init()
})
const method = {
  init:async ()=>{
    await method.getPage()
  },
  getPage:async ()=>{
    const { data } = await useGetPage('about')
    console.log('data about',data)
    if ( data!= null ){
      state.data = data
    }
  }
}
</script>

<template>
  <article>
    <header>
      <h1 itemprop="headline" class="article-title h2 mb-2">{{state.data.title}}</h1>
      <div class="divider"></div>
    </header>
    <div class="article-content" itemprop="articleBody">
      <div v-html="state.data.content"></div>
    </div>
  </article>
</template>

<style scoped>

</style>