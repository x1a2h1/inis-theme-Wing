<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import { useGetNotes, useGetConfig } from "~/apis";
const state = reactive({
  loading:false,//加载状态
  tab:[
    {
      id:'all',
      name:'全部',
    },
    {
      id:'notes',
      name:'笔记',
    },
    {
      id:'article',
      name:'文章',
    }
  ],//tabs 列表
  paging: { page: 1, rows: 10, total: 0 },
  noteList:[],
  topicList:[],
  search:{ type:'all',topics:''},
  config:{
    create_time:0,
    json:{
      title:''
    }
  }
})
onMounted(async ()=>{
   await method.init()
})

const method = {
  init:async ()=>{
    await nextTick()
    await method.getConfig()
    await method.getTest()

  },
  getConfig:async ()=>{
    const { data } = await useGetConfig('SITE_INFO')
    useState('config',()=> data.value)
    console.log(state.config)
    useHead({
      title:data.value.json.title,
      meta:[
        { name: data.value.json.description, content: data.value.json.keyword }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: data.value.json.favicon }
          ]
    })
  },
  getTest:async ()=>{

    state.loading = true
    const { data }= await useGetNotes()
    console.log(data.value)
    if (data.value.data != null){
      state.noteList = data.value.data
      state.loading = false
    }

    // useGetNotes().then((res:any)=>{
    //   if (res.data.value.data !== null){
    //     state.noteList = res.data.value.data
    //     state.loading = false
    //   }
    // })
  },
  theEnd:()=>{
    return state.noteList.length >= state.paging.total;
  },
  handleTabs:(item:any)=>{
    state.loading = true
    state.search.type = item.id
    console.log("当前tabs",item)
    // 模拟请求
    setTimeout(()=>{
      method.getTest().then(()=>{
        state.loading = false
      })
    },600)

  //   模拟请求结束
  },
  handleTopic:(topic:any)=>{
  //   点击话题
    console.log('topics数据',state.search.topics)
    state.search.topics = ''
    state.paging.page = 1
    state.search.topics = topic
    method.getTest()
  },
  filterNoteList:()=> {
    const active = state.search.type
    if (['all', 'post'].includes(active)) return state.noteList
    const types = ['private', 'trash']
    return state.noteList.filter((note: any) => {
      if (active !== 'review') {
        if (types.includes(active)) {
          return note.status === active;
        } else {
          return !types.includes(note.status)
        }
      }
      return true
    })
  },
  handleNoteCard:({ event, content, files }, note:any, index:number)=>{
    switch (event) {
        // 引用
      case 'quote':
        // $h.scrollTo({
        //   callback: () => {
        //     this.$refs.editor.insertText(['', note.type, note.id].join('/') + " ");
        //   }
        // });
        break;
        // 新内容更新到节点上
      case 'update':
        note.content = content;
        note.images = [];
        note.videos = [];
        note.attachment = [];

        files && files.forEach((item:any) => {
          if ( item.mime_type.includes("image/") ) {
            note.images.push(item);
          } else if ( item.mime_type.includes("video/") ) {
            note.videos.push(item);
          } else {
            note.attachment.push(item);
          }
        });
        break;
      case 'publish':
      case 'private':
      case 'trash':
      case 'delete':
        note.status = event;
        if ( event === 'trash' ) {
          state.noteList.splice(index, 1);
        }
        break;
    }
  },
  getCount:(type:string):number=>{
  //   todo 获取总数
    let all = state.noteList.length
    let noteCount = 0
    switch (type){
      case 'note':
        for (let i = 0; i < all ;i++) {
          if (state.noteList[i].result.group != null && state.noteList[i].result.group.some((obj:any) => obj.name == '笔记')){
            noteCount++
          }else {
            continue
          }
        }
        return noteCount
      case 'article':
        let notes = method.getCount('note')
          return all - notes

      default:
        return 0
    }
  },
  isNote:(note:any):boolean=>{
    let data = note.result.group
    if (data != null){

      return data.some((obj:any)=> obj.name === '笔记')

    }else {
      return false
    }
  }
}
</script>

<template>
  <div id="notes" class="d-flex">
    <main class="notes-core">
      <div class="notes-tabbar sticky bg-blur">
        <ul class="tab">
          <li v-for="item in state.tab" :key="item.id" @click="method.handleTabs(item)" :class="['tab-item', { active: state.search.type === item.id }]">
            <a href="javascript: void(0);">{{ item.name }}</a>
          </li>
          <div v-if="state.loading" class="loading"></div>
          <span v-else-if="state.search.topics!=''" class="chip text-primary">
            {{ state.search.topics }}
            <a href="javascript: void(0);" class="btn btn-clear" @click="method.handleTopic('')" aria-label="Close" role="button"></a>
          </span>
        </ul>
      </div>

      <div class="notes-list" :style="{ opacity: state.loading ? 0.5 : 1 }">
        <note-card
            v-for="(note, index) in method.filterNoteList()"
            :key="note.id"
            v-bind="{ note }"
            @event="data => method.handleNoteCard(data,note,index)"
            @topic="method.handleTopic"
            v-show="state.search.type === 'all'|| state.search.type === 'notes'&&method.isNote(note) || state.search.type === 'article'&&!method.isNote(note)"
        />
        <div v-if="state.paging.total && !state.loading && method.theEnd()" class="text-center" style="opacity: 0.5;">没有更多</div>
      </div>
    </main>
    <div class="notes-aside">
      <div class="sticky">
        <heat-map :noteList="state.noteList" :noteCount="method.getCount('note')" :article-count="method.getCount('article')"/>
        <topic-list :ref="state.topicList" :active="state.search.topics" @topic="method.handleTopic"/>
      </div>
    </div>
  </div>
</template>