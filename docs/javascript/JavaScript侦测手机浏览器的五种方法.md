---
sidebar:
  title: JavaScript 侦测手机浏览器的五种方法
  step: 0
  isTimeLine: true
title: JavaScript 侦测手机浏览器的五种方法
tags:
  - JavaScript
categories:
  - JavaScript
---

# JavaScript 侦测手机浏览器的五种方法

`来源:`[阮一峰 - JavaScript 侦测手机浏览器的五种方法](https://www.ruanyifeng.com/blog/2021/09/detecting-mobile-browser.html)

## 一、navigator.userAgent

最简单的方法就是分析浏览器的 user agent 字符串，它包含了设备信息。

JS 通过`navigator.userAgent`属性拿到这个字符串，只要里面包含`mobi`、`android`、`iphone`等关键字，就可以认定是移动设备。

> ```javascript
> if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
>   // 当前设备是移动设备
> }
>
> // 另一种写法
> if (
>   navigator.userAgent.match(/Mobi/i) ||
>   navigator.userAgent.match(/Android/i) ||
>   navigator.userAgent.match(/iPhone/i)
> ) {
>   // 当前设备是移动设备
> }
> ```

这种方法的优点是简单方便，缺点是不可靠，因为用户可以修改这个字符串，让手机浏览器伪装成桌面浏览器。

Chromium 系的浏览器，还有一个`navigator.userAgentData`属性，也是类似的作用。不同之处是它将 user agent 字符串解析为一个对象，该对象的`mobile`属性，返回一个布尔值，表示用户是否使用移动设备。

> ```javascript
> const isMobile = navigator.userAgentData.mobile;
> ```

注意，苹果的 Safari 浏览器和 Firefox 浏览器都不支持这个属性，具体情况可以查看 [Caniuse 网站](https://caniuse.com/mdn-api_navigator_useragentdata)。

此外，还有一个已经废除的[`navigator.platform`属性](https://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today)，所有浏览器都支持，所以也可以用。它返回一个字符串，表示用户的操作系统。

> ```javascript
> if (/Android|iPhone|iPad|iPod/i.test(navigator.platform)) {
>   // 当前设备是移动设备
> }
> ```

## 二、window.screen，window.innerWidth

另一种方法是通过屏幕宽度，判断是否为手机。

`window.screen`对象返回用户设备的屏幕信息，该对象的`width`属性是屏幕宽度（单位为像素）。

> ```javascript
> if (window.screen.width < 500) {
>   // 当前设备是移动设备
> }
> ```

上面示例中，如果屏幕宽度`window.screen.width`小于 500 像素，就认为是手机。

这个方法的缺点在于，如果手机横屏使用，就识别不了。

另一个属性`window.innerWidth`返回浏览器窗口里面的网页可见部分的宽度，比较适合指定网页在不同宽度下的样式。

> ```javascript
> const getBrowserWidth = function () {
>   if (window.innerWidth < 768) {
>     return "xs";
>   } else if (window.innerWidth < 991) {
>     return "sm";
>   } else if (window.innerWidth < 1199) {
>     return "md";
>   } else {
>     return "lg";
>   }
> };
> ```

## 三、window.orientation

第三种方法是侦测屏幕方向，手机屏幕可以随时改变方向（横屏或竖屏），桌面设备做不到。

`window.orientation`属性用于获取屏幕的当前方向，只有移动设备才有这个属性，桌面设备会返回`undefined`。

> ```javascript
> if (typeof window.orientation !== "undefined") {
>   // 当前设备是移动设备
> }
> ```

注意，iPhone 的 Safari 浏览器不支持该属性。

## 四、touch 事件

第四种方法是，手机浏览器的 DOM 元素可以通过`ontouchstart`属性，为`touch`事件指定监听函数。桌面设备没有这个属性。

> ```javascript
> function isMobile() {
>   return "ontouchstart" in document.documentElement;
> }
>
> // 另一种写法
> function isMobile() {
>   try {
>     document.createEvent("TouchEvent");
>     return true;
>   } catch (e) {
>     return false;
>   }
> }
> ```

## 五、window.matchMedia()

最后一种方法是结合 CSS 来判断。

CSS 通过 media query（媒介查询）为网页指定响应式样式。如果某个针对手机的 media query 语句生效了，就可以认为当前设备是移动设备。

`window.matchMedia()`方法接受一个 CSS 的 media query 语句作为参数，判断这个语句是否生效。

> ```javascript
> let isMobile = window.matchMedia(
>   "only screen and (max-width: 760px)"
> ).matches;
> ```

上面示例中，`window.matchMedia()`的参数是一个 CSS 查询语句，表示只对屏幕宽度不超过 700 像素的设备生效。它返回一个对象，该对象的`matches`属性是一个布尔值。如果是`true`，就表示查询生效，当前设备是手机。

除了通过屏幕宽度判断，还可以通过指针的精确性判断。

> ```javascript
> let isMobile = window.matchMedia("(pointer:coarse)").matches;
> ```

上面示例中，CSS 语句`pointer:coarse`表示当前设备的指针是不精确的。由于手机不支持鼠标，只支持触摸，所以符合这个条件。

有些设备支持多种指针，比如同时支持鼠标和触摸。`pointer:coarse`只用来判断主指针，此外还有一个`any-pointer`命令判断所有指针。

> ```javascript
> let isMobile = window.matchMedia("(any-pointer:coarse)").matches;
> ```

上面示例中，`any-pointer:coarse`表示所有指针里面，只要有一个指针是不精确的，就符合查询条件。

## 六、工具包

除了上面这些方法，也可以使用别人写好的工具包。这里推荐 [react-device-detect](https://www.npmjs.com/package/react-device-detect)，它支持多种粒度的设备侦测。

> ```javascript
> import { isMobile } from "react-device-detect";
>
> if (isMobile) {
>   // 当前设备是移动设备
> }
> ```

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
