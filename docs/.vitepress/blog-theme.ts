// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'https://sugarat.top'
// const RSS: Theme.RSSOptions = {
//   title: '随缘',
//   baseUrl,
//   copyright: 'Copyright (c) 2018-present, 随缘',
//   description: '你的指尖,拥有改变世界的力量（大前端相关技术分享）',
//   language: 'zh-cn',
//   image: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
//   favicon: 'https://sugarat.top/favicon.ico',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 开启RSS支持
  // RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // 如果npx pagefind 时间过长，可以手动将其安装为项目依赖 pnpm add pagefind
  // search: false,

  // 页脚
  footer: {
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    copyright: 'MIT License | 随缘',
    // icpRecord: {
    //   name: '蜀ICP备19011724号',
    //   link: 'https://beian.miit.gov.cn/'
    // },
  },

  // 主题色修改
  themeColor: 'el-blue',

  // 文章默认作者
  author: '随缘',

  // 友链
  friend: [
    {
      nickname: '冴羽',
      des: '冴羽的JavaScript博客',
      avatar:
        'https://avatars.githubusercontent.com/u/11458263?s=48&v=4',
      url: 'https://github.com/mqyqingfeng/Blog',
    },
    {
      nickname: '粥里有勺糖',
      des: '你的指尖用于改变世界的力量',
      avatar:
        'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
      url: 'https://sugarat.top',
    }
  ],
  // 看板娘
  // oml2d: {
  //   mobileDisplay: true,
  //   models: [
  //     {
  //       "path": "https://model.oml2d.com/Pio/model.json",
  //       "scale": 0.4,
  //       "position": [0, 50],
  //       "stageStyle": {
  //         "height": 300
  //       }
  //     }
  //   ]
  // }

  // 公告
  // popover: {
  //   title: '公告',
  //   body: [
  //     { type: 'text', content: '👇 微信二维码 👇' },
  //     {
  //       type: 'image',
  //       src: 'http://s6d8fpi35.hn-bkt.clouddn.com/blob/ewm.jpg'
  //     },
  //     {
  //       type: 'button',
  //       content: '作者博客',
  //       link: 'http://43.139.47.204:1009',
  //       style: 'margin-top: 20px'
  //     }
  //   ],
  //   duration: 0
  // },
})

export { blogTheme }
