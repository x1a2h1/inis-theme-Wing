<script setup lang="ts">
import {useGetConfig} from "~/apis";
const state:any = reactive({
  animation:true,
  background:'',
  config:[]
})

onMounted( ()=>{
  method.init()

})
const method = {
  init:()=>{
    method.getGlobalConfig()
  },
  getGlobalConfig:async ()=>{
    state.config = useState('config')
  }
}

</script>

<template>
    <div id="header" class="flex-center justify-between">
      <hgroup class="logo" itemprop="publisher" itemscope="" itemtype="https://schema.org/Organization">
        <h1 class="fullname" itemprop="logo" itemscope="" itemtype="https://schema.org/ImageObject">
          <a href="#">{{ state.config?.json?.title ||'x1a2h1'}}</a>
        </h1>
        <meta itemprop="name" :content="state.config?.json?.remark">
        <meta itemprop="url" content="#">
      </hgroup>
      <section class="header__right d-flex">
        <form method="get" action="search" class="search">
          <input class="search-key btn btn-link btn-action right-btn uni-bg uni-shadow" name="s" placeholder="Please enter..." type="text"
                 required="required"/>
          <i class="text-small czs-search-l flex-center"></i>
        </form>
        <a class="btn btn-link btn-action right-btn uni-bg uni-shadow menu-btn off-canvas-toggle flex-center ml-2" href="#aside">
          <i class="text-large czs-menu-l flex-center"></i>
        </a>
      </section>
    </div>
</template>

<style scoped>

</style>