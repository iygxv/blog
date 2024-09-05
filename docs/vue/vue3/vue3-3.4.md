---
sidebar:
  title: Vue3.4 主要新特性详解
  step: 1
  isTimeLine: true
title: Vue3.4 主要新特性详解
tags:
  - Vue3 版本更新变化
categories:
  - Vue3 版本更新变化
---

# Vue3.4 主要新特性详解

## 前言

Vue 3.4 此版本包括若干重量级内部优化 —— 最大有可观的是，重写的模板解析器速度提高了整整 2 倍，以及重构的响应性系统，使得作用（effect）更精准高效。它还包含了一大坨生活质量 API 优化，包括但不限于：

- `defineModel` 的稳定性
- 绑定 `props` 时的全新同名简写

**亮点功能**

- 解析器速度提高 2 倍，优化 SFC 的构建性能
- 更高效的响应性系统
- `defineModel` 现已稳定
- `v-bind` 同名简写
- 改良水合（hydration）的不匹配错误
- 错代码和编译时标志参考

**移除已废弃功能**

- 全局 JSX 命名空间
- 其他已删除功能

## 解析器速度提高 2 倍，优化 SFC 的构建性能

在 Vue 3.4 中，我们完全重写了模板解析器。之前，Vue 使用递归下降解析器，该解析器依赖一大坨正则表达式和前向搜索。新的解析器使用基于 `htmlparser2` 的状态机 tokenizer（分词器），它有且仅有迭代整个模板字符串一次。结果是对于所有尺寸的模板而言，解析器始终优化 2 倍。多亏了我们广泛的测试用例和 ecosystem-ci，它也 100% 向后兼容 Vue 终端用户。

在将新的解析器与系统的其他部分集成时，我们还发现了若干进一步优化整体 SFC 编译性能的机会。基准测试显示，生成源码映射的同时，编译 Vue SFC 的脚本和模板部分的时候，性能优化了约 44%，因此 Vue 3.4 应该会优化大多数使用 Vue SFC 的项目构建。虽然但是，粉丝请注意，Vue SFC 编译只是现实项目中整个构建过程的一部分。与单独的基准测试相比，端到端构建时间的最终收益可能要小得多。

在 Vue 核心库之外，新的解析器还将优化 Volar/vue-tsc，以及需要解析 Vue SFC 或模板的社区插件的性能，比如 Vue Macros。

## 更高效的响应性系统

Vue 3.4 还对响应性系统进行了重大重构，旨在优化计算属性重新计算的效率。

为了说明正在优化的细节，让我们瞄一下以下场景：

```js
const count = ref(0);
const isEven = computed(() => count.value % 2 === 0);

watchEffect(() => console.log(isEven.value)); // 打印 true

count.value = 2; // 再次打印 true
```

在 Vue 3.4 之前，每当 `count.value` 变更时，即使计算结果不变，也会触发 `watchEffect` 的回调。通过 Vue 3.4 优化之后，现在当且仅当仅计算结果实际变更时，才会触发回调。

另外，在 Vue 3.4 中：

- 多个计算依赖变更能且仅能触发一次同步作用。
- 数组的 `shift/unshift/splice` 方法能且仅能触发一次同步作用。

除了基准测试中展示的收益之外，这还可以减少一大坨场景中多余的组件重新渲染，同时保留完整的向后兼容性。

## `defineModel` 现已稳定

`defineModel` 是一个新的 `<script setup>` 宏，旨在简化支持 `v-model` 的组件的实现。它之前作为实验性功能在 Vue 3.3 中发布，并在 Vue 3.4 中尘埃落定。现在，它还为 `v-model` 修饰符的使用提供了更好的支持。

用于简化自定义 v-model 双向绑定语法，在原来需要声明 props，并定义 update:propName 事件

```ts
<template>
  <input :value="modelValue" @input="onInput" />
</template>

<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>
```

简化后的写法

```ts
<template>
  <input v-model="modelValue" />
</template>

<script setup>
const modelValue = defineModel()
// 也可以直接修改，等价于emit('update:modelValue', '新值')
// modelValue.value = '新的值'
</script>

```

## `v-bind` 同名简写

您现在可以简写下列用例：

```html
<img :id="id" :src="src" :alt="alt" />

<!-- 优雅简写为： -->
<img :id :src :alt />
```

过去经常需要此功能。最初，我们担心它的用法会与布尔属性混淆。虽然但是，重新审视此功能后，考虑到其动态特性，我们现在认为 `v-bind` 的行为比原生属性更像 JS 是有意义的。

## 优化水合作用的不匹配错误

Vue 3.4 对水合不匹配错误消息进行了多项优化：

1. 提高了措辞的清晰度（SSR vs 客户端预期渲染）。
2. 该消息现在包含有问题的 DOM 节点，因此您可以在页面或元素面板中快速定位它。
3. 水合不匹配检查现在也适用于类、样式和其他动态绑定属性。

此外，Vue 3.4 还新增了一个编译时标志 `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__`，它可用于强制水合不匹配错误包含完整的详细信息，即使是在生产环境。

## 错误代码和编译时标志参考

为了减小打包体积，Vue 在生产构建中移除了长错误消息字符串。虽然但是，这意味着，生产中的错误处理程序捕获的错误会收到简短的错误代码，如果不深入 Vue 的源代码，这些代码难以破译。

为了改良这一点，我们在文档中新增了生产错误参考页面。错误代码会在 Vue 最新稳定版自动生成。

我们还添加了编译时标志参考，其中包含有关如何为不同构建工具配置这些标志的说明。

## 移除已废弃功能 - 全局 JSX 命名空间

从 Vue 3.4 开始，Vue 默认不再注册全局 `JSX` 命名空间。这对于避免与 React 的全局命名空间冲突是必要的，这样这两个库的 TSX 才可以在同一项目中共存。这不会影响使用最新版本 Volar 的仅 SFC 用户。

如果您使用 TSX，有两种选择：

1. 在升级到 Vue 3.4 之前，请将 `tsconfig.json` 中的 `jsxImportSource` 显式设置为 `'vue'`。您还可以通过在文件顶部添加 `/* @jsxImportSource vue */` 注释，在每个文件选择弃启用。
2. 如果您的代码依赖全局 `JSX` 命名空间的存在，比如使用 `JSX.Element` 等类型，您可以显式引用 `vue/jsx`，注册全局 `JSX` 命名空间，明确保留 Vue 3.4 之前的全局行为。

## 其他已移除功能

- [Reactivity Transform ](https://cn.vuejs.org/guide/extras/reactivity-transform.html)在 Vue 3.3 中被标记为已废弃，现已在 Vue 3.4 中移除。由于该功能处于实验阶段，因此此变更不要求主版本升级。希望继续使用该功能的用户可以诉诸 [Vue Macros](https://vue-macros.dev/zh-CN/) 来实现。
- `app.config.unwrapInjectedRef` 已移除。它已废弃，且在 Vue 3.3 中默认启用。在 Vue 3.4 中，无法再禁用此行为。
- 模板中的 `@vnodeXXX` 事件侦听器现在是编译器错误，而不是废弃警告。请改用 `@vue:XXX` 侦听器。
- `v-is` 指令已被移除。它在 Vue 3.3 中已废弃。请改用带有 `vue:` 前缀的 `is` 属性。

## 关于依赖

Volar/vue-tsc@^1.8.27（**必要**）

@vitejs/plugin-vue@^5.0.0（如果使用了 Vite）

nuxt@^3.9.0（如果使用了 Nuxt）

vue-loader@^17.4.0（如果使用了 webpack 或 vue-cli）

## 参考

https://blog.vuejs.org/posts/vue-3-4

https://juejin.cn/post/7329280514627256361?searchId=20240628151722FE01B126E05E636BEC30

## 最后

Vue Macros: 由 Vue 团队成员维护的一个 超前版 Vue

[Vue Macros](https://vue-macros.dev/zh-CN/)

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
