import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import presetMini from '@unocss/preset-mini'
export default defineConfig({
    presets: [
        presetMini()
    ],
    theme: {
        breakpoints: {
            xs: '320px',
            sm: '480px',
            md: '960px',
            lg: '1024px',
            xl: '1280px',
            xxl: '1600px',
            },
          },
    transformers: [
        transformerDirectives(),
    ],
})