// docs/.vitepress/config.mts
import { defineConfig } from "file:///Users/vity/Desktop/my/web/github/blog/node_modules/vitepress/dist/node/index.js";

// docs/.vitepress/blog-theme.ts
import { getThemeConfig } from "file:///Users/vity/Desktop/my/web/github/blog/node_modules/@sugarat/theme/node.js";
var blogTheme = getThemeConfig({
  // 开启RSS支持
  // RSS,
  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // 如果npx pagefind 时间过长，可以手动将其安装为项目依赖 pnpm add pagefind
  // search: {
  //   pageResultCount: 5
  // },
  search: false,
  // 页脚
  footer: {
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    copyright: "MIT License | \u968F\u7F18"
    // icpRecord: {
    //   name: '蜀ICP备19011724号',
    //   link: 'https://beian.miit.gov.cn/'
    // },
  },
  // 主题色修改
  themeColor: "el-blue",
  // 文章默认作者
  author: "\u968F\u7F18",
  recommend: {
    nextText: "\u4E0B\u4E00\u9875",
    sort(a, b) {
      return +new Date(b.meta.date) - +new Date(a.meta.date);
    }
  },
  // 友链
  friend: [
    {
      nickname: "\u51B4\u7FBD",
      des: "\u51B4\u7FBD\u7684JavaScript\u535A\u5BA2",
      avatar: "https://avatars.githubusercontent.com/u/11458263?s=48&v=4",
      url: "https://github.com/mqyqingfeng/Blog"
    },
    {
      nickname: "\u7CA5\u91CC\u6709\u52FA\u7CD6",
      des: "\u4F60\u7684\u6307\u5C16\u7528\u4E8E\u6539\u53D8\u4E16\u754C\u7684\u529B\u91CF",
      avatar: "https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030",
      url: "https://sugarat.top"
    },
    {
      nickname: "\u77E5\u884C\u8BB0",
      des: "\u77E5\u884C\u8BB0\u7684\u535A\u5BA2",
      avatar: "https://codemy.top/upload/2022/06/WechatIMG102.jpeg",
      url: "https://codemy.top"
    },
    {
      nickname: "\u8302\u8302\u7269\u8BED",
      des: "\u8302\u8302\u7684\u6210\u957F\u4E4B\u8DEF\uFF0C\u5305\u542B\u524D\u7AEF\u5E38\u7528\u77E5\u8BC6\u3001\u6E90\u7801\u9605\u8BFB\u7B14\u8BB0\u3001\u5404\u79CD\u5947\u6DEB\u6280\u5DE7\u3001\u65E5\u5E38\u63D0\u6548\u5DE5\u5177\u7B49",
      url: "https://notes.fe-mm.com",
      avatar: "https://notes.fe-mm.com/logo.png"
    }
  ]
  // 看板娘
  // oml2d: {
  //   mobileDisplay: true,
  //   models: [
  //     {
  //       "path": "https://model.oml2d.com/HK416-1-normal/model.json",
  //       "position": [0, 60],
  //       "scale": 0.08,
  //       "stageStyle": {
  //         "width": 350,
  //         "height": 350
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
});

