<script lang="ts" setup>

const state = reactive({
  headerNavItems: [],
  footerNavItems: [],
  currentIndex:1,
})
onMounted(async ()=>{
  method.init()
})
const method = {
  init:()=>{
    method.fetchMenus()
  },
  hasHeaderNav:()=> {
    return state.headerNavItems.length > 0;
  },
  hasFooterNav:()=>{
    return state.footerNavItems.length > 0
  },
  fetchMenus() {
    // 使用 Vue Resource 或者 Axios 等库获取菜单数据
    // 这里假设数据已经获取到并存储在 this.headerNavItems 和 this.footerNavItems 中
    state.headerNavItems = [
      { id: 1, title: '首页', url: '/',icon:'czs-home-l' },
      { id: 2, title: '作品', url: '/works',icon:'czs-clothes-l' },
      { id: 3, title: '关于', url: '/about',icon:'czs-code-l' },
    ];
    state.footerNavItems = [
      { id: 4, title: '追番', url: '/privacy-policy' },
      { id: 5, title: '音乐', url: '/terms-of-service' },
    ];
  },
}
</script>

<template>
  <div id="aside" class="off-canvas-sidebar">
    <div class="probes"></div>
    <div class="sticky">
<!--      <input type="radio" id="tab-toc" name="aside-radio" hidden checked>-->
<!--      <input type="radio" id="tab-nav" name="aside-radio" hidden>-->
<!--      <ul class="aside-tab">-->
<!--        <li class="toc-active">-->
<!--          <label for="tab-toc" class="c-hand flex flex-center">-->
<!--            <i class="czs-read-l"></i>-->
<!--          </label>-->
<!--        </li>-->
<!--        <li class="nav-active">-->
<!--          <label for="tab-nav" class="c-hand flex flex-center">-->
<!--            <i class="czs-choose-list-l"></i>-->
<!--          </label>-->
<!--        </li>-->
<!--      </ul>-->
<!--      <ul class="toc-list toc-content">-->
<!--        <li class="toc-item nav-item" style="text-indent: 0em">-->
<!--          <a href="#toc-0">OpenGraph是什么</a>-->
<!--        </li>-->
<!--      </ul>-->
       <div>
<!--         默认nav-->
        <ul id="menu-header" class="header_nav reset-ul uni-bg uni-shadow" v-if="method.hasHeaderNav()">
          <li :id="`menu-item-${item.id}`"  :class="[item.icon, `menu-item-${item.id} `, {'current-menu-item': state.currentIndex === item.id}]"  v-for="item in state.headerNavItems" :key="item.id">
            <NuxtLink :to="item.url" @click="()=>{state.currentIndex = item.id;console.log(state.currentIndex)}">{{item.title}}</NuxtLink>
          </li>
        </ul>

<!--        <nav id="menu-bottom" class="footer_nav reset-ul uni-bg uni-shadow " v-if="method.hasFooterNav">-->
<!--          <ul>-->
<!--            <li v-for="item in state.footerNavItems" :key="item.id">-->
<!--              <a :href="item.url">{{ item.title }}</a>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </nav>-->
        <div class="aside-widget-area">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>