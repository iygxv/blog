## 前言
`computed`又称为`计算属性`,在vue项目中你会经常用到, 那么在vue3中的`computed`又是如何实现的呢?当`计算属性`不发生变化, 就不会再次去调用函数, 这又是如何实现的呢?下面来进行我们对
`computed`的简单实现吧!
## 实现
首先我们知道vue3中`computed`是一个函数, 并且接收一个参数, 暂且叫这个参数`getterOrOptions`,这个参数可以是一个函数(`getter`), 也可以是一个对象(包含`getter`和`setter`), 调用`computed`之后会返回一个`ComputedRefImpl`实例
```ts
// computed.ts
/**
 * cpmputed函数
 * @param getterOrOptions  getter函数或者 options配置
 * @returns ComputedRefImpl实例
 */
export const computed  = (getterOrOptions) => {
    let getter;
    let setter;
    // 如果是一个函数
    const onlyGetter = isFunction(getterOrOptions)
    if(onlyGetter) {
      getter = getterOrOptions
      // setter就会警告⚠️
      setter = () => {
        console.warn('Write operation failed: computed value is readonly')
      }
    }else {
      getter = getterOrOptions.get
      setter = getterOrOptions.set
    }
    const cRef = new ComputedRefImpl(getter, setter)
    return cRef
}
```
接下来主要去实现`ComputedRefImpl`就行了
```ts
// ComputedRefImpl实例
class ComputedRefImpl {
  public _dirty = true // 默认为true (作为是否缓存的标识)
  public _value
  public effect
  constructor( getter, public setter) {
    // effect可以收集依赖和触发依赖,
      this.effect = effect(getter, {
        lazy: true,
        scheduler: () => {
          if(!this._dirty) {
            this._dirty = true
            trigger(this, TriggerOrTypes.SET, 'value') // 触发依赖去更新
          }
        }
      })
  }
  get value() {
    // 如果是脏的, 我们采取执行effect, 也就是执行用户传过来的函数,并且将返回值给到this._value
    if(this._dirty) {
      this._value = this.effect()
      this._dirty = false
    }
    // 这里收集.value的依赖, 主要是为了实现, computed所依赖的属性变了, effect会重新触发依赖和依赖更新
    track(this, trackOpTypes.GET, 'value') // 收集使用.value的依赖
    return this._value
  }
  set value(newVal) {
    this.settet(newVal)
  }
}
```
实现`ComputedRefImpl`需要注意的几个点: 
- 1.通过`_dirty`来作为是否缓存的标识
- 2.主要用过`effect`来实现内部的逻辑,[ 详见effect ](https://juejin.cn/post/7072264858120486942)

## 测试
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="../node_modules/@vue/reactivity/dist/reactivity.global.js"></script>
    <script>
      let { ref, effect, computed } = VueReactivity
      // 测试基本功能(单一get)
      // const count = ref(1)
      // const plusOne = computed(() => count.value + 1)
      // console.log(plusOne.value) // 2

      // 测试基本功能2(get 和 set 的使用)
      // const count = ref(1)
      // const plusOne = computed({
      //   get: () => count.value + 1,
      //   set: (val) => {
      //     count.value = val - 1
      //   }
      // })
      // // debugger
      // plusOne.value = 1
      // console.log(count.value) // 0

      // 测试基本功能3(依赖的属性发生变化, 对应计算属性也发生变化)
      const count = ref(1)
      const plusOne = computed(() => count.value + 1)
      effect(() => {
        console.log(plusOne.value ); // 依赖收集了.value
      })
      debugger
      count.value = 10  
    </script>
  </body>
</html>
```
可以通过以上案例去`测试`我们写的`computed`, 如果你有运行我们的`案例`, 可以看到`computed`的基本功能都已经实现了
## vue3源码实现系列

[vue3源码 - 响应式数据reactive篇](https://juejin.cn/post/7071148614986235911)

[vue3源码 - effect依赖收集触发更新篇](https://juejin.cn/post/7072264858120486942)

[vue3源码 - ref篇](https://juejin.cn/post/7072572513212956686)

[vue3源码 - toRef和toRefs篇](https://juejin.cn/post/7072631090246057998)

[vue3源码 - computed篇](https://juejin.cn/post/7073841584583901198/)