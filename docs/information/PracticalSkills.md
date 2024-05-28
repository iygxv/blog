---
top: 4
sticky: 997
sidebar: 
 title: 实战技巧
 step: 1
 isTimeLine: true
title: 实战技巧
tags:
 - 知识中心
categories:
 - 知识中心
---

# 实战技巧

## 声明

来源于`抖音渡一 Web 前端学习频道 - 前端高薪实战技巧`

## 140集：模块自动导入

安装一下 unplugin-auto-import 插件

```shell
yarn add unplugin-auto-import -D
```

vite 中配置

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/1
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports:[ 'vue','vue-router'],
      // 添加类型声明文件
      dts: 'src/auto-import.d.ts'
    })
  ],
})

```

案例：https://github.com/iygxv/demo/blob/main/vue-import-auto/src/App.vue

## 124集：depcheck 依赖检查

全局安装于一下这个插件

```shell
yarn add depcheck -g
```

执行命令可以检测出缺失的依赖

```shell
depcheck
```

## 123集：正则中的 lastIndex
如果正则表达式设置了全局标志，test() 的执行会改变正则表达式 lastIndex属性。连续的执行test()方法，后续的执行将会从 lastIndex 处开始匹配字符串，(exec() 同样改变正则本身的 lastIndex 属性值).

下面的实例表现了这种行为：

```js
var regex = /foo/g;

// regex.lastIndex is at 0
regex.test("foo"); // true

// regex.lastIndex is now at 3
regex.test("foo"); // false

```

案例：https://github.com/iygxv/demo/blob/main/lastIndex-in-regex/src/App.vue

