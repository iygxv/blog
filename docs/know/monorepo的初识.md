---
sidebar:
 title: pnpm workspace构建monorepo仓库
 step: 1
 isTimeLine: true
title: pnpm workspace构建monorepo仓库
tags:
 - 其他
categories:
 - 其他
---


## 什么是Monorepo？什么是pnpm？
Monorepo是一种项目管理方式，就是把多个项目放在一个仓库里面

[现代前端工程为什么越来越离不开 Monorepo?](https://juejin.cn/post/6944877410827370504)

pnpm就是一个包管理工具，原生支持Monorepo

[官方文档](https://pnpm.io/zh/)

[为什么现在我更推荐 pnpm 而不是 npm/yarn?](https://juejin.cn/post/6932046455733485575)

## 使用pnpm workspace构建monorepo仓库

- 安装

```shell
npm i pnpm -g
```

- 创建项目

```shell
mkdir pnpm_workspace
```

- 初始化

```shell
pnpm init
```

`package.json`如下, 这里添加多了一个属性`"type": "module"`, 这个属性可以让你使用esm模块化规范

```json
{
  "name": "pnpm_workspace",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "vvv",
  "license": "ISC"
}
```

- 创建`pnpm-workspace.yaml`文件，这个文件定义了工作空间的根目录

```yaml
packages:
  - 'packages/**'
```

现在我们就可以在`packages`中创建多个项目了，目录结构如下：

```html
pnpm_workspace
├── package.json
├── packages
│   ├── components
│   │   ├── index.js
│   │   └── package.json
│   ├── core
│   │   ├── index.js
│   │   └── package.json
│   ├── utils
│   │   ├── index.js
│   │   └── package.json
└── pnpm-workspace.yaml
```

- 每一个包添加`index.js` 和 `package.json`

`package.json`那边主要是修改一下名称`@packages/components`, 其余俩个`@packages/core`  `@packages/utils`, 

另外这里也要加上`"type": "module"`

具体的结构

```json
{
  "name": "@packages/components",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## 安装依赖

### **多个子项目都需要引用一个依赖包**

多个子项目都需要引用一个依赖包, 我们可以把这个包安装在工作区根目录的`package.json`中

例如: 三个都需要`lodash`

```shell
pnpm add lodash -w
```

这样子的话在子包就不需要安装这个依赖了

### **单一子项目自己使用**

可以用过pnpm提供的命令

```shell
pnpm --filter <package_selector> <command>
```

例如我们需要在`@packages/components`安装[lodash](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Flodash)，命令如下：

```shell
pnpm -F @packages/components add lodash
```

:::tip 提示

-F`等价于`--filter

:::

###  **packageA中引用packageB**

我们往`@packages/utils`中安装一个`dayjs`

```shell
pnpm --filter @packages/utils add dayjs
```

现在我们就来实现package间的相互引用，首先我们在`@packages/utils/index.js`中写入如下内容：

```js
import dayjs from 'dayjs'
export function format(time, f = 'YYYY-MM-DD') {
  return dayjs(time).format(f)
}
```

然后我们执行如下命令：

```shell
pnpm -F @packages/components add @packages/utils
```

安装完成后`@packages/components/package.json`内容如下：

```json
{
  "name": "@packages/components",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@packages/utils": "workspace:^1.0.0",
    "lodash": "^4.17.21"
  }
}

```

然后我们在`@packages/components/index.js`写入如下内容：

```shell
import { format } from '@packages/utils'
console.log(format(new Date()))
```

然后我们在项目根目录运行如下命令

```shell
node packages/components
```

即可打印出当前的日期。


<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸
