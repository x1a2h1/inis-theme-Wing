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

</style>
