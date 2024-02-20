//highlight.js v-html中code 代码高亮插件

import 'highlight.js/styles/atom-one-dark.css'
import lineNumberInit from "~/utils/lineNumberInit";
import hljs from "highlight.js";

export default defineNuxtPlugin(async (NuxtApp)=>{
    NuxtApp.vueApp.directive('highLight',(el)=>{
        const blocks = el.querySelectorAll('pre code')
        lineNumberInit(hljs,window, window.document)
        blocks.forEach((block:any) => {
            hljs.highlightBlock(block)
            // hljs.lineNumbersBlock(block)
            // block.innerHTML = "<ul><li>" + block.innerHTML.replace(/\n/g, "\n</li><li>") + "\n</li></ul>";
            let language:any
            block.classList.forEach((className:any)=>{
                if (className.indexOf("language-") != -1) language = className.split('-')[1]
            })
            let pre_head = document.createElement("div")

            pre_head.classList.add('pre-head')
            pre_head.innerHTML = "<p><span class='code-language'>" + language + "</span></p>";
            block.parentNode.insertBefore(pre_head, block)
            // 创建修复滚动条白点
            let repair = document.createElement("span")
            repair.classList.add("repair")
            block.parentNode.insertBefore(repair, block)
            block.setAttribute('init',true)
        })
        })
})