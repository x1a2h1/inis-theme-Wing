<script lang="ts" setup>
import {useGetConfig} from "~/apis";
const config:object |any = useState('config')
useHead({
  link:[
    {rel:'icon',type:'image/x-icon',href:config?.value?.json?.favicon},
    // {rel:'stylesheet', href:"/caomei/style.css"}
  ]
})
onBeforeMount( async ()=>{
  method.init()
  await method.getGlobalConfig()
})

const method = {
  init:()=>{
  },
  getGlobalConfig:async ()=>{
    const { data } = await useGetConfig('SITE_INFO')
    useState('config',()=>data)
  }
}
</script>
<template>
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
