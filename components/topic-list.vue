<script setup lang="ts">
import {onMounted} from "vue";
import {useGetRandTags, useGetTagCount} from "~/apis";
const props = defineProps({
  active:String
})
const state = reactive({
  loading: false,
  topics: [],
})
onMounted(async ()=>{
  await nextTick()
  await method.init()
})
const emit = defineEmits(['topic'])
const method = {
  init:async ()=>{
    state.loading = true
    const { data } = await useGetRandTags()
    state.topics = data
    for(let i = 0; i < state.topics.length; i++) {
      state.topics[i].count = await useGetTagCount(state.topics[i].id).then(res => res.data.count)
    }
  },
  handleTopic:((topic:any)=>{
      emit('topic', topic.name)
  }),
}

</script>

<template>
  <ul class="topic-list menu">
    <li v-for="topic in state.topics" :key="topic.id" class="menu-item" @click="method.handleTopic(topic)">
      <a href="javascript:void(0);" :class="{ active: active ===topic.name }">{{ topic.name }}</a>
      <div class="menu-badge">
        <label class="label text-tiny">{{ topic.count }}</label>
      </div>
    </li>
  </ul>
</template>

<style scoped>

</style>