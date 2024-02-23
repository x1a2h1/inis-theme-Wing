<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import Shiki from "@shikijs/markdown-it";
const props:any = defineProps({
  content:String || undefined
})
const md = MarkdownIt()

console.log(md.render(props.content))
md.use( await Shiki({
  themes: {
    light: 'rose-pine-dawn',
    dark: 'rose-pine',
  },
  transformers:[
    {
      code(node) {
        this.addClassToHast(node, 'language-js')
      },
    }
  ]
    })
)

const method = {
  init:()=>{

  }
}
</script>

<template>
<div id="lightgallery" v-html="md.render(<string>content)" v-lightgallery></div>
</template>

<style scoped>

</style>