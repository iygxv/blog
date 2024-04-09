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
      { text: '首页', link: '/' },
      { text: '升阶试炼场', items: [
          { text: '升阶秘籍', link: '/interview/' },
        ] 
      },
      { 
        text: '技术领域',
        items: [
          { text: 'CSS', link: '/css/' },
          { text: 'JavaScript', link: '/javascript/' },
          { text: 'TypeScript', link: '/ts/' },
          { text: 'Vue2', link: '/vue2/' },
          { text: 'Vue3', link: '/vue3/' },
          { text: 'Uniapp', link: '/uniapp/' },
          { text: 'Vite', link: '/vite/' },
          { text: 'Webpack', link: '/webpack/' },
          { text: 'Git', link: '/git/' },
          { text: '正则', link: '/regex/' },
        ]
      },
      { 
        text: '知识中心',
        items: [
          { text: '三月截获知识', link: '/information/3月截获知识.md' },
          { text: '四月截获知识', link: '/information/4月截获知识.md' },
          // { text: '三月截获知识', link: '/information/3月截获知识.md' },
          // { text: '三月截获知识', link: '/information/3月截获知识.md' },
          // { text: '三月截获知识', link: '/information/3月截获知识.md' },
          // { text: '三月截获知识', link: '/information/3月截获知识.md' },
        ]
      },
      { 
        text: '线上作品',
        items: [
          { text: '图床', link: 'https://icodehub.top/imageBed/' },
          { text: 'Fast Log', link: 'https://github.com/iygxv/fast-log' },
          { text: 'Ts Transform', link: 'https://icodehub.top/transform/' },
          { text: 'Vue Next Admin', link: 'https://icodehub.top/vue-next-admin/' },
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
