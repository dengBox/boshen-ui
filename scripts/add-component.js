import consola from 'consola'
import { writeFileSync, appendFileSync, accessSync, constants, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { captureError } from './utils.js'

const args = process.argv.splice(2)

if (!args.length) {
  consola.error('Component name must not be empty')
  process.exit(0)
}

/**
 * 1. 新建样式文件
 * 2. 新建docs 文件
 * 3. 新建src 文件
 */

const componentName = args[0]

// 验证组件命名是否合法
if (!/^[A-Z]+$/.test(componentName[0])) {
  consola.error('The component name must meet the hump naming. like Button or ButtonGroup!')
  process.exit(0)
}

const jsPath = resolve(process.cwd(), './src/components')

try {
  accessSync(resolve(jsPath, componentName), constants.R_OK | constants.W_OK)
  consola.error(`Component ${componentName} already exists`)
  process.exit(0)
} catch {}

function createJsFile () {
  mkdirSync(resolve(jsPath, `${componentName}/src`), { recursive: true })
  // 创建组件源码 index.js
  writeFileSync(resolve(jsPath, `${componentName}/index.ts`), `
import { App } from 'vue'
import ${componentName} from './src/Index.vue'

${componentName}.install = function (Vue: App) {
  Vue.component(${componentName}.name, ${componentName})
}

export default ${componentName}
`, 'utf8')
  // 创建组件源码 Index.vue
  writeFileSync(resolve(jsPath, `${componentName}/src/Index.vue`), `
<template>
  <div :class="countClass"></div>
</template>

<script>
import BaseMixins from '../../../mixins/base'

export default {
  name: '${componentName}',
  mixins: [BaseMixins],
  components: {

  },
  data () {
    return {
    }
  },
  computed: {
    countClass () {
      return \`\${this.prefixs}${componentName}\`
    }
  },
  watch: {

  },
  created () {

  },
  methods: {
  }
}
</script>
`, 'utf8')

  appendFileSync(resolve(jsPath, 'index.ts'), `
export const ${componentName} = components.${componentName}
`, 'utf8')
}

function createCssFile () {
  const cssPath = resolve(process.cwd(), './styles/components')
  mkdirSync(cssPath, { recursive: true })
  // 创建组件样式 scss
  writeFileSync(resolve(cssPath, `${componentName}.scss`), `
@import "../custom.scss";

$${componentName}-prefix-cls: #{$css-prefix}${componentName};

.#{$${componentName}-prefix-cls} {

}`, 'utf8')

  // 引入组件scss
  appendFileSync(resolve(cssPath, 'index.scss'), `
@import "./${componentName}.scss";
`, 'utf8')
}

function createDocFile () {
  // 创建组件 md文件
  mkdirSync(resolve(process.cwd(), `./docs/${componentName}`), { recursive: true })
  writeFileSync(resolve(process.cwd(), `./docs/${componentName}/index.md`), `## ${componentName}

## ${componentName}

## 何时使用

## 基本用法

<${componentName} />

### Code
\`\`\`vue

<template>
<${componentName} />
</template>
\`\`\`

### Api

| 属性        | 描述           | 默认值  | 类型  |
| ------------- |:-------------:| -----|-----|

### Event

`, 'utf8')
}

(async function createAll () {
  await captureError(createJsFile, `create: ${componentName} js file`)
  await captureError(createCssFile, `create: ${componentName} css file`)
  await captureError(createDocFile, `create: ${componentName} doc file`)

  consola.warn('pleace go to "./docs/.vitepress/config.ts" update your config')
  consola.success(`create: ${componentName} will down!`)
})()
