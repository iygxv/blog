---
sidebar:
  title: 代码提交规范
  step: 1
  isTimeLine: true
title: 代码提交规范
tags:
  - Git
categories:
  - Git
---

# 代码提交规范

## 提交信息格式

每个提交信息都应该遵循以下格式：

```
<type>(<scope>): <subject>
```

### 类型（Type）

提交类型必须是以下之一：

| 类型 | 说明 | 示例 |
|------|------|------|
| feat | 新功能 | feat: 添加用户登录功能 |
| fix | 修复 bug | fix: 修复登录验证失败问题 |
| docs | 文档变更 | docs: 更新 README 文档 |
| style | 代码格式（不影响代码运行的变动） | style: 格式化代码缩进 |
| refactor | 重构（既不是新增功能，也不是修改 bug 的代码变动） | refactor: 重构用户认证模块 |
| perf | 性能优化 | perf: 优化数据库查询性能 |
| test | 增加测试 | test: 添加用户登录单元测试 |
| chore | 构建过程或辅助工具的变动 | chore: 更新 webpack 配置 |
| revert | 回退 | revert: 回退到上一个版本 |
| build | 打包 | build: 更新构建脚本 |

### 范围（Scope）

范围是可选的，表示 commit 影响的范围，比如：`feat(auth): 添加用户登录功能`


## 示例

```
feat(auth): 添加用户登录功能
```

## 参考资源

- [Angular 提交信息规范](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)
- [Git 提交信息规范指南](https://github.com/Document-Collection/git-guide/blob/master/docs/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83.md)