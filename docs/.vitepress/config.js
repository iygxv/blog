import nav from './nav'
import sidebar from './sidebar'

export default {
  base: '/blog/',
  title: '故心', // 所有文档的浏览器标签title
  description: '故心', // 会渲染成<meta>标签，SEO用
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    siteTitle: '故心',
    logo: '/logo.jpg',

    nav,
    sidebar,

    socialLinks: [{ icon: 'github', link: 'https://github.com/iygxv/blog' }],
    footer: {
      message: 'MIT License.',
      copyright: '粤ICP备2022094886号'
    }
  }
}
