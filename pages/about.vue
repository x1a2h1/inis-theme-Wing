<script lang="ts" setup>
import {useGetPage} from "~/apis";
useHead({
  title:'关于博主'
})
const state:object | any = reactive({
  data:Object
})
onBeforeMount(async ()=>{
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
    }else {
      console.log('about data',data)
    }
  }
}
</script>

<template>
  <article>
    <div class="divider"></div>
    <div class="article-content" itemprop="articleBody">
      <div v-html="state.data.content"></div>
    </div>
  </article>
</template>

<style scoped>

</style>