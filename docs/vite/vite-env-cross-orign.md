---
sidebar:
  title: Vite 环境配置与跨域配置
  step: 1
  isTimeLine: true
title: Vite 环境配置与跨域配置
tags:
  - Vite
categories:
  - Vite
---

# Vite 环境配置与跨域配置

## 环境变量

Vite 在一个特殊的 **`import.meta.env`** 对象上暴露环境变量，这些变量在构建时会被静态地替换掉。这里有一些在所有情况下都可以使用的内建变量：

- **`import.meta.env.MODE`**: {string} 应用运行的[模式](https://cn.vitejs.dev/guide/env-and-mode.html#modes)。
- **`import.meta.env.BASE_URL`**: {string} 部署应用时的基本 URL。他由[`base` 配置项](https://cn.vitejs.dev/config/shared-options.html#base)决定。
- **`import.meta.env.PROD`**: {boolean} 应用是否运行在生产环境（使用 `NODE_ENV='production'` 运行开发服务器或构建应用时使用 `NODE_ENV='production'` ）。
- **`import.meta.env.DEV`**: {boolean} 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。
- **`import.meta.env.SSR`**: {boolean} 应用是否运行在 [server](https://cn.vitejs.dev/guide/ssr.html#conditional-logic) 上。

## `.env` 文件

Vite 使用 [dotenv](https://github.com/motdotla/dotenv) 从你的 [环境目录](https://cn.vitejs.dev/config/shared-options.html#envdir) 中的下列文件加载额外的环境变量：

```shell
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

:::tip **环境加载优先级**

一份用于指定模式的文件（例如 `.env.production`）会比通用形式的优先级更高（例如 `.env`）。

另外，Vite 执行时已经存在的环境变量有最高的优先级，不会被 `.env` 类文件覆盖。例如当运行 `VITE_SOME_KEY=123 vite build` 的时候。

`.env` 类文件会在 Vite 启动一开始时被加载，而改动会在重启服务器后生效。

:::

加载的环境变量也会通过 `import.meta.env` 以字符串形式暴露给客户端源码。

为了防止意外地将一些环境变量泄漏到客户端，只有以 `VITE_` 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这些环境变量：

```shell
VITE_SOME_KEY=123

DB_PASSWORD=foobar
```

只有 `VITE_SOME_KEY` 会被暴露为 `import.meta.env.VITE_SOME_KEY` 提供给客户端源码，而 `DB_PASSWORD` 则不会。

```js
console.log(import.meta.env.VITE_SOME_KEY); // "123"
console.log(import.meta.env.DB_PASSWORD); // undefined
```

:::tip **环境变量解析**

如上所示，`VITE_SOME_KEY` 是一个数字，但在解析时会返回一个字符串。布尔类型的环境变量也会发生同样的情况。在代码中使用时，请确保转换为所需的类型。

:::

## TypeScript 的智能提示

默认情况下，Vite 在 [`vite/client.d.ts`](https://github.com/vitejs/vite/blob/main/packages/vite/client.d.ts) 中为 `import.meta.env` 提供了类型定义。随着在 `.env[mode]` 文件中自定义了越来越多的环境变量，你可能想要在代码中获取这些以 `VITE_` 为前缀的用户自定义环境变量的 TypeScript 智能提示。

要想做到这一点，你可以在 `src` 目录下创建一个 `vite-env.d.ts` 文件，接着按下面这样增加 `ImportMetaEnv` 的定义：

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

如果你的代码依赖于浏览器环境的类型，比如 [DOM](https://github.com/microsoft/TypeScript/blob/main/src/lib/dom.generated.d.ts) 和 [WebWorker](https://github.com/microsoft/TypeScript/blob/main/src/lib/webworker.generated.d.ts)，你可以在 `tsconfig.json` 中修改 [lib](https://www.typescriptlang.org/tsconfig#lib) 字段来获取类型支持。

```json
{
  "lib": ["WebWorker"]
}
```

:::info **导入语句会破坏类型增强**

如果 `ImportMetaEnv` 增强不起作用，请确保在 `vite-env.d.ts` 中没有任何 `import` 语句。更多信息请参阅 [TypeScript 文档](https://www.typescriptlang.org/docs/handbook/2/modules.html#how-javascript-modules-are-defined)。

:::

## HTML 环境变量替换

Vite 还支持在 HTML 文件中替换环境变量。`import.meta.env` 中的任何属性都可以通过特殊的 `%ENV_NAME%` 语法在 HTML 文件中使用：

```html
<h1>Vite is running in %MODE%</h1>
<p>Using data from %VITE_API_URL%</p>
```

如果环境变量在 `import.meta.env` 中不存在，比如不存在的 `%NON_EXISTENT%`，则会将被忽略而不被替换，这与 JS 中的 `import.meta.env.NON_EXISTENT` 不同，JS 中会被替换为 `undefined`。

正因为 Vite 被许多框架使用，它在复杂的替换（如条件替换）上故意不持任何意见。Vite 可以使用 [现有的用户插件](https://github.com/vitejs/awesome-vite#transformers) 或者一个实现了 [`transformIndexHtml` 钩子](https://cn.vitejs.dev/guide/api-plugin.html#transformindexhtml) 的自定义插件来扩展。

## 跨域配置

跨域的写法有 2 种

- 字符串写法
- 正则表达式写法

### 字符串写法

```js
export default defineConfig({
  server: {
    proxy: {
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      "/foo": "http://localhost:4567",

      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

在这个配置中，当开发服务器接收到以 /api 开头的请求时，它会将这些请求转发到 http://jsonplaceholder.typicode.com 。但是，通过 rewrite 函数，请求的路径会被重写，将 `/api` 替换为`空`。这样，即使前端代码中的 API 请求是向 /api/data 发送的，它们实际上会被转发到 http://jsonplaceholder.typicode.com/data。

### 正则表达式写法

```js
export default defineConfig({
  server: {
    proxy: {
      // 正则表达式写法：http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
      "^/fallback/.*": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ""),
      },
    },
  },
});
```

在这个配置中，当开发服务器接匹配到`^/fallback/.*`的请求时，它会将这些请求转发到 http://jsonplaceholder.typicode.com 。但是，通过 rewrite 函数，请求的路径会被重写，将 `/fallback` 替换为`空`。这样，即使前端代码中的 API 请求是向 /api/data 发送的，它们实际上会被转发到 http://jsonplaceholder.typicode.com/data。

## 在 vite.config.ts 中无法使用 import.meta.env.xxx 的解决办法

可以用过`loadEnv`来加载 `env` 文件

```typescript
import { loadEnv } from "vite";

export default ({ mode }) => {
  return defineConfig({
    plugins: [vue()],

    base: loadEnv(mode, process.cwd()).VITE_APP_NAME,
  });
};
```

`loadEnv的参数`

```typescript
function loadEnv(
  mode: string,
  envDir: string,
  prefixes: string | string[] = "VITE_"
): Record<string, string>;
```

**相关内容：** [`.env` Files](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)

加载 `envDir` 中的 `.env` 文件。默认情况下只有前缀为 `VITE_` 会被加载，除非更改了 `prefixes` 配置。

<br/>

<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
