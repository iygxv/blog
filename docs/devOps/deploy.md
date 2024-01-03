---
sidebar: 
 title: 本地连接远程部署
 step: 1
 isTimeLine: true
title: 本地连接远程部署
tags:
 - 运维
categories:
 - 运维
---

# 本地连接远程部署
`说明: ` 只限于测试服务器或者个人服务器使用， 因为涉及到删除文件的操作

## 第一步
建立一个文件，文件名可以叫做 deploy.sh

## 第二步
```shell

# 删除旧文件，防止不更新
ssh root@xx.xx.xx.xxx "rm -rf /www/server/xx/*"  

# 拷贝 文件至远程
scp -P 22 -r dist/* root@xx.xx.xx.xxx:/www/server/xx/

```

这段 shell 的命令的解释是： 先删除远端 root@xx.xx.xx.xxx 中的 /www/server/xx/ 目录下的所有文件，然后将本地的 dist/* 目录下的所有文件拷贝到 远端 root@xx.xx.xx.xxx:/www/server/xx/ 目录下。

## 免密登录远程
因为上面的 shell 命令操作需要输入密码， 所以我们需要设置免密登录， 具体操作如下：
- 在你的本地电脑上生成公私钥对。可以使用命令：ssh-keygen -t rsa
- 将公钥拷贝到远程服务器上。可以使用命令：ssh-copy-id 用户名@服务器地址 （例如：ssh-copy-id root@xx.xx.xx.xxx）
- 这样，以后你就可以使用SSH命令直接登录到远程服务器，可以用命令：ssh 用户名@服务器地址
