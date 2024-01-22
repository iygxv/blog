---
sidebar: 
 title: computed 实现
 step: 1
 isTimeLine: true
title: computed 实现
tags:
 - Vue3
 - Vue3 源码实现
categories:
 - Vue3
---

# computed实现

## 前言

`computed`又称为`计算属性`,在vue项目中你会经常用到, 那么在vue3中的`computed`又是如何实现的呢?当`计算属性`不发生变化, 就不会再次去调用函数, 这又是如何实现的呢?下面来进行我们对`computed`的简单实现吧!

## 实现

首先我们知道vue3中`computed`是一个函数, 并且接收一个参数, 暂且叫这个参数`getterOrOptions`,这个参数可以是一个函数(`getter`), 也可以是一个对象(包含`getter`和`setter`), 调用`computed`之后会返回一个`ComputedRefImpl`实例

```typescript
/**
 * computed
 * @param getterOrOptions  getter函数或者 options配置
 * @returns ComputedRefImpl实例
 */
export function computed(getterOrOptions) {
  let getter
  let setter

  // 如果传过来的只是一个函数
  const onlyGetter = isFunction(getterOrOptions)
  if (onlyGetter) {
    getter = getterOrOptions
    // setter就会警告⚠️
    setter = () => {
      console.warn('Write operation failed: computed value is readonly')
    }
  } else {
    // 要求
    // computed({
    //   get() {},
    //   set() {}
    // })
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  const cRef = new ComputedRefImpl(getter, setter)
  return cRef
}
```



接下来主要去实现`ComputedRefImpl`就行了

```typescript
class ComputedRefImpl {
  public _dirty = true // 默认为true (是否惰性求值, _dirty为true就拿出新值, _dirty为false不求值)
  public _value
  public effect
  constructor(getter, public setter) {
    // effect可以收集依赖和触发依赖,
    this.effect = effect(getter, {
      lazy: true,
      scheduler: () => {
        if (!this._dirty) {
          this._dirty = true
          // 触发一次更新,因为在依赖的值变化后, 需要更新内容
          trigger(this, TriggerOrTypes.SET, 'value')
        }
      }
    })
  }
  get value() {
    // 如果是脏的, 我们采取执行effect, 也就是执行用户传过来的函数,并且将返回值给到this._value
    if (this._dirty) {
      /**
       * this.effect会收集相关依赖的,例如：
       * const name = ref('vvv')
       *  computed(() => name.value)
       *  这里会收集到name的依赖， 如果name变化会触发effect下的scheduler函数
       */
      this._value = this.effect()// 会将用户返回的值返回
      this._dirty = false
    }
   /**
    * 这里是收集收集使用computed 中 .value的依赖, 例如:
    * const name = ref('vvv')
    * const myName = computed(() => name.value)
    * computed(() => myName.value) // 收集的里面value的依赖
    */
    track(this, trackOpTypes.GET, 'value')
    return this._value
  }
  set value(newVal) {
    this.setter(newVal)
  }
}
```

## 测试

```javascript
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
```

可以通过以上案例去`测试`我们写的`computed`, 如果你有运行我们的`案例`, 可以看到`computed`的基本功能都已经实现了



## mini-vue3实现相关

[reactive实现](https://codevity.top/article/web/vue/vue3/source-code/1-reactive.htmlt)

[ref实现](https://codevity.top/article/web/vue/vue3/source-code/3-ref.html)

[effect实现](https://codevity.top/article/web/vue/vue3/source-code/2-effect.html)

[computed实现](https://codevity.top/article/web/vue/vue3/source-code/5-computed.html)