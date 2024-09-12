---
sidebar:
  title: 理解flex为1
  step: 1
  isTimeLine: true
title: 理解flex为1
tags:
  - css
categories:
  - css
---

# 理解 flex 为 1

## 前言

前言：在项目中经常使用到 flex 布局，但是使用了 flex：1 你知道是什么意思吗？

flex 属性设置置了弹性项目（使用了 flex 布局项目）如何增大或缩小以适应其弹性容器中可用的空间

flex 属性由三个简写属性： `flex-grow` `flex-shrink` `flex-basis`

## 指定 `flex`属性

可以使用一个，两个或三个值来指定 `flex`属性

### 单值语法（值必须位一下其中之一）

- 一个无单位数

  ```css
  flex: 2;
  ```

  其实设置为 flex-grow: 2

  flex-shrink 被定为 1

  flex-basis 被定为 0

  ​

- 一个有效宽度

  ```css
  flex: 30px;
  ```

  会被当作是`flex-basis`的值

- 关键字 none auto inital

  下面会讲述这些关键字的作用

### 双值语法（第一个值必须为一个无单位数，并且它会被当作 `<flex-grow>` 的值。第二个值必须为以下之一）

- 一个无单位数：它会被当作 `<flex-shrink>` 的值
- 一个有效的宽度值: 它会被当作 `<flex-basis>` 的值

### 三值语法

- 第一个值必须为一个无单位数，并且它会被当作 `<flex-grow>` 的值
- 第二个值必须为一个无单位数，并且它会被当作 `<flex-shrink>` 的值
- 第三个值必须为一个有效的宽度值， 并且它会被当作 `<flex-basis>` 的值

## 取值

### initial

元素会根据自身宽高设置尺寸。它`会缩短自身`以适应 flex 容器，但`不会伸长`并吸收 flex 容器中的额外自由空间来适应 flex 容器 。相当于将属性设置为"`flex: 0 1 auto`"

### auto

元素会根据自身的宽度与高度来确定尺寸，但是`会伸长`并吸收 flex 容器中额外的自由空间，也`会缩短`自身来适应 flex 容器。这相当于将属性设置为 "`flex: 1 1 auto`"

### none

元素会根据自身宽高来设置尺寸。它是完全非弹性的：`既不会缩短，也不会伸长`来适应 flex 容器。相当于将属性设置为"`flex: 0 0 auto`"

### flex-grow

定义 flex 项目的 [`flex-grow` 。负值无效。省略时默认值为 1。 (初始值为 `0`)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)

### flex-shrink

[定义 flex 项目的 ](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)[`flex-grow` 。负值无效。省略时默认值为 1。 (初始值为 `0`)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)

### flex-basis

[定义 flex 元素的 ](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)[`flex-basis` 属性。若值为`0`，则必须加上单位，以免被视作伸缩性。省略时默认值为 0。(初始值为 auto)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)

## flex:1 代表啥

flex:1 指的是 flex-grow: 1 flex-shrink: 1 flex-basis: 0%

```css
flex: 1;
```

即

```css
flex-grow: 1   flex-shrink: 1    flex-basis: 0%
```

[使用的是单值语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

[ps：如果不为三个值， 省略的将会使用到默认值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

## 训练

计算下面 son 的 width

```html
<!DOCTYPE html>
<html lang="en">
   <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>Document</title>
     
  </head>
   <style>
        .box {
          width: 650px;
          height: 600px;
          border: 1px solid skyblue;
          margin: 0 auto;
          display: flex;
        }
        .son {
          height: 100px;
          margin-left: 20px;
          line-height: 100px;
          text-align: center;
        }
        .son1 {
          flex-basis: 50px;
          width: 100px;
          background-color: skyblue;
        }
        .son2 {
          flex-basis: 50px;
          flex: 1;
          background-color: purple;
          /*
          ps：后面flex：1把flex-basis变为0了
          */
        }
        .son3 {
          flex-basis: 50px;
          max-width: 100px;
          background-color: yellow;
          /*
          ps：始终有限 flex-basis
          */
        }
        .son4 {
          flex: 1;
          min-width: 30px;
          flex-basis: 50px;
          background: pink;
    ​
          /*
          ps：后面flex-basis多加了50px
          */
        }
      
  </style>
   
  <body>
       
    <div class="box">
           
      <div class="son son1">1</div>
           
      <div class="son son2">2</div>
           
      <div class="son son3">3</div>
           
      <div class="son son4">4</div>
         
    </div>
     
  </body>
</html>
​
```

浏览器效果
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33371b353168446a9052170bb19c7bd2~tplv-k3u1fbpfcp-watermark.image?)

**son1 样式为：**

```css
flex-basis: 50px;
width: 100px;
background-color: skyblue;
```

由浏览器效果可知 son1 的 width 为 50px -> flex-basis 设置了后续设置 width 无效

**son2 样式为：**

```css
flex-basis: 50px;
flex: 1;
background-color: purple;
```

可以得知上面 flex：1 组成为 flex-grow:1 flex-shrink:1 flex-basis:0%
所以 flex-basis 为替换成了 0%，所以最终生效的样式是 flex：1

**son3 样式为：**

```css
flex-basis: 50px;
max-width: 100px;
background-color: yellow;
```

由浏览器效果可知 son1 的 width 为 50px -> flex-basis 设置了后续设置 max-width 无效

**son4 样式为：**

```css
flex: 1;
min-width: 30px;
flex-basis: 50px;
background: pink;
```

可以得知上面 flex：1 组成为 flex-grow:1 flex-shrink:1 flex-basis:0%，
可以将最终样式变为

```css
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
min-width: 30px;
flex-basis: 50px;
background: pink;
```

由浏览器效果可知 son4 的 width 为 50px + son2 的 width（flex：1 的宽度）

看到这里，你应该对 flex：1 有自己的见解了吧，快去实战实用一下吧。

[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
