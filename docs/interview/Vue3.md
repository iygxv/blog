---
sidebar:
  title: vue3 试炼
  step: 1
  isTimeLine: true
title: vue3 试炼
tags:
  - 试炼
categories:
  - 试炼
---

# Vue3 试炼

## **Vue3.0 有什么更新**

1. 监听机制的改变
   - 使用 proxy 实现响应式
   - 消除了了 Vue 2 当中基于 Object.defineProperty 的实现所存在的很多限制 (`不能响应式删除添加和删除属性`)
2. 新增组合 API(`Composition API`)
3. 支持多个根节点
4. 新的生命周期钩子函数

[具体访问](https://www.javascriptc.com/vue3js/guide/migration/introduction.html#%E6%B8%B2%E6%9F%93%E5%87%BD%E6%95%B0)

## **defineProperty 和 proxy 的区别**

Vue 在实例初始化时遍历 data 中的所有属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。这样当追踪数据发生变化时，setter 会被自动调用。

Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

但是这样做有以下问题：

1. 添加或删除对象的属性时，Vue 检测不到。因为添加或删除的对象没有在初始化进行响应式处理，只能通过`$set` 来调用`Object.defineProperty()`处理。
2. 无法监控到数组下标和长度的变化。

Vue3 使用 Proxy 来监控数据的变化。Proxy 是 ES6 中提供的功能，其作用为：用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。相对于`Object.defineProperty()`，其有以下特点：

1. Proxy 直接代理整个对象而非对象属性，这样只需做一层代理就可以监听同级结构下的所有属性变化，包括新增属性和删除属性。
2. Proxy 可以监听数组的变化。

## **Vue3.0 为什么要用 proxy？**

在 Vue2 中， 0bject.defineProperty 会改变原始数据，
而 Proxy 是创建对象的虚拟表示，并提供 set 、get 和 deleteProperty 等处理器，这些处理器可在访问或修改原始对象上的属性时进行拦截，有以下特点 ∶

- 不需用使用 `Vue.$set` 或 `Vue.$delete` 触发响应式。
- 全方位的数组变化检测，消除了 Vue2 无效的边界情况。
- 支持 Map，Set，WeakMap 和 WeakSet。

Proxy 实现的响应式原理与 Vue2 的实现原理相同，实现方式大同小异 ∶

- get 收集依赖
- Set、delete 等触发依赖
- 对于集合类型，就是对集合对象的方法做一层包装：原方法执行后执行依赖相关的收集或触发逻辑。

## **Vue 3.0 中的 Vue Composition API？**

在 Vue2 中，代码是 Options API 风格的，也就是通过填充 (option) data、methods、computed 等属性来完成一个 Vue 组件。这种风格使得 Vue 相对于 React 极为容易上手，同时也造成了几个问题：

1. 由于 Options API 不够灵活的开发方式，使得 Vue 开发缺乏优雅的方法来在组件间共用代码。
2. Vue 组件过于依赖`this`上下文，Vue 背后的一些小技巧使得 Vue 组件的开发看起来与 JavaScript 的开发原则相悖，比如在`methods` 中的`this`竟然指向组件实例来不指向`methods`所在的对象。这也使得 TypeScript 在 Vue2 中很不好用。

于是在 Vue3 中，舍弃了 Options API，转而投向 Composition API。Composition API 本质上是将 Options API 背后的机制暴露给用户直接使用，这样用户就拥有了更多的灵活性，也使得 Vue3 更适合于 TypeScript 结合。

## **Composition API 与 React Hook 很像，区别是什么**

从 React Hook 的实现角度看，React Hook 是根据 useState 调用的顺序来确定下一次重渲染时的 state 是来源于哪个 useState，所以出现了以下限制

- 不能在循环、条件、嵌套函数中调用 Hook
- 必须确保总是在你的 React 函数的顶层调用 Hook
- useEffect、useMemo 等函数必须手动确定依赖关系

而 Composition API 是基于 Vue 的响应式系统实现的，与 React Hook 的相比

- 声明在 setup 函数内，一次组件实例化只调用一次 setup，而 React Hook 每次重渲染都需要调用 Hook，使得 React 的 GC 比 Vue 更有压力，性能也相对于 Vue 来说也较慢
- Compositon API 的调用不需要顾虑调用顺序，也可以在循环、条件、嵌套函数中使用
- 响应式系统自动实现了依赖收集，进而组件的部分的性能优化由 Vue 内部自己完成，而 React Hook 需要手动传入依赖，而且必须必须保证依赖的顺序，让 useEffect、useMemo 等函数正确的捕获依赖变量，否则会由于依赖不正确使得组件性能下降。

虽然 Compositon API 看起来比 React Hook 好用，但是其设计思想也是借鉴 React Hook 的。

[具体访问](https://cn.vuejs.org/guide/extras/composition-api-faq.html#comparison-with-react-hooks)

## **watch 和 watchEffect 的区别**

- watch 可以懒执行副作用(`可以设置{lazy: true}`)
- watch 更加明确是应该由哪个状态触发侦听器重新执行
- 可以访问所侦听状态的前一个值和当前值

## **reactive 和 ref 的区别, ref 可以定义响应式对象吗?**

- reactive 主要用于定义响应式对象(`reactive是通过proxy实现的, 而proxy只支持对象`)
- ref 主要用于定义响应式基础数据(`ref是通过Object.defineProperty实现的`)

ref 也是可以定义响应式对象的? 但是会走 reactive 的逻辑

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
