---
sidebar:
  title: 使用 process.env.NODE_ENV 的正确姿势
  step: 1
  isTimeLine: true
title: 使用 process.env.NODE_ENV 的正确姿势
tags:
  - 项目
  - Vue2
  - Vue3
categories:
  - 项目
  - Vue2
  - Vue3
---

# 使用 process.env.NODE_ENV 的正确姿势

> 作者：文小雄
> <br/>链接：https://juejin.cn/post/7070347341282148365#heading-3 ><br/>来源：稀土掘金

## 什么是 process.env.NODE_ENV

`process.env.NODE_ENV`应该是我们最熟悉的环境变量了，它经常出现在使用框架或者类库的时候，被用来区分不同的环境（开发，测试，生产等），以便我们进行相对应的项目配置，比如是否开启 sourceMap，api 地址切换等。那为什么`process.env.NODE_ENV`能用来区分环境呢？它是如何来的？

先来看一下`process`和`process.env`的官方解释：

- process

`process` 对象是一个 `global` （全局变量），提供有关信息，控制当前 Node.js 进程。作为一个对象，它对于 Node.js 应用程序始终是可用的，故无需使用 `require()`。

- process.env

`process.env`属性返回一个包含用户环境信息的对象。

在 node 环境中，当我们打印`process.env`时，发现它并没有`NODE_ENV`这一个属性。实际上，`process.env.NODE_ENV`是在 package.json 的`scripts`命令中注入的，也就是`NODE_ENV`并不是 node 自带的，而是由用户定义的，至于为什么叫`NODE_ENV`，应该是约定成俗的吧。

```json
{
  "scripts": {
    "dev": "NODE_ENV=development webpack --config webpack.dev.config.js"
  }
}
```

可以看到`NODE_ENV`被赋值为`development`，当执行`npm run dev`时，我们就可以在 `webpack.dev.config.js`脚本中以及它所引入的脚本中访问到`process.env.NODE_ENV`，而无法在其它脚本中访问。

## 如何在其他脚本中访问

前面提到，在`scripts`命令中注入的`NODE_ENV`只能被 webpack 的构建脚本访问，而被 webpack 打包的源码中是无法访问到的，此时可以借助 webpack 的 DefinePlugin 插件，创建全局变量。

```js
const webpack = require("webpack");
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"development"',
    }),
  ],
};
```

当然`DefinePlugin`不仅仅可以定义`process.env.NODE_ENV`，你也可以根据自己的需要定义其他的全局变量。定义完成之后，就可以在项目代码中直接使用了。

## 跨平台的 cross-env

在 window 平台下直接设置`NODE_ENV =XXX`是会报错的，`cross-env` 能够提供一个设置环境变量的`scripts`，这样我们就能够以 unix 方式设置环境变量，然后在 windows 上也能够兼容。

- 安装`cross-env`

  ```shell
  npm install cross-env --save
  ```

- 在`NODE_ENV=XXX`前面添加`cross-env`

  ```json
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server"
  }
  ```

## 使用. env 文件

如果需要配置的环境变量太多，全部设置在`scripts`命令中既不美观也不容易维护，此时将环境变量配置在`.env`文件中，然后使用`dotenv`插件来加载`.env`配置文件。

- 安装`dotenv`

  ```shell
  npm install dotenv --save
  ```

- 创建`.env`文件

  ```ini
  NODE_ENV = development
  # 这是注释
  API_URL = https://abc.com
  ```

- 在程序中引入和配置`dotenv`。在 config 函数中可以配置.env 文件的路径。具体参考[dotenv 文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fdotenv)

  ```js
  require("dotenv").config();
  ```

这样就可以在程序中使用环境变量了。

在实际项目中，我们一般还是在`scripts`命令中设置`NODE_ENV`，然后通过不同的`NODE_ENV`来加载不同的`.env`文件。

举个例子：

有一个项目，简单的项目结构如下：

```txt
├── env
   ├── .env.dev
   ├── .env.test
   ├── .env.pre
   └── .env.prd
├── webpack.config.js
```

`.env.***`文件中配置了每个环境对应的变量，例如：

```ini
# .env.test 文件
API_URL = https://abc-test.com

# .env.pre 文件
API_URL = https://abc-pre.com

# .env.prd 文件
API_URL = https://abc.com
```

在`webpack.config.js`加载`env`配置：

```js
require("dotenv").config({
  path: path.resolve(__dirname, "./env/.env." + process.env.NODE_ENV),
});
```

最后别忘了还要在`scripts`命令中设置`NODE_ENV`：

```ini
# dev
cross-env NODE_ENV=dev

# test
cross-env NODE_ENV=test

# pre
cross-env NODE_ENV=pre

# prd
cross-env NODE_ENV=prd

```

`Vue cli` 也可以加载`.env`文件，详情可查看：[Vue cli-环境变量和模式](https://link.juejin.cn/?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2Fmode-and-env.html%23%E6%A8%A1%E5%BC%8F)

## 扩展

因为 `dotenv` 是直接将 `.env` 文件加到 `process.env` 里的，那为了区分到底是用户的变量还是原来就有的变量，就不得不限制前缀，这就是为什么在`vue-cli、vite`等 `env`里必须写`VUE_APP_、VITE_`前缀开头的了

<br/>

<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
