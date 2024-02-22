<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import {format} from 'timeago.js'

import lightgallery from 'lightgallery/vue';

const props = defineProps(['note','notePraise','praise','bindEditor','superContent'])
const emit = defineEmits(['topic'])
const state =reactive({
  isEditor:false,
  // isPost:false,
  logged:false,
  loading:false,
  hideDivider:false,
  menus: {
      texts:[],
      icons:[
          {
        id:1,
        name:'123',
        hide:false,
            href:'',
            icon:''

      }
      ]
    },
  covers:[]


})

onMounted(async ()=>{
  await method.init()
})

const method = {
  init:async ()=>{
    state.covers = props.note.covers.split(",")
  },
  isPost:():boolean=>{
    let data = props.note.result.group

    if (data != null){

      return !data.some((obj:any)=> obj.name === '笔记')

    }else {
      return true
    }
  },
  noteDate:(date:number):string=>{
  //   时间格式化
    let data = format(date * 1000,'zh_CN')
    return data
  },
  superContent:(content:any)=>{
  //   todo 高亮显示
    if ( !content ) return '';
    if ( method.isPost() ) return `<p>${props.note.abstract}</p>`;
    // 高亮话题 #话题1 话题2
    Array.from(new Set(content.match(/.?#([^#|^<\s]+)/g) || []))
        .filter((text:any) => text[0] !== "/")
        .map((text:any) => text.replace(/\s|&nbsp;|>/g, ''))
        .filter(item => !!item)
        .forEach(topic => {
          content = content.replaceAll(topic, `<span class="chip c-hand text-primary" data-topic="${topic}">${topic.replace("#", "")}</span>`);
        });

    // 高亮引用 /note/5841
    new Set((content.match(/(\/note\/\d+)/g) || [])).forEach((quote:any) => {
      const id = quote.replace('/note/', '');
      content = content.replaceAll(quote, `<a href="javascript:void(0);" class="text-primary" data-quote="${id}">~${quote}</a>`);
    });

    // url转link
    let url_regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z\d][a-zA-Z\d-]+[a-zA-Z\d]\.[^\s|^<]{2,}|www\.[a-zA-Z\d][a-zA-Z\d-]+[a-zA-Z\d]\.[^\s|^<]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z\d]+\.[^\s|^<]{2,}|www\.[a-zA-Z\d]+\.[^\s|^<]{2,})/g;
    let url_match = content.match(url_regex);
    if ( url_match ) {
      url_match.forEach((url:any) => {
        content = content.replaceAll(url, `<a href="${url}" target="_blank" class="chip text-primary tooltip" data-tooltip="${url}" style="text-decoration: none;overflow: unset"><i class="dashicons dashicons-external"></i> Link</a>`);
      });
    }
    return content;
  },
  handleDelegate:(e:any)=>{
    const { dataset } = e.target;
    if ( dataset && dataset.topic ) {
      emit('topic', dataset.topic.replace('#', '').replace(/&nbsp;/g, ''));
    }
  }
}
</script>

<template>
<div id="note-card">
  <div :class="'notes-item feat'">
    <template v-if="!state.isEditor">
      <div class="tile d-block">
        <div class="tile-header flex-center justify-between">
          <div class="article-header text-gray text-tiny d-flex align-center">
            <h3 v-if="method.isPost()" class="text-dark h5 mt-2 mb-0">
              <NuxtLink :to="'/detail/article/'+note.id">{{ note.title }}</NuxtLink>
            </h3>
            <div v-else class="flex-center">
              <time class="mr-2" :datetime="note.create_time" itemprop="datePublished" pubdate>{{ method.noteDate(note.create_time) }}</time>
