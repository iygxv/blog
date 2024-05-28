---
sidebar: 
 title: git 中遇到的错误
 step: 1
 isTimeLine: true
title: git 中遇到的错误
tags:
 - 错误收集录
 - Git
categories:
 - 错误收集录
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

## 远程仓库和本地仓库的分支结构发生了分歧，导致了冲突
```bash
# 报错信息
git -c color.branch=false -c color.diff=false -c color.status=false -c diff.mnemonicprefix=false -c core.quotepath=false -c credential.helper=sourcetree fetch origin 

git -c color.branch=false -c color.diff=false -c color.status=false -c diff.mnemonicprefix=false -c core.quotepath=false -c credential.helper=sourcetree pull origin main 
From github.com:iygxv/blog
 * branch            main       -> FETCH_HEAD
hint: You have divergent branches and need to specify how to reconcile them.
hint: You can do so by running one of the following commands sometime before
hint: your next pull:
hint: 
hint:   git config pull.rebase false  # merge
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint: 
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
fatal: Need to specify how to reconcile divergent branches.
```

`解决办法`
- 选择合并策略：根据错误提示，您需要指定如何调和这些不同的分支。可以按照提示中的建议，选择以下其中一种策略：
```bash
# 第一种：采用合并（merge）策略
git config pull.rebase false
# 第二种：采用变基（rebase）策略
git config pull.rebase true
# 第三种：仅允许快进（fast-forward）合并
git config pull.ff only
```
- 执行 Pull 操作：在选择了合适的合并策略后，再次执行 Pull 操作
  
```bash
git pull origin main
```


<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸
