---
sidebar:
  title: Git 命令
  step: 1
  isTimeLine: true
title: Git 命令
tags:
  - Git
categories:
  - Git
---

# Git 命令

## commit 修改

要修改最近一次 Git 提交的信息（包括提交消息和可能需要更改的文件内容），并且这些更改也应反映在远程仓库上，可以按照以下步骤进行操作

### 操作步骤

1、确保你当前位于想要修改提交信息的本地分支上。
使用 git commit --amend 命令来修改最近一次提交的消息。这会打开一个编辑器（根据你的系统配置），允许你修改提交消息。保存并关闭编辑器以提交更改。

```shell
git commit --amend
```

2、推送更改到远程仓库
由于你已经修改了提交历史（即改变了最近一次提交的哈希），直接使用 git push 会导致冲突，因为远程仓库仍然保留着原来的提交。此时，需要使用 --force 或 --force-with-lease 参数强制推送，以覆盖远程仓库的相应提交。

- 使用 --force （慎用）

```shell
git push --force origin <main>
git push -f origin <main>
```

:::tip 注意
使用 --force 会强制更新远程分支，使其与你的本地分支状态完全一致。这意味着如果你或他人在此期间有其他提交到远程，它们将被你的这次推送覆盖。因此，除非你确信没有其他人在此期间推送到该分支，否则应谨慎使用 --force。
:::

- 使用 --force-with-lease （推荐）

```shell
git push --force-with-lease origin <your_branch_name>
```

推荐理由： `--force-with-lease` 提供了一种更安全的强制推送方式。它会在推送前检查远程分支的状态是否与你预期的一致。如果远程分支在你上次拉取后有其他人的新提交，推送会失败，从而避免意外覆盖他人的工作。在多人协作的环境中，`--force-with-lease` 是一个更好的选择。

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
