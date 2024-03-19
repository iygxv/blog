---
sidebar: 
 title: vue2 易忽略的知识
 step: 1
 isTimeLine: true
title: vue2易忽略的知识
tags:
 - Vue2
categories:
 - Vue2
---

## sync修饰符
`作用: 使用了sync修饰符, 就不用再父组件中接受子组件发射的事件`

什么情况下用sync修饰符

- 需要对一个 prop 进行`双向绑定`



**父组件**

`原本应该这样写`

```html
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

`简写`

```html
<text-document v-bind:title.sync="doc.title"></text-document>
```

**子组件**

```js
this.$emit('update:title', newTitle)
```

注意带有 `.sync` 修饰符的 `v-bind` **不能**和表达式一起使用 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。

**提示**

vue3已经使用`v-model:属性`代替了`sync修饰符`



## v-bind="$attrs"  v-on="$listeners"

`v-bind="$attrs"  v-on="$listeners"` 专门用于深层关系`(如: 爷 -> 父- > 孙)`传参和发射事件

**注意点**

- 这俩个写在父组件中
- 父组件的props不能使用`(由爷到孙)`传过去的参数, 如要使用, 使用(`props, $emit`)逐层传递

## 动态组件

```html
<component :is="currentTabComponent"></component>
```

`currentTabComponent`可以包括

- 已注册组件的名字✅
- 一个组件的选项对象

<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸
