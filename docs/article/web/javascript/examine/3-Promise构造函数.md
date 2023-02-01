# Promise
如何写Promise呢, 我们必须要写对它有一定的了解
## 描述
- promise共有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
- Promise构造函数接受一个函数执行器(executor)作为参数, 该函数的两个参数分别是resolve和reject
- then接受俩个函数 一个是成功的 一个失败的

## 实现promise构造函数

````js
// 三种状态：`pending`（进行中）、`fulfilled使用resolve来表示`（已成功）和`rejected`（已失败）
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

/**
 *  Promise`构造函数接受一个函数执行器(executor)作为参数, 该函数的两个参数分别是`resolve`和`reject
 * @param {*} executor 函数执行器 
 */
function _Promise(executor) {
  this.status = PENDING; //初始状态
  this.val = undefined;//存储成功的值
  this.err = undefined;//存储失败的值

  this.onResolvedCbs = []; //存储因为异步的成功回调
  this.onRejectedCbs = []; //存储因为异步的失败回调


  let resolve = (val) => {//成功的触发
    //状态一旦改变,无法再次改变状态了
    if (this.status === PENDING) {
      this.val = val; // val指的是resolve(val)中val的值
      this.status = RESOLVED; //变为成功态
      //循环遍历执行存储异步的回调(等待真正触发的时候执行回调)
      this.onResolvedCbs.forEach(fn => fn())
    }

  };
  let reject = (err) => {//失败的触发
    if (this.status === PENDING) {
      this.err = err;
      this.status = REJECTED; //变为失败态
      //循环遍历执行存储异步的回调
      this.onRejectedCbs.forEach(fn => fn())
    }
  };

  try {
    executor(resolve, reject);
  } catch (e) {
    //刚开始就抛出了错误,也就是失败
    reject(e);
  }
}
````

## 实现then方法

```js
function _Promise(executor) {
  // ...省略
  /**
   * then接受俩个函数 一个是成功的 一个失败的
   * @param {*} success 成功执行函数
   * @param {*} failure 失败执行函数
   */
  this.then = function(success, failure) {
    //判断当前状态
    if (this.status === RESOLVED) { //当前成功的状态
        success(this.val);
    }
    if (this.status === REJECTED) { //当前失败的状态
        failure(this.err)
    }

    //异步处理,也就是状态还是处于PENDING
    if (this.status === PENDING) {
      // 这时候就需要先把他们存起来,等异步玩在执行
      this.onResolvedCbs.push(() => {
          success(this.val);

      })
      this.onRejectedCbs.push(() => {
          failure(this.err)

      })
    }
}
```



## 测试

```js
let p = new myPromise((reslove, reject) => {
    // 同步
    // throw new Error('ERROR');
    // reslove(1);
    // reject('err');

    //异步
    setTimeout(() => {
        reslove(1)
    })

})
p.then(res => {
    console.log(res); // 1
});
```

一个简易的promise就实现了, 由于then是可以链式调用的, 即

```js
p.then((res1) => {
  console.log(res1)
}).then((res2 => {
   console.log(res2)
})).then((res3 => {
   console.log(res3)
}))
```

在这里我们并没有去是实现链式调用, 明天再去实现