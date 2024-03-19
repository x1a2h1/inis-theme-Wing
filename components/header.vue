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
    <div class="header">
      <hgroup class="logo" itemprop="publisher" itemscope="" itemtype="https://schema.org/Organization">
        <h1 class="fullname" itemprop="logo" itemscope="" itemtype="https://schema.org/ImageObject">
          <NuxtLink to="/">{{ state.config?.json?.title ||'x1a2h1'}}</NuxtLink>
        </h1>
        <meta itemprop="name" :content="state.config?.json?.remark">
        <meta itemprop="url" content="#">
      </hgroup>
      <div class="header_right">
        <form method="get" action="search" class="search">
          <input class="search-key btn btn-link btn-action right-btn uni-bg uni-shadow" name="s" placeholder="Please enter..." type="text"
                 required="required"/>
          <i class="i-material-symbols-search w-1.2em h-1.2em ma"></i>
        </form>
        <a class="btn btn-link btn-action right-btn uni-bg uni-shadow menu-btn off-canvas-toggle flex-center ml-2" href="#aside">
          <i class="i-material-symbols-light-menu-rounded w-1.2em h-1.2em"></i>
        </a>
      </div>
    </div>
</template>

<style scoped>
.header {
  @apply relative h-24 pa-4% w-auto flex justify-center items-center  justify-between  md:text-red md:w-full ;
}

.logo {
  @apply text-center;
}
 .fullname {
  @apply m0 font-size-6;
}
.fullname a {
  @apply text-blue-700 decoration-none dark:text-[#f7f8f9];
}

.header_right {
  @apply flex absolute top-50% -mt right-4% text-[#66758C] z99;
}
.search {
  @apply relative;
}
.search [class*=i-material] {
 @apply absolute z202 top-0 bottom-0 left-0 right-0  pointer-events-none;
}
.search-key {
  outline: none;
  @apply relative z201;
}
.search-key::placeholder {
  opacity: 0;
}
.search-key:not(.header_right .search-key:focus) {
  color: transparent;
}
.search-key:focus {
  padding: 0 1rem 0 1.8rem;
  box-shadow: 0 0 0 9999rem rgba(48, 55, 66, 0.1);
  @apply w48 bg-gray-100 text-left;
}
.search-key:focus ~ [class*=i-material] {
  @apply justify-start left-2 right-unset z202;
}
 .right-btn{
  @apply decoration-none text-current;
}
 .menu-btn {
  @apply inline-flex md:hidden
}
</style>