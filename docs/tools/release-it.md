---
sidebar:
  title: release-it
  step: 1
  isTimeLine: true
title: release-it
tags:
  - 工具
categories:
  - 工具
---

# release-it

描述
release-it 可以帮我们自动提升版本、打 tag、生成 changelog

## **release-it 是什么**

[release-it 官网仓库](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frelease-it%2Frelease-it)

- Bump 版本（例如 package.json）
- Git 提交、标记、推送
- 使用钩子执行任何（测试或构建）命令
- 在 GitHub 或 GitLab 上创建版本
- 生成变更日志
- 发布到 npm
- 管理预发布
- 插件扩展
- 任何 CI/CD 环境中发布

## **使用**

```shell
npm init release-it
# 选择 .release-it.json 用下面的配置，复制粘贴到 .release-it.json 中。

# 然后安装 changelog 插件
npm i @release-it/conventional-changelog -D
```

在`.release-it.json`中配置

```json
{
  "github": {
    "release": false
  },
  "git": {
    "commitMessage": "release: v${version}"
  },
  "npm": {
    "publish": false
  },
  "hooks": {
    "after:bump": "echo 更新版本成功"
  },
  "plugins": {
    "@release-it/conventional-changelog": {
      "preset": "angular",
      "infile": "CHANGELOG.md"
    }
  }
}
```

执行`npm run release` 就可以提升版本了

## **commit 规范**

安装`npm i git-cz -D`

```shell
npm i git-cz -D
```

在`package.json` 中加入如下脚本

```json
"scripts": {
		"commit": "git-cz"
}
```

git 提交时执行`npm run commit`

## **总结**

- release-it 可以自动提升版本、打 tag、生成 changelog
- Git-cz 可以进行 commit 规范

## **参考文档**

[release-it 自动提升版本、打 tag、生成 changelog 等](https://juejin.cn/post/7124467547163852808#heading-8)