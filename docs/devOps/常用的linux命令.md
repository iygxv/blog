---
sidebar: 
 title: 常用的linux命令
 step: 1
 isTimeLine: true
title: 常用的linux命令
tags:
 - 运维
categories:
 - 运维
---


# 常用的linux命令

[Linux 命令大全](https://www.runoob.com/linux/linux-command-manual.html)

后续是我常用的命令

##  查找所有的 nginx.conf 文件
```shell
find . -name nginx.conf
```
:::tip 提示
find . -name nginx.conf 查找`当前目录`下所有的 nginx.conf 文件
:::

## 查找所有的 nginx.conf 文件（搜索整个文件系）
```shell
find / -name nginx.conf
```
或者
```shell
find / -type f -name nginx
```
- -name pattern：按文件名查找，支持使用通配符 * 和 ?。
- -type type：按文件类型查找，可以是 f（普通文件）、d（目录）、l（符号链接）等。

## 查看进程
```shell
ps -ef | grep nginx
```

## 本地拷贝到远程
```shell
scp -P 22 -r dist/* root@192.168.5.66:/web/xxx
```

## 赋予权限
```shell
# 赋予可执行权限
chmod -x /web/xxx
```

<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸
