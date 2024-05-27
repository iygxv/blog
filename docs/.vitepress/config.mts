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
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    lastUpdatedText: '上次更新于',
    logo: '/logo.jpg',
    nav: [
      { text: '🏰 首页', link: '/' },
      { text: '🕋 资源导航', link: '/source/资源导航.md' },
      { text: '🏚 升阶试炼场', items: [
          { text: ' 🛩 升阶秘籍', link: '/interview/' },
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
        text: '⛲ 知识记录',
        items: [
          { text: '🕎 三月记', link: '/information/March.md' },
          { text: '🔯 四月记', link: '/information/April.md' },
          { text: '☪️  五月记', link: '/information/May.md' },
          // { text: '三月', link: '/information/3月.md' },
          // { text: '三月', link: '/information/3月.md' },
          // { text: '三月', link: '/information/3月.md' },
          // 💟 ☮️ ✝️ ☪️ 🕉 ☸️ ✡️ 🔯 🕎 ☯️ ☦️ 🛐 ⛎ ♈️ ♉️ ♊️ ♋️ ♌️ ♍️ ♎️ ♏️ ♐️ ♑️ ♒️ ♓️ 🆔 ⚛️
          { text: '🛐 实战技巧', link: '/information/PracticalSkills.md' },
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
        text: ' 🌁 线上作品',
        items: [
          // ⌚️ 📱 📲 💻 ⌨️ 🖥 🖨 🖱
          { text: '⌚️ 图床', link: 'https://icodehub.top/imageBed/' },
          { text: '📱 Fast Log', link: 'https://github.com/iygxv/fast-log' },
          { text: '🖨 Ts Transform', link: 'https://icodehub.top/transform/' },
          { text: '💻 Vue Next Admin', link: 'https://icodehub.top/vue-next-admin/' },
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
