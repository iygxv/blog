---
top: 2
sticky: 999

sidebar: 
 title: app 与 h5 交互
 step: 1
 isTimeLine: true
title: app 与 h5 交互
tags:
 - 项目
categories:
 - 项目
---

# app 与 h5 交互

## 简介
h5 与原生 app 的交互，本质上说，就是两种调用：
- app 调用 h5 的代码
- h5 调用 app 的代码

## app 调用 h5 的代码
因为 app 是宿主，可以直接访问 h5，所以这种调用比较简单，就是在 h5 中曝露一些全局对象（包括方法）

`展示代码如下：`
```js
window.app = {
  name: 'app',
  version: '1.0.0',
  // app 的方法
  open: function() {
    // ...
  }
}
```



## h5 调用 app 的代码
因为 h5 不能直接访问宿主 app，所以这种调用就相对复杂一点

这种调用常用有两种方式：
- 由 app 向 h5 注入一个全局 js 对象，然后在 h5 直接访问这个对象

- 由 h5 发起一个自定义协议请求，app拦截这个请求后，再由app调用 h5 中的回调函数

这里主要讲第一种方式:  由 app 向 h5 注入一个全局 js 对象，然后在 h5 直接访问这个对象

### app 向 h5 注入一个全局 js 对象

`安卓相关代码：`
```java
webview.addJavascriptInterface(new Object() {

  @JavascriptInterface
  public int double(value) {
    return value * 2;
  }

  @JavascriptInterface
  public int triple(value) {
    return value * 3;
  }

}, "appSdk");
```

`ios相关代码：`
```swift
NSString *scripts = @"window.appSdk = {double: value => value * 2, triple: value => value * 3}";

[webview stringByEvaluatingJavaScriptFromString:scripts];
```

`前端相关代码：`
```js
 /**
   * 封装调用客户端提供给前端的方法
   * @param   {String}   methodName   调用方法名
   * @param   {String}   methodParam  调用方法的参数
   * @param   {String}   androidJsObj android 提供的对象名 
   * @return  {Any}                   返回值
   */
 function callMethod(methodName, methodParam = null, androidJsObj = 'appSdk') {
  let value;
  if (app) {
    if (ios && window.webkit?.messageHandlers?.[methodName]) {
      value = window.webkit.messageHandlers[methodName].postMessage(methodParam);
    } else if (android) {
      if (window[androidJsObj] && typeof window[androidJsObj] === 'object' && window[androidJsObj][methodName]) {
        if (methodParam) {
          typeof methodParam === 'object' && (methodParam = JSON.stringify(methodParam));
          value = window[androidJsObj][methodName](methodParam);
        } else {
          value = window[androidJsObj][methodName]();
        }
      }
    }
  }
  return value;
}

let ret = callMethod('double', 4) // 这样调起来就行了
```
