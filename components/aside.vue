<script lang="ts" setup>
import {useGetArticleDetail} from "~/apis";
const route = useRoute()
const state:object | any = reactive({
  isPosts:false,
  isChecked:false,
  headerNavItems: Array,
  footerNavItems: Array,
  currentIndex:1,
  toc:[]
})
onMounted(async ()=>{
  await nextTick()
  await method.init()
})
const method = {
  init:async ()=>{
    await method.fetchMenus()
    await method.getPostsToc()
  },
  getPostsToc:async ()=>{

      if (route.name =='detail-type-id'){
        let id = route.params.id
        const {data} = await useGetArticleDetail(id)
        let postsToc = method.handleContent(data.content)
        state.toc = postsToc
        if (postsToc.length > 0 ){
          state.isPosts = true
        }
      }else state.isPosts = false
  },
  handleContent:(content:string):object[]=>{
    const parser = new DOMParser()
    const doc = parser.parseFromString(content,'text/html')
    const h1Tags = doc.querySelectorAll('h1');
    const h1Values: object[] = [];
    h1Tags.forEach((h1Tag,index) =>{
      const uniqueId = `anchor-${index}`;
      h1Values.push({title:h1Tag.textContent || '',anchor:uniqueId});
    })
    return h1Values
  },
  hasHeaderNav:()=> {
    return state.headerNavItems.length > 0;
  },
  hasFooterNav:()=>{
    return state.footerNavItems.length > 0
  },
  fetchMenus:async ()=>{
    // 使用 Vue Resource 或者 Axios 等库获取菜单数据
    // 这里假设数据已经获取到并存储在 this.headerNavItems 和 this.footerNavItems 中


    state.headerNavItems = [
      { id: 1, title: '首页', url: '/',icon:'czs-home-l' },
      { id: 2, title: '作品', url: '/works',icon:'czs-clothes-l' },
    ];
    state.footerNavItems = [
      { id: 3, title: '关于博主', url: '/about',children:[
          // {
          //   title:'追番',
          //   url:'/bangumi'
          // },
          ]
      },
      { id: 4, title: '友链', url: '/links',children: [] },
      { id: 4, title: '番剧', url: '/bangumi',children: [] },
    ];
  },
}
watch(() => route.name,
    async (value) => {
  state.isPosts = false;
  if (value === 'detail-type-id') {
    await method.getPostsToc()
  }
    })
</script>

<template>
  <div id="aside" class="off-canvas-sidebar">
    <div class="probes"></div>
    <div class="sticky">
        <input type="radio" id="tab-toc" name="aside-radio" hidden checked>
        <input type="radio" id="tab-nav" name="aside-radio" hidden />
        <ul v-if="state.isPosts" class="aside-tab">
          <li class="toc-active">
            <label for="tab-toc" class="c-hand flex flex-center">
              <i class="czs-read-l"></i>
            </label>
          </li>
          <li class="nav-active">
            <label for="tab-nav" class="c-hand flex flex-center">
              <i class="czs-choose-list-l"></i>
            </label>
          </li>
        </ul>
        <ul v-if="state.isPosts" class="toc-list toc-content">
          <li v-for="(item, index) in state.toc" :key="index" class="toc-item nav-item" style="text-indent: 0">
            <a :href="'#'+item.anchor">{{item.title}}</a>
          </li>
        </ul>

      <div>
        <ul id="menu-header" class="header_nav reset-ul uni-bg shadow-sm" v-if="method.hasHeaderNav()">
          <li :id="`menu-item-${item.id}`"  :class="[item.icon, `menu-item-${item.id}` , {'bg-blue-700 border-rd text-white': $route.path == item.url}]"  v-for="item in state.headerNavItems" :key="item.id">
            <NuxtLink :to="item.url" @click="()=>{state.currentIndex = item.id}">{{item.title}}</NuxtLink>
          </li>
        </ul>
          <ul  class="footer_nav reset-ul uni-bg uni-shadow" v-if="method.hasFooterNav()">
            <li v-for="item in state.footerNavItems" :key="item.id" :id="`menu-item-${item.id}`"  :class="[`menu-item-${item.id} `, {'bg-blue-600 text-white border-rd dark:bg-blur-600': $route.path == item.url}]">
              <nuxt-link :to="item.url">{{ item.title }}</nuxt-link>
            </li>
          </ul>
        <div class="aside-widget-area">
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>