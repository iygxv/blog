---
sidebar:
 title: Promise API 实现
 step: 3
 isTimeLine: true
title: Promise API 实现
tags:
 - 手撕代码
categories:
 - 手撕代码
---


# Promise 的全部API
官方 Promise 还有很多API,除了已经实现的核心`then`方法,还有 两个实例方法
- Promise.prototype.catch
- Promise.prototype.finally



以及目前 Promise 规范的 六个静态方法：

- Promise.resolve()
- Promise.reject
- Promise.all
- Promise.allSettled
- Promise.any
- Promise.race

[MDN中Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## 实现 Promise.resolve

[MDN描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

**Promise.resolve(value)** 将给定的一个值转为Promise对象。

- 如果这个值是一个 promise ，那么将返回这个 promise ；

- 如果这个值是thenable（即带有`"then" `方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；

- 否则返回的promise将以此值完成，即以此值执行`resolve()`方法 (状态为fulfilled)。

**返回值**

返回一个带着给定值解析过的 `Promise` 对象，如果参数本身就是一个 `Promise` 对象，则直接返回这个 `Promise` 对象。

```js
/**
 * Promise.resolve()
 * @param {[type]} value 要解析为 Promise 对象的值 
 */
Promise.resolve = function (value) {
  // 如果这个值是一个 promise ，那么将返回这个 promise 
  if (value instanceof Promise) {
    return value;
  } else if (value instanceof Object && 'then' in value) {
    // 如果这个值是thenable（即带有`"then" `方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；
    return new Promise((resolve, reject) => {
      value.then(resolve, reject);
    })
  }

  // 否则返回的promise将以此值完成，即以此值执行`resolve()`方法 (状态为fulfilled)
  return new Promise((resolve) => {
    resolve(value)
  })
}

```



## 实现 Promise.reject

[MDN描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

`Promise.reject()`方法返回一个带有拒绝原因的`Promise`对象

**返回值**

一个给定原因了的被拒绝的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

```js
Promise.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}
```



## 实现 Promise.prototype.catch

[MDN描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

`catch()` 方法返回一个`Promise`，并且处理拒绝的情况。它的行为与调用`Promise.prototype.then(undefined, onRejected)` 相同。

事实上, calling `obj.catch(onRejected)` 内部calls `obj.then(undefined, onRejected)`。(这句话的意思是，我们显式使用`obj.catch(onRejected)`，内部实际调用的是`obj.then(undefined, onRejected)`)

`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

```js
Promise.prototype.catch = function(onRejected) {
  return this.then(undefined, onRejected)
}
```



## 实现 Promise.prototype.finally
理解: `无论promise的结果是fulfilled或者是rejected, 都会执行一次回调`

[MDN描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

`finally() ` 方法返回一个`Promise`。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在`Promise`是否成功完成后都需要执行的代码提供了一种方式。

这避免了同样的语句需要在`then()`和`catch()`中各写一次的情况。该方法是 ES2018 引入标准的。

**由于无法知道promise的最终状态，所以`finally`的回调函数中不接收任何参数，它仅用于无论最终结果如何都要执行的情况。**

```js
Promise.prototype.finally = function(callBack) {
   return this.then(callBack, callBack)
}
```



## 实现 Promise.all
理解: `除非所有promise结果都成功, 才返回成功的结果, 如果有失败的就直接返回失败的结果`

[MDN描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

`Promise.all()` 方法接收一个`promise`的`iterable`类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个`Promise`实例， 输入的所有`promise`的`resolve`回调的结果是一个数组。



- `Promise.all` 等待所有都完成（或第一个失败）

- 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise

- 如果参数中包含非 promise 值，这些值将被忽略，但仍然会被放在返回数组中，如果 promise 完成的话 `(也就是如果参数里的某值不是Promise，则需要原样返回在数组里)`

- 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组，它包含所有的传入迭代参数对象的值（也包括非 promise 值）。

- 如果传入的 promise 中有一个失败（rejected），Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成

**返回值**

- 如果传入的参数是一个空的可迭代对象，则返回一个**已完成（already resolved）状态的** [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。
- 如果传入的参数不包含任何 `promise`，则返回一个**异步完成（asynchronously resolved）** [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。注意：Google Chrome 58 在这种情况下返回一个**已完成（already resolved）状态的** [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。
- 其它情况下返回一个**处理中（pending）**的[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。这个返回的 `promise` 之后会在所有的 `promise` 都完成或有一个 `promise` 失败时**异步**地变为完成或失败。 见下方关于“Promise.all 的异步或同步”示例。返回值将会按照参数内的 `promise` 顺序排列，而不是由调用 `promise` 的完成顺序决定。

```js
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    // 参数校验
    if (Array.isArray(promises)) {
      let result = []; // 存储结果
      let count = 0; // 计数器

      // 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise
      if (promises.length === 0) {
        return resolve(promises);
      }

      promises.forEach((item, index) => {
        // Promise.resolve方法中已经判断了参数是否为promise与thenable对象，所以无需在该方法中再次判断
        Promise.resolve(item).then(
          value => {
            count++;
            // 每个promise执行的结果存储在result中
            result[index] = value;
            // Promise.all 等待所有都完成（或第一个失败）
            count === promises.length && resolve(result);
          },
          reason => {
            /**
             * 如果传入的 promise 中有一个失败（rejected），
             * Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成
             */
            reject(reason);
          }
        )
      })
    } else {
      return reject(new TypeError('Argument is not iterable'))
    }
  })
}
```



## 实现 Promise.allSettled

理解: `返回所有promise的结果`

[MDN描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

该`Promise.allSettled()`方法返回一个在所有给定的 promise 都已经`fulfilled`或`rejected`后的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果。

当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个`promise`的结果时，通常使用它。

相比之下，`Promise.all()` 更适合彼此相互依赖或者在其中任何一个`reject`时立即结束。

**返回值**

一旦所指定的 promises 集合中每一个 promise 已经完成，无论是成功的达成或被拒绝，**未决议的** [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)将被**异步**完成。那时，所返回的 promise 的处理器将传入一个数组作为输入，该数组包含原始 promises 集中每个 promise 的结果。

对于每个结果对象，都有一个 `status` 字符串。如果它的值为 `fulfilled`，则结果对象上存在一个 `value` 。如果值为 `rejected`，则存在一个 `reason` 。value（或 reason ）反映了每个 promise 决议（或拒绝）的值。

```js
Promise.allSettled = function(promises) {
  return new Promise((resolve, reject) => {
    // 参数校验
    if (Array.isArray(promises)) {
      let result = []; // 存储结果
      let count = 0; // 计数器

      // 如果传入的是一个空数组，那么就直接返回一个resolved的空数组promise对象
      if (promises.length === 0) return resolve(promises);

      promises.forEach((item, index) => {
        // 非promise值，通过Promise.resolve转换为promise进行统一处理
        Promise.resolve(item).then(
          value => {
            count++;
            // 对于每个结果对象，都有一个 status 字符串。如果它的值为 fulfilled，则结果对象上存在一个 value 。
            result[index] = {
              status: 'fulfilled',
              value
            }
            // 所有给定的promise都已经fulfilled或rejected后,返回这个promise
            count === promises.length && resolve(result);
          },
          reason => {
            count++;
            /**
             * 对于每个结果对象，都有一个 status 字符串。如果值为 rejected，则存在一个 reason 。
             * value（或 reason ）反映了每个 promise 决议（或拒绝）的值。
             */
            result[index] = {
              status: 'rejected',
              reason
            }
            // 所有给定的promise都已经fulfilled或rejected后,返回这个promise
            count === promises.length && resolve(result);
          }
        )
      })
    } else {
      return reject(new TypeError('Argument is not iterable'))
    }
  })
}
```



## 实现 Promise.any

理解: `只要有成功就返回成功的promise结果, 果可迭代对象中没有一个 promise 成功，就返回一个失败的 promise 和AggregateError类型的实例`

[MDN描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

**本质上，这个方法和Promise.all()是相反的。**

`Promise.any()` 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。

如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise 和`AggregateError`类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。

**返回值**

- 如果传入的参数是一个空的可迭代对象，则返回一个 **已失败（already rejected）** 状态的 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。
- 如果传入的参数不包含任何 `promise`，则返回一个 **异步完成** （**asynchronously resolved**）的 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。
- 其他情况下都会返回一个**处理中（pending）** 的 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。 只要传入的迭代对象中的任何一个 `promise` 变成成功（resolve）状态，或者其中的所有的 `promises` 都失败，那么返回的 `promise` 就会 **异步地**（当调用栈为空时） 变成成功/失败（resolved/reject）状态。

```js
Promise.any = function(promises) {
  return new Promise((resolve, reject) => {
    // 参数校验
    if (Array.isArray(promises)) {
      let errors = []; // 
      let count = 0; // 计数器

      // 如果传入的参数是一个空的可迭代对象，则返回一个 已失败（already rejected） 状态的 Promise。
      if (promises.length === 0) return reject(new AggregateError([], 'All promises were rejected'));

      promises.forEach(item => {
        // 非Promise值，通过Promise.resolve转换为Promise
        Promise.resolve(item).then(
          value => {
            // 只要其中的一个 promise 成功，就返回那个已经成功的 promise 
            resolve(value);
          },
          reason => {
            count++;
            errors.push(reason);
            /**
             * 如果可迭代对象中没有一个 promise 成功，就返回一个失败的 promise 和AggregateError类型的实例，
             * AggregateError是 Error 的一个子类，用于把单一的错误集合在一起。
             */
            count === promises.length && reject(new AggregateError(errors, 'All promises were rejected'));
          }
        )
      })
    } else {
      return reject(new TypeError('Argument is not iterable'))
    }
  })
}
```



## 实现 Promise.race()
理解: `返回第一个的promise的结果(谁快谁先返回)`

[MDN描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

**`Promise.race(iterable)`** 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。

- `race` 函数返回一个 `Promise`，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。

- 如果传的迭代是空的，则返回的 promise 将永远等待。

- 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则` Promise.race` 将解析为迭代中找到的第一个值。

**返回值**

一个**待定的** [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 只要给定的迭代中的一个 promise 解决或拒绝，就采用第一个 promise 的值作为它的值，从而**异步**地解析或拒绝（一旦堆栈为空）。

```js
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    // 参数校验
    if (Array.isArray(promises)) {
      // 如果传入的迭代promises是空的，则返回的 promise 将永远等待。
      if (promises.length > 0) {
        promises.forEach(item => {
          /**
           * 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，
           * 则 Promise.race 将解析为迭代中找到的第一个值。
           */
          Promise.resolve(item).then(resolve, reject);
        })
      }
    } else {
      return reject(new TypeError('Argument is not iterable'))
    }
  })
}
```



<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸
