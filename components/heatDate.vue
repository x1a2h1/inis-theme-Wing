<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  day: String,
  states: { type: Object, default: () => ({}) },
})
const tooltip = computed(()=>{
  return `${props.day}\n${Object.keys(props.states).map(key => `${key}: ${props.states[key]}`).join('\n')}`;
})
const method = {
  init:()=>{

  }
}
</script>

<template>
  <div class="heatmap-map__item tooltip" :data-tooltip="tooltip">
    <div v-if="states" class="heatmap-map__item-block">
      <div v-for="(key, index) in Object.keys(states)" :key="index" :class="['heatmap-map__item-inner',`level-${states.count}`, { active: states[key] }]">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>