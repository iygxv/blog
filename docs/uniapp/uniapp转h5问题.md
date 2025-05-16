---
sidebar:
  title: uniapp 转 h5 问题
  step: 1
  isTimeLine: true
title: uniapp 转 h5 问题
tags:
  - Uniapp
categories:
  - Uniapp
---

# uniapp 转 h5 问题

下面是记录一些 uniapp 转 h5 问题

## 跨域问题

跨域问题有 2 种解决方案

1. manifest.json 配置

```json
"h5" : {
        // 本地开发配置
        "devServer" : {
            "port" : 8081, // 端口
            "proxy" : "" // 代理地址
        },
        // 路由配置
        "router" : {
           // 用于设置H5端路由的基础路径。在示例中，设置为"/"，表示路由的基础路径为根路径。
            "base" : "/"
        }
    }
```

2. vue.config.js 配置

```js
devServer: {
  open: true,
  port: 8081,
  proxy: {
      '/dev-api': {
        target: '', // 代理地址
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': '/'
        }
      }
  }
},
```

## 环境变量设置

环境变量设置 可以访问下面的链接

[环境变量设置](https://icodehub.top/uniapp/uniapp%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E8%AE%BE%E7%BD%AE.html)

## 其他兼容

uniapp 转 h5 主要的就是这 2 个问题了：`跨域`和`环境变量设置`， 其他的就是一个兼容问题