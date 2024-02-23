import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-video.css'
import lightGallery from "lightgallery";
export default defineNuxtPlugin(async (NuxtApp)=>{
    NuxtApp.vueApp.directive('lightgallery',(el)=>{
        let lg:any = document.getElementById('lightgallery')
        const imgRow = el.querySelectorAll('img')
        const plugin = lightGallery(lg, {
            selector: imgRow,
            controls: true,
            allowMediaOverlap:false,
            download:false,
            enableDrag:false,
            loop:false
        });

        watch(()=>useRoute().name,async ()=>{
            console.log('lightgallery检测到路由变化销毁lg')
            plugin.destroy()
        })
    })
})