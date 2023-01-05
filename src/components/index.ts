import { version } from '../../package.json'
import { ignoreDir } from '../../scripts/const'
import { App } from 'vue'

import type { Config, Component, Components } from '../interface/base'

const directives = import.meta.globEager('../components/**')
const components: Components = {}

for (const com in directives) {
  if (/\.\/[A-Za-z]+\/index\.ts/.test(com)) {
    const cNmae = com.split('./')[1].split('/')[0]
    if (!ignoreDir.find(n => n === cNmae)) {
      components[cNmae] = (directives[com] as any).default as Component
    }
  }
}

const install = function (Vue: App, opts: Config = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
  // 初始化全局配置
  Vue.config.globalProperties.$shui = {
    size: opts.size || '',
    prefix: opts.prefix || ''
  }
  // 绑定全局组件
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  version,
  install,
  ...components
}

export default API

// 导出组件
export const Button = components.Button
