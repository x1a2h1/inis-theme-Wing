<script lang="ts" setup>
import type { NuxtError } from '#app'
const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    error
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>

<style scoped>

</style>