# then的链式调用

昨天我们写到了`promise`的构造函数与`then`的基本用法, 今天来写`then`的链式调用

## 注意点

1. **怎么样才能链式调用呢? then函数的结果返回一个promise**
2. **链式的调用需要用到递归**
3. **因为promise是先new 后在给值的,所以必须是异步,使用定时器**
4. **如果在函数内部中出现错误()  =>就是说     =>需要使用try catch来捕捉**

基于这三个点, 我们去实现`then`的链式调用吧

```js
function _Promise(executor) {
  // ...省略
  /**
   * then接受俩个函数 一个是成功的 一个失败的
   * @param {*} success 成功执行函数
   * @param {*} failure 失败执行函数
   */
   this.then = function (success, failure) {
        // 判断then的俩个参数
        success = typeof success === 'function' ? success : val => val;//是函数返回函数,不是函数返回值传给下面
        failure = typeof failure === 'function' ? failure : err => { throw err };//是函数返回函数,不是函数抛出err
        // 链式的调用需要使用到递归
        let promise = new _Promise((resolve, reject) => {
            // 判断当前状态
            if (this.status === RESOLVED) { // 当前成功的状态
                setTimeout(() => {
                    // 如果在函数内部中出现错误
                    try {
                        let x = success(this.val); //需要通x来存储上一个的值
                        // 然后执行解析promise函数
                        resolvePromise(promise, x, resolve, reject); //这里因为promise是先new 后在给值的,所以必须是异步,使用定时器
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === REJECTED) { //当前失败的状态
                setTimeout(() => {
                    try {
                        let x = failure(this.err);
                        resolvePromise(promise, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e)
                    }
                }, 0)
            }

            // 异步处理,也就是状态还是处于PENDING
            if (this.status === PENDING) {
                // 这时候就需要先把他们存起来,等异步玩在执行
                this.onRESOLVEDCbs.push(() => {
                    setTimeout(() => {
                        try {
                            let x = success(this.val);
                            resolvePromise(promise, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e)
                        }
                    }, 0)


                })
                this.onRejectedCbs.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failure(this.err)
                            resolvePromise(promise, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e)
                        }
                    }, 0)

                })

            }
        })
        return promise;

    }
}
```



## 核心resolvePromise函数

```js
/**
 *
 * @param {*} promise  promise.then方法返回的新的promise对象
 * @param {*} x    then函数执行返回的值  (promise或者值)
 * @param {*} resolve  成功回调
 * @param {*} reject   失败回到
 * @returns
 */
const resolvePromise = (promise, x, resolve, reject) => {
  // 首先,如果promise 和 x 是同一个promise
  if (promise === x) {
    throw new TypeError('TypeError')
  }
  // 如果 x 为 Promise ，则使 promise 接受 x 的状态
  if (x instanceof _Promise) {
    if (x.status === PENDING) {
      // x为等待态， promise 需保持为等待态直至 x 被执行或拒绝
      x.then(val => {
        resolvePromise(promise, val, resolve, reject)
      }, reject)
    }
    // x为成功态
    if (x.status === RESOLVED) {
      resolve(x.val)
    }
    // x为失败态
    if (x.status === REJECTED) {
      reject(x.err)
    }
  }
  // 如果x是一个函数或者是一个对象(类) 则是Promise
  else if (typeof x === 'function' || x instanceof Object) {
    // console.log(222);
    let called //内部测试的时候,会成功和失败都调用

    // new promise((resolve,reject)=>{
    // 在promise中抛出错误
    //    throw new Error...
    // })
    // 所以使用try catch
    try {
      // 是promise,就可以直接拿到它的then方法
      let then = x.then
      // 那么如果这个then方法是函数的话
      if (typeof then === 'function') {
        // 是函数,那么就执行函数,then函数接受俩个函数
        then.call(
          x,
          val => {
            // 把值往下传,但是如果这个值是一个promise,那么就递归resolvePromise再次解析(then调用之后就递归了)
            if (called) {
              // 多次调用了
              return
            }
            called = true //防止多次调用
            resolvePromise(promise, val, resolve, reject)
          },
          err => {
            reject(err)
          }
        )
      } else {
        // 不是函数,就说明是一个普通对象的属性,直接返回值就好
        if (called) {
          return
        }
        called = true //防止多次调用
        resolve(x)
      }
    } catch (e) {
      //  x.then 的值时抛出错误 e
      reject(e)
    }
  } else {
    //不是promise,就直接把值resolve出去
    resolve(x)
  }
}
```

