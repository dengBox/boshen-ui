// vite.config.js
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { rollupOptions, alias, plugins } from './scripts/config'

export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/entry.ts'),
      name: 'baseUI',
      fileName: (format) => format === 'umd' ? 'index.js' : `index.${format}.js`, // 输出文件名
      formats: ['es', 'umd']
    },
    rollupOptions
  },
  resolve: {
    alias
  },
  plugins
})
