## 前言
这是一个Vue3源码系列简单实现文章,文章是我个人学习源码的一个历程，这边分享出来希望对大家有所帮助。`本次实现的是ref`
## 问题
首先,想问一下大家2个问题
- `ref` 和 `reactive`有什么区别?
- `ref`中可以放对象作为参数吗? `reactive`可以放基础值作为参数吗?
  `答案`将在文末展示
## ref实现
本次实现通过例子 + [vue3源码](https://github.com/vuejs/vue-next) 逐步实现
### 例子
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="../vue/dist/vue.global.js"></script>
  <script>
    let { ref, effect }  = Vue
    let name= ref('vvv')
    effect(() => {
      app.innerHTML =  name.value
    })
    console.log(name);
    setTimeout(() => {
      name.value = 'vvv2'
    }, 1000)
  </script>
</body>
</html>
```
打开浏览器

![ref.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f445b64a5fcf47a784654f63756f9e83~tplv-k3u1fbpfcp-watermark.image?)
从上面的例子中可以看到`ref`后,返回的是一个`RefImpl`实例, 并且具有
`__v_isRef`、` __v_isShallow`、` _rawValue`、`_value`等等的一系列属性

大概了解下`ref`, 下面就让我们来去实现一下`ref` <br />
`ref`有俩种形式, 分别是`ref` 和 `shallowRef`
```ts
export const ref = (value) => {}
export const shallowRef = (value) => {}
```
上面的参数`value` 就是我们传进入的值啦 <br />
为了不重复代码,我们用用一个函数`createRef`, 通过不同参数来实现俩种不一样的`ref` <br />
```ts
function createRef (rawValue, shallow = false) {
}
```
我们上面的代码变化一下, 就变成这样子了
```ts
export const ref = (value) => {
  return createRef(value)
}
export const shallowRef = (value) => {
  return createRef(value, true)
}
```
我们下面只需要实现`createRef`就可以实现我们的`ref`了
```ts
function createRef (rawValue, shallow = false) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}
```

`isisRef`函数是判断这个`value`是否已经`ref`了 <br />
具体的实现方式是:
```ts
export function isRef(r) { // 判断是否已经ref过了
  return !!(r && r.__v_isRef === true)
}
```
`createRef`中的代码, 为什么会还有`new RefImpl()`呢? 可以在看看上面的动图, 上面的动图是通过`vue3源码`举的例子,通过`ref`后会返回一个 `RefImpl`实例 <br />
那么接下来只需要去实现`RefImpl`实例即可 <br />
```ts
const convert = (val) => isObject(val) ? reactive(val): val

class RefImpl { // 创建refImpl类
  public _value 
  public _rawValue  
  public readonly __v_isRef = true // ref标识
  constructor(value, public readonly __v_isShallow) {
    this._value = value // 获取到旧值
    this._rawValue = value
  }
  get value() { // track(依赖收集)
    track(this, trackOpTypes.GET, 'value')
    return this._value
  }
  set value(newValue) { // trigger(触发依赖更新)
    if(hasChange(newValue, this._rawValue)) {
       this._rawValue = newValue
       this._value = this.__v_isShallow ? newValue : convert(newValue)
       trigger(this, TriggerOrTypes.SET, 'value', newValue)
    }
  }
}
```
上面的`track` 和 `trigger` 代码是依赖收集和依赖触发(更新), 具体的详细过程可以看[vue3源码 - effect依赖收集触发更新篇](https://juejin.cn/post/7072264858120486942), 还有一些`utils`函数 可以从这里看到喔 <br />

此外, ref对象对象的处理是用过了`reactive`去处理<br />
`偷偷告诉你哟: 上面这个实现ref的代码是通过Object.defineProperty去实例的`
## 测试
新建一个`ref.html`文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="../node_modules/@vue/reactivity/dist/reactivity.global.js"></script>
  <script>
    let { ref, effect }  = VueReactivity
    let name = ref('vvv')
    console.log(name);
    effect(() => {
      app.innerHTML = name.value
    })
    setTimeout(() => {
      name.value = 'vvv2'
    }, 1000)
  </script>
</body>
    </html>
```
打开浏览器, 看看我们实现的怎么样

![ref2.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56ddd9e46909443385d846226a85c841~tplv-k3u1fbpfcp-watermark.image?)
为了具有辨识度, 我在`RefImpl`添加了前缀`My` <br />
可以看到我们实现的跟`vue3源码` 差不多, 快来尝试实现一下吧
## 文末
`ref`的实现已经完毕, 接下来回答一下上面的俩个问题
- `ref` 和 `reactive`有什么区别? <br />
    通过源码我们可以看到`ref`是通过`Object.defineProperty`实现的, 而`reactive`是通过`proxy`实现的, 这时候就有同学问? 为什么`ref`不通过`proxy`实现呢, 主要是因为`proxy`只支持`对象`, 爱莫能助ya.

- `ref`中可以放对象作为参数吗? `reactive`可以放基础值作为参数吗? <br />
   `ref`是可以传对象的, 如果传的是对象会给`reactive`去实现  <br />
   `reactive`放基础值是没什么作用的, 具体为什么可以看[vue3源码 - 响应式数据reactive篇](https://juejin.cn/post/7071148614986235911)

## 最后
如果觉得本文对你有帮助,记得点赞👍🏻 、 收藏⭐️ 加关注➕哟