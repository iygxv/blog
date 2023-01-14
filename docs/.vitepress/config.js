import everyInsist from './sidebar/everyInsist'
import vue from './sidebar/vue'
import js from './sidebar/js'
import ts from './sidebar/web/ts'
import webpack from './sidebar/webpack'
import leetcode from './sidebar/leetcode'
import interview from './sidebar/interview'
import read from './sidebar/read'
import harvest from './sidebar/harvest'
import plan from './sidebar/about/plan'
import { getCurItems, formatDate } from '../utils'

// 获取最新每日一题
const everyInsistDate = getCurItems('every-insist/august')
const curDay = formatDate(new Date(), 'M.d')
let todayArr = everyInsistDate.filter(item => item.includes(curDay))
today = todayArr[0] ? todayArr[0] : everyInsistDate.at(-1)
export default {
  base: '/',

  title: 'Sustained_Action', // 所有文档的浏览器标签title
  description: 'Sustained_Action', // 会渲染成<meta>标签，SEO用
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    siteTitle: 'Sustained_Action',
    logo: '/logo.jpg',

    nav: [
      { text: '每月学习', items: [
        { text: '2022', link: `/article/every-insist/`, activeMatch: `/article/every-insist/` },
      ] },
      {
        text: '前端学习',
        items: [
          { text: 'Vue', link: `/article/web/vue/`, activeMatch: `/article/web/vue/` },
          { text: 'JS', link: `/article/web/javascript/`, activeMatch: `/article/web/javascript/` },
          { text: 'TypeScript', link: `/article/web/ts/1-类型基础`, activeMatch: `/article/web/ts/` },
          // { text: 'Webpack', link: `/article/web/webpack/`, activeMatch: `/article/web/webpack/` },
          // { text: 'Leetcode', link: `/article/leetcode/`, activeMatch: `/article/leetcode/` },
          { text: '面试', link: `/article/interview/`, activeMatch: `/article/interview/` },
          { text: '文章', link: `/article/harvest/`, activeMatch: `/article/harvest/` },
          { text: '读书', link: `/article/read/`, activeMatch: `/article/read/` }
        ]
      }
      // {
      //   text: '规划',
      //   items: [
      //     { text: '计划', link: `/article/about/plan/1-日常规划`, activeMatch: `/article/about/plan/` },
      //   ]
      // }
    ],

    sidebar: {
      '/article/every-insist/': everyInsist,
      '/article/web/vue/': vue,
      '/article/web/javascript/': js,
      '/article/web/webpack/': webpack,
      '/article/leetcode/': leetcode,
      '/article/interview/': interview,
      '/article/read/': read,
      '/article/harvest/': harvest,
      '/article/about/plan/': plan,
      '/article/web/ts/': ts,
    },

    socialLinks: [{ icon: 'github', link: 'https://gitee.com/igxv' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: '粤ICP备2022094886号'
    }
  }
}
