import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/blog/',
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  lang: 'zh-cn',
  title: '随缘',
  description: '随缘的博客主题，基于 vitepress 实现',
  lastUpdated: true,
  
  // Vite 性能优化配置
  vite: {
    // 依赖预构建优化
    optimizeDeps: {
      include: [
        'vue',
        'element-plus',
        '@element-plus/icons-vue'
      ],
      // 排除一些不需要预构建的依赖
      exclude: [
        '@sugarat/theme'
      ]
    },
    // 开发服务器配置
    server: {
      fs: {
        // 允许为项目根目录的上一级提供服务
        allow: ['..']
      }
    },
    // 构建优化 - 移除 manualChunks 避免与 VitePress 外部依赖冲突
    build: {
      chunkSizeWarningLimit: 1000, // 增加chunk大小警告阈值
      rollupOptions: {
        // 不设置 manualChunks，让 VitePress 自己处理
      }
    }
  },
  
  // 详见：https://vitepress.dev/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    ['link', { rel: 'icon',  href: 'http://www.icodehub.top/blob/logo.ico' }]
  ],
  themeConfig: {
    lastUpdatedText: '上次更新于',
    logo: 'http://www.icodehub.top/blob/logo.png',
    nav: [
      // emoji 大全： https://remeins.com/index/app/emojilist
      { text: '首页', link: '/' },
      { text: '资源导航', link: '/source/资源导航.md' },
      { text: '面试资源', items: [
          { text: '面试资源导航', link: '/interview/source.md' },
          { text: 'CSS 面试', link: '/interview/CSS.md' },
          { text: 'HTML 面试', link: '/interview/HTML.md' },
          { text: 'Vue 面试', link: '/interview/Vue.md' },
          { text: 'Vue3 面试', link: '/interview/Vue3.md' },
          { text: 'TypeScript 面试', link: '/interview/TypeScript.md' },
          { text: 'JavaScript 面试', link: '/interview/JavaScript.md' },
          { text: '性能优化 面试', link: '/interview/性能优化.md' },
          { text: '代码手写 面试', link: '/interview/代码手写.md' },
          { text: '浏览器原理 面试', link: '/interview/浏览器原理.md' },
          { text: '计算机网络 面试', link: '/interview/计算机网络.md' },
        ] 
      },
      { 
        text: '前端技术',
        items: [
          { text: 'CSS', link: '/css/' },
          { text: 'JavaScript', link: '/javascript/' },
          { text: 'TypeScript', link: '/ts/' },
          { text: 'Vue2', link: '/vue/vue2/' },
          { text: 'Vue3', link: '/vue/vue3/' },
          { text: 'React', link: '/react/' },
          { text: 'Uniapp', link: '/uniapp/' },
          { text: 'Vite', link: '/vite/' },
          { text: 'Webpack', link: '/webpack/' },
          { text: 'Git', link: '/git/' },
          { text: '正则', link: '/regex/' },
        ]
      },
      // { 
      //   text: '记录',
      //   items: [
      //     { text: '实战技巧', link: '/information/PracticalSkills.md' },
      //     { text: 'EveryT', link: '/information/EveryT.md' },
      //     { text: 'EveryT - 十月', link: '/information/EveryT-Oct.md' },
      //   ]
      // },
      {
        text: '编程代码',
        items: [
          { text: 'JS 基本编程', link: '/coding/手写题.md' },
          { text: 'TS 基本编程', link: '/coding/手写题(ts).md' },
          { text: 'async await 实现', link: '/coding/async-await.md' },
          { text: 'axios 实现', link: '/coding/axios的基本实现.md' },
          { text: 'PromiseA+ 实现', link: '/coding/PromiseA+.md' },
          { text: 'Promise 其他方法实现', link: '/coding/Promise其他方法.md' },
        ]
      },
      { 
        text: '项目',
        items: [
          { text: '图床', link: 'http://icodehub.top/imageBed/' },
          { text: 'Ts Transform', link: 'http://icodehub.top/transform/' },
          // { text: 'Vue Next Admin', link: 'http://icodehub.top/vue-next-admin/' },
        ]
      },
      {
        text: '插件',
        items: [
          { text: 'Fast Log', link: 'https://github.com/iygxv/fast-log' },
        ]
      },
      // Java
      {
        text: 'Java',
        items: [
          { text: 'Java数据类型指南', link: '/java/1.Java数据类型指南.md' },
          { text: 'Java注解技术指南', link: '/java/2.Java注解技术指南.md' },
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
