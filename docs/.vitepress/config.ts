import { defineConfig } from 'vitepress'
import { alias } from '../../scripts/config'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  base: '/',
  title: 'base-ui',
  lastUpdated: true,
  description: '蜀海前端基础UI组件库.',
  themeConfig: {
    lastUpdatedText: '最后一次更新时间',
    nav: [
      {
        text: '快速链接',
        items: [
          { text: 'vue3.x', link: 'https://cn.vuejs.org/' },
          { text: 'vitepress', link: 'https://vitepress.vuejs.org/' },
        ]
      }
    ],
    sidebar: [
      {
        text: '快速开始',
        collapsible: true,
        items: [
          { text: '安装', link: '/quick-start/index' },
        ]
      },
      {
        text: '工具组件',
        collapsed: true,
        collapsible: true,
        items: [
          { text: 'Button', link: '/Button/index' }
        ]
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dengBox/boshen-blog' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present boshen'
    }
  },
  vite: {
    plugins: [
      vueJsx()
    ],
    resolve: {
      alias: [
        ...alias
      ]
    }
  },
  markdown: {
    lineNumbers: true
  }
  // docFooter: {
  //   prev: 'Pagina prior',
  //   next: 'Proxima pagina'
  // }
})
