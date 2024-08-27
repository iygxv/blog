import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/blob/',
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  lang: 'zh-cn',
  title: '随缘',
  description: '随缘的博客主题，基于 vitepress 实现',
  lastUpdated: true,
  // 详见：https://vitepress.dev/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    ['link', { rel: 'icon',  href: 'https://www.icodehub.top/blob/logo.ico' }]
  ],
  themeConfig: {
    lastUpdatedText: '上次更新于',
    logo: 'https://www.icodehub.top/blob/logo.png',
    nav: [
      // emoji 大全： https://remeins.com/index/app/emojilist
      { text: '🏰 首页', link: '/' },
      { text: '🕋 资源导航', link: '/source/资源导航.md' },
      { text: '🏚 升阶试炼场', items: [
          { text: ' 🛩 试炼资源', link: '/interview/source.md' },
          { text: ' 🛫 CSS 试炼', link: '/interview/CSS.md' },
          { text: ' 🛬 HTML 试炼', link: '/interview/HTML.md' },
          { text: ' 🪂 Vue 试炼', link: '/interview/Vue.md' },
          { text: ' 🚟 Vue3 试炼', link: '/interview/Vue3.md' },
          { text: ' 💺 TypeScript 试炼', link: '/interview/TypeScript.md' },
          { text: ' 🚁 JavaScript 试炼', link: '/interview/JavaScript.md' },
          { text: ' 🚠 性能优化 试炼', link: '/interview/性能优化.md' },
          { text: ' 🛰️ 代码手写 试炼', link: '/interview/代码手写.md' },
          { text: ' 🛸 浏览器原理 试炼', link: '/interview/浏览器原理.md' },
          { text: ' 🛥️ 计算机网络 试炼', link: '/interview/计算机网络.md' },
        ] 
      },
      { 
        text: '⛪技术领域',
        items: [
          { text: '🎇 CSS', link: '/css/' },
          { text: '🏝 JavaScript', link: '/javascript/' },
          { text: '🌟 TypeScript', link: '/ts/' },
          { text: '🌈 Vue2', link: '/vue/vue2/' },
          { text: '🔰 Vue3', link: '/vue/vue3/' },
          { text: ' ✨ React', link: '/react/' },
          { text: '💠 Uniapp', link: '/uniapp/' },
          { text: '🏞 Vite', link: '/vite/' },
          { text: '🚀 Webpack', link: '/webpack/' },
          { text: '🪂 Git', link: '/git/' },
          { text: '🎆 正则', link: '/regex/' },
        ]
      },
      { 
        text: '⛲ 每月记录',
        items: [
          { text: '🕎 三月记', link: '/information/March.md' },
          { text: '🔯 四月记', link: '/information/April.md' },
          { text: '☪️  五月记', link: '/information/May.md' },
          { text: '⛎ 六月记', link: '/information/June.md' },
          { text: '⛎ 七月记', link: '/information/July.md' },
          { text: '♓️  八月记', link: '/information/August.md' },
          // 💟 ☮️ ✝️ ☪️ 🕉 ☸️ ✡️ 🔯 🕎 ☯️ ☦️ 🛐 ⛎ ♈️ ♉️ ♊️ ♋️ ♌️ ♍️ ♎️ ♏️ ♐️ ♑️ ♒️ ♓️ 🆔 ⚛️
          { text: '🛐 实战技巧', link: '/information/PracticalSkills.md' },
          { text: '♑️  EveryT', link: '/information/EveryT.md' },
        ]
      },
      {
        text: '⛺ 编程代码',
        items: [
          { text: '🛫 JS 基本编程', link: '/coding/手写题.md' },
          { text: '🛬 TS 基本编程', link: '/coding/手写题(ts).md' },
          { text: '🛩 async await 实现', link: '/coding/async-await.md' },
          { text: '💺 axios 实现', link: '/coding/axios的基本实现.md' },
          { text: '🛰 PromiseA+ 实现', link: '/coding/PromiseA+.md' },
          { text: '🛸 Promise 其他方法实现', link: '/coding/Promise其他方法.md' },
        ]
      },
      { 
        text: ' 🌁 线上成果',
        items: [
          // ⌚️ 📱 📲 💻 ⌨️ 🖥 🖨 🖱
          { text: '⌚️ 图床', link: 'https://icodehub.top/imageBed/' },
          { text: '📱 Fast Log', link: 'https://github.com/iygxv/fast-log' },
          { text: '🖨 Ts Transform', link: 'https://icodehub.top/transform/' },
          // { text: '💻 Vue Next Admin', link: 'https://icodehub.top/vue-next-admin/' },
        ]
      }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/iygxv/blog'
      }
    ]
  }
})
