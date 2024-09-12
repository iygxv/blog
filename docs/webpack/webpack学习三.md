---
sidebar:
  title: webpack 学习三
  step: 1
  recommend: 3
title: webpack 学习三
tags:
  - Webpack
categories:
  - Webpack
---

# webpack 学习三

## 1.optimization

[官方文档](https://webpack.docschina.org/configuration/optimization/#root)

从 webpack 4 开始，会根据你选择的 [`mode`](https://webpack.docschina.org/concepts/mode/) 来执行不同的优化， 不过所有的优化还是可以手动配置和重写。

```js
module.exports = {
  optimization: {
    //  对代码进行优化相关的操作
  },
};
```

## 2.SplitChunks

webpack 将根据以下条件自动拆分 chunks：

- 新的 chunk 可以被共享，或者模块来自于 `node_modules` 文件夹
- 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
- 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
- 当加载初始化页面时，并发请求的最大数量小于或等于 30

当尝试满足最后两个条件时，最好使用较大的 chunks。

**配置**

下面这个配置对象代表 `SplitChunksPlugin` 的默认行为。

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: "async", // async 异步导入 、 inital同步导入 、all -> chunk 可以在异步和非异步 chunk 之间共享
      minSize: 20000, // 生成 chunk 的最小体积(如果拆分出来一个, 那么拆分出来的这个包的大小最小为minSize)
      minRemainingSize: 0,
      minChunks: 1, // minChunks表示引入的包, 至少被导入了几次
      maxAsyncRequests: 30, // 按需加载时的最大并行请求数
      maxInitialRequests: 30, // 入口点的最大并行请求数
      enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值和其他限制（minRemainingSize，maxAsyncRequests，maxInitialRequests）将被忽略。
      cacheGroups: {
        // 缓存组
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先级
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

## 3.Terser

- **什么是 Terser 呢？**

  - Terser 是一个**JavaScript 的解释（Parser）、Mangler（绞肉机）/Compressor（压缩机）的工具集**
  - 早期我们会使用 uglify-js 来压缩、丑化我们的 JavaScript 代码，但是目前已经不再维护，并且不支持 ES6+的
    语法
  - Terser 是从 uglify-es fork 过来的，并且保留它原来的大部分 API 以及适配 uglify-es 和 uglify-js@3 等

- **Terser 可以帮助我们压缩、丑化我们的代码，让我们的 bundle 变得更小**

- **安装**

  ```shell
  yarn add terser
  ```

- **Terser 在 webpack 中配置**

  真实开发中，我们不需要手动的通过 terser 来处理我们的代码，我们可以直接通过 webpack 来处理，在 webpack 中有一个 minimizer 属性，在**production 模式**下，**默认就是使用 TerserPlugin 来处理我们的代码的**

  如果我们对默认的配置不满意，也可以自己来创建 TerserPlugin 的实例，并且覆盖相关的配置

  - 首先，我们需要打开 minimize，让其对我们的代码进行压缩（**默认 production 模式下已经打开了**）
  - 其次，我们可以在 minimizer 创建一个**TerserPlugin**
    - **extractComments**：默认值为 true，表示会将注释抽取到一个单独的文件中
    - 在开发中，我们不希望保留这个注释时，可以设置为 false
    - **parallel**：使用多进程并发运行提高构建的速度，默认值是 true，并发运行的默认数量： os.cpus().length - 1, 我们也可以设置自己的个数，但是使用默认值即可
    - **terserOptions**：设置我们的 terser 相关的配置
      - **compress**：设置压缩相关的选项；
      - **mangle**：设置丑化相关的选项，可以直接设置为 true；
      - **toplevel**：底层变量是否进行转换；
      - **keep_classnames**：保留类的名称；
      - **keep_fnames**：保留函数的名称

```js
module.exports = {
  optimization: {
    minimizer: [
      // 由Terser将未使用的函数, 从我们的代码中删除
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            arguments: false,
            dead_code: true,
          },
          mangle: true,
          toplevel: true,
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
};
```

## 4.CSS 的压缩

- **CSS 压缩通常是去除无用的空格等，因为很难去修改选择器、属性的名称、值等**
- **CSS 的压缩我们可以使用另外一个插件：css-minimizer-webpack-plugin；**
- **css-minimizer-webpack-plugin 是使用 cssnano 工具来优化、压缩 CSS（也可以单独使用）**
  - 第一步，安装 css-minimizer-webpack-plugin
  - 第二步，在 optimization.minimizer 中配置

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
};
```

## 5.Tree Shaking

- **什么是 Tree Shaking 呢？**
  - Tree Shaking 是一个术语，在计算机中表示**消除死代码（dead_code）**
  - 最早的想法起源于 LISP，用于消除未调用的代码（纯函数无副作用，可以放心的消除，这也是为什么要求我们在进
    行函数式编程时，尽量使用纯函数的原因之一）
  - 后来 Tree Shaking 也被应用于其他的语言，比如 JavaScript、Dart
- **webpack 实现 Tree Shaking**

  - **usedExports**：通过标记某些函数是否被使用，之后通过 Terser 来进行优化的
  - **sideEffects**：跳过整个模块/文件，直接查看该文件是否有副作用

- **usedExports**

  ```js
  module.exports = {
    optimization: {
      // usedExports: 目的是标注出来哪些函数是没有被使用 unused
      usedExports: true, // production
      minimize: true,
      minimizer: [
        // 由Terser将未使用的函数, 从我们的代码中删除
        new TerserPlugin({
          parallel: true,
          extractComments: false,
          terserOptions: {
            compress: {
              arguments: false,
              dead_code: true,
            },
            mangle: true,
            toplevel: true,
            keep_classnames: true,
            keep_fnames: true,
          },
        }),
      ],
    },
  };
  ```

- **sideEffects**

  - sideEffects 用于**告知 webpack compiler 哪些模块时有副作用**的
    - 副作用的意思是这里面的代码有执行一些特殊的任务，不能仅仅通过 export 来判断这段代码的意义
  - 在 package.json 中设置 sideEffects 的值
    - 如果我们将**sideEffects 设置为 false**，就是**告知 webpack 可以安全的删除未用到的 exports**
    - 如果有一些我们希望保留，可以设置为数组

## 6.Scope Hoisting

- **什么是 Scope Hoisting 呢？**
  - Scope Hoisting 从 webpack3 开始增加的一个新功能
  - 功能是对作用域进行提升，并且让**webpack 打包后的代码更小、运行更快**
- **默认情况下 webpack 打包会有很多的函数作用域，包括一些（比如最外层的）IIFE**
  - 无论是从最开始的代码运行，还是加载一个模块，都需要执行一系列的函数
  - Scope Hoisting 可以将函数合并到一个模块中来运行
- **使用 Scope Hoisting 非常的简单，webpack 已经内置了对应的模块**
  - 在 production 模式下，默认这个模块就会启用
  - 在 development 模式下，我们需要自己来打开该模块

```js
module.exports = {
  plugins: [
    // 一般用在生产环境
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};
```

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
