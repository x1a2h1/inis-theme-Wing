<script setup lang="ts">
import { onMounted } from "vue"
import dayjs from 'dayjs'
const props = defineProps({
  noteList:[],
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
  init: () => {
    method.handleHeatMap()
  },
  handlerDate: (): any => {
    const config: any = useState('config')
    state.config = config.value
    let nowDate = dayjs(new Date(), 'YYYY-MM-DD')
    let date = dayjs.unix(config.value?.create_time).format('YYYY-MM-DD')
    let time = nowDate.diff(date, 'd', false)

    return time
  },
  calendar: () => {
    // 获取当前时间前面60天的数据
    let dateData:any = {}
    for (let i = 0;i< 60;i++){
      let date = dayjs().format('YYYY-MM-DD')

      let day = dayjs(date).subtract(i, 'day').format('YYYY-MM-DD')
      dateData[day] = {count:0}

    }
    for (let e = 0;e<props.noteList.length;e++){
      let pd = dayjs.unix(props.noteList[e].create_time).format("YYYY-MM-DD")
      if (dateData[pd]){
        dateData[pd].count++
      }
    }
    // 获取当前时间前面60天的数据 结束

    // const {calendar} = state.heatmap
    return Object.keys(dateData).map((day: any) => ({day, states: dateData[day] }));
  },
  handleHeatMap: () => {
  }
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