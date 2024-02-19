<script lang="ts" setup>
let api = process.env
console.log("env配置相关",api)
</script>
<template>
  <link rel="stylesheet" href="/caomei/style.css">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>
<style>
@import "public/style.css";
</style>
