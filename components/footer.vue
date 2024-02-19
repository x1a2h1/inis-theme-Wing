<script setup lang="ts">

import {onMounted, reactive} from "vue";

const state = reactive({
  animation: "",
  modeList: [
    { name: 'Auto', icon: 'czs-bot', mode: 'auto' },
    // { name: $lang.translate('Auto'), icon: 'czs-bot', mode: 'auto' },
    { name: 'Light', icon: 'czs-sun', mode: 'light' },
    { name: 'Dark', icon: 'czs-moon', mode: 'dark' },
    // { name: 'Relax', icon: 'czs-eye', mode: 'relax' },
  ],
  langList: [
    { name: '🇨🇳 简体中文', mode: 'zh_CN' },
    { name: '🇭🇰 繁体中文', mode: 'zh_TC' },
    { name: '🇯🇵 Japanese', mode: 'ja' },
    { name: '🇺🇸 English', mode: 'en' },
  ]
})
onMounted(async ()=>{
  await method.init()
})

const method = {
  init:async ()=>{
     console.log("初始化footer")
  },
  toggleSkinMode:(e:any)=>{
    const target = e.target;
    if ( !target.closest('a') ) return;
    const mode = target.dataset.mode;
    localStorage.setItem('skin-mode', mode);
    ((body) => {
      body.remove('auto', 'light', 'dark');
      body.add(mode);
    })(document.documentElement.classList);

  },
  toggleLanguage:(e:any)=>{
    const target = e.target;
    if ( !target.closest('a') ) return;
    const lang = target.dataset.mode;
    Cookies.set('lang', lang);
    // 刷新页面
    location.reload();
  },
  scrollTo:()=>{
  //   todo 返回顶部
    console.log("返回顶部")
  }
}
</script>

<template>
  <div id="footer">
  <div class="d-flex flex-center justify-between flex-wrap">
    <div class='left'>
            <span>&copy; 2024 <a
                href="#">夏至</a></span>
    </div>
    <div class='right'>
      <span>Theme by <a class="theme-name" href="https://biji.io" target="_blank">wing</a></span>
    </div>
  </div>
  <div class="text-center text-tiny mt-2 w-100" style="opacity: 0.2;">
    琼ICP备2021000719号-1
    <span class="mx-1"><a href="https://beian.miit.gov.cn" target="_blank">琼ICP备2021000719号-1</a></span>
    <span class="mx-1"><a href="https://www.beian.gov.cn/portal/registerSystemInfo"
                          target="_blank">琼ICP备2021000719号-1</a></span>
  </div>
  <div class="scroll-tools mr-2">
    <div class="dropdown" hover-show perspective>
      <a class="btn btn-link btn-action uni-bg bg-blur uni-shadow dropdown-toggle flex-center"
         href="javascript:void(0);" tabindex="0">
        <i class="czs-clothes-l"></i>
      </a>
      <ul class="menu menu-left mode-switch uni-card uni-bg bg-blur uni-shadow text-center" @click="method.toggleSkinMode">
        <li v-for="item of state.modeList" class="menu-item">
          <a class="flex-center" :data-mode="item.mode" href="javascript:void(0);">
            <i :class="[item.icon, 'mr-1']"></i>{{ item.name }}
          </a>
        </li>
      </ul>
    </div>
    <div style="height: 0.4rem;"></div>
    <div class="dropdown" hover-show perspective>
      <a class="btn btn-link btn-action uni-bg bg-blur uni-shadow dropdown-toggle flex-center"
         href="javascript:void(0);" tabindex="0">
        <i class="czs-earth"></i>
      </a>
      <ul class="menu menu-left mode-switch uni-card uni-bg bg-blur uni-shadow" @click="method.toggleLanguage">
        <li v-for="item of state.langList" class="menu-item">
          <a class="flex-center" :data-mode="item.mode" href="javascript:void(0);">
            <i :class="[item.icon, 'mr-1']"></i>{{ item.name }}
          </a>
        </li>
      </ul>
    </div>
    <div style="height: 0.4rem;"></div>
    <a class="scroll-top btn btn-link btn-action uni-bg bg-blur uni-shadow flex-center"
       href="javascript: $h.scrollTo();">
      <i class="czs-rocket"></i>
    </a>
  </div>
  </div>
</template>

<style scoped>

</style>