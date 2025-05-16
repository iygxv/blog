---
sidebar:
  title: Vue3.3 主要新特性详解
  step: 1
  isTimeLine: true
title: Vue3.3 主要新特性详解
tags:
  - Vue3 版本更新变化
categories:
  - Vue3 版本更新变化
---

# Vue3.3 主要新特性详解

## 前言

Vue 3.3 的这次发布主要是为了改进 DX （开发者体验），新增了一些语法糖和宏，以及 TypeScript 上的改善。

- 为 setup 语法糖组件引入了`泛型功能`
- 允许在组件文件中`导入外部的ts类型`
- 对`defineEmits`语法进行了优化
- 新增`defineSlots`定义插槽类型
- 新增`defineModel`来简化 modelValue 的语法
- 新增`defineOptions`定义组件名称以及其他一些配置项
- 对`toRef和toValue`的功能进行了增强

## setup 语法糖泛型

使用 `script setup `的组件现在可以通过 `generic` 属性接受泛型类型参数，一般情况下用不到，但有时候组件笔记复杂时无法推断类型的时候非常有用

```html
<script setup lang="ts" generic="T">
  defineProps<{
    items: T[];
    selected: T;
  }>();
</script>
```

注意：eslint 可能会报错，需要关闭该选项的检查

## 支持导入外部 ts 类型

`defineProps`和`defineEmits`支持使用 import 外部导入的类型声明。

```html
<script setup lang="ts">
  import type { Props } from "./foo";

  // 使用导入的类型 + 交集类型（导入类型基础上增加一个字段）
  defineProps<Props & { extraProp?: string }>(); // 在vue3.3之前不支持使用import导入的类型
</script>
```

## defineEmits 语法优化

之前`defineEmits`的类型参数只支持调用签名语法：

```ts
const emit = defineEmits<{
  (e: "foo", id: number): void;
  (e: "bar", name: string, ...rest: any[]): void;
}>();
// 或者不定义类型
// const emit = defineEmits(['update:modelValue'])
```

在 vue3.3 中可以简化为以下写法，更加简洁(当然原来的写法照样可以继续使用)

```ts
const emit = defineEmits<{
  foo: [id: number];
  bar: [name: string, ...rest: any[]];
}>();
```

## 新增 defineSlots

新的`defineSlots`宏可以用来声明插槽的类型，例如：

子组件 Pant

```ts
<script setup lang="ts">
defineSlots<{
  default?: (props: { msg: string }) => any
  item?: (props: { id: number }) => any
}>()
</script>
```

父组件

```ts
<template>
 <Pant :list="list">
  <template #default="{ msg }">{{ msg }}</template>
 <Pant/>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { listType } from '@/types/api'

const list = ref<Array<listType>>([])
</script>

```

## 新增 defineModel

在 vue3.3 中`此功能是实验性的，需要明确的选择加入`

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

## 新增 defineOptions

新的`defineOptions`宏允许直接在`script setup`中声明组件选项，而不需要单独的`script`块

可以用 `defineOptions` 定义任意选项，但 `props`, `emits`, `expose`, `slots` 除外

```ts
<script setup>
defineOptions({
  name: 'Pant'
  inheritAttrs: false
})
</script>
```

## toRef 和 toValue 增强

`toRef`已得到增强，以支持将值/getter/现有 refs 规范化为 refs：

```js
// 等价于ref(1)
toRef(1);
// 创建一个readonly ref，在.value访问时调用getter
toRef(() => props.foo);
// 按原样返回现有的引用
toRef(existingRef);
```

使用 getter 调用`toRef`类似于`computed`，但当 getter 只是执行属性访问而没有昂贵的计算时，效率会更高。

新的`toValue`实用程序方法提供了相反的功能，将 values / getters / refs 标准化为值：

```js
toValue(1); //       --> 1
toValue(ref(1)); //  --> 1
toValue(() => 1); // --> 1
```

`toValue`可以在 composable 中代替`unref`使用，这样你的 composable 就可以接受 getter 作为反应式数据源：

```js
// 以前:分配不必要的中间引用
useFeature(computed(() => props.foo));
useFeature(toRef(props, "foo"));

// 现在:更高效和简洁
useFeature(() => props.foo);
```

`toRef`和`toValue`之间的关系类似于`ref`和`unref`之间的关系，主要区别在于对 getter 函数的特殊处理。

## 关于依赖

升级到 3.3 时，vue 作者建议同时更新以下依赖项：

- volar / vue-tsc@^1.6.4
- vite@^4.3.5
- @vitejs/plugin-vue@^4.2.0
- vue-loader@^17.1.0（如果使用 webpack 或 vue-cli）

## 参考

https://blog.vuejs.org/posts/vue-3-3

https://github.com/vuejs/core/blob/main/CHANGELOG.md#330-2023-05-08

https://juejin.cn/post/7233053557833056317?searchId=20240628143920EEA2EF4F046F3A6D9AC7

## 最后

Vue Macros: 由 Vue 团队成员维护的一个 超前版 Vue

[Vue Macros](https://vue-macros.dev/zh-CN/)