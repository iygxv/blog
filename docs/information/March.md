---
sidebar:
  title: 3月记
  step: 1
  isTimeLine: true
title: 3月记
tags:
  - 每月记
categories:
  - 每月记
---

# 3 月记

## 简介

这是属于我 3 月份收集的一些记录的知识

## git 已有文件夹如何放到刚创建的仓库中

具体的操作步骤

- git init
- git remote add origin 仓库 git 链接
- git add .
- git commit -m 'xxx'
- git push -u origin master

## img 标签的 alt 属性

alt  属性包含一条对图像的文本描述，这不是强制性的，但对无障碍而言，它难以置信地有用——屏幕阅读器会将这些描述读给需要使用阅读器的使用者听，让他们知道图像的含义。如果由于某种原因无法加载图像，普通浏览器也会在页面上显示  alt  属性中的备用文本：例如，网络错误、内容被屏蔽或链接过期。

## eruda 工具

eruda 与 vconsole 差不多的工具， devtool 面板实现得更丰富

## offsetTop、offsetLeft、offsetHeight、offsetWidth

- offsetTop：返回当前元素相对于其  offsetParent  元素的顶部内边距的距离
- offsetLeft：返回当前元素相对于其  offsetParent  元素的左侧内边距的距离
- offsetHeight：返回当前元素的高度，**包括上下内边距和边框，但不包括外边距和滚动条**
- offsetWidth：返回当前元素的宽度，**包括左右内边距和边框，但不包括外边距和滚动条**

## clientWidth 和 clientHeight

- clientWidth： 返回元素的可见内容区域的宽度，包括内边距，但**不包括边框、外边距和滚动条的尺寸**
- clientHeight：返回元素的可见内容区域的高度，包括内边距，但**不包括边框、外边距和滚动条的尺寸**

## ts 定义的一些小细节

```ts
export declare const NO: () => boolean;
export declare const NOOP: () => void;
```

## ES5 实现 let 和 const

### let

let 的特性

- 在块级作用域内有效
- 不能重复声明
- 不能预处理，不存在变量提升，即未声明之前的代码不能调用

我们可以通过匿名函数和闭包的形式来模拟 let

```js
(function () {
  var c = 3;
  console.log(c); // 1
})();
console.log(c); // c is not defined
```

### const

const 的特性

- 在块级作用域内有效
- 不能重复声明
- 不能预处理，不存在变量提升，即未声明之前的代码不能调用

```js
function _const(key, value) {
  window[key] = value;
  Object.defineProperty(window, key, {
    enumerable: false,
    configurable: false,
    get: function () {
      return value;
    },
    set: function (newValue) {
      if (newValue !== value) {
        throw TypeError("这是只读变量，不可修改");
      } else {
        return value;
      }
    },
  });
}
```

## sessionStorage 和 localStorage 理解

三个页面地址为`www.baidu.com/a`、`www.baidu.com/b`、`www.qq.com`, sessionStorage 是否能在这些页面共享，为什么? localStorage 呢?

**sessionStorage 和 localStorage** 只能在同一个域名下共享，不同域名下是不共享的。

所以`www.baidu.com/a`、`www.baidu.com/b` 可以共享，但是和`www.qq.com` 不共享。

## 对象隐试转化理解

new String('123') 和 String('123')有什么区别、new String('123') == String('123')吗，typeof 判断这两个是什么？

new String('123') 创建一个字符串对象变量，String('123') 是一个字符串。

new String('123') == String('123') 的结果是 true, 因为会 new String('123') 进行隐试转换

对象进行隐式转化的规则：

当对象类型需要转为原始类型时，它会先查找对象的 **valueOf** 方法，如果 **valueOf** 方法返回原始类型的值，则 **ToPrimitive** 的结果就是这个值，如果 **valueOf** 不存在或者 **valueOf** 方法返回的不是原始类型的值，就会尝试调用对象的 toString 方法，也就是会遵循对象的 **ToString** 规则，然后使用 toString 的返回值作为 **ToPrimitive** 的结果。

## box-sizing: border-box 元素的宽度

div 元素,style 为 width:100px;padding:10px;margin:10px;div 的宽度是多少，如果加上 box-sizing:border-box 呢？

当 `div` 元素的 `style` 属性设置为 `width:100px;padding:10px;margin:10px` 时，它的宽度会受到内边距（`padding`）和外边距（`margin`）的影响。

在这种情况下，`div` 的宽度实际上是 `width` 属性值加上左右内边距和左右外边距的总和。即：

