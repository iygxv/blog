---
sidebar:
  title: Webpack5 中的模块联邦
  step: 1
  isTimeLine: true
title: Webpack5 中的模块联邦
tags:
  - Webpack
  - 工程化
categories:
  - Webpack
  - 工程化
---

# Webpack5 中的模块联邦

## 前言

Webpack 5 引入了一个强大的特性——`模块联邦（Module Federation）`，它使得多个独立的应用程序可以共享代码和依赖关系，从而实现更高效的微前端架构。本文将介绍模块联邦的基本概念、工作原理以及如何在项目中使用它。

## 什么是模块联邦？

模块联邦允许不同的 JavaScript 应用程序在运行时动态加载和共享代码。通过这种方式，开发团队可以将应用程序拆分为多个独立的部分，每个部分可以独立开发、部署和更新，而不需要重新构建整个应用程序。

### 主要特性

1. **代码共享**：多个应用可以共享同一模块，避免重复打包。
2. **独立部署**：每个微服务或应用可以独立发布和更新。
3. **运行时加载**：按需加载模块，优化应用性能。
4. **版本控制**：可以控制不同模块的版本，确保兼容性。

## 工作原理

模块联邦的工作原理基于 Webpack 的 `Module Federation Plugin`。它允许开发者将应用程序的某些部分暴露出来，以便其他应用程序可以进行访问和使用。

### 关键概念

- **Host（主机）**：加载其他应用的应用程序。
- **Remote（远程）**：被加载的应用程序。
- **Shared（共享）**：多个应用共享的依赖。

### 配置示例

下面是一个基本的模块联邦配置示例，展示如何在 Webpack 中设置模块联邦。

#### 主机应用配置

```js
// webpack.config.js (Host)
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host_app",
      remotes: {
        remote_app: "remote_app@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
  ],
  // 其他配置...
};
```

#### 远程应用配置

```js
// webpack.config.js (Remote)
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button", // 暴露 Button 组件
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
  ],
  // 其他配置...
};
```

## 使用示例

在主机应用中，可以通过以下方式动态加载远程应用的组件：

```js
import React from "react";
import ReactDOM from "react-dom";

const loadRemoteComponent = async () => {
  const remoteButton = await import("remote_app/Button");
  return remoteButton.default;
};

const App = () => {
  const [Button, setButton] = React.useState(null);

  React.useEffect(() => {
    loadRemoteComponent().then(setButton);
  }, []);

  return (
    <div>
      <h1>主机应用</h1>
      {Button ? <Button /> : <p>加载中...</p>}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

## 模块联邦的优势

- **解耦**：不同团队可以独立开发和维护各自的微前端应用，降低了相互之间的依赖性。
- **灵活性**：可以根据需求动态加载模块，优化应用启动时间和运行性能。
- **版本兼容**：可以控制不同版本的共享依赖，减少了升级时的兼容性问题。

## 与 Monorepo 的区别

尽管模块联邦和 Monorepo 都旨在解决代码共享和模块化的问题，但它们的实现方式和使用场景有所不同。

### Monorepo

- **定义**：Monorepo 是一种代码管理策略，将多个项目或模块放在同一个版本控制仓库中。通常使用工具如 Lerna 或 Yarn Workspaces 或者 pnpm 来管理依赖和构建。
- **构建**：通常在构建时会将所有模块打包在一起，生成一个完整的应用。
- **版本控制**：所有模块共享同一个版本控制历史，更新和发布通常是同步的。
- **适用场景**：适用于紧密耦合的项目或需要共享大量代码的应用。

### 模块联邦

- **定义**：模块联邦是一种运行时的代码共享机制，允许不同应用在运行时加载和共享模块。
- **构建**：各个应用可以独立构建和部署，主机应用和远程应用可以根据需要动态加载。
- **版本控制**：可以为每个远程模块设置不同的版本，允许独立更新和发布。
- **适用场景**：适用于微前端架构、需要高灵活性和解耦的项目。

## 总结

Webpack 5 的模块联邦为微前端架构提供了灵活的解决方案，支持动态加载和共享模块，促进了应用的模块化和独立性。它与 Monorepo 的区别在于实现方式和适用场景，开发者可以根据项目需求选择合适的策略。

通过模块联邦，团队可以更高效地进行开发、部署和维护，同时保持代码的清晰和可维护性。希望本文能够帮助你更深入地理解和使用 Webpack 5 的模块联邦特性。如需进一步了解，请查阅 [Webpack 官方文档](https://webpack.docschina.org/concepts/module-federation/)。
