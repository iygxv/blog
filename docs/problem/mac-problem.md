---
sidebar:
  title: Mac 操作的问题
  step: 1
  isTimeLine: true
title: Mac 操作的问题
tags:
  - 错误收集录
categories:
  - 错误收集录
---

# Mac 操作的问题

## Mac 终端提示 Permission denied

**原因：权限不足**

**解决办法：**

- 赋予文件权限
  一个文件有 3 种权限，读、写、可执行，你这个文件没有可执行权限，需要加上可执行权限。

  1. 终端下先 cd 到该文件的目录下
  2. 执行命令 chmod a+x ./文件名

- 赋予文件夹权限
  $ sudo chmod -R 777 目录路径

  其中 -R 是指级联应用到目录里的所有子目录和文件

  777 是所有用户都拥有最高权限

## Mac 中移除废纸篓的时候，提示“路径过长，无法移除的解决办法”

直接使用命令：

```shell
sudo rm -rf /Users/vity/.Trash/文件名
```

可能会提示文件权限不足，按照上面的方法去修改权限即可。

## mac 更改默认网页浏览器

### 在 macOS Ventura 或更高版本中

确保已安装你要使用的其他网页浏览器。
从屏幕角落的苹果菜单  中，选取“系统设置”。
点按边栏中的“桌面与程序坞”。
在右侧向下滚动，然后从“默认网页浏览器”菜单中选取一个网页浏览器。

### 在较早版本的 macOS 中

确保已安装你要使用的其他网页浏览器。
从屏幕角落的苹果菜单  中，选取“系统偏好设置”。
点按“通用”。
从“默认网页浏览器”菜单中选取一个网页浏览器。

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
