export default [
  { text: '每日学习', items: [
    { text: '2022', link: `/article/daily-study/2022/`, activeMatch: `/article/daily-study/2022/` },
    { text: '2023', link: `/article/daily-study/2023/`, activeMatch: `/article/daily-study/2023/` },
  ] },
  {
    text: '前端知识点',
    items: [
      { text: 'Vue', link: `/article/web/vue/`, activeMatch: `/article/web/vue/` },
      { text: 'JS', link: `/article/web/javascript/`, activeMatch: `/article/web/javascript/` },
      { text: 'TypeScript', link: `/article/web/ts/`, activeMatch: `/article/web/ts/` },
      { text: '工程化', link: `/article/web/engineered/`, activeMatch: `/article/web/engineered/` },
      { text: '面试', link: `/article/interview/`, activeMatch: `/article/interview/` }
    ]
  },
  {
    text: '文章资料',
    items: [
      { text: '文章', link: `/article/harvest/`, activeMatch: `/article/harvest/` },
    ]
  },
  {
    text: '其他',
    items: [
      { text: '读书', link: `/article/read/`, activeMatch: `/article/read/` }
    ]
  }
]