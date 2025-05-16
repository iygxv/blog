---
sidebar:
  title: 5月记
  step: 1
  isTimeLine: true
title: 5月记
tags:
  - 每月记
categories:
  - 每月记
---

# 5 月记

## 简介

这是属于我 5 月份收集的一些记录的知识

## Date API

- 创建 2023 年 7 月 30 日 日期对象
  ```js
  const date = new Date(2023, 7, 30);
  console.log(date); // Wed Aug 30 2023 00:00:00 GMT+0800 (中国标准时间)
  ```
- 转成当地日期格式的字符串显示
  ```js
  const date = new Date(2023, 7, 30);
  console.log(date.toLocaleString()); // 2023/8/30 00:00:00
  // 为什么是 8 月呢? 因为月份是从 0 开始的
  ```
- 获取上个月最后一天

  ```js
  // 获取上个月最后一天
  const date = new Date(2023, 7, 0);
  console.log(date.toLocaleString()); // 2023/7/31 00:00:00

  // 获取上个月倒数第二天
  const date1 = new Date(2023, 7, -1);
  console.log(date.toLocaleString()); // 2023/7/30 00:00:00
  ```

- 获取到每个月有多少天
  ```js
  // 拿到最后一天的日期
  new Date(2023, 5, 0).getDate(); // 31
  new Date(2023, 6, 0).getDate(); // 30
  new Date(2023, 7, 0).getDate(); // 31
  ```

## 5 种 http 数据传输方式

- url params

  ```js
  https://icodehub.top/api/list/1
  ```

  这里的 1 就是路径中的参数（url param）

- query

  ```js
  https://icodehub.top/api/list?page=1
  ```

  这里的 page 就是 query 传递的数据。

- form-urlencoded

  直接用 form 表单提交数据就是这种，它和 query 字符串的方式的区别只是放在了 body 里，然后指定下 content-type 是 `application/x-www-form-urlencoded`

  因为内容也是 query 字符串，所以也要用 encodeURIComponent 的 api 或者 query-string 库处理下。

  这种格式也很容易理解，get 是把数据拼成 query 字符串放在 url 后面，于是表单的 post 提交方式的时候就直接用相同的方式把数据放在了 body 里。

  通过 & 分隔的 form-urlencoded 的方式需要对内容做 url encode，如果传递大量的数据，比如上传文件的时候就不是很合适了，因为文件 encode 一遍的话太慢了，这时候就可以用 form-data。

  ```js
  async function formUrlEncoded() {
    const res = await axios.post(
      "/api/role",
      Qs.stringify({
        name: "sy",
        age: 18,
      }),
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }
    );
    console.log(res);
  }
  formUrlEncoded();
  ```

- form-data

  form data 不再是通过 & 分隔数据，而是用 --------- + 一串数字做为 boundary 分隔符。因为不是 url 的方式了，自然也不用再做 url encode。

  form-data 需要指定 content type 为 multipart/form-data，然后指定 boundary 也就是分割线。

  body 里面就是用 boundary 分隔符分割的内容。

  很明显，这种方式适合传输文件，而且可以传输多个文件。

  但是毕竟多了一些只是用来分隔的 boundary，所以请求体会增大。

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <script src="https://unpkg.com/qs@6.10.2/dist/qs.js"></script>
    </head>

    <body>
      <input id="fileInput" type="file" multiple />
      <script>
        const fileInput = document.querySelector("#fileInput");

        async function formData() {
          const data = new FormData();
          data.set("name", "sy");
          data.set("age", 18);
          data.set("file1", fileInput.files[0]);
          data.set("file2", fileInput.files[1]);

          const res = await axios.post("/api/role/file", data, {
            headers: { "content-type": "multipart/form-data" },
          });
          console.log(res);
        }

        fileInput.onchange = formData;
      </script>
    </body>
  </html>
  ```

- json

  form-urlencoded 需要对内容做 url encode，而 form data 则需要加很长的 boundary，两种方式都有一些缺点。如果只是传输 json 数据的话，不需要用这两种。

  可以直接指定 content type 为 application/json 就行：

  ```js
  async function json() {
    const res = await axios.post("/api/role", {
      name: "sy",
      age: 18,
    });
    console.log(res);
  }
  json();
  ```

## 如何删除项目中没有使用到的 package

可以采用 depcheck 来完成这件事

```shell
npm install depcheck -g
npx depcheck
Missing dependencies
* lodash
```

## width:100% 与 width:auto 有什么区别呢?

- width:100% : 子元素的 content 撑满父元素的 content，如果子元素还有 padding、border等属性，或者是在父元素上设置了边距和填充，都有可能会造成子元素区域溢出显示

- width:auto : 子元素的 content + padding + border + margin 等撑满父元素的 content 区域

## line-height:1 是什么意思呢?

其实是设置行高的一种方法，只不过简化了语句

举个例子，比如此时你设置了 font-size：20px，之后你设置了 line-height: 1，转义过来的意思就是 line-height: 20px

## 运行 npm run xxx 的时候发生了什么？

- 运行`npm run xxx`的时候，npm 会先在当前目录的 `node_modules/.bin` 查找要执行的程序，如果找到则运行
- 没有找到则从全局的 node_modules/.bin 中查找
- 如果全局目录还是没找到，那么就从 path 环境变量中查找有没有其他同名的可执行程序

详细请看：https://blog.51cto.com/u_15077533/4531157

## 软键盘弹出，视图放大

通过使用 `<meta name="viewport">` 解决问题，需要设置的内容：

- 默认视图宽度 为 设备宽度
- 默认缩放比为 1
- 最大、最小缩放比为 1
- 不允许用户手动缩放

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,minimum-scale=1,maximum-scale=1,user-scalable=no"
/>
```

详细请看：https://juejin.cn/post/7358375367340228659?utm_source=gold_browser_extension#heading-5

## 把 let [a, b, c] = { a: 1, b: 2, c: 3 } 成功解构

[把 let [a, b, c] = { a: 1, b: 2, c: 3 }给成功解构掉](https://juejin.cn/post/7374308419074146313#heading-4)

```js
Object.prototype[Symbol.iterator] = function () {
  return Object.values(this)[Symbol.iterator]();
};
let [a, b, c] = { a: 1, b: 2, c: 3 };
```

这样子能解构成功, 是因为在对象原型上添加数组迭代器

[去了解迭代器](https://github.com/iygxv/practice/tree/main/JavaScript/%E8%BF%AD%E4%BB%A3%E5%99%A8)