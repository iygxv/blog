---
sidebar: 
 title: git报错收集
 step: 1
 isTimeLine: true
title: git报错收集
tags:
 - Git
categories:
 - Git
---

# git报错收集

## 远程的个别分支已经被删除，但是本地仍存在
```bash
# 报错信息
$ git pull --rebase origin br1
fatal: couldn't find remote ref br1
```
`解决办法`
```bash
git remote prune origin
```

<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸
