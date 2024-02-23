<script lang="ts" setup>
import {useGetConfig} from "~/apis";
const skinMode:any = useCookie('skin-mode');
const config = useState('config')
useHead({
  link:[
    {rel:'icon',type:'image/x-icon',href:config?.value?.json?.favicon}
  ]
})
onBeforeMount(async ()=>{
  ((body) => {
    if (skinMode.value === undefined){
      body.add('auto')
    }else {
      body.add(skinMode.value)
    }
  })(document.documentElement.classList)
  method.init()
  await method.getGlobalConfig()
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
