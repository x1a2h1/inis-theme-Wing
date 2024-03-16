<script lang="ts" setup>
import { useGetSearch } from '~/apis';

// todo 列出文章和笔记

const state = reactive({
  data:[]
})
const route = useRoute()
console.log(route.query.s);

onMounted(async()=>{
  await method.init()
})
const method = {
  init:async()=>{
    await method.searchArticle()
  },
  searchArticle:async()=>{
    let params = {
      like:["tags",`%${route.query.s}'`]
    }
    await useGetSearch(route.query.s).then((res:any)=>{
      if (res.code == 200){
        state.data = res.data
      }
      console.log("搜索到的数据",res);
    })
  }
}

</script>
<template>
  <div v-if="route.query.s != null && state.data.length != 0">
    <div>
      {{state.data}}
    </div>
  </div>
  <div v-else>
    <div class="text-red">暂无数据！</div>
  </div>
</template>