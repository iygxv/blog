---
sidebar: 
 title: 内置组件-TransitionGroup
 step: 1
 isTimeLine: true
title: 内置组件-TransitionGroup
tags:
 - Vue2
 - Vue3
categories:
 - Vue2
 - Vue3
---

# 内置组件-TransitionGroup
TransitionGroup 是一个内置组件，用于对 v-for 列表中的元素或组件的插入、移除和顺序改变添加动画效果。

## 和 `Transition` 的区别

TransitionGroup 支持和 Transition 基本相同的 props、CSS 过渡 class 和 JavaScript 钩子监听器，但有以下几点区别：

默认情况下，它不会渲染一个容器元素。但你可以通过传入 tag prop 来指定一个元素作为容器元素来渲染。

过渡模式在这里不可用，因为我们不再是在互斥的元素之间进行切换。

列表中的每个元素都必须有一个独一无二的 key attribute。

CSS 过渡 class 会被应用在列表内的元素上，而不是容器元素上。



:::tip Tip

当在 [DOM 内模板](https://cn.vuejs.org/guide/essentials/component-basics.html#in-dom-template-parsing-caveats)中使用时，组件名需要写为 `<transition-group>`。

:::

## 进入 / 离开动画

这里是 `TransitionGroup` 对一个 `v-for` 列表添加进入 / 离开动画的示例：

```html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

## 移动动画

上面的示例有一些明显的缺陷：当某一项被插入或移除时，它周围的元素会立即发生“跳跃”而不是平稳地移动。我们可以通过添加一些额外的 CSS 规则来解决这个问题：

```css
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
```

## 渐进延迟列表动画

通过在 JavaScript 钩子中读取元素的 data attribute，我们可以实现带渐进延迟的列表动画。首先，我们把每一个元素的索引渲染为该元素上的一个 data attribute：

```html
<TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
```

## API 参考

为列表中的**多个**元素或组件提供过渡效果

**Props**

`TransitionGroup` 拥有与 `Transition` 除了 `mode` 以外所有的 props，并增加了两个额外的 props：

```ts
interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
  /**
   * 如果未定义，则渲染为片段 (fragment)。
   */
  tag?: string
  /**
   * 用于自定义过渡期间被应用的 CSS class。
   * 在模板中使用 kebab-case，例如 move-class="xxx"
   */
  moveClass?: string
}
```

**事件**

`TransitionGroup` 抛出与 `Transition` 相同的事件。

**详细信息**

默认情况下，`TransitionGroup` 不会渲染一个容器 DOM 元素，但是可以通过 `tag` prop 启用。

注意，每个 `transition-group` 的子节点必须有[**独立的 key**](https://cn.vuejs.org/guide/essentials/list.html#maintaining-state-with-key)，动画才能正常工作。

`TransitionGroup` 支持通过 CSS transform 控制移动效果。当一个子节点在屏幕上的位置在更新之后发生变化时，它会被添加一个使其位移的 CSS class (基于 `name` attribute 推导，或使用 `move-class` prop 显式配置)。如果使其位移的 class 被添加时 CSS 的 `transform` 属性是“可过渡的”，那么该元素会基于 [FLIP 技巧](https://aerotwist.com/blog/flip-your-animations/)平滑地到达动画终点。

**示例**

```html
<TransitionGroup tag="ul" name="slide">
  <li v-for="item in items" :key="item.id">
    {{ item.text }}
  </li>
</TransitionGroup>
```

- **参考**[指南 - TransitionGroup](https://cn.vuejs.org/guide/built-ins/transition-group.html)



<br/>

<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸
