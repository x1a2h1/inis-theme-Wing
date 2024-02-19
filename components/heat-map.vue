<script setup lang="ts">
import { onMounted } from "vue"
import dayjs from 'dayjs'

const props = defineProps({
  postCount:Number,
  noteCount:Number,
  articleCount:Number
})

const state =reactive({
  config:{
  },
  heatmap: { calendar: [...Array(60)], days: '-', notes: '-', posts: '-' }
})

onMounted( ()=>{
  method.init()
})
const method = {
  init:()=>{
    console.log('获取到config',state.config)

  },
  handlerDate:():any=>{
    const config:any = useState('config')
    state.config = config.value
    let nowDate = dayjs(new Date(),'YYYY-MM-DD')
    let date = dayjs.unix(config.value?.create_time).format('YYYY-MM-DD')
    let time =nowDate.diff(date,'d',false)

    return time
  },
  calendar: ()=>{
    const { calendar } = state.heatmap
    return Object.keys(calendar).map((day:any) => ({ day, states: calendar[day] }));
  },
}
</script>

<template>
  <div class="heatmap">
    <div class="heatmap-mvp d-flex">
      <div class="heatmap-mvp__item">
        <h5>{{ method.handlerDate() || '-'}}</h5>
        <span>DAYS</span>
      </div>
      <div class="heatmap-mvp__item">
        <h5>{{ noteCount || '-'}}</h5>
        <span>NOTES</span>
      </div>
      <div class="heatmap-mvp__item">
        <h5>{{ articleCount|| '-' }}</h5>
        <span>POSTS</span>
      </div>
    </div>
    <div class="heatmap-map d-flex">
      <heat-date v-for="(item,index) in method.calendar()" :key="index" v-bind="item" />
    </div>
  </div>
</template>

<style scoped>

</style>