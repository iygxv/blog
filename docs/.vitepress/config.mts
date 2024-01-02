import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
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
      { 
        text: '前端知识',
        items: [
          { text: 'JavaScript', link: '/javascript/' },
        ]
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://iygxv.github.io/blog_static/'
      }
    ]
  }
})
