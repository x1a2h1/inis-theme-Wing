<script lang="ts" setup>
import {useGetConfig} from "~/apis";
const config = useState('config')
const skinMode:any = useCookie('skin-mode');


useHead({
  link:[
    {rel:'icon',type:'image/x-icon',href:config?.value?.json?.favicon}
  ]
})

onBeforeMount( ()=>{
    // if (skinMode.value === undefined){
    //   document.documentElement.classList.add('auto');
    // }else {
    //   document.documentElement.classList.add(skinMode.value);
    // }

  method.init()
  method.getGlobalConfig()
})

const method = {
  init:()=>{

    console.log(useCookie('skin-mode'))
  },
  getGlobalConfig:async ()=>{
    const { data } = await useGetConfig('SITE_INFO')
    useState('config',()=>data)
  }
}
</script>
<template>
  <link rel="stylesheet" href="/caomei/style.css">
  <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>
<style>
@import "public/style.css";
.page-enter-active,
.page-leave-active {

  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(1rem);
  filter: blur(1rem);
}
</style>
