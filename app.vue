<script lang="ts" setup>
import {useGetConfig} from "~/apis";

onBeforeMount(()=>{
  method.getGlobalConfig()
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
  <link rel="stylesheet" href="/caomei/style.css">
  <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>
<style>
@import "public/style.css";
</style>
