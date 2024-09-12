---
sidebar:
  title: docker 的基本学习
  step: 1
  isTimeLine: true
title: docker 的基本学习
tags:
  - 运维
categories:
  - 运维
---

# docker 的基本学习

[docker 在 desktop 使用 ](https://juejin.cn/book/7226988578700525605/section/7227408739827974199)

[Dockerfile 的使用](https://juejin.cn/book/7226988578700525605/section/7236527474555748410)

[docker 技巧](https://juejin.cn/book/7226988578700525605/section/7247104427566792762)

[docker compose](https://juejin.cn/book/7226988578700525605/section/7236156782194720805)

[docker 容器通信](https://juejin.cn/book/7226988578700525605/section/7246374398461280317)

## 关键名词

- containers：是镜像跑起来的容器
- images：是本地的所有镜像
- volume：数据卷 - 把宿主机某个目录挂到容器内

因为容器是镜像跑起来的，下次再用这个镜像跑的还是同样的容器，那你在容器内保存的数据就会消失。
所以我们都是把某个宿主机目录，挂载到容器内的某个保存数据的目录，这样数据是保存在宿主机的，下次再用镜像跑一个新容器，只要把这个目录挂载上去就行。

## Dockerfile

docker 镜像是通过 dockerfile 构建出来的
dockerfile 通过 FROM、WORKDIR、COPY、RUN、EXPOSE、CMD 等指令声明了一个 http-server 提供静态服务的镜像

```yaml
FROM node:latest

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080"]
```

这些指令的含义如下：

- FROM：基于一个基础镜像来修改
- WORKDIR：指定当前工作目录
- COPY：把容器外的内容复制到容器内
- EXPOSE：声明当前容器要访问的网络端口，比如这里起服务会用到 8080
- RUN：在容器内执行命令
- CMD：容器启动的时候执行的命令

我们先通过 FROM 继承了 node 基础镜像，里面就有 npm、node 这些命令了。

通过 WORKDIR 指定当前目录。

然后通过 COPY 把 Dockerfile 同级目录下的内容复制到容器内，这里的 . 也就是 /app 目录

之后通过 RUN 执行 npm install，全局安装 http-server

通过 EXPOSE 指定要暴露的端口

CMD 指定容器跑起来之后执行的命令，这里就是执行 http-server 把服务跑起来。

## docker compose

docker-compose 可以批量按顺序启动一批容器

```yaml
version: "3.8"
services:
  nest-app:
    build:
      context: ./
      dockerfile: ./Dockerfile
    depends_on:
      - mysql-container
      # - redis-container
    ports:
      - 3000:3000
    networks:
      - common-network
  mysql-container:
    image: mysql
    volumes:
      - /www/server/volumes/mysql-data:/var/lib/mysql
    environment:
      MYSQL_DATABASE: test
      MYSQL_ROOT_PASSWORD: root
    networks:
      - common-network
  redis-container:
    image: redis
    volumes:
      - /www/server/volumes/redis-data:/data
    networks:
      - common-network
networks:
  common-network:
    driver: bridge
```

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
