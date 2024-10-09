---
top: 1
sticky: 10000
sidebar:
  title: EveryT - 十月
  step: 5
  isTimeLine: true
title: EveryT - 十月
tags:
  - 笔记
categories:
  - 笔记
---

# EveryT - 十月

## transition 和 animation 的区别 ？（2024-10-9）

transition 和 animation 都是 CSS 中用于创建动画效果的属性，但它们在实现方式、应用场景以及性能上存在一些显著的差异。以下是对这两者的详细比较：

### 一、实现方式

1. **transition（过渡）**：
   - 强调过渡效果，即在 CSS 属性的变化过程中进行平滑的过渡。
   - 需要手动触发，通常通过鼠标移动、点击等事件，或者通过伪类选择器（如:hover、:focus）来触发。
   - transition 只能触发一次播放一次，它类似于 flash 的补间动画，但只设置一个开始关键帧和一个结束关键帧。
2. **animation（动画）**：
   - 强调动画效果，可以创建更复杂和多样化的动画。
   - 不需要手动触发，是自动播放的。它使用@keyframes 来定义动画的关键帧，从而实现元素的动态变化效果。
   - 可以设置多个关键帧来完成动画，类似于 flash 的补间动画但更为灵活。

### 二、应用场景

1. **transition**：
   - 适用于简单的 CSS 属性变化，如背景色、透明度、尺寸等。
   - 常用于鼠标悬停、点击等交互事件中，实现元素的平滑过渡效果。
2. **animation**：
   - 适用于创建更复杂和多样化的动画效果，如元素的旋转、缩放、平移等复杂变换，以及多个动画状态之间的切换。
   - 可以用于页面的加载动画、元素的动态展示等场景。

### 三、性能差异

1. **transition**：
   - 通常不会引起页面的回流和重绘，因为 transition 一般结合 transform 等不会生成新位图的属性进行动画。
   - 对性能的影响相对较小。
2. **animation**：
   - 在改变 width、height、position 等改变文档流的属性时，会引起页面的回流和重绘。
   - 对性能的影响相对较大，特别是在动画涉及多个复杂属性变化时。

综上所述，transition 和 animation 在实现方式、应用场景以及性能上各有特点。在选择使用哪种方法时，需要根据具体的需求进行判断。如果只需要实现简单的动态效果，如背景色变化或尺寸缩放等，可以选择 transition；如果需要创建更复杂和多样化的动画效果，则可以选择 animation。

## 实现一个基于 Promise 的请求的重试（2024-10-8）

```js
/**
 *
 * @param task  返回一个promise的异步任务
 * @param count 需要重试的次数
 * @param time  每次重试间隔多久
 * @returns 返回一个新promise
 */
const retry = (task, count = 5, time = 3 * 1000) => {
  return new Promise((resolve, reject) => {
    let errorCount = 0;
    const run = () => {
      task()
        .then((res) => resolve(res))
        .catch((err) => {
          errorCount++;
          if (errorCount < count) {
            setTimeout(run, time);
          } else {
            reject(err);
          }
        });
    };
    run();
  });
};
```

## 上月总结（2024-10-1 至 2024-10-7）

**上个 EvertT 主要学习**

- Git 在 本地项目如何连接远程仓库
- 如何去修改 node_modules 包里面的代码
- npm run xxx 是执行什么命令呢？
- npm、yarn、pnpm 的区别？
- Vue 版本新增特性
- Vue 中 key 的 作用、scope 作用域原理、deep 样式穿透原理...
- Vue3 中的一些方法、特性、组件、优化...（ref、reactive、Teleport 组件...）
- 认识 HTTP 5 种传输方式
- treeShaking、HMR 热更新、babel 的原理理解
- 跨域问题以及预请求和 Vite 中的代理配置
- 前端中的竞态问题以及解决方案
- 浏览器的 Cookie、缓存机制、单点登录、无感刷新
- Javascript 本地存储的方式
- 前端跨页面通信的方法
- 在页面中如何添加水印，如何避免用户移除水印
- 如何判断元素是否在可视区域
- ES5 如何实现 let 和 const
- 如何去实现异步加载 script 脚本
- - 每日三问 -> 日常问题以及面试题
- ...

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
