<script setup lang="ts">
import config from "../plugins/config";
import {useColorMode} from "#imports";

const state = reactive({
  animation: "",
  skinMode:useCookie('skin-mode'),
  config:useState('config'),
  modeList: [
    { name: 'Auto', icon: 'i-material-symbols-night-sight-auto-off-rounded', mode: 'system' },
    { name: 'Light', icon: 'i-material-symbols-light-mode', mode: 'light' },
    { name: 'Dark', icon: 'i-material-symbols-nightlight-badge-outline-rounded', mode: 'dark' },
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
  },
  toggleSkinMode:(mode:string)=>{
    console.log('颜色key',mode)
    const colorMode = useColorMode()
    if (colorMode.preference != mode) {
      colorMode.preference = mode
    }
  },
  toggleLanguage:(e:any)=>{
    const target = e.target;
    if ( !target.closest('a') ) return;
    const lang = target.dataset.mode;
    useCookie('lang', lang);
    // 刷新页面
    location.reload();
  },
  scrollTo:()=>{
  //   todo 返回顶部
    console.log("返回顶部")
  }
}
console.log(state.config)

</script>

<template>
  <div id="footer">
  <div class="d-flex flex-center justify-between flex-wrap">
    <div class='left'>
            <span>&copy; 2024 {{state.skinMode}} <a href="#">{{state.config?.json?.title|| '夏至'}}</a></span>
    </div>
    <div class='right'>
      <span>Theme by <a class="theme-name" href="#" target="_blank">wing</a></span>
    </div>
  </div>
  <div class="text-center text-tiny mt-2 w-100" style="opacity: 0.2;">
    <span class="mx-1"><a href="https://beian.miit.gov.cn" target="_blank">{{state.config?.json?.copy?.code}}</a></span>
<!--    <span class="mx-1"><a href="https://www.beian.gov.cn/portal/registerSystemInfo"-->
<!--                          target="_blank">琼ICP备2021000719号-1</a></span>-->
  </div>
<!--    侧边设置栏-->
  <div class="scroll-tools mr-2">
<!--    主题设置-->
    <div class="dropdown" hover-show perspective>
      <a class="btn btn-link btn-action uni-bg bg-blur uni-shadow dropdown-toggle flex-center"
         href="javascript:void(0);" tabindex="0">
        <i class="i-mdi-theme-light-dark"></i>
      </a>
      <ul class="hover-menu hover-menu-left mode-switch uni-card uni-bg bg-blur uni-shadow text-center" >
        <li v-for="item of state.modeList" class="item-menu" @click="method.toggleSkinMode(item.mode)">
          <a class="flex-center" :data-mode="item.mode" href="javascript:void(0);">
            <div :class="[item.icon]"></div>
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </div>
<!--    主题设置结束-->
    <div style="height: 0.4rem;"></div>
<!--    <div class="dropdown" hover-show perspective>-->
<!--      <a class="btn btn-link btn-action uni-bg bg-blur uni-shadow dropdown-toggle flex-center"-->
<!--         href="javascript:void(0);" tabindex="0">-->
<!--        <i class="czs-earth"></i>-->
<!--      </a>-->
<!--      <ul class="menu menu-left mode-switch uni-card uni-bg bg-blur uni-shadow" @click="method.toggleLanguage">-->
<!--        <li v-for="item of state.langList" class="menu-item">-->
<!--          <a class="flex-center" :data-mode="item.mode" href="javascript:void(0);">-->
<!--            <i :class="[item.icon, 'mr-1']"></i>{{ item.name }}-->
<!--          </a>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
    <div style="height: 0.4rem;"></div>
    <!-- 回到顶部按钮 -->
    <a class="scroll-top btn btn-link btn-action uni-bg bg-blur uni-shadow flex-center"
       href="javascript: $h.scrollTo();">
      <i class="czs-rocket"></i>
    </a>
    <!-- 回到顶部按钮结束 -->

  </div>
<!--    侧边设置栏结束-->
  </div>
</template>

<style scoped>
#footer {
  @apply text-[#bcc3ce] pa-4%
}
#footer a {
  @apply text-[#66758c]
}

#footer a.theme-name {
  position: relative;
}
#footer a.theme-name::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 4px;
  width: 4px;
  height: 4px;
  background-color: red;
  box-shadow: 4px 0 orange, 8px 0 yellow, 12px 0 green, 16px 0 blue, 20px 0 purple;
}
.scroll-tools {
  position: fixed;
  right: 0;
  top: 50%;
  z-index: 999;
  transition: 300ms;
  display: flex;
  flex-direction: column;
}
.scroll-tools .scroll-top {
  display: none;
}
.scroll-tools.show {
  display: block;
}
.scroll-tools.show .scroll-top {
  display: block;
}
#footer .dropdown .hover-menu-left {
  left: unset;
  right: 0;
}
#footer .dropdown[perspective] {
  perspective: 60rem;
}
#footer .dropdown[hover-show] .hover-menu {
  display: block;
  opacity: 0;
  visibility: hidden;
  transform-origin: 50% -10rem;
  transform: rotateX(-15deg);
  transition: 300ms;
  animation: unset;
  top: 110%;
}

#footer .dropdown[hover-show]:hover .hover-menu {
  opacity: 1;
  visibility: visible;
  transform: rotateX(0);
}

#footer .dropdown {
  display: inline-block;
  position: relative;
}

.dropdown .hover-menu {
    animation: slide-down 0.15s ease 1;
    display: none;
    left: 0;
    max-height: 50vh;
    overflow-y: auto;
    position: absolute;
    top: 100%;
}
#footer .dropdown.dropdown-right .hover-menu {
    left: auto;
    right: 0;
}
#footer .dropdown.active .hover-menu,
#footer .dropdown .dropdown-toggle:focus + .hover-menu,
#footer .dropdown .hover-menu:hover {
    display: block;
}
#footer .dropdown .btn-group .dropdown-toggle:nth-last-child(2) {
  border-bottom-right-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
}




#footer .hover-menu {
  box-shadow: 0 0.05rem 0.2rem rgba(48, 55, 66, 0.3);
  background: #fff;
  border-radius: 0.2rem;
  list-style: none;
  margin: 0;
  min-width: 180px;
  padding: 0.4rem;
  transform: translateY(0.2rem);
  z-index: 300;
}
#footer .hover-menu.menu-nav {
  background: transparent;
  box-shadow: none;
}
#footer .hover-menu .item-menu {
  margin-top: 0;
  padding: 0 0.4rem;
  position: relative;
  text-decoration: none;
}

#footer .hover-menu .item-menu > a {
  margin: 0 -0.4rem;
  padding: 0.2rem 0.4rem;
  @apply rd-1 text-inherit decoration-none text-dark-8 hover:text-blue dark:hover:text-blue dark:text-gray;
}
</style>