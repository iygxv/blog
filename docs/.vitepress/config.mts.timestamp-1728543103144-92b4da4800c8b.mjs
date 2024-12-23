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
    // {
    //   nickname: 'HLP',
    //   des: 'HLP的博客',
    //   avatar:
    //     'https://www.icodehub.top/hlp/avatar.png',
    //   url: 'https://hlp.icodehub.top',
    // },
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
    ["link", { rel: "icon", href: "https://www.icodehub.top/blob/logo.ico" }]
  ],
  themeConfig: {
    lastUpdatedText: "\u4E0A\u6B21\u66F4\u65B0\u4E8E",
    logo: "https://www.icodehub.top/blob/logo.png",
    nav: [
      // emoji 大全： https://remeins.com/index/app/emojilist
      { text: "\u{1F3F0} \u9996\u9875", link: "/" },
      { text: "\u{1F54B} \u8D44\u6E90\u5BFC\u822A", link: "/source/\u8D44\u6E90\u5BFC\u822A.md" },
      {
        text: "\u{1F3DA} \u5347\u9636\u8BD5\u70BC\u573A",
        items: [
          { text: " \u{1F6E9} \u8BD5\u70BC\u8D44\u6E90", link: "/interview/source.md" },
          { text: " \u{1F6EB} CSS \u8BD5\u70BC", link: "/interview/CSS.md" },
          { text: " \u{1F6EC} HTML \u8BD5\u70BC", link: "/interview/HTML.md" },
          { text: " \u{1FA82} Vue \u8BD5\u70BC", link: "/interview/Vue.md" },
          { text: " \u{1F69F} Vue3 \u8BD5\u70BC", link: "/interview/Vue3.md" },
          { text: " \u{1F4BA} TypeScript \u8BD5\u70BC", link: "/interview/TypeScript.md" },
          { text: " \u{1F681} JavaScript \u8BD5\u70BC", link: "/interview/JavaScript.md" },
          { text: " \u{1F6A0} \u6027\u80FD\u4F18\u5316 \u8BD5\u70BC", link: "/interview/\u6027\u80FD\u4F18\u5316.md" },
          { text: " \u{1F6F0}\uFE0F \u4EE3\u7801\u624B\u5199 \u8BD5\u70BC", link: "/interview/\u4EE3\u7801\u624B\u5199.md" },
          { text: " \u{1F6F8} \u6D4F\u89C8\u5668\u539F\u7406 \u8BD5\u70BC", link: "/interview/\u6D4F\u89C8\u5668\u539F\u7406.md" },
          { text: " \u{1F6E5}\uFE0F \u8BA1\u7B97\u673A\u7F51\u7EDC \u8BD5\u70BC", link: "/interview/\u8BA1\u7B97\u673A\u7F51\u7EDC.md" }
        ]
      },
      {
        text: "\u26EA\u6280\u672F\u9886\u57DF",
        items: [
          { text: "\u{1F387} CSS", link: "/css/" },
          { text: "\u{1F3DD} JavaScript", link: "/javascript/" },
          { text: "\u{1F31F} TypeScript", link: "/ts/" },
          { text: "\u{1F308} Vue2", link: "/vue/vue2/" },
          { text: "\u{1F530} Vue3", link: "/vue/vue3/" },
          { text: " \u2728 React", link: "/react/" },
          { text: "\u{1F4A0} Uniapp", link: "/uniapp/" },
          { text: "\u{1F3DE} Vite", link: "/vite/" },
          { text: "\u{1F680} Webpack", link: "/webpack/" },
          { text: "\u{1FA82} Git", link: "/git/" },
          { text: "\u{1F386} \u6B63\u5219", link: "/regex/" }
        ]
      },
      {
        text: "\u26F2 \u8BB0\u5F55",
        items: [
          // 💟 ☮️ ✝️ ☪️ 🕉 ☸️ ✡️ 🔯 🕎 ☯️ ☦️ 🛐 ⛎ ♈️ ♉️ ♊️ ♋️ ♌️ ♍️ ♎️ ♏️ ♐️ ♑️ ♒️ ♓️ 🆔 ⚛️
          { text: "\u{1F6D0} \u5B9E\u6218\u6280\u5DE7", link: "/information/PracticalSkills.md" },
          { text: "\u2651\uFE0F  EveryT", link: "/information/EveryT.md" },
          { text: "\u2721\uFE0F  EveryT - \u5341\u6708", link: "/information/EveryT-Oct.md" }
        ]
      },
      {
        text: "\u26FA \u7F16\u7A0B\u4EE3\u7801",
        items: [
          { text: "\u{1F6EB} JS \u57FA\u672C\u7F16\u7A0B", link: "/coding/\u624B\u5199\u9898.md" },
          { text: "\u{1F6EC} TS \u57FA\u672C\u7F16\u7A0B", link: "/coding/\u624B\u5199\u9898(ts).md" },
          { text: "\u{1F6E9} async await \u5B9E\u73B0", link: "/coding/async-await.md" },
          { text: "\u{1F4BA} axios \u5B9E\u73B0", link: "/coding/axios\u7684\u57FA\u672C\u5B9E\u73B0.md" },
          { text: "\u{1F6F0} PromiseA+ \u5B9E\u73B0", link: "/coding/PromiseA+.md" },
          { text: "\u{1F6F8} Promise \u5176\u4ED6\u65B9\u6CD5\u5B9E\u73B0", link: "/coding/Promise\u5176\u4ED6\u65B9\u6CD5.md" }
        ]
      },
      {
        text: " \u{1F301} \u7EBF\u4E0A\u4F5C\u54C1",
        items: [
          // ⌚️ 📱 📲 💻 ⌨️ 🖥 🖨 🖱
          { text: "\u231A\uFE0F \u56FE\u5E8A", link: "https://icodehub.top/imageBed/" },
          { text: "\u{1F4F1} Fast Log", link: "https://github.com/iygxv/fast-log" },
          { text: "\u{1F5A8} Ts Transform", link: "https://icodehub.top/transform/" }
          // { text: '💻 Vue Next Admin', link: 'https://icodehub.top/vue-next-admin/' },
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL2Jsb2ctdGhlbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdml0eS9EZXNrdG9wL215L3dlYi9naXRodWIvYmxvZy9kb2NzLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy92aXR5L0Rlc2t0b3AvbXkvd2ViL2dpdGh1Yi9ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy92aXR5L0Rlc2t0b3AvbXkvd2ViL2dpdGh1Yi9ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJ1xuXG4vLyBcdTVCRkNcdTUxNjVcdTRFM0JcdTk4OThcdTc2ODRcdTkxNERcdTdGNkVcbmltcG9ydCB7IGJsb2dUaGVtZSB9IGZyb20gJy4vYmxvZy10aGVtZSdcblxuLy8gVml0ZXByZXNzIFx1OUVEOFx1OEJBNFx1OTE0RFx1N0Y2RVxuLy8gXHU4QkU2XHU4OUMxXHU2NTg3XHU2ODYzXHVGRjFBaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9zaXRlLWNvbmZpZ1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTonL2Jsb2cvJyxcbiAgLy8gXHU3RUU3XHU2MjdGXHU1MzVBXHU1QkEyXHU0RTNCXHU5ODk4KEBzdWdhcmF0L3RoZW1lKVxuICBleHRlbmRzOiBibG9nVGhlbWUsXG4gIGxhbmc6ICd6aC1jbicsXG4gIHRpdGxlOiAnXHU5NjhGXHU3RjE4JyxcbiAgZGVzY3JpcHRpb246ICdcdTk2OEZcdTdGMThcdTc2ODRcdTUzNUFcdTVCQTJcdTRFM0JcdTk4OThcdUZGMENcdTU3RkFcdTRFOEUgdml0ZXByZXNzIFx1NUI5RVx1NzNCMCcsXG4gIGxhc3RVcGRhdGVkOiB0cnVlLFxuICAvLyBcdThCRTZcdTg5QzFcdUZGMUFodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnI2hlYWRcbiAgaGVhZDogW1xuICAgIC8vIFx1OTE0RFx1N0Y2RVx1N0Y1MVx1N0FEOVx1NzY4NFx1NTZGRVx1NjgwN1x1RkYwOFx1NjYzRVx1NzkzQVx1NTcyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NzY4NCB0YWIgXHU0RTBBXHVGRjA5XG4gICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgIGhyZWY6ICdodHRwczovL3d3dy5pY29kZWh1Yi50b3AvYmxvYi9sb2dvLmljbycgfV1cbiAgXSxcbiAgdGhlbWVDb25maWc6IHtcbiAgICBsYXN0VXBkYXRlZFRleHQ6ICdcdTRFMEFcdTZCMjFcdTY2RjRcdTY1QjBcdTRFOEUnLFxuICAgIGxvZ286ICdodHRwczovL3d3dy5pY29kZWh1Yi50b3AvYmxvYi9sb2dvLnBuZycsXG4gICAgbmF2OiBbXG4gICAgICAvLyBlbW9qaSBcdTU5MjdcdTUxNjhcdUZGMUEgaHR0cHM6Ly9yZW1laW5zLmNvbS9pbmRleC9hcHAvZW1vamlsaXN0XG4gICAgICB7IHRleHQ6ICdcdUQ4M0NcdURGRjAgXHU5OTk2XHU5ODc1JywgbGluazogJy8nIH0sXG4gICAgICB7IHRleHQ6ICdcdUQ4M0RcdURENEIgXHU4RDQ0XHU2RTkwXHU1QkZDXHU4MjJBJywgbGluazogJy9zb3VyY2UvXHU4RDQ0XHU2RTkwXHU1QkZDXHU4MjJBLm1kJyB9LFxuICAgICAgeyB0ZXh0OiAnXHVEODNDXHVERkRBIFx1NTM0N1x1OTYzNlx1OEJENVx1NzBCQ1x1NTczQScsIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnIFx1RDgzRFx1REVFOSBcdThCRDVcdTcwQkNcdThENDRcdTZFOTAnLCBsaW5rOiAnL2ludGVydmlldy9zb3VyY2UubWQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnIFx1RDgzRFx1REVFQiBDU1MgXHU4QkQ1XHU3MEJDJywgbGluazogJy9pbnRlcnZpZXcvQ1NTLm1kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJyBcdUQ4M0RcdURFRUMgSFRNTCBcdThCRDVcdTcwQkMnLCBsaW5rOiAnL2ludGVydmlldy9IVE1MLm1kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJyBcdUQ4M0VcdURFODIgVnVlIFx1OEJENVx1NzBCQycsIGxpbms6ICcvaW50ZXJ2aWV3L1Z1ZS5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICcgXHVEODNEXHVERTlGIFZ1ZTMgXHU4QkQ1XHU3MEJDJywgbGluazogJy9pbnRlcnZpZXcvVnVlMy5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICcgXHVEODNEXHVEQ0JBIFR5cGVTY3JpcHQgXHU4QkQ1XHU3MEJDJywgbGluazogJy9pbnRlcnZpZXcvVHlwZVNjcmlwdC5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICcgXHVEODNEXHVERTgxIEphdmFTY3JpcHQgXHU4QkQ1XHU3MEJDJywgbGluazogJy9pbnRlcnZpZXcvSmF2YVNjcmlwdC5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICcgXHVEODNEXHVERUEwIFx1NjAyN1x1ODBGRFx1NEYxOFx1NTMxNiBcdThCRDVcdTcwQkMnLCBsaW5rOiAnL2ludGVydmlldy9cdTYwMjdcdTgwRkRcdTRGMThcdTUzMTYubWQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnIFx1RDgzRFx1REVGMFx1RkUwRiBcdTRFRTNcdTc4MDFcdTYyNEJcdTUxOTkgXHU4QkQ1XHU3MEJDJywgbGluazogJy9pbnRlcnZpZXcvXHU0RUUzXHU3ODAxXHU2MjRCXHU1MTk5Lm1kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJyBcdUQ4M0RcdURFRjggXHU2RDRGXHU4OUM4XHU1NjY4XHU1MzlGXHU3NDA2IFx1OEJENVx1NzBCQycsIGxpbms6ICcvaW50ZXJ2aWV3L1x1NkQ0Rlx1ODlDOFx1NTY2OFx1NTM5Rlx1NzQwNi5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICcgXHVEODNEXHVERUU1XHVGRTBGIFx1OEJBMVx1N0I5N1x1NjczQVx1N0Y1MVx1N0VEQyBcdThCRDVcdTcwQkMnLCBsaW5rOiAnL2ludGVydmlldy9cdThCQTFcdTdCOTdcdTY3M0FcdTdGNTFcdTdFREMubWQnIH0sXG4gICAgICAgIF0gXG4gICAgICB9LFxuICAgICAgeyBcbiAgICAgICAgdGV4dDogJ1x1MjZFQVx1NjI4MFx1NjcyRlx1OTg4Nlx1NTdERicsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnXHVEODNDXHVERjg3IENTUycsIGxpbms6ICcvY3NzLycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0NcdURGREQgSmF2YVNjcmlwdCcsIGxpbms6ICcvamF2YXNjcmlwdC8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnXHVEODNDXHVERjFGIFR5cGVTY3JpcHQnLCBsaW5rOiAnL3RzLycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0NcdURGMDggVnVlMicsIGxpbms6ICcvdnVlL3Z1ZTIvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1REQzMCBWdWUzJywgbGluazogJy92dWUvdnVlMy8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnIFx1MjcyOCBSZWFjdCcsIGxpbms6ICcvcmVhY3QvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1RENBMCBVbmlhcHAnLCBsaW5rOiAnL3VuaWFwcC8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnXHVEODNDXHVERkRFIFZpdGUnLCBsaW5rOiAnL3ZpdGUvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1REU4MCBXZWJwYWNrJywgbGluazogJy93ZWJwYWNrLycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0VcdURFODIgR2l0JywgbGluazogJy9naXQvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1RDgzQ1x1REY4NiBcdTZCNjNcdTUyMTknLCBsaW5rOiAnL3JlZ2V4LycgfSxcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHsgXG4gICAgICAgIHRleHQ6ICdcdTI2RjIgXHU4QkIwXHU1RjU1JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAvLyBcdUQ4M0RcdURDOUYgXHUyNjJFXHVGRTBGIFx1MjcxRFx1RkUwRiBcdTI2MkFcdUZFMEYgXHVEODNEXHVERDQ5IFx1MjYzOFx1RkUwRiBcdTI3MjFcdUZFMEYgXHVEODNEXHVERDJGIFx1RDgzRFx1REQ0RSBcdTI2MkZcdUZFMEYgXHUyNjI2XHVGRTBGIFx1RDgzRFx1REVEMCBcdTI2Q0UgXHUyNjQ4XHVGRTBGIFx1MjY0OVx1RkUwRiBcdTI2NEFcdUZFMEYgXHUyNjRCXHVGRTBGIFx1MjY0Q1x1RkUwRiBcdTI2NERcdUZFMEYgXHUyNjRFXHVGRTBGIFx1MjY0Rlx1RkUwRiBcdTI2NTBcdUZFMEYgXHUyNjUxXHVGRTBGIFx1MjY1Mlx1RkUwRiBcdTI2NTNcdUZFMEYgXHVEODNDXHVERDk0IFx1MjY5Qlx1RkUwRlxuICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1REVEMCBcdTVCOUVcdTYyMThcdTYyODBcdTVERTcnLCBsaW5rOiAnL2luZm9ybWF0aW9uL1ByYWN0aWNhbFNraWxscy5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdTI2NTFcdUZFMEYgIEV2ZXJ5VCcsIGxpbms6ICcvaW5mb3JtYXRpb24vRXZlcnlULm1kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1MjcyMVx1RkUwRiAgRXZlcnlUIC0gXHU1MzQxXHU2NzA4JywgbGluazogJy9pbmZvcm1hdGlvbi9FdmVyeVQtT2N0Lm1kJyB9LFxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnXHUyNkZBIFx1N0YxNlx1N0EwQlx1NEVFM1x1NzgwMScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnXHVEODNEXHVERUVCIEpTIFx1NTdGQVx1NjcyQ1x1N0YxNlx1N0EwQicsIGxpbms6ICcvY29kaW5nL1x1NjI0Qlx1NTE5OVx1OTg5OC5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0RcdURFRUMgVFMgXHU1N0ZBXHU2NzJDXHU3RjE2XHU3QTBCJywgbGluazogJy9jb2RpbmcvXHU2MjRCXHU1MTk5XHU5ODk4KHRzKS5tZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0RcdURFRTkgYXN5bmMgYXdhaXQgXHU1QjlFXHU3M0IwJywgbGluazogJy9jb2RpbmcvYXN5bmMtYXdhaXQubWQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnXHVEODNEXHVEQ0JBIGF4aW9zIFx1NUI5RVx1NzNCMCcsIGxpbms6ICcvY29kaW5nL2F4aW9zXHU3Njg0XHU1N0ZBXHU2NzJDXHU1QjlFXHU3M0IwLm1kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1REVGMCBQcm9taXNlQSsgXHU1QjlFXHU3M0IwJywgbGluazogJy9jb2RpbmcvUHJvbWlzZUErLm1kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1REVGOCBQcm9taXNlIFx1NTE3Nlx1NEVENlx1NjVCOVx1NkNENVx1NUI5RVx1NzNCMCcsIGxpbms6ICcvY29kaW5nL1Byb21pc2VcdTUxNzZcdTRFRDZcdTY1QjlcdTZDRDUubWQnIH0sXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7IFxuICAgICAgICB0ZXh0OiAnIFx1RDgzQ1x1REYwMSBcdTdFQkZcdTRFMEFcdTRGNUNcdTU0QzEnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIC8vIFx1MjMxQVx1RkUwRiBcdUQ4M0RcdURDRjEgXHVEODNEXHVEQ0YyIFx1RDgzRFx1RENCQiBcdTIzMjhcdUZFMEYgXHVEODNEXHVEREE1IFx1RDgzRFx1RERBOCBcdUQ4M0RcdUREQjFcbiAgICAgICAgICB7IHRleHQ6ICdcdTIzMUFcdUZFMEYgXHU1NkZFXHU1RThBJywgbGluazogJ2h0dHBzOi8vaWNvZGVodWIudG9wL2ltYWdlQmVkLycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0RcdURDRjEgRmFzdCBMb2cnLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2l5Z3h2L2Zhc3QtbG9nJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1RERBOCBUcyBUcmFuc2Zvcm0nLCBsaW5rOiAnaHR0cHM6Ly9pY29kZWh1Yi50b3AvdHJhbnNmb3JtLycgfSxcbiAgICAgICAgICAvLyB7IHRleHQ6ICdcdUQ4M0RcdURDQkIgVnVlIE5leHQgQWRtaW4nLCBsaW5rOiAnaHR0cHM6Ly9pY29kZWh1Yi50b3AvdnVlLW5leHQtYWRtaW4vJyB9LFxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSxcbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAge1xuICAgICAgICBpY29uOiAnZ2l0aHViJyxcbiAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9peWd4di9ibG9nJ1xuICAgICAgfVxuICAgIF1cbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3ZpdHkvRGVza3RvcC9teS93ZWIvZ2l0aHViL2Jsb2cvZG9jcy8udml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdml0eS9EZXNrdG9wL215L3dlYi9naXRodWIvYmxvZy9kb2NzLy52aXRlcHJlc3MvYmxvZy10aGVtZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdml0eS9EZXNrdG9wL215L3dlYi9naXRodWIvYmxvZy9kb2NzLy52aXRlcHJlc3MvYmxvZy10aGVtZS50c1wiOy8vIFx1NEUzQlx1OTg5OFx1NzJFQ1x1NjcwOVx1OTE0RFx1N0Y2RVxuaW1wb3J0IHsgZ2V0VGhlbWVDb25maWcgfSBmcm9tICdAc3VnYXJhdC90aGVtZS9ub2RlJ1xuXG4vLyBcdTVGMDBcdTU0MkZSU1NcdTY1MkZcdTYzMDFcdUZGMDhSU1NcdTkxNERcdTdGNkVcdUZGMDlcbi8vIGltcG9ydCB0eXBlIHsgVGhlbWUgfSBmcm9tICdAc3VnYXJhdC90aGVtZSdcblxuLy8gY29uc3QgYmFzZVVybCA9ICdodHRwczovL3N1Z2FyYXQudG9wJ1xuLy8gY29uc3QgUlNTOiBUaGVtZS5SU1NPcHRpb25zID0ge1xuLy8gICB0aXRsZTogJ1x1OTY4Rlx1N0YxOCcsXG4vLyAgIGJhc2VVcmwsXG4vLyAgIGNvcHlyaWdodDogJ0NvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBcdTk2OEZcdTdGMTgnLFxuLy8gICBkZXNjcmlwdGlvbjogJ1x1NEY2MFx1NzY4NFx1NjMwN1x1NUMxNixcdTYyRTVcdTY3MDlcdTY1MzlcdTUzRDhcdTRFMTZcdTc1NENcdTc2ODRcdTUyOUJcdTkxQ0ZcdUZGMDhcdTU5MjdcdTUyNERcdTdBRUZcdTc2RjhcdTUxNzNcdTYyODBcdTY3MkZcdTUyMDZcdTRFQUJcdUZGMDknLFxuLy8gICBsYW5ndWFnZTogJ3poLWNuJyxcbi8vICAgaW1hZ2U6ICdodHRwczovL2ltZy5jZG4uc3VnYXJhdC50b3AvbWRJbWcvTVRZM05EazVOVEUyTnpBek1BPT02NzQ5OTUxNjcwMzAnLFxuLy8gICBmYXZpY29uOiAnaHR0cHM6Ly9zdWdhcmF0LnRvcC9mYXZpY29uLmljbycsXG4vLyB9XG5cbi8vIFx1NjI0MFx1NjcwOVx1OTE0RFx1N0Y2RVx1OTg3OVx1RkYwQ1x1OEJFNlx1ODlDMVx1NjU4N1x1Njg2MzogaHR0cHM6Ly90aGVtZS5zdWdhcmF0LnRvcC9cbmNvbnN0IGJsb2dUaGVtZSA9IGdldFRoZW1lQ29uZmlnKHtcbiAgLy8gXHU1RjAwXHU1NDJGUlNTXHU2NTJGXHU2MzAxXG4gIC8vIFJTUyxcblxuICAvLyBcdTY0MUNcdTdEMjJcbiAgLy8gXHU5RUQ4XHU4QkE0XHU1RjAwXHU1NDJGcGFnZWZpbmRcdTc5QkJcdTdFQkZcdTc2ODRcdTUxNjhcdTY1ODdcdTY0MUNcdTdEMjJcdTY1MkZcdTYzMDFcdUZGMDhcdTU5ODJcdTRGN0ZcdTc1MjhcdTUxNzZcdTVCODNcdTc2ODRcdTUzRUZcdTRFRTVcdThCQkVcdTdGNkVcdTRFM0FmYWxzZVx1RkYwOVxuICAvLyBcdTU5ODJcdTY3OUNucHggcGFnZWZpbmQgXHU2NUY2XHU5NUY0XHU4RkM3XHU5NTdGXHVGRjBDXHU1M0VGXHU0RUU1XHU2MjRCXHU1MkE4XHU1QzA2XHU1MTc2XHU1Qjg5XHU4OEM1XHU0RTNBXHU5ODc5XHU3NkVFXHU0RjlEXHU4RDU2IHBucG0gYWRkIHBhZ2VmaW5kXG4gIC8vIHNlYXJjaDoge1xuICAvLyAgIHBhZ2VSZXN1bHRDb3VudDogNVxuICAvLyB9LFxuICBzZWFyY2g6IGZhbHNlLFxuXG4gIC8vIFx1OTg3NVx1ODExQVxuICBmb290ZXI6IHtcbiAgICAvLyBtZXNzYWdlOiAnXHU0RTBCXHU5NzYyIFx1NzY4NFx1NTE4NVx1NUJCOVx1NTQ4Q1x1NTZGRVx1NjgwN1x1OTBGRFx1NjYyRlx1NTNFRlx1NEVFNVx1NEZFRVx1NjUzOVx1NzY4NFx1NTY2Mlx1RkYwOFx1NUY1M1x1NzEzNlx1NjcyQ1x1Njc2MVx1NTE4NVx1NUJCOVx1NEU1Rlx1NjYyRlx1NTNFRlx1NEVFNVx1OTY5MFx1ODVDRlx1NzY4NFx1RkYwOScsXG4gICAgY29weXJpZ2h0OiAnTUlUIExpY2Vuc2UgfCBcdTk2OEZcdTdGMTgnLFxuICAgIC8vIGljcFJlY29yZDoge1xuICAgIC8vICAgbmFtZTogJ1x1ODcwMElDUFx1NTkwNzE5MDExNzI0XHU1M0Y3JyxcbiAgICAvLyAgIGxpbms6ICdodHRwczovL2JlaWFuLm1paXQuZ292LmNuLydcbiAgICAvLyB9LFxuICB9LFxuXG4gIC8vIFx1NEUzQlx1OTg5OFx1ODI3Mlx1NEZFRVx1NjUzOVxuICB0aGVtZUNvbG9yOiAnZWwtYmx1ZScsXG5cbiAgLy8gXHU2NTg3XHU3QUUwXHU5RUQ4XHU4QkE0XHU0RjVDXHU4MDA1XG4gIGF1dGhvcjogJ1x1OTY4Rlx1N0YxOCcsXG5cbiAgcmVjb21tZW5kOiB7XG4gICAgbmV4dFRleHQ6ICdcdTRFMEJcdTRFMDBcdTk4NzUnLFxuICAgIHNvcnQoYSwgYikge1xuICAgICAgcmV0dXJuICtuZXcgRGF0ZShiLm1ldGEuZGF0ZSkgLSArbmV3IERhdGUoYS5tZXRhLmRhdGUpXG4gICAgfSxcbiAgfSxcblxuICAvLyBcdTUzQ0JcdTk0RkVcbiAgZnJpZW5kOiBbXG4gICAgLy8ge1xuICAgIC8vICAgbmlja25hbWU6ICdITFAnLFxuICAgIC8vICAgZGVzOiAnSExQXHU3Njg0XHU1MzVBXHU1QkEyJyxcbiAgICAvLyAgIGF2YXRhcjpcbiAgICAvLyAgICAgJ2h0dHBzOi8vd3d3Lmljb2RlaHViLnRvcC9obHAvYXZhdGFyLnBuZycsXG4gICAgLy8gICB1cmw6ICdodHRwczovL2hscC5pY29kZWh1Yi50b3AnLFxuICAgIC8vIH0sXG4gICAge1xuICAgICAgbmlja25hbWU6ICdcdTUxQjRcdTdGQkQnLFxuICAgICAgZGVzOiAnXHU1MUI0XHU3RkJEXHU3Njg0SmF2YVNjcmlwdFx1NTM1QVx1NUJBMicsXG4gICAgICBhdmF0YXI6XG4gICAgICAgICdodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTE0NTgyNjM/cz00OCZ2PTQnLFxuICAgICAgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL21xeXFpbmdmZW5nL0Jsb2cnLFxuICAgIH0sXG4gICAge1xuICAgICAgbmlja25hbWU6ICdcdTdDQTVcdTkxQ0NcdTY3MDlcdTUyRkFcdTdDRDYnLFxuICAgICAgZGVzOiAnXHU0RjYwXHU3Njg0XHU2MzA3XHU1QzE2XHU3NTI4XHU0RThFXHU2NTM5XHU1M0Q4XHU0RTE2XHU3NTRDXHU3Njg0XHU1MjlCXHU5MUNGJyxcbiAgICAgIGF2YXRhcjpcbiAgICAgICAgJ2h0dHBzOi8vaW1nLmNkbi5zdWdhcmF0LnRvcC9tZEltZy9NVFkzTkRrNU5URTJOekF6TUE9PTY3NDk5NTE2NzAzMCcsXG4gICAgICB1cmw6ICdodHRwczovL3N1Z2FyYXQudG9wJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5pY2tuYW1lOiAnXHU3N0U1XHU4ODRDXHU4QkIwJyxcbiAgICAgIGRlczogJ1x1NzdFNVx1ODg0Q1x1OEJCMFx1NzY4NFx1NTM1QVx1NUJBMicsXG4gICAgICBhdmF0YXI6XG4gICAgICAgICdodHRwczovL2NvZGVteS50b3AvdXBsb2FkLzIwMjIvMDYvV2VjaGF0SU1HMTAyLmpwZWcnLFxuICAgICAgdXJsOiAnaHR0cHM6Ly9jb2RlbXkudG9wJyxcbiAgICB9XG4gIF0sXG4gIC8vIFx1NzcwQlx1Njc3Rlx1NUExOFxuICAvLyBvbWwyZDoge1xuICAvLyAgIG1vYmlsZURpc3BsYXk6IHRydWUsXG4gIC8vICAgbW9kZWxzOiBbXG4gIC8vICAgICB7XG4gIC8vICAgICAgIFwicGF0aFwiOiBcImh0dHBzOi8vbW9kZWwub21sMmQuY29tL0hLNDE2LTEtbm9ybWFsL21vZGVsLmpzb25cIixcbiAgLy8gICAgICAgXCJwb3NpdGlvblwiOiBbMCwgNjBdLFxuICAvLyAgICAgICBcInNjYWxlXCI6IDAuMDgsXG4gIC8vICAgICAgIFwic3RhZ2VTdHlsZVwiOiB7XG4gIC8vICAgICAgICAgXCJoZWlnaHRcIjogMzUwXG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH1cbiAgLy8gICBdXG4gIC8vIH1cblxuICAvLyBcdTUxNkNcdTU0NEFcbiAgLy8gcG9wb3Zlcjoge1xuICAvLyAgIHRpdGxlOiAnXHU1MTZDXHU1NDRBJyxcbiAgLy8gICBib2R5OiBbXG4gIC8vICAgICB7IHR5cGU6ICd0ZXh0JywgY29udGVudDogJ1x1RDgzRFx1REM0NyBcdTVGQUVcdTRGRTFcdTRFOENcdTdFRjRcdTc4MDEgXHVEODNEXHVEQzQ3JyB9LFxuICAvLyAgICAge1xuICAvLyAgICAgICB0eXBlOiAnaW1hZ2UnLFxuICAvLyAgICAgICBzcmM6ICdodHRwOi8vczZkOGZwaTM1LmhuLWJrdC5jbG91ZGRuLmNvbS9ibG9iL2V3bS5qcGcnXG4gIC8vICAgICB9LFxuICAvLyAgICAge1xuICAvLyAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgLy8gICAgICAgY29udGVudDogJ1x1NEY1Q1x1ODAwNVx1NTM1QVx1NUJBMicsXG4gIC8vICAgICAgIGxpbms6ICdodHRwOi8vNDMuMTM5LjQ3LjIwNDoxMDA5JyxcbiAgLy8gICAgICAgc3R5bGU6ICdtYXJnaW4tdG9wOiAyMHB4J1xuICAvLyAgICAgfVxuICAvLyAgIF0sXG4gIC8vICAgZHVyYXRpb246IDBcbiAgLy8gfSxcbn0pXG5cbmV4cG9ydCB7IGJsb2dUaGVtZSB9XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRVLFNBQVMsb0JBQW9COzs7QUNDelcsU0FBUyxzQkFBc0I7QUFpQi9CLElBQU0sWUFBWSxlQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBVS9CLFFBQVE7QUFBQTtBQUFBLEVBR1IsUUFBUTtBQUFBO0FBQUEsSUFFTixXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtiO0FBQUE7QUFBQSxFQUdBLFlBQVk7QUFBQTtBQUFBLEVBR1osUUFBUTtBQUFBLEVBRVIsV0FBVztBQUFBLElBQ1QsVUFBVTtBQUFBLElBQ1YsS0FBSyxHQUFHLEdBQUc7QUFDVCxhQUFPLENBQUMsSUFBSSxLQUFLLEVBQUUsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxLQUFLLElBQUk7QUFBQSxJQUN2RDtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFRTjtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsS0FBSztBQUFBLE1BQ0wsUUFDRTtBQUFBLE1BQ0YsS0FBSztBQUFBLElBQ1A7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixLQUFLO0FBQUEsTUFDTCxRQUNFO0FBQUEsTUFDRixLQUFLO0FBQUEsSUFDUDtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLEtBQUs7QUFBQSxNQUNM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