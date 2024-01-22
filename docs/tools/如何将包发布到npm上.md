---
sidebar: 
 title: 如何将包发布到npm上
 step: 1
 isTimeLine: true
title: 如何将包发布到npm上
tags:
 - Tools
categories:
 - Tools
---


# 如何将包发布到npm上

## **创建一个npm包**

执行命令

```shell
npm init
```

一步一步按提示完成，输入完成之后，系统会要你确认文件的内容是否有误，如果没有问题就直接输入yes或者按enter，所有步骤都完成后会生成一个package.json文件。

**package.json属性说明**

```json
name - 包名。
version - 包的版本号。
description - 包的描述。
homepage - 包的官网 url 。
author - 包的作者姓名。
contributors - 包的其他贡献者姓名。
dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
main - main 字段指定了程序的主入口文件，require(‘moduleName’)
就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
keywords - 在npm社区的搜索关键字
```

接下来可以自己创建一个index.js文件，里面就是你要发布出去的函数代码。

## **发布packege包**

- 先去[npm](https://www.npmjs.com/)中注册一个账号

- 登陆npm账号

  ```shell
  npm login
  ```

  执行完命令后会要求你输入

  - 用户名
  - 密码
  - 邮箱

  输入完毕之后会就发送在你的`邮箱`一次性验证码, 验证码通过后就完成登陆了

- 将包发布到npm中

  - 对于私有包和无作用域的包，请使用 `npm publish`
  - 对于作用域公共包，使用 `npm publish --access public`

  

  **登陆npm是403问题**

  很多人开发是已将把npm 源换成了淘宝镜像或者自己公司内部的，但是发布需要npm本身的源。

  ```shell
  npm config set registry https://registry.npmjs.org/
  ```

  通过上面命令可以设置回来

  

  

  

  

  

  