<!--              <span v-if="note.status === 'private'" class="chip bg-gray text-gray">{{ note.status.toLocaleUpperCase() }}</span>-->
            </div>
          </div>

          <slot name="right-icon">
            <div v-if="!method.isPost() && state.logged" class="dropdown mr-1" hover-show>
              <a href="javascript:void(0);" class="btn btn-link btn-action btn-sm flex-center dropdown-toggle text-gray" tabindex="0">
                <i class="dashicons dashicons-ellipsis"></i>
              </a>
              <ul class="menu menu-left uni-card uni-bg uni-shadow bg-blur" style="overflow: unset; min-width: 6rem;">
                <div v-if="state.loading" class="loading loading-full"></div>
                <div class="text-center">
                  <li v-if="!item.hide" :class="['menu-item d-inline-block tooltip mt-0', { 'ml-1': index}]" v-for="(item, index) in state.menus.icons" :key="item.id"
                      :data-tooltip="item.name" @click="">
                    <a :href="item.href || 'javascript:void(0);'" class="align-center" style="display: flex;">
                      <i v-if="item.icon" :class="[item.icon]"></i>
                    </a>
                  </li>
                </div>
                <div class="divider my-2" v-if="state.menus.texts.length"></div>
                <li :class="['menu-item', item.class]" v-for="item in state.menus.texts" :key="item.id"  @click="">
                  <a :href="item.href || 'javascript:void(0);'" class="align-center" style="display: flex;">
                    <i v-if="item.icon" :class="[item.icon, 'mr-2']"></i> {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </slot>
        </div>
        <div class="tile-content p-0">
          <div :class="['flex-wrap', { 'd-flex': !method.isPost() }]">
            <NuxtImg v-if="method.isPost()&& note.covers != ''" class="thumbnail s-rounded" :src="note.covers" alt=""/>
            <div :class="['article-content', { 'w-100': method.isPost() }]" v-html="method.superContent(note.content)" @click="method.handleDelegate"></div>
          </div>
          <div v-if="!method.isPost() && note.covers.length != 0 " class="notes-item-images flex-center justify-start">
            <div  class="notes-item-images__item c-zoom-in" v-for="(covers,index) in state.covers" :key="index">
              <NuxtImg class="s-rounded" v-if="index < 12 "  :src="covers" alt @click=""/>
            </div>
          </div>
<!--          <attachment-chips v-if="note.attachment" :attachments="note.attachment"></attachment-chips>-->
        </div>
        <div class="tile-footer text-gray text-tiny flex-center justify-between">
          <div v-if="method.isPost()" class="flex-center">
            <time class="mr-2">{{ method.noteDate(note.create_time) }}</time>
            <button class="btn btn-link btn-sm text-gray d-flex align-center" @click="">
              <i class="czs-talk mr-1"></i> {{ note.result.comment.count }}
            </button>
          </div>
          <div v-else class="flex-center">
            <button class="btn btn-link btn-sm text-gray mr-2" @click="">
              <i class="czs-talk"></i>{{ note.result.comment.count}}
            </button>
            <button :class="['btn btn-link btn-sm text-gray mr-2', { 'text-error': note.result.like.length }]"  @click="">
              <i class="czs-heart"></i> <span :class="'praise-' + note.id">{{ note.result.like.length}}</span>
            </button>
          </div>

          <NuxtLink  v-if="method.isPost()" class="btn btn-link btn-sm text-gray d-flex align-center" @click="navigateTo(`/detail/article/${note.id}`)">
            阅读全文
            <i class="czs-angle-right-l ml-1"></i>
          </NuxtLink>
          <span v-else class="flex-center"><i class="dashicons dashicons-laptop mr-1"></i>来自 Webpage</span>
        </div>
      </div>
    </template>
    <template v-else>
      <editor class="edit-status" ref="editor" v-bind="{ ...bindEditor }" @submit="">
        <button slot="send-l" class="btn btn-link btn-sm mr-2" @click="state.isEditor=false">取消</button>
      </editor>
    </template>
<!--    <div v-if="!state.hideDivider" class="divider"></div>-->
  </div>
</div>
</template>

<style scoped>

</style>