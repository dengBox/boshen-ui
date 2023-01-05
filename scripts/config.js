import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const REPLACEMENT = `${resolve(process.cwd(), './src')}`

export const rollupOptions = {
  external: 'Vue',
  output: {
    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    globals: {
      vue: 'Vue'
    },
    exports: 'named'
  }
}

export const alias = [
  {
    find: '@',
    replacement: REPLACEMENT
  }
]

export const plugins = [
  vue(),
  vueJsx()
]
