<script lang="ts" setup>
import {useGetPage} from "~/apis";

const state = reactive({
  data:{
    title:'',
    content:''
  }
})
onMounted(async ()=>{
  await nextTick()
  await method.init()
})
const method = {
  init:async ()=>{

    await method.getPage()
    useHead({
      title:state.data.title
    })
  },
  getPage:async ()=>{
    const { data } = await useGetPage('about')
    if ( data!= null ){
      state.data  = data
    }
  }
}
</script>

<template>
<div v-html="state.data.content"></div>
</template>

<style scoped>

</style>