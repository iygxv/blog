---
sidebar: 
 title: vue 项目中 env 详解
 step: 1
 isTimeLine: true
title: vue 项目中 env 详解
tags:
 - 项目
 - Vue2
 - Vue3
categories:
 - 项目
 - Vue2
 - Vue3
---

# vue 项目中 env 详解

## 简介
在Vue项目中，`.env` 文件用于存储项目的环境配置信息。这个文件可以被 `vue cli` 自动加载，并且可以在项目的任何位置通过 `process.env.xxx` 来访问这些配置。下面是对vue项目 `.env` 配置的详细解释：

## 文件类型
- `.env`：这是全局默认配置文件，无论什么环境都会加载合并
- `.env.development`：这是开发环境的配置文件
- `.env.beta`：这是测试环境的配置文件
- `.env.production`：这是生产环境的配置文件
- `.env.xxx`：运行项目中需要带模式  mode: 'xxx'

如果后面加了`.local（.env.local）`不应该被提交到版本控制系统（如 Git）

`.env.local` 文件的加载优先级高于 `.env` 文件，这意味着如果两个文件中存在同名的环境变量，`.env.local` 中的变量值会覆盖 `.env` 文件中的值。

## 内容格式

在`.env`文件中，属性名必须以 `VUE_APP_` 开头，例如 `VUE_APP_XXX`。只有以 `VUE_APP_` 开头的变量才会被 `webpack.DefinePlugin` 静态地嵌入到客户端侧的代码中。

## 加载方式

`Vue` 会根据启动命令自动加载相对应的环境配置文件。例如，执行 `npm run serve `命令时，会自动加载 `.env.development` 文件。开发环境会加载 `.env` 和 `.env.development` 文件，而生产环境会加载 `.env` 和 `.env.production` 文件。

加载的具体环境配置文件取决于`package.json`中`scripts`字段下的命令配置。例如，如果`serve`命令后面跟的是`--mode development`，则会加载`.env.development`文件。

## 优先级

当全局的配置文件（`.env`）和环境的配置文件（如`.env.development`或`.env.production`）有相同配置项时，环境的配置项会覆盖全局的配置项。

## 在项目中的使用

在配置文件中定义的属性可以在项目的其他文件中通过 `process.env.xxx` 来访问。例如，如果在 `.env` 文件中定义了一个名为`VUE_APP_TITLE` 的属性，那么可以在项目的其他文件中通过 `process.env.VUE_APP_TITLE` 来访问这个属性的值。

总的来说，`.env` 文件是 `Vue` 项目中非常重要的一个配置文件，它允许开发者为不同的环境设置不同的配置信息，并通过 `process.env` 在项目的任何位置访问这些配置。

Vue cli 可以加载.env文件，详情可查看：[Vue cli-环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)





<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸
