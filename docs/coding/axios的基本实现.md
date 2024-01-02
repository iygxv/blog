---
sidebar:
 title: axios 实现
 step: 1
 isTimeLine: true
title: axios 实现
tags:
 - 手撕代码
categories:
 - 手撕代码
---

# axios 的基本实现

## 一.**axios** 的理解和使用

### 1. axios 是什么?

1. **前端最流行的 ajax 请求库**

2. **react/vue 官方都推荐使用 axios 发 ajax 请求**

3. **文档: https://github.com/axios/axios**

### 2.axios 特点

1. **基于 xhr + promise 的异步 ajax 请求库**

2. **浏览器端/node 端都可以使用**

3. **支持请求／响应拦截器**

4. **支持请求取消**

5. **请求/响应数据转换**

6. **批量发送多个请求**

### 3. axios 常用语法

```js
// 通用/最本质的发任意类型请求的方式
axios(config):
// 可以只指定 url 发 get 请求
axios(url[, config]):
// 等同于 axios(config)
axios.request(config):
// 发 get 请求
axios.get(url[, config]):
// 发 delete 请求
axios.delete(url[, config]):
// 发 post 请求
axios.post(url[, data, config]):
// 发 put 请求
axios.put(url[, data, config]):
// 请求的默认全局配置
axios.defaults.xxx:
// 添加请求拦截器
axios.interceptors.request.use():
// 添加响应拦截器
axios.interceptors.response.use():

// 创建一个新的 axios实例(它没有下面的功能)
axios.create([config]):
// 用于创建取消请求的错误对象
axios.Cancel():
// 用于创建取消请求的 token 对象
axios.CancelToken():
// 是否是一个取消请求的错误
axios.isCancel():
// 用于批量执行多个异步请求
axios.all(promises):
// 用来指定接收所有成功数据的回调函数的方法
axios.spread():
```

### 4.难点语法的理解和使用

1. #### **axios.create(config)**

   1.1 根据指定配置创建一个新的 axios, 也就就每个新 axios 都有自己的配置

   1.2 新 axios 只是没有取消请求和批量发请求的方法, 其它所有语法都是一致的

   1.3 为什么要设计这个语法?

   ​ (1) 需求: 项目中有部分接口需要的配置与另一部分接口需要的配置不太一

   ​ 样, 如何处理

   ​ (2) 解决: 创建 2 个新 axios, 每个都有自己特有的配置, 分别应用到不同要

   ​ 求的接口请求中

2. #### **拦截器函数/ajax 请求/请求的回调函数的调用顺序**

   2.1 说明: 调用 axios()并不是立即发送 ajax 请求, 而是需要经历一个较长的流程

   2.2 流程: 请求拦截器 2 => 请求拦截器 1 => 发 ajax 请求 => 响应拦截器 1 => 响

   应拦截器 2 => 请求的回调

   2.3 注意: 此流程是通过 promise 串连起来的, 请求拦截器传递的是 config, 响应

   拦截器传递的是 response

   ```js
   axios.interceptors.request.use(function (config) {
       console.log('请求拦截器 成功 - 1');
       //修改 config 中的参数
       config.params = {a:100};

       return config;
   }, function (error) {
       console.log('请求拦截器 失败 - 1');
       return Promise.reject(error);
   });

   axios.interceptors.request.use(function (config) {
       console.log('请求拦截器 成功 - 2');
       //修改 config 中的参数
       config.timeout = 2000;
       return config;
   }, function (error) {
       console.log('请求拦截器 失败 - 2');
       return Promise.reject(error);
   });

   // 设置响应拦截器
   axios.interceptors.response.use(function (response) {
       console.log('响应拦截器 成功 1');
       return response.data;
       // return response;
   }, function (error) {
       console.log('响应拦截器 失败 1')
       return Promise.reject(error);
   });

   axios.interceptors.response.use(function (response) {
       console.log('响应拦截器 成功 2')
       return response;
   }, function (error) {
       console.log('响应拦截器 失败 2')
       return Promise.reject(error);
   });

   //发送请求
   axios({
       method: 'GET',
       url: 'xxx'
   }).then(response => {
       console.log('处理成功的结果');
   });

   //顺序为
   请求拦截器2 => 请求拦截器1 => 发ajax请求 => 响应拦截器1 => 响应拦截器 2 => 请求的回调

   //为什么是这样的顺序呢?
   因为请求拦截的时候是通过unshift将config加入进去的chain中
   响应拦截的时候是通过push将config加入进去的chain中

   ```

3. #### **取消请求**

   3.1 基本流程

   配置 cancelToken 对象

   缓存用于取消请求的 cancel 函数

   在后面特定时机调用 cancel 函数取消请求

   在错误回调中判断如果 error 是 cancel, 做相应处理

   ```js
   //2.声明全局变量
   let cancel = null;

   //检测上一次的请求是否已经完成
   if(cancel !== null){
       //取消上一次的请求
       cancel();
   }
   axios(
       //1. 添加配置对象的属性
       cancelToken: new axios.CancelToken(function(c){
           //3. 将 c 的值赋值给 cancel
           cancel = c;
       })
   }).then(response => {
       console.log(response);
       //将 cancel 的值初始化
       cancel = null;
   })
   ```

## 二.实现简单版 axios

简单版的 axios 主要实现几个部分

- axios 的由来
- axios 发送请求
- axios 拦截器
- axios 请求取消

通过实现 axios 核心部分来了解 axios

### 1.axios 的由来

```js
// 创建Axios构造函数
function Axios() {
  //构造函数有
  this.defaults = {} //默认配置
  this.interceptors = {
    //拦截器
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}
// 原型上的方法
Axios.prototype.request = function (config) {
  // request方法为发送请求的核心方法
}
Axios.prototype.get = function (config) {
  return this.request({
    methods: 'GET'
  })
}
Axios.prototype.post = function (config) {
  return this.request({
    methods: 'POST'
  })
}

// 1.声明函数
function createInstance(config) {
  //创建axios实例
  let context = new Axios(config)
  //创建请求函数
  let instance = Axios.prototype.request.bind(context)

  //将 Axios.prototype 对象中的方法添加到instance函数对象中,这样子就可以使用axios.get(...)
  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key].bind(context)
  })

  //将默认配置放过来
  Object.keys(context).forEach(key => {
    instance[key] = context[key]
  })
  return instance
}

//将axios暴露出去
let axios = createInstance()
window.axios = axios
```

上面先创建了 Axios 的构造函数,存放一些默认配置,例如:默认`配置项defaults`,`拦截器`

添加原型上的方法 request

### 2.axios 发送请求

```js
// axios 发送请求   axios  Axios.prototype.request  bind
//1. 声明构造函数
function Axios(config) {
  this.config = config
}
Axios.prototype.request = function (config) {
  //发送请求
  //创建一个 promise 对象
  let promise = Promise.resolve(config)
  //声明一个数组
  let chains = [dispatchRequest, undefined] // undefined 占位
  //调用 then 方法指定回调
  let result = promise.then(chains[0], chains[1])
  //返回 promise 的结果
  return result
}

//2. dispatchRequest 函数
function dispatchRequest(config) {
  //调用适配器发送请求
  return xhrAdapter(config).then(
    response => {
      //响应的结果进行转换处理
      //....
      return response
    },
    error => {
      throw error
    }
  )
}

//3. adapter 适配器
function xhrAdapter(config) {
  console.log('xhrAdapter 函数执行')
  return new Promise((resolve, reject) => {
    //发送 AJAX 请求
    let xhr = new XMLHttpRequest()
    //初始化
    xhr.open(config.method, config.url)
    //发送
    xhr.send()
    //绑定事件
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        //判断成功的条件
        if (xhr.status >= 200 && xhr.status < 300) {
          //成功的状态
          resolve({
            //配置对象
            config: config,
            //响应体
            data: xhr.response,
            //响应头
            headers: xhr.getAllResponseHeaders(), //字符串  parseHeaders
            // xhr 请求对象
            request: xhr,
            //响应状态码
            status: xhr.status,
            //响应状态字符串
            statusText: xhr.statusText
          })
        } else {
          //失败的状态
          reject(new Error('请求失败 失败的状态码为' + xhr.status))
        }
      }
    }
  })
}

//4. 创建 axios 函数
let axios = Axios.prototype.request.bind(null)
axios({
  method: 'GET',
  url: 'http://localhost:3000/posts'
}).then(response => {
  console.log(response)
})
```

发送请求的核心是: 调用了 XMLHttpRequest 对象

dispatchRequest 函数是处理转换结果的

### 3.axios 拦截器

```js
//构造函数
function Axios(config) {
  this.config = config
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}
//发送请求  难点与重点
Axios.prototype.request = function (config) {
  //创建一个 promise 对象
  let promise = Promise.resolve(config)
  //创建一个数组
  const chains = [dispatchRequest, undefined]
  //处理拦截器
  //请求拦截器 将请求拦截器的回调 压入到 chains 的前面  request.handles = []
  this.interceptors.request.handlers.forEach(item => {
    chains.unshift(item.fulfilled, item.rejected)
  })
  //响应拦截器
  this.interceptors.response.handlers.forEach(item => {
    chains.push(item.fulfilled, item.rejected)
  })

  // console.log(chains);
  //遍历
  while (chains.length > 0) {
    promise = promise.then(chains.shift(), chains.shift())
  }

  return promise
}

//发送请求
function dispatchRequest(config) {
  //返回一个promise 队形
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      statusText: 'OK'
    })
  })
}

//创建实例
let context = new Axios({})
//创建axios函数
let axios = Axios.prototype.request.bind(context)
//将 context 属性 config interceptors 添加至 axios 函数对象身上
Object.keys(context).forEach(key => {
  axios[key] = context[key]
})

//拦截器管理器构造函数
function InterceptorManager() {
  this.handlers = []
}
InterceptorManager.prototype.use = function (fulfilled, rejected) {
  this.handlers.push({
    fulfilled,
    rejected
  })
}
```

请求响应拦截核心为; chains 数组,会将所有的请求响应拦截都放入进去

多个请求拦截器,会优先后面的,因为`使用unshift将请求拦截器的回调 压入到 chains 的前面`

而多个响应拦截器,会优先前面的,因为`使用push将请求拦截器的回调 压入到 chains 的后面`

### 4.axios 请求取消

```js
//构造函数
function Axios(config) {
  this.config = config
}
//原型 request 方法
Axios.prototype.request = function (config) {
  return dispatchRequest(config)
}
//dispatchRequest 函数
function dispatchRequest(config) {
  return xhrAdapter(config)
}
//xhrAdapter
function xhrAdapter(config) {
  //发送 AJAX 请求
  return new Promise((resolve, reject) => {
    //实例化对象
    const xhr = new XMLHttpRequest()
    //初始化
    xhr.open(config.method, config.url)
    //发送
    xhr.send()
    //处理结果
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        //判断结果
        if (xhr.status >= 200 && xhr.status < 300) {
          //设置为成功的状态
          resolve({
            status: xhr.status,
            statusText: xhr.statusText
          })
        } else {
          reject(new Error('请求失败'))
        }
      }
    }
    //关于取消请求的处理
    if (config.cancelToken) {
      //对 cancelToken 对象身上的 promise 对象指定成功的回调
      config.cancelToken.promise.then(value => {
        xhr.abort()
        //将整体结果设置为失败
        reject(new Error('请求已经被取消'))
      })
    }
  })
}

//创建 axios 函数
const context = new Axios({})
const axios = Axios.prototype.request.bind(context)

//CancelToken 构造函数
function CancelToken(executor) {
  //声明一个变量
  var resolvePromise
  //为实例对象添加属性
  this.promise = new Promise(resolve => {
    //将 resolve 赋值给 resolvePromise
    resolvePromise = resolve
  })
  //调用 executor 函数
  executor(function () {
    //执行 resolvePromise 函数
    resolvePromise()
  })
}
```

请求取消的一个核心: xhr.abort 方法

使用方法见上面
