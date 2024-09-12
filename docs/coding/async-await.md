---
sidebar:
  title: async await 实现
  step: 1
  isTimeLine: true
title: async await 实现
tags:
  - 手撕代码
categories:
  - 手撕代码
---

# async await 实现

## 理解 generator

理解 async 函数需要先理解 Generator 函数，因为`async函数是Generator函数的语法糖`。

### 1.认识 generator

```js
function* fn() {
  console.log(1);
  yield 1;
  console.log(2);
  yield 2;
  console.log(3);
  yield 3;
}
const gen = fn(); //获得一个generator实例
const a = gen.next();
const b = gen.next();
const c = gen.next();
console.log(a, b, c);
```

Generator 函数是一个普通函数，但是有两个特征。

一是，`function`关键字与函数名之间有一个星号；

二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

**注意点:**

1.调用 fn 返回一个 generator 实例

2.generator 实例拥有 next 方法,=>`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

### 2.调用 next()方法返回的值

可知调用 next()方法返回的还是一个**对象 Object{value:指的是 yield 的值,done:表示 fn 函数是否执行完毕}**

```js
{
  value: 1,
  done: false,
}
```

### 3.用 generator 模拟实现 async await --简单实现

```js
// async await 模拟实现
let times = 0;
function ajax() {
  return new Promise((resolve) => {
    setTimeout(() => {
      times++;
      resolve(`这是第次${times}请求`);
    }, 2000);
  });
}
// generator
function* fn() {
  yield ajax();
  yield ajax();
  yield ajax();
}

//  由于函数是自执行函数,那么下面将函数改为自执行函数
(function () {
  //递归+promise+generator实现  async await 模拟实现
  const gen = fn();
  // console.log(gen); //fn {<suspended>}
  function auto() {
    let res = gen.next(); // gen.next();会返回一个对象  {value:指的是yield的值,done:表示fn函数是否执行完毕}
    if (res.done) return;
    res.value.then((data) => {
      //成功
      console.log(data);
      auto(); //递归成功回调
    });
  }
  auto();
})();
```

## async await 完整实现

```js
function asyncToGenerator(generatorFunc) {
  // 返回的是一个新的函数
  return function () {
    // 先调用generator函数 生成迭代器
    // 对应 var gen = testG()
    const gen = generatorFunc.apply(this, arguments);

    // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
    // var test = asyncToGenerator(testG)
    // test().then(res => console.log(res))
    return new Promise((resolve, reject) => {
      // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
      // key有next和throw两种取值，分别对应了gen的next和throw方法
      // arg参数则是用来把promise resolve出来的值交给下一个yield
      function step(key, arg) {
        let generatorResult;

        // 这个方法需要包裹在try catch中
        // 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }

        // gen.next() 得到的结果是一个 { value, done } 的结构
        const { value, done } = generatorResult;

        if (done) {
          // 如果已经完成了 就直接resolve这个promise
          // 这个done是在最后一次调用next后才会为true
          // 以本文的例子来说 此时的结果是 { done: true, value: 'success' }
          // 这个value也就是generator函数最后的返回值
          return resolve(value);
        } else {
          // 除了最后结束的时候外，每次调用gen.next()
          // 其实是返回 { value: Promise, done: false } 的结构，
          // 这里要注意的是Promise.resolve可以接受一个promise为参数
          // 并且这个promise参数被resolve的时候，这个then才会被调用
          return Promise.resolve(
            // 这个value对应的是yield后面的promise
            value
          ).then(
            // value这个promise被resove的时候，就会执行next
            // 并且只要done不是true的时候 就会递归的往下解开promise
            // 对应gen.next().value.then(value => {
            //    gen.next(value).value.then(value2 => {
            //       gen.next()
            //
            //      // 此时done为true了 整个promise被resolve了
            //      // 最外部的test().then(res => console.log(res))的then就开始执行了
            //    })
            // })
            function onResolve(val) {
              step("next", val);
            },
            // 如果promise被reject了 就再次进入step函数
            // 不同的是，这次的try catch中调用的是gen.throw(err)
            // 那么自然就被catch到 然后把promise给reject掉啦
            function onReject(err) {
              step("throw", err);
            }
          );
        }
      }
      step("next");
    });
  };
}
```

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