宽度 = `width` + 左内边距 + 右内边距

所以，`div` 的宽度为：

100 + 10 + 10 = 120（px）

但是，如果加上 `box-sizing:border-box`，情况会有所不同。`box-sizing:border-box` 会将 `padding` 和 `border` 包含在元素的宽度和高度计算中。这意味着，当设置了 `box-sizing:border-box` 后，`width` 属性的值将是元素的实际宽度，包括内边距和边框。

在这种情况下，`div` 的宽度将直接由 `width:100px` 决定，即宽度为 100px。

需要注意的是，`box-sizing:border-box` 是一种常见的布局方式，它可以更方便地控制元素的尺寸，尤其在响应式设计中。但在使用时，要确保对其效果有清晰的理解，并根据实际需求进行选择。同时，不同的浏览器可能对 `box-sizing` 的处理略有差异，因此在实际开发中要进行兼容性测试。

## 类数组和数组有什么区别?

类数组和数组的区别如下：

- 本质：类数组是普通对象，而真实的数组是 Array 类型。
- 方法：类数组不具有数组所具有的方法。
- 遍历：数组遍历可以用 for in 和 for 循环，类数组只能用 for 循环遍历。
  常见的类数组有函数的参数 arguments，DOM 对象列表（比如通过 document.querySelectorAll 得到的列表））等。

**扩展：如何实现类数组转换数组：**

- Array.prototype.slice.call(arrayLike, start)
- [...arrayLike]
- Array.from(arrayLike)

**扩展：类数组和数组有一些相同之处，尽管它们在本质上有所不同：**

- 索引：类数组和数组都可以通过索引来访问元素。类数组通常也具有类似于数组的索引顺序，可以通过索引来获取其中的元素。
- 长度：类数组和数组都可以具有表示元素数量的长度属性。类数组可能通过类似 length 的属性来表示其元素的数量。
- 元素访问：类数组和数组都可以通过索引或其他方式访问其中的元素。可以使用类似 arr[index]的方式来获取特定索引处的元素。

## dom 事件流，一个按钮绑定了冒泡和捕获，点击后触发顺序是什么?

在 DOM 事件流中，点击一个按钮绑定了冒泡和捕获事件后，触发顺序为：先执行捕获事件，再执行冒泡事件。捕获事件的执行顺序是从目标元素的最顶层祖先元素开始，一直到目标元素本身；冒泡事件的执行顺序则是从目标元素本身开始，然后依次向上执行，直到达到文档根元素（`document`）或者事件不再被传播为止。

## 数组和链表有什么区别

数组和链表是两种常见的数据结构，它们在存储和访问数据方面有以下主要区别：

1. **存储方式**：

   - 数组：数组是一种连续的存储结构，元素按照一定的顺序存储在连续的内存位置上。每个元素在数组中都有固定的索引，通过索引可以快速访问元素。
   - 链表：链表中的元素不一定是连续存储的，而是通过指针或引用连接起来。每个节点包含数据以及指向下一个节点的指针。

2. **访问效率**：

   - 数组：通过索引访问元素非常高效，可以在常数时间内获取或修改指定位置的元素。
   - 链表：访问链表中的元素需要遍历链表，因此效率相对较低。在链表中查找特定元素需要从表头开始逐个节点访问。

3. **插入和删除操作**：

   - 数组：在数组中插入或删除元素可能需要移动其他元素，以保持数组的连续性。在中间位置插入或删除元素的效率较低。
   - 链表：链表的插入和删除操作相对更简单，只需要修改相邻节点的指针。因此，在链表中进行插入和删除操作的效率较高。

4. **内存占用**：

   - 数组：由于数组是连续存储的，可能会导致内存浪费，尤其是当数组中存在许多未使用的空间时。
   - 链表：链表中的节点可以根据需要动态分配内存，因此更灵活，但每个节点需要额外的指针空间。

5. **随机访问**：

   - 数组：支持随机访问，通过索引可以快速定位到任意位置的元素。
   - 链表：不支持随机访问，需要从头开始遍历链表才能访问到指定位置的元素。

6. **适用场景**：
   - 数组：适用于需要高效访问和随机访问的场景，例如排序、搜索等操作。
   - 链表：适用于需要频繁进行插入和删除操作的场景，例如实现链表、栈、队列等数据结构。

选择使用数组还是链表取决于具体的应用场景和性能需求。在实际开发中，根据数据操作的特点和效率要求来选择合适的数据结构。有时也可以结合使用数组和链表，以充分利用它们的优势。