import { readdirSync, writeFileSync, lstatSync, accessSync, constants } from 'node:fs'
import consola from 'consola'
import { resolve } from 'path'
import { defineConfig, build } from 'vite'

import { rollupOptions, alias, plugins } from './config.js'
import { ignoreDir } from './const.js'
import { shell, captureError } from './utils.js'

const sdkName = 'base-ui'

const __dirname = process.cwd()
const entryDir = resolve(__dirname, './src/components')
const outDir = resolve(__dirname, './lib')
// vite基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  resolve: {
    alias
  },
  plugins
})

function getComponentList (path) {
  const res = []
  const files = readdirSync(path)
  files.forEach(function (file) {
    const pathname = path + '/' + file
    if (lstatSync(pathname).isDirectory()) {
      // 排除部分目录
      if (!ignoreDir.find(n => n === file)) res.push(pathname)
    }
  })
  return res
}

const _log = console.log
const _error = console.error

const restLog = () => {
  console.log = () => {}
  console.error = () => {}
}

const revertLog = () => {
  console.log = _log
  console.error = _error
}

const buildJs = async (componentName) => {
  restLog()
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: resolve(entryDir, componentName, 'index.ts'),
        name: componentName, // umd的变量名
        fileName: (format) => {
          return format === 'umd' ? `${componentName}.js` : `${componentName}.${format}.js`
        }, // 输出文件名
        formats: ['es', 'umd']
      },
      outDir: resolve(outDir, componentName)
    }
  })
  revertLog()
}

const buildCss = async (componentName) => {
  const outStyleDir = resolve(outDir, `${componentName}/style`)
  restLog()
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: resolve(__dirname, `./styles/components/${componentName}.scss`),
        name: 'index',
        formats: ['es']
      },
      outDir: resolve(outDir, outStyleDir)
    }
  })
  try {
    accessSync(resolve(outStyleDir, 'style.css'), constants.R_OK | constants.W_OK)
  } catch {
    writeFileSync(resolve(outStyleDir, 'style.css'), '', 'utf8')
  }
  // 如果scss内容为空，或者编译后内容为空，则会没有js文件
  await shell(`rm -rf ${outStyleDir}/${sdkName}.js`)
  await shell(`cp -rf ${resolve(__dirname, './scripts/index.js ')}${outStyleDir}/`)
  revertLog()
}

// 分包构建
const buildAll = async () => {
  const list = getComponentList(entryDir)
  for (const path of list) {
    const componentName = path.slice(path.lastIndexOf('/') + 1)
    await captureError(() => buildJs(componentName), `build: ${componentName} js file`)
    await captureError(() => buildCss(componentName), `build: ${componentName} css file`)
    consola.success(`build: ${componentName} will down`)
  }
}

buildAll()
