---
sidebar:
  title: vite 中遇到的错误
  step: 1
  isTimeLine: true
title: vite 中遇到的错误
tags:
  - 错误收集录
  - Vite
categories:
  - 错误收集录
  - Vite
---

# vite 中遇到的问题

## 类型“ImportMeta”上不存在属性“env”

在 tsconfig.json 中配置

```json
{
  "compilerOptions": {
    // ...
    "types": ["vite/client"]
  }
}
```

## vue3 在 vite.config 中无法使用 import.meta.env.\*的解决办法

```ts
import { loadEnv } from "vite";
export default ({ mode }) => {
  return defineConfig({
    plugins: [vue()],
    base: loadEnv(mode, process.cwd()).VITE_APP_NAME,
  });
};
```

解决链接：https://www.jianshu.com/p/4973bd983e96
