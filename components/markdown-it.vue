<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import Shiki from "@shikijs/markdown-it";

const props:any = defineProps({
  content:String || undefined
})
const md = MarkdownIt()

md.use( await Shiki({
  themes: {
    light: 'catppuccin-latte',
    dark: 'nord',
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
    console.log(md.render(props.content))
  },
  handleContent:()=>{

  }
}
</script>

<template>
<div id="lightgallery" v-html="md.render(<string>content)" v-lightgallery></div>
</template>

<style scoped>

</style>