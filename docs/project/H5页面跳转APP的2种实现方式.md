---
sidebar: 
 title: H5页面跳转APP的2种实现方式
 step: 1
 isTimeLine: true
title: H5页面跳转APP的2种实现方式
tags:
 - 项目
categories:
 - 项目
---


# H5 页面跳转APP的 2 种实现方式

## 前言
实际开发中，APP和 H5 往往有很多业务场景需要来回跳转，这里主要介绍2种跳转方式供大家参考。

## 微信内部 - wx-open-launch-weapp 微信开放标签
要想使用这个开放标签，必须先接入 wx-sdk，接入的过程如下[点击查看](https://icodehub.top/blob/project/h5%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8E%A5%E5%85%A5.html#wx-sdk-%E6%B3%A8%E5%85%A5%E5%92%8C%E4%BD%BF%E7%94%A8)

然后申请所需开放标签

```js
wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
  appId: '', // 必填，公众号的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [], // 必填，需要使用的JS接口列表
  openTagList: ['wx-open-launch-weapp'] // 可选，需要使用的开放标签列表
});
```

接入完成之后，我们就可以使用这个标签了，我们用官方例子来展示

```html
<wx-open-launch-weapp
  id="launch-btn"
  appid="wx12345678"
  path="pages/home/index?user=123&action=abc"
>
 <button class="btn">打开小程序</button>
</wx-open-launch-weapp>
<script>
  var btn = document.getElementById('launch-btn');
  btn.addEventListener('launch', function (e) {
    console.log('success');
  });
  btn.addEventListener('error', function (e) {
    console.log('fail', e.detail);
  });
</script>
```

其他涉及我们可以去官方链接去看：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html#%E8%B7%B3%E8%BD%AC%E5%B0%8F%E7%A8%8B%E5%BA%8F%EF%BC%9Awx-open-launch-weapp

## 微信外部 - URL Scheme

URL Scheme 的格式通常为 `[scheme]://[host]/[path]?[query]`，具体的内容需要在 H5 端和 App 端进行协调设置和处理。例如，微信扫一扫的 URL Scheme 是 `weixin://dl/sca`

在实际流程中，使用 URL Scheme 来跳转 App 的具体步骤如下：

- 配置 App 端：App 开发者需要在 App 中配置相应的 URL Scheme。
- H5 端触发跳转：H5 页面可以通过 `a` 链接点击、嵌入 `iframe` 进行跳转，或者在页面中执行 JavaScript 进行路径跳转等方式来触发跳转。
- 注意微信环境：如果在微信内打开 H5 页面，需要提醒用户去使用其他浏览器打开，因为微信对 URL Scheme 的跳转做了限制。(用上述方法)

总的来说，URL Scheme 是一种通用的跳转方案，不仅适用于 H5 跳转到 App，也适用于其他场景。

示例代码：

```vue
<template>
 <el-button @click="jumpToApp">点击跳转至 APP</el-button>
</template>

<script setup lang="ts">
const jumpToApp = () => {
  window.location.href = 'alipays://platformapi/startapp';
}
</script>
```

## 总结
- 微信内部：使用微信开放标签，可以无需配置 App 端，直接在 H5 页面中嵌入标签即可实现跳转。
- 微信外部：使用 URL Scheme，需要配置 App 端，并在 H5 页面中嵌入 `a` 链接或 `iframe` 进行跳转。



<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸
