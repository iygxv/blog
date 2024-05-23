---
sidebar: 
 title: 5 种 http 数据传输方式
 step: 1
 isTimeLine: true
title:  5 种 http 数据传输方式
tags:
 - Nest
categories:
 - Nest
---


# 5 种 http 数据传输方式

## 简介
对于前端来说，后端主要是提供 http 接口来传输数据，而这种数据传输的方式主要有 5 种：

- url param
- query
- form-urlencoded
- form-data
- json

## url param
我们可以把参数写在 url 中，比如：

```js
https://icodehub.top/api/list/1
```
这里的 1 就是路径中的参数（url param），服务端框架或者单页应用的路由都支持从 url 中取出参数。

### 代码展示

```js
async function urlParam() {
    const res = await axios.get('/api/role/1');
    console.log(res);            
}
urlParam();
```

## query
query 是 通过 url 中 ？后面的用 & 分隔的字符串传递数据。比如：

```js
https://icodehub.top/api/list?name=sy&age=16
```
这里的 name 和 age 就是 query 传递的数据。

其中非英文的字符和一些特殊字符要经过编码，可以使用 encodeURIComponent 的 api 来编码：

```js
const query = "?name=" + encodeURIComponent('随缘') + "&age=18"
// ?name=%E9%9A%8F%E7%BC%98&age=18
```
或者使用封装了一层的 query-string 库来处理。

```js
const queryString = require('query-string');
queryString.stringify({
  name: '随缘',
  age: 18
});

// ?name=%E9%9A%8F%E7%BC%98&age=18
```

### 代码展示
```js
query 方式
async function query() {
    const res = await axios.get('/api/role/find', {
        params: {
            name: 'sy',
            age: 18
        }
    });
    console.log(res);
}
query();
```



## form-urlencoded

直接用 form 表单提交数据就是这种，它和 query 字符串的方式的区别只是放在了 body 里，然后指定下 content-type 是 `application/x-www-form-urlencoded`

因为内容也是 query 字符串，所以也要用 encodeURIComponent 的 api 或者 query-string 库处理下。

这种格式也很容易理解，get 是把数据拼成 query 字符串放在 url 后面，于是表单的 post 提交方式的时候就直接用相同的方式把数据放在了 body 里。

通过 & 分隔的 form-urlencoded 的方式需要对内容做 url encode，如果传递大量的数据，比如上传文件的时候就不是很合适了，因为文件 encode 一遍的话太慢了，这时候就可以用 form-data。

### 代码展示

```js
async function formUrlEncoded() {
    const res = await axios.post('/api/role', Qs.stringify({
        name: 'sy',
        age: 18
    }), {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    });
    console.log(res);
}
formUrlEncoded();
```

## form-data
form data 不再是通过 & 分隔数据，而是用 --------- + 一串数字做为 boundary 分隔符。因为不是 url 的方式了，自然也不用再做 url encode。

form-data 需要指定 content type 为 multipart/form-data，然后指定 boundary 也就是分割线。

body 里面就是用 boundary 分隔符分割的内容。

很明显，这种方式适合传输文件，而且可以传输多个文件。

但是毕竟多了一些只是用来分隔的 boundary，所以请求体会增大。


### 代码展示
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
        const fileInput = document.querySelector('#fileInput');

        async function formData() {
            const data = new FormData();
            data.set('name', 'sy');
            data.set('age', 18);
            data.set('file1', fileInput.files[0]);
            data.set('file2', fileInput.files[1]);

            const res = await axios.post('/api/role/file', data, {
                headers: { 'content-type': 'multipart/form-data' }
            });
            console.log(res);
        }

        fileInput.onchange = formData;
    </script>
</body>
```





## json
form-urlencoded 需要对内容做 url encode，而 form data 则需要加很长的 boundary，两种方式都有一些缺点。如果只是传输 json 数据的话，不需要用这两种。

可以直接指定content type 为 application/json 就行：

### 代码展示
```js
async function json() {
    const res = await axios.post('/api/role', {
        name: 'sy',
        age: 18
    });
    console.log(res);     
}
json();
```

## 相关后端Nest代码

https://github.com/iygxv/nest-study/tree/main/five-transmission-method



<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