// docs/.vitepress/config.mts
var config_default = defineConfig({
  base: "/blog/",
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  lang: "zh-cn",
  title: "\u968F\u7F18",
  description: "\u968F\u7F18\u7684\u535A\u5BA2\u4E3B\u9898\uFF0C\u57FA\u4E8E vitepress \u5B9E\u73B0",
  lastUpdated: true,
  // 详见：https://vitepress.dev/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    ["link", { rel: "icon", href: "http://www.icodehub.top/blob/logo.ico" }]
  ],
  themeConfig: {
    lastUpdatedText: "\u4E0A\u6B21\u66F4\u65B0\u4E8E",
    logo: "http://www.icodehub.top/blob/logo.png",
    nav: [
      // emoji 大全： https://remeins.com/index/app/emojilist
      { text: "\u9996\u9875", link: "/" },
      { text: "\u8D44\u6E90\u5BFC\u822A", link: "/source/\u8D44\u6E90\u5BFC\u822A.md" },
      {
        text: "\u9762\u8BD5\u8D44\u6E90",
        items: [
          { text: "\u9762\u8BD5\u8D44\u6E90\u5BFC\u822A", link: "/interview/source.md" },
          { text: "CSS \u9762\u8BD5", link: "/interview/CSS.md" },
          { text: "HTML \u9762\u8BD5", link: "/interview/HTML.md" },
          { text: "Vue \u9762\u8BD5", link: "/interview/Vue.md" },
          { text: "Vue3 \u9762\u8BD5", link: "/interview/Vue3.md" },
          { text: "TypeScript \u9762\u8BD5", link: "/interview/TypeScript.md" },
          { text: "JavaScript \u9762\u8BD5", link: "/interview/JavaScript.md" },
          { text: "\u6027\u80FD\u4F18\u5316 \u9762\u8BD5", link: "/interview/\u6027\u80FD\u4F18\u5316.md" },
          { text: "\u4EE3\u7801\u624B\u5199 \u9762\u8BD5", link: "/interview/\u4EE3\u7801\u624B\u5199.md" },
          { text: "\u6D4F\u89C8\u5668\u539F\u7406 \u9762\u8BD5", link: "/interview/\u6D4F\u89C8\u5668\u539F\u7406.md" },
          { text: "\u8BA1\u7B97\u673A\u7F51\u7EDC \u9762\u8BD5", link: "/interview/\u8BA1\u7B97\u673A\u7F51\u7EDC.md" }
        ]
      },
      {
        text: "\u524D\u7AEF\u6280\u672F",
        items: [
          { text: "CSS", link: "/css/" },
          { text: "JavaScript", link: "/javascript/" },
          { text: "TypeScript", link: "/ts/" },
          { text: "Vue2", link: "/vue/vue2/" },
          { text: "Vue3", link: "/vue/vue3/" },
          { text: "React", link: "/react/" },
          { text: "Uniapp", link: "/uniapp/" },
          { text: "Vite", link: "/vite/" },
          { text: "Webpack", link: "/webpack/" },
          { text: "Git", link: "/git/" },
          { text: "\u6B63\u5219", link: "/regex/" }
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
        text: "\u7F16\u7A0B\u4EE3\u7801",
        items: [
          { text: "JS \u57FA\u672C\u7F16\u7A0B", link: "/coding/\u624B\u5199\u9898.md" },
          { text: "TS \u57FA\u672C\u7F16\u7A0B", link: "/coding/\u624B\u5199\u9898(ts).md" },
          { text: "async await \u5B9E\u73B0", link: "/coding/async-await.md" },
          { text: "axios \u5B9E\u73B0", link: "/coding/axios\u7684\u57FA\u672C\u5B9E\u73B0.md" },
          { text: "PromiseA+ \u5B9E\u73B0", link: "/coding/PromiseA+.md" },
          { text: "Promise \u5176\u4ED6\u65B9\u6CD5\u5B9E\u73B0", link: "/coding/Promise\u5176\u4ED6\u65B9\u6CD5.md" }
        ]
      },
      {
        text: "\u9879\u76EE",
        items: [
          { text: "\u56FE\u5E8A", link: "http://icodehub.top/imageBed/" },
          { text: "Ts Transform", link: "http://icodehub.top/transform/" }
          // { text: 'Vue Next Admin', link: 'http://icodehub.top/vue-next-admin/' },
        ]
      },
      {
        text: "\u63D2\u4EF6",
        items: [
          { text: "Fast Log", link: "https://github.com/iygxv/fast-log" }
        ]
      }
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/iygxv/blog"
      }
    ]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL2Jsb2ctdGhlbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdml0eS9EZXNrdG9wL215L3dlYi9naXRodWIvYmxvZy9kb2NzLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy92aXR5L0Rlc2t0b3AvbXkvd2ViL2dpdGh1Yi9ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy92aXR5L0Rlc2t0b3AvbXkvd2ViL2dpdGh1Yi9ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJ1xuXG4vLyBcdTVCRkNcdTUxNjVcdTRFM0JcdTk4OThcdTc2ODRcdTkxNERcdTdGNkVcbmltcG9ydCB7IGJsb2dUaGVtZSB9IGZyb20gJy4vYmxvZy10aGVtZSdcblxuLy8gVml0ZXByZXNzIFx1OUVEOFx1OEJBNFx1OTE0RFx1N0Y2RVxuLy8gXHU4QkU2XHU4OUMxXHU2NTg3XHU2ODYzXHVGRjFBaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9zaXRlLWNvbmZpZ1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTonL2Jsb2cvJyxcbiAgLy8gXHU3RUU3XHU2MjdGXHU1MzVBXHU1QkEyXHU0RTNCXHU5ODk4KEBzdWdhcmF0L3RoZW1lKVxuICBleHRlbmRzOiBibG9nVGhlbWUsXG4gIGxhbmc6ICd6aC1jbicsXG4gIHRpdGxlOiAnXHU5NjhGXHU3RjE4JyxcbiAgZGVzY3JpcHRpb246ICdcdTk2OEZcdTdGMThcdTc2ODRcdTUzNUFcdTVCQTJcdTRFM0JcdTk4OThcdUZGMENcdTU3RkFcdTRFOEUgdml0ZXByZXNzIFx1NUI5RVx1NzNCMCcsXG4gIGxhc3RVcGRhdGVkOiB0cnVlLFxuICAvLyBcdThCRTZcdTg5QzFcdUZGMUFodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnI2hlYWRcbiAgaGVhZDogW1xuICAgIC8vIFx1OTE0RFx1N0Y2RVx1N0Y1MVx1N0FEOVx1NzY4NFx1NTZGRVx1NjgwN1x1RkYwOFx1NjYzRVx1NzkzQVx1NTcyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NzY4NCB0YWIgXHU0RTBBXHVGRjA5XG4gICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgIGhyZWY6ICdodHRwOi8vd3d3Lmljb2RlaHViLnRvcC9ibG9iL2xvZ28uaWNvJyB9XVxuICBdLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGxhc3RVcGRhdGVkVGV4dDogJ1x1NEUwQVx1NkIyMVx1NjZGNFx1NjVCMFx1NEU4RScsXG4gICAgbG9nbzogJ2h0dHA6Ly93d3cuaWNvZGVodWIudG9wL2Jsb2IvbG9nby5wbmcnLFxuICAgIG5hdjogW1xuICAgICAgLy8gZW1vamkgXHU1OTI3XHU1MTY4XHVGRjFBIGh0dHBzOi8vcmVtZWlucy5jb20vaW5kZXgvYXBwL2Vtb2ppbGlzdFxuICAgICAgeyB0ZXh0OiAnXHU5OTk2XHU5ODc1JywgbGluazogJy8nIH0sXG4gICAgICB7IHRleHQ6ICdcdThENDRcdTZFOTBcdTVCRkNcdTgyMkEnLCBsaW5rOiAnL3NvdXJjZS9cdThENDRcdTZFOTBcdTVCRkNcdTgyMkEubWQnIH0sXG4gICAgICB7IHRleHQ6ICdcdTk3NjJcdThCRDVcdThENDRcdTZFOTAnLCBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ1x1OTc2Mlx1OEJENVx1OEQ0NFx1NkU5MFx1NUJGQ1x1ODIyQScsIGxpbms6ICcvaW50ZXJ2aWV3L3NvdXJjZS5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdDU1MgXHU5NzYyXHU4QkQ1JywgbGluazogJy9pbnRlcnZpZXcvQ1NTLm1kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0hUTUwgXHU5NzYyXHU4QkQ1JywgbGluazogJy9pbnRlcnZpZXcvSFRNTC5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdWdWUgXHU5NzYyXHU4QkQ1JywgbGluazogJy9pbnRlcnZpZXcvVnVlLm1kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Z1ZTMgXHU5NzYyXHU4QkQ1JywgbGluazogJy9pbnRlcnZpZXcvVnVlMy5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdUeXBlU2NyaXB0IFx1OTc2Mlx1OEJENScsIGxpbms6ICcvaW50ZXJ2aWV3L1R5cGVTY3JpcHQubWQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnSmF2YVNjcmlwdCBcdTk3NjJcdThCRDUnLCBsaW5rOiAnL2ludGVydmlldy9KYXZhU2NyaXB0Lm1kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1NjAyN1x1ODBGRFx1NEYxOFx1NTMxNiBcdTk3NjJcdThCRDUnLCBsaW5rOiAnL2ludGVydmlldy9cdTYwMjdcdTgwRkRcdTRGMThcdTUzMTYubWQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnXHU0RUUzXHU3ODAxXHU2MjRCXHU1MTk5IFx1OTc2Mlx1OEJENScsIGxpbms6ICcvaW50ZXJ2aWV3L1x1NEVFM1x1NzgwMVx1NjI0Qlx1NTE5OS5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdTZENEZcdTg5QzhcdTU2NjhcdTUzOUZcdTc0MDYgXHU5NzYyXHU4QkQ1JywgbGluazogJy9pbnRlcnZpZXcvXHU2RDRGXHU4OUM4XHU1NjY4XHU1MzlGXHU3NDA2Lm1kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1OEJBMVx1N0I5N1x1NjczQVx1N0Y1MVx1N0VEQyBcdTk3NjJcdThCRDUnLCBsaW5rOiAnL2ludGVydmlldy9cdThCQTFcdTdCOTdcdTY3M0FcdTdGNTFcdTdFREMubWQnIH0sXG4gICAgICAgIF0gXG4gICAgICB9LFxuICAgICAgeyBcbiAgICAgICAgdGV4dDogJ1x1NTI0RFx1N0FFRlx1NjI4MFx1NjcyRicsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQ1NTJywgbGluazogJy9jc3MvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0phdmFTY3JpcHQnLCBsaW5rOiAnL2phdmFzY3JpcHQvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1R5cGVTY3JpcHQnLCBsaW5rOiAnL3RzLycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdWdWUyJywgbGluazogJy92dWUvdnVlMi8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnVnVlMycsIGxpbms6ICcvdnVlL3Z1ZTMvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1JlYWN0JywgbGluazogJy9yZWFjdC8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnVW5pYXBwJywgbGluazogJy91bmlhcHAvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1ZpdGUnLCBsaW5rOiAnL3ZpdGUvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1dlYnBhY2snLCBsaW5rOiAnL3dlYnBhY2svJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0dpdCcsIGxpbms6ICcvZ2l0LycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdTZCNjNcdTUyMTknLCBsaW5rOiAnL3JlZ2V4LycgfSxcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIC8vIHsgXG4gICAgICAvLyAgIHRleHQ6ICdcdThCQjBcdTVGNTUnLFxuICAgICAgLy8gICBpdGVtczogW1xuICAgICAgLy8gICAgIHsgdGV4dDogJ1x1NUI5RVx1NjIxOFx1NjI4MFx1NURFNycsIGxpbms6ICcvaW5mb3JtYXRpb24vUHJhY3RpY2FsU2tpbGxzLm1kJyB9LFxuICAgICAgLy8gICAgIHsgdGV4dDogJ0V2ZXJ5VCcsIGxpbms6ICcvaW5mb3JtYXRpb24vRXZlcnlULm1kJyB9LFxuICAgICAgLy8gICAgIHsgdGV4dDogJ0V2ZXJ5VCAtIFx1NTM0MVx1NjcwOCcsIGxpbms6ICcvaW5mb3JtYXRpb24vRXZlcnlULU9jdC5tZCcgfSxcbiAgICAgIC8vICAgXVxuICAgICAgLy8gfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1x1N0YxNlx1N0EwQlx1NEVFM1x1NzgwMScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnSlMgXHU1N0ZBXHU2NzJDXHU3RjE2XHU3QTBCJywgbGluazogJy9jb2RpbmcvXHU2MjRCXHU1MTk5XHU5ODk4Lm1kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1RTIFx1NTdGQVx1NjcyQ1x1N0YxNlx1N0EwQicsIGxpbms6ICcvY29kaW5nL1x1NjI0Qlx1NTE5OVx1OTg5OCh0cykubWQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnYXN5bmMgYXdhaXQgXHU1QjlFXHU3M0IwJywgbGluazogJy9jb2RpbmcvYXN5bmMtYXdhaXQubWQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnYXhpb3MgXHU1QjlFXHU3M0IwJywgbGluazogJy9jb2RpbmcvYXhpb3NcdTc2ODRcdTU3RkFcdTY3MkNcdTVCOUVcdTczQjAubWQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUHJvbWlzZUErIFx1NUI5RVx1NzNCMCcsIGxpbms6ICcvY29kaW5nL1Byb21pc2VBKy5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdQcm9taXNlIFx1NTE3Nlx1NEVENlx1NjVCOVx1NkNENVx1NUI5RVx1NzNCMCcsIGxpbms6ICcvY29kaW5nL1Byb21pc2VcdTUxNzZcdTRFRDZcdTY1QjlcdTZDRDUubWQnIH0sXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7IFxuICAgICAgICB0ZXh0OiAnXHU5ODc5XHU3NkVFJyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdcdTU2RkVcdTVFOEEnLCBsaW5rOiAnaHR0cDovL2ljb2RlaHViLnRvcC9pbWFnZUJlZC8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnVHMgVHJhbnNmb3JtJywgbGluazogJ2h0dHA6Ly9pY29kZWh1Yi50b3AvdHJhbnNmb3JtLycgfSxcbiAgICAgICAgICAvLyB7IHRleHQ6ICdWdWUgTmV4dCBBZG1pbicsIGxpbms6ICdodHRwOi8vaWNvZGVodWIudG9wL3Z1ZS1uZXh0LWFkbWluLycgfSxcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1x1NjNEMlx1NEVGNicsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnRmFzdCBMb2cnLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2l5Z3h2L2Zhc3QtbG9nJyB9LFxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSxcbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAge1xuICAgICAgICBpY29uOiAnZ2l0aHViJyxcbiAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9peWd4di9ibG9nJ1xuICAgICAgfVxuICAgIF1cbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3ZpdHkvRGVza3RvcC9teS93ZWIvZ2l0aHViL2Jsb2cvZG9jcy8udml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdml0eS9EZXNrdG9wL215L3dlYi9naXRodWIvYmxvZy9kb2NzLy52aXRlcHJlc3MvYmxvZy10aGVtZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdml0eS9EZXNrdG9wL215L3dlYi9naXRodWIvYmxvZy9kb2NzLy52aXRlcHJlc3MvYmxvZy10aGVtZS50c1wiOy8vIFx1NEUzQlx1OTg5OFx1NzJFQ1x1NjcwOVx1OTE0RFx1N0Y2RVxuaW1wb3J0IHsgZ2V0VGhlbWVDb25maWcgfSBmcm9tICdAc3VnYXJhdC90aGVtZS9ub2RlJ1xuXG4vLyBcdTVGMDBcdTU0MkZSU1NcdTY1MkZcdTYzMDFcdUZGMDhSU1NcdTkxNERcdTdGNkVcdUZGMDlcbi8vIGltcG9ydCB0eXBlIHsgVGhlbWUgfSBmcm9tICdAc3VnYXJhdC90aGVtZSdcblxuLy8gY29uc3QgYmFzZVVybCA9ICdodHRwczovL3N1Z2FyYXQudG9wJ1xuLy8gY29uc3QgUlNTOiBUaGVtZS5SU1NPcHRpb25zID0ge1xuLy8gICB0aXRsZTogJ1x1OTY4Rlx1N0YxOCcsXG4vLyAgIGJhc2VVcmwsXG4vLyAgIGNvcHlyaWdodDogJ0NvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBcdTk2OEZcdTdGMTgnLFxuLy8gICBkZXNjcmlwdGlvbjogJ1x1NEY2MFx1NzY4NFx1NjMwN1x1NUMxNixcdTYyRTVcdTY3MDlcdTY1MzlcdTUzRDhcdTRFMTZcdTc1NENcdTc2ODRcdTUyOUJcdTkxQ0ZcdUZGMDhcdTU5MjdcdTUyNERcdTdBRUZcdTc2RjhcdTUxNzNcdTYyODBcdTY3MkZcdTUyMDZcdTRFQUJcdUZGMDknLFxuLy8gICBsYW5ndWFnZTogJ3poLWNuJyxcbi8vICAgaW1hZ2U6ICdodHRwczovL2ltZy5jZG4uc3VnYXJhdC50b3AvbWRJbWcvTVRZM05EazVOVEUyTnpBek1BPT02NzQ5OTUxNjcwMzAnLFxuLy8gICBmYXZpY29uOiAnaHR0cHM6Ly9zdWdhcmF0LnRvcC9mYXZpY29uLmljbycsXG4vLyB9XG5cbi8vIFx1NjI0MFx1NjcwOVx1OTE0RFx1N0Y2RVx1OTg3OVx1RkYwQ1x1OEJFNlx1ODlDMVx1NjU4N1x1Njg2MzogaHR0cHM6Ly90aGVtZS5zdWdhcmF0LnRvcC9cbmNvbnN0IGJsb2dUaGVtZSA9IGdldFRoZW1lQ29uZmlnKHtcbiAgLy8gXHU1RjAwXHU1NDJGUlNTXHU2NTJGXHU2MzAxXG4gIC8vIFJTUyxcblxuICAvLyBcdTY0MUNcdTdEMjJcbiAgLy8gXHU5RUQ4XHU4QkE0XHU1RjAwXHU1NDJGcGFnZWZpbmRcdTc5QkJcdTdFQkZcdTc2ODRcdTUxNjhcdTY1ODdcdTY0MUNcdTdEMjJcdTY1MkZcdTYzMDFcdUZGMDhcdTU5ODJcdTRGN0ZcdTc1MjhcdTUxNzZcdTVCODNcdTc2ODRcdTUzRUZcdTRFRTVcdThCQkVcdTdGNkVcdTRFM0FmYWxzZVx1RkYwOVxuICAvLyBcdTU5ODJcdTY3OUNucHggcGFnZWZpbmQgXHU2NUY2XHU5NUY0XHU4RkM3XHU5NTdGXHVGRjBDXHU1M0VGXHU0RUU1XHU2MjRCXHU1MkE4XHU1QzA2XHU1MTc2XHU1Qjg5XHU4OEM1XHU0RTNBXHU5ODc5XHU3NkVFXHU0RjlEXHU4RDU2IHBucG0gYWRkIHBhZ2VmaW5kXG4gIC8vIHNlYXJjaDoge1xuICAvLyAgIHBhZ2VSZXN1bHRDb3VudDogNVxuICAvLyB9LFxuICBzZWFyY2g6IGZhbHNlLFxuXG4gIC8vIFx1OTg3NVx1ODExQVxuICBmb290ZXI6IHtcbiAgICAvLyBtZXNzYWdlOiAnXHU0RTBCXHU5NzYyIFx1NzY4NFx1NTE4NVx1NUJCOVx1NTQ4Q1x1NTZGRVx1NjgwN1x1OTBGRFx1NjYyRlx1NTNFRlx1NEVFNVx1NEZFRVx1NjUzOVx1NzY4NFx1NTY2Mlx1RkYwOFx1NUY1M1x1NzEzNlx1NjcyQ1x1Njc2MVx1NTE4NVx1NUJCOVx1NEU1Rlx1NjYyRlx1NTNFRlx1NEVFNVx1OTY5MFx1ODVDRlx1NzY4NFx1RkYwOScsXG4gICAgY29weXJpZ2h0OiAnTUlUIExpY2Vuc2UgfCBcdTk2OEZcdTdGMTgnLFxuICAgIC8vIGljcFJlY29yZDoge1xuICAgIC8vICAgbmFtZTogJ1x1ODcwMElDUFx1NTkwNzE5MDExNzI0XHU1M0Y3JyxcbiAgICAvLyAgIGxpbms6ICdodHRwczovL2JlaWFuLm1paXQuZ292LmNuLydcbiAgICAvLyB9LFxuICB9LFxuXG4gIC8vIFx1NEUzQlx1OTg5OFx1ODI3Mlx1NEZFRVx1NjUzOVxuICB0aGVtZUNvbG9yOiAnZWwtYmx1ZScsXG5cbiAgLy8gXHU2NTg3XHU3QUUwXHU5RUQ4XHU4QkE0XHU0RjVDXHU4MDA1XG4gIGF1dGhvcjogJ1x1OTY4Rlx1N0YxOCcsXG5cbiAgcmVjb21tZW5kOiB7XG4gICAgbmV4dFRleHQ6ICdcdTRFMEJcdTRFMDBcdTk4NzUnLFxuICAgIHNvcnQoYSwgYikge1xuICAgICAgcmV0dXJuICtuZXcgRGF0ZShiLm1ldGEuZGF0ZSkgLSArbmV3IERhdGUoYS5tZXRhLmRhdGUpXG4gICAgfSxcbiAgfSxcblxuICAvLyBcdTUzQ0JcdTk0RkVcbiAgZnJpZW5kOiBbXG4gICAge1xuICAgICAgbmlja25hbWU6ICdcdTUxQjRcdTdGQkQnLFxuICAgICAgZGVzOiAnXHU1MUI0XHU3RkJEXHU3Njg0SmF2YVNjcmlwdFx1NTM1QVx1NUJBMicsXG4gICAgICBhdmF0YXI6XG4gICAgICAgICdodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTE0NTgyNjM/cz00OCZ2PTQnLFxuICAgICAgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL21xeXFpbmdmZW5nL0Jsb2cnLFxuICAgIH0sXG4gICAge1xuICAgICAgbmlja25hbWU6ICdcdTdDQTVcdTkxQ0NcdTY3MDlcdTUyRkFcdTdDRDYnLFxuICAgICAgZGVzOiAnXHU0RjYwXHU3Njg0XHU2MzA3XHU1QzE2XHU3NTI4XHU0RThFXHU2NTM5XHU1M0Q4XHU0RTE2XHU3NTRDXHU3Njg0XHU1MjlCXHU5MUNGJyxcbiAgICAgIGF2YXRhcjpcbiAgICAgICAgJ2h0dHBzOi8vaW1nLmNkbi5zdWdhcmF0LnRvcC9tZEltZy9NVFkzTkRrNU5URTJOekF6TUE9PTY3NDk5NTE2NzAzMCcsXG4gICAgICB1cmw6ICdodHRwczovL3N1Z2FyYXQudG9wJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5pY2tuYW1lOiAnXHU3N0U1XHU4ODRDXHU4QkIwJyxcbiAgICAgIGRlczogJ1x1NzdFNVx1ODg0Q1x1OEJCMFx1NzY4NFx1NTM1QVx1NUJBMicsXG4gICAgICBhdmF0YXI6XG4gICAgICAgICdodHRwczovL2NvZGVteS50b3AvdXBsb2FkLzIwMjIvMDYvV2VjaGF0SU1HMTAyLmpwZWcnLFxuICAgICAgdXJsOiAnaHR0cHM6Ly9jb2RlbXkudG9wJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5pY2tuYW1lOiAnXHU4MzAyXHU4MzAyXHU3MjY5XHU4QkVEJyxcbiAgICAgIGRlczogJ1x1ODMwMlx1ODMwMlx1NzY4NFx1NjIxMFx1OTU3Rlx1NEU0Qlx1OERFRlx1RkYwQ1x1NTMwNVx1NTQyQlx1NTI0RFx1N0FFRlx1NUUzOFx1NzUyOFx1NzdFNVx1OEJDNlx1MzAwMVx1NkU5MFx1NzgwMVx1OTYwNVx1OEJGQlx1N0IxNFx1OEJCMFx1MzAwMVx1NTQwNFx1NzlDRFx1NTk0N1x1NkRFQlx1NjI4MFx1NURFN1x1MzAwMVx1NjVFNVx1NUUzOFx1NjNEMFx1NjU0OFx1NURFNVx1NTE3N1x1N0I0OScsXG4gICAgICB1cmw6ICdodHRwczovL25vdGVzLmZlLW1tLmNvbScsXG4gICAgICBhdmF0YXI6ICdodHRwczovL25vdGVzLmZlLW1tLmNvbS9sb2dvLnBuZydcbiAgICB9LFxuICBdLFxuICAvLyBcdTc3MEJcdTY3N0ZcdTVBMThcbiAgLy8gb21sMmQ6IHtcbiAgLy8gICBtb2JpbGVEaXNwbGF5OiB0cnVlLFxuICAvLyAgIG1vZGVsczogW1xuICAvLyAgICAge1xuICAvLyAgICAgICBcInBhdGhcIjogXCJodHRwczovL21vZGVsLm9tbDJkLmNvbS9ISzQxNi0xLW5vcm1hbC9tb2RlbC5qc29uXCIsXG4gIC8vICAgICAgIFwicG9zaXRpb25cIjogWzAsIDYwXSxcbiAgLy8gICAgICAgXCJzY2FsZVwiOiAwLjA4LFxuICAvLyAgICAgICBcInN0YWdlU3R5bGVcIjoge1xuICAvLyAgICAgICAgIFwid2lkdGhcIjogMzUwLFxuICAvLyAgICAgICAgIFwiaGVpZ2h0XCI6IDM1MFxuICAvLyAgICAgICB9XG4gIC8vICAgICB9XG4gIC8vICAgXVxuICAvLyB9XG5cbiAgLy8gXHU1MTZDXHU1NDRBXG4gIC8vIHBvcG92ZXI6IHtcbiAgLy8gICB0aXRsZTogJ1x1NTE2Q1x1NTQ0QScsXG4gIC8vICAgYm9keTogW1xuICAvLyAgICAgeyB0eXBlOiAndGV4dCcsIGNvbnRlbnQ6ICdcdUQ4M0RcdURDNDcgXHU1RkFFXHU0RkUxXHU0RThDXHU3RUY0XHU3ODAxIFx1RDgzRFx1REM0NycgfSxcbiAgLy8gICAgIHtcbiAgLy8gICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgLy8gICAgICAgc3JjOiAnaHR0cDovL3M2ZDhmcGkzNS5obi1ia3QuY2xvdWRkbi5jb20vYmxvYi9ld20uanBnJ1xuICAvLyAgICAgfSxcbiAgLy8gICAgIHtcbiAgLy8gICAgICAgdHlwZTogJ2J1dHRvbicsXG4gIC8vICAgICAgIGNvbnRlbnQ6ICdcdTRGNUNcdTgwMDVcdTUzNUFcdTVCQTInLFxuICAvLyAgICAgICBsaW5rOiAnaHR0cDovLzQzLjEzOS40Ny4yMDQ6MTAwOScsXG4gIC8vICAgICAgIHN0eWxlOiAnbWFyZ2luLXRvcDogMjBweCdcbiAgLy8gICAgIH1cbiAgLy8gICBdLFxuICAvLyAgIGR1cmF0aW9uOiAwXG4gIC8vIH0sXG59KVxuXG5leHBvcnQgeyBibG9nVGhlbWUgfVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VSxTQUFTLG9CQUFvQjs7O0FDQ3pXLFNBQVMsc0JBQXNCO0FBaUIvQixJQUFNLFlBQVksZUFBZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVUvQixRQUFRO0FBQUE7QUFBQSxFQUdSLFFBQVE7QUFBQTtBQUFBLElBRU4sV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLYjtBQUFBO0FBQUEsRUFHQSxZQUFZO0FBQUE7QUFBQSxFQUdaLFFBQVE7QUFBQSxFQUVSLFdBQVc7QUFBQSxJQUNULFVBQVU7QUFBQSxJQUNWLEtBQUssR0FBRyxHQUFHO0FBQ1QsYUFBTyxDQUFDLElBQUksS0FBSyxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsS0FBSyxJQUFJO0FBQUEsSUFDdkQ7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUdBLFFBQVE7QUFBQSxJQUNOO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixLQUFLO0FBQUEsTUFDTCxRQUNFO0FB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
