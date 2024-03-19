---
sidebar: 
 title: nest 开发命令
 step: 1
 isTimeLine: true
title:  nest 开发命令
tags:
 - Nest
categories:
 - Nest
---

# nest 开发命令
下面主要是一些 nest 开发的常用命令
## nest cli
@nestjs/cli 这个包里提供了 nest 命令
```shell
npm install -g @nestjs/cli
```
## 创建项目 new 
```shell
nest new 项目名
```
选项：
- `-p（--package-manager ）` 指定包管理器
- `--skip-git` 和 `--skip-install` 很容易理解，就是跳过 git 的初始化，跳过 npm install
- `--language` 可以指定 typescript 和 javascript，一般我们都选择 ts，用默认的就好

下面是指定包管理器例子
```shell
nest new 项目名 -p yarn
```

## nest generate 
nest 命令除了可以生成整个项目外，还可以生成一些别的代码，比如 controller、service、module 等。
生成controller、service、module
```shell
nest generate controller aaa
nest generate service aaa
nest generate module aaa
```
如果是要完整生成一个模块的代码，不需要一个个生成，可以用
```shell
nest generate resource xxx
```
选项：
- `--spec` 和 `--no-spec` 是指定是否生成测试文件
- `--flat` 和 `--no-flat` 是指定是否生成对应目录的
- `--skip-import` 是指定不在 AppModule 里引入
- `--project`，这是指定生成代码在哪个子项目的



<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸
