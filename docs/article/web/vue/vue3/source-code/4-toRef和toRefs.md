## 前言
这是一个Vue3源码系列简单实现文章,文章是我个人学习源码的一个历程，这边分享出来希望对大家有所帮助。`本次实现的是toRef和toRefs`
## toRef有什么用呢?
和之前一样, 通过`vue3源码`测试一下
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
    let { ref, effect, toRef, reactive }  = Vue
    let state = reactive({
      name: 'vvv'
    })
    let name = toRef(state, 'name')
    console.log(name);
    effect(() => {
      app.innerHTML =  name.value
    })
    setTimeout(() => {
      name.value = 'vvv2'
    }, 2000)
  </script>
</body>
</html>
```
打开浏览器, 看看测试的结果

![toRef.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/300e8ae447fc42d18ae6a9c7d3822b6f~tplv-k3u1fbpfcp-watermark.image?)
可以看到通过toRef后返回的是一个`ObjectRefImpl`实例, 可以知道`toRef`的作用如`名字`一样,将值转化为`ref`
## toRef的实现
### toRef的定义
```ts
export const toRef = (object, key, defaultValue?) => {
  // 将一个对象的值转化为ref形式
  const val = object[key]
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue)
}
```
`isRef`在上一篇[vue3源码 - ref篇](https://juejin.cn/post/7072572513212956686)有解释, 其作用是判断是不是已经`ref`过了 <br />
### 核心ObjectRefImpl类
```ts
// toRef核心
class ObjectRefImpl {
  public readonly __v_isRef = true
  constructor(private readonly _object, private readonly _key, private readonly _defaultValue?) {}
  get value() {
    const val = this._object[this._key] // 取值
    return val === undefined ? this._defaultValue : val // 是否去默认值
  }
  set value(newVal) {
    this._object[this._key] = newVal // 设置值
  }
}
```
或许有人会问,这里为什么会不用`track`(收集依赖) 和`trigger`(触发依赖)呢? <br />
这是因为`toRef`主要针对对象是`已经响应式过的`, 具体可以看[官方文档toRef的解释](https://v3.cn.vuejs.org/api/refs-api.html#toref)
### 测试toRef
新建一个`toRef.html`文件
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
    let { ref, effect, toRef, reactive }  = VueReactivity
    let state = reactive({
      name: 'vvv'
    })
    let name = toRef(state, 'name')
    console.log(name);
    effect(() => {
      app.innerHTML =  name.value
    })
    setTimeout(() => {
      name.value = 'vvv2'
    }, 2000)
  </script>
</body>
</html>
```
打开浏览器, 看看我们实现的怎么样

![toRef2.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d80edf48074423092c2068fc25b26ed~tplv-k3u1fbpfcp-watermark.image?)
为了具有辨识度, 我在`ObjectRefImpl`添加了前缀`My` <br />
### toRefs的实现
相信大家在项目中用的最多的是`toRefs`, 因为`toRef`只能转化一层,所以用的会相对比较少
那么下面就让我们一起来实现`toRefs`吧
```ts
export const toRefs = (object) => {
  // 循环遍历逐渐toRef
  let ret = isArray(object) ? new Array(Object.length) : {}
  for (let key in object) {
    ret[key] = toRef(object, key)
  }
  return ret
}
```
`toRefs`的实现还是相对来说比较简单的, `循环遍历逐渐toRef即可` <br />
### 测试toRefs

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
    let { ref, effect, toRef, reactive, toRefs }  = VueReactivity
    let state = reactive({
      name: 'vvv',
      age: 18
    })
    let my = toRefs(state)
    console.log(my.name);
    console.log(my.age);

    effect(() => {
      app.innerHTML =  my.name.value + '=====' + my.age.value
    })
    setTimeout(() => {
      my.name.value = 'vvv2'
      my.age.value = '19'
    }, 2000)
  </script>
</body>
</html>
```
![toRef3.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e538509aac8541ada8f7a54d1c0efa25~tplv-k3u1fbpfcp-watermark.image?)
现在可能`toRefs`用的也相对比较少了, 毕竟现在出了`setup`语法糖, 不用在`return`出去了, 不过我相信, `学到总比没学到好`, 相信自己会用到的 <br />

`toRef` 和 `toRefs`已经实现了, `vue3源码`其他相关的实现静待下一篇哟
## 最后
如果觉得本文对你有帮助,记得点赞👍🏻 、 收藏⭐️ 加关注➕哟