---
sidebar:
  title: 精度问题导致的线上bug
  step: 1
  isTimeLine: true
title: 精度问题导致的线上bug
tags:
  - 项目
categories:
  - 项目
---

# 精度问题导致的线上 bug

## 问题

服务端返回的数据 id（10976458979374927），超出 `Number` 类型范围，导致的精度丢失问题的

## 精度丢失问题

在 JavaScript 中，Number 类型范围 `-2^53 + 1` 到 `2^53 - 1`

ES6 引入了 `Number.MAX_SAFE_INTEGER` 和 `Number.MIN_SAFE_INTEGER` 这两个常量，用来表示这个范围的上下限。

`Number.isSafeInteger()`用来判断一个整数是否落在这个范围之内。

```js
Number.isSafeInteger(10976458979374927); // false
Number.isSafeInteger(10976458979374928); // false
Number.isSafeInteger(10976458979374929); // false
```

为啥后端的数据没有问题呢？

在 Java 中 Long 类型的取值范围是 `-2^63 + 1` 到 `2^63 - 1` , 比 JavaScript 中大很多，所以后端能正常处理。

综上所述：服务端返回的数据 id（10976458979374927），超出 `Number` 类型范围，导致的精度丢失，导致请求接口是拿不到相应的数据，导致的线上问题

## 解决方案

处理方案：后端处理

- 数据库中存的就是数值型，修改数据库存的类型为字符串
- 返回接口时转为字符串类型给前端

## 前端处理

前端处理这边有 2 种方案：正则替换 + json 序列化处理

### 正则替换

如果我们使用的是 axios 请求数据，Axios 提供了自定义处理原始后端返回数据的 API：transformResponse , 可以这样处理：

```js
axios({
  method: method,
  url: url,
  data: data,
  transformResponse: [
    function (data) {
      // 将Long类型数据转换为字符串
      const convertedJsonString = data.replace(
        /"(\w+)":(\d{15,})/g,
        '"$1":"$2"'
      );
      return JSON.parse(convertedJsonString);
    },
  ],
});

// 假设后端返回的JSON数据如下：
const responseData = {
  id: 12345678901234567890, // 这是一个Long类型数据
  name: "sy",
};

// 处理过的json数据
console.log(responseData.id); // 这将输出字符串："12345678901234567890"
console.log(typeof responseData.id); // 这将输出 "string"
```

### json 序列化处理

我们可以借助`json-bigint`这个第三方包来处理。

`json-bigint` 中的 parse 方法会把超出 JS 安全整数范围的数字转为一个 `BigNumber` 类型的对象，对象数据是它内部的一个算法处理之后的，我们要做的就是在使用的时候转为字符串来使用。

通过启用 `storeAsString` 选项,可以快速将 `BigNumber` 转为字符串，代码如下：

```js
import JSONbig from "json-bigint";
axios({
  method: method,
  url: url,
  data: data,
  transformResponse: [
    function (data) {
      const JSONbigToString = JSONbig({ storeAsString: true }); // 将Long类型数据转换为字符串
      return JSONbigToString.parse(data);
    },
  ],
});

// 假设后端返回的JSON数据如下：
const responseData = {
  id: 12345678901234567890, // 这是一个Long类型数据
  name: "sy",
};

// 处理过的json数据
console.log(responseData.id); // 这将输出字符串："12345678901234567890"
console.log(typeof responseData.id); // 这将输出 "string"
```

## 总结

- 服务端返回的数据如果是 Long 类型太长可能会超出 `Number` 类型范围，导致精度丢失
- 导致的精度丢失后，需要后端进行处理
- 前端如果用 axios 请求数据，可以使用正则替换或者 json 序列化处理