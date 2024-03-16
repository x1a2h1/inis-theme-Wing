import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import presetMini from '@unocss/preset-mini'
export default defineConfig({
    presets: [
        presetMini()
        // ...other presets
    ],
    transformers: [
        transformerDirectives(),
    ],
})