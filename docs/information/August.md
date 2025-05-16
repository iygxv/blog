---
sidebar:
  title: 8月记
  step: 1
  isTimeLine: true
title: 8月记
tags:
  - 每月记
categories:
  - 每月记
---

# 8 月记

## 简介

这是属于我 8 月份收集的一些记录的知识

## 图片加载性能优化

[图片加载性能优化](https://mp.weixin.qq.com/s/6YUuE8IJ-B9XF9On6LmLKw)

对电商网页的性能而言，图片优化是至关重要的事情，本文就此探讨了一些简单、可靠的图片优化手段。

- 提前首屏图片的加载时机
- 降低加载图片的体积
- 减少加载图片的数量

## CDN 流量被盗刷经历

[CDN 流量被盗刷经历 - 粥里有勺糖](https://mp.weixin.qq.com/s?__biz=MzA4ODMyMTk5OA%3D%3D&mid=2247486267&idx=1&sn=3b4a9d121008fb0866862cc1f983bfe0&chksm=902ab19aa75d388c7a85d0409c5c53f5c8414be309e1244d93168c7829499f4ed6daccd38f99&token=1284260959&lang=zh_CN#rd)

## local-web-server

用于创建本地静态资源服务，支持非常简单的方式设置 proxy(反向代理) 和 SPA 支持

```shell
# 安装
npm install -g local-web-server

# 代理 dist 目录，设置 SPA 入口文件，以 /api 开头请求转发到后端服务
ws -d dist --spa index.html --rewrite '/api/(.*) -> http://127.0.0.1:3000/$1'
```

local-web-server 可以设置代理

## vue3 编译原理揭秘

[vue3 编译原理揭秘](https://vue-compiler.iamouyang.cn/)

## 为什么 vue:deep、/deep/、>>> 样式能穿透到子组件

[为什么 vue:deep、/deep/、>>> 样式能穿透到子组件](https://icodehub.top/blog/vue/vue3/deep-style-penetrate.html)

## vite-plugin-inspect 源码分析 插件

[vite-plugin-inspect 插件的使用](https://blog.csdn.net/qq_45634593/article/details/139617472)