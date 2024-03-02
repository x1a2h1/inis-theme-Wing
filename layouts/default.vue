<script setup lang="ts">
import {reactive} from "vue";

const route = useRoute()
const state =reactive({
  animation:'',
  background:''
})

onMounted(async ()=>{
  await method.init()
})
const method = {
  init:async ()=>{
    // state.animation = 'animation-start';
    // state.animation = 'animation-toward';
    // state.animation = 'animation-end';;

  }
}

</script>

<template>
  <div id="app" :class="['layout', state.animation, state.background ? 'less-animation' : '']" style="display: none;" v-show="true">
  <Header />
    <div id="core" class="container off-canvas off-canvas-sidebar-show">
      <Aside/>
      <a class="off-canvas-overlay" href="#close"></a>
      <main id="main" class="uni-bg uni-shadow off-canvas-content">
          <div class="content">
          <slot />
          </div>
      </main>
    </div>
    <Footer id="footer" />
  </div>

</template>

<style>
body {
  min-width: 1000px;
  @apply bg-gray-100 flex flex-col min-h-screen;
}
</style>