import lgZoom from 'lightgallery/plugins/zoom'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-video.css'
import 'lightgallery/css/lg-transitions.css'
import 'lightgallery/css/lg-comments.css'
import lightGallery from "lightgallery";
export default defineNuxtPlugin(async (NuxtApp)=>{
    NuxtApp.vueApp.directive('lightgallery',(el)=>{
        // 查询标签
        let lgc:any = document.getElementsByClassName('lg-container')
        console.log('查询到的标签',lgc)
        for (let i = lgc.length - 1 ;i >= 0 ;i--){
            lgc[i].parentNode.removeChild(lgc[i])
        }
        let lg:any = document.getElementById('lightgallery')
        const imgRow = el.querySelectorAll('img')
        const plugin = lightGallery(lg, {
            selector: imgRow,
            mode:'lg-slide-skew-only-y-rev',
            controls: true,
            counter:false,
            download:false,
            loop:false,
        });

        watch(()=>useRoute().name,()=>{
            console.log('lightgallery检测到路由变化销毁lg')
            plugin.destroy()
        })
    })
})