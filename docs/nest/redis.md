---
sidebar: 
 title: redis
 step: 1
 isTimeLine: true
title:  redis
tags:
 - Nest
categories:
 - Nest
---

# redis

## mac 系统

在 macOS 上安装 Redis，可以通过 Homebrew 进行安装。如果你的系统还没有安装 Homebrew，你可以在终端中运行以下命令来安装：
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装 Homebrew 后，你可以通过以下命令安装 Redis：
```shell
brew install redis
```

安装完成后，可以通过以下命令启动 Redis服务：
```shell
brew services start redis
```

或者手动启动：
```shell
redis-server /usr/local/etc/redis.conf
```

你可以通过运行redis-cli命令来测试Redis是否正常工作，如果Redis正在运行，它应该返回PONG。
```shell
redis-cli ping
```


<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸
