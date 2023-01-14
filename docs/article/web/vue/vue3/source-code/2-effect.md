## 前言
响应式[reactive](https://juejin.cn/post/7071148614986235911)篇已经写完, 今天就来写effect篇 <br />
`effect`是什么呢? <br />
`effect`就相当于vue2中的`Watcher`, 但是想比较而言,`effect`的实现更加容易看明白,且更容易写出来,接下来就让我们进入我们的实现环节

## 实现
```js
​|-- reactive
    |-- examples 测试文件夹
        |-- reactive.html  // 测试文件
    |-- package.json
    |-- rollup.config.js  // rollup配置
    |-- yarn.lock
    |-- core // 核心代码
        |-- index.js  // 主文件
        |-- reactive.js // reactive文件
        |-- proxyMap.js // 缓存响应式数据
        |-- utils.js // 工具文件
        |-- baseHandlers.js // 代理函数
        |-- effect.js // effec文件
```
续`reactive`篇, 新添加`effect.js`文件 <br />
在`index.js`中导出
```js
// index.js
export {
  effect
} from './effect'
```
`effect`在数据发生变化的时候, 会触发effect执行, 那么我们就要创建一个响应式的effect
```js
//effect.js
export const effect  = (fn, options) {
  // fn用户自定义的函数, options选项
  // 让这个effect变成响应式,可以做到数据变化执行
   const effect =  createReactiveEffect(fn, options)
   if(!options.lazy) {
     // 默认懒执行
     effect()
   }
   return effect

}

```
通过上面代码, 可以知道我们将创建一个响应式的effect交给了`createReactiveEffect`函数
```js
let uid = 0
let activeEffect = undefined // 暴露effect出去
let effectStack = [] // 存储当前effect栈
function createReactiveEffect (fn, options) {
    const effect = function reactiveEffect() {
      // 每次进入判断当前effect是否在栈中
      if(!effectStack.includes(effect)) {
        try {
          effectStack.push(effect) // 进栈
          activeEffect = effect
          return fn() // 执行用户自定义的函数
        }finally {
          effectStack.pop() // 出栈
          activeEffect = effectStack[effectStack.length - 1]

        }
      }
    }
    effect.id = uid // 每个effect独一无二的标识
    effect._isEffect = effect // 是否effect
    effect.raw = fn // 原函数
    effect.options = options // options选项
    return effect
}
```
已经创建好了`effect`了, 接下来就是触发依赖的时候调动我们的`effect`
```js
// baseHandlers.js
import { trackOpTypes } from './operators'
import { track } from './effect'
function createGetter(isReadonly = false, shallow = false) {
// 非仅读
    if(!isReadonly) {
      // 触发effect, 收集依赖
      track(target, TrackOpTypes.GET, key)
      
    }
}
```
`TrackOpTypes`是什么呢?
用来标记此时我们在进行什么操作 <br />
新建`operators`文件, 用于所有标记, 此时文件目录为
```js
​|-- reactive
    |-- examples 测试文件夹
        |-- reactive.html  // 测试文件
    |-- package.json
    |-- rollup.config.js  // rollup配置
    |-- yarn.lock
    |-- core // 核心代码
        |-- index.js  // 主文件
        |-- reactive.js // reactive文件
        |-- proxyMap.js // 缓存响应式数据
        |-- utils.js // 工具文件
        |-- baseHandlers.js // 代理函数
        |-- effect.js // effec文件
        |-- operators.js // operators文件
```
`operators` 新增`TrackOpTypes`类型标记
```js
// operators.js
export const TrackOpTypes = {
  GET : 0
}
```
接下来比较`重点`的就是track函数,这个函数的主要作用是: `收集个对象中的属性当前它对应的effect函数`
```js
// effect.js

// 收集个对象中的属性当前它对应的effect函数
// 存储的结构对呀为 : // key: {name: 'xxx', age: 18}  value: (map) => (name => set age => set ) 类似
export let targetMap = new WeakMap()
export const track = (target, type, key) => {
    // 判断activeEffect是否拥有 
    if(activeEffect == undefined) {
      // 没有创建到effect
      return
    }
    // 是否在targetMap中已经存在
    let depsMap = targetMap.get(target)
    if(!depsMap) {
      targetMap.set(target, (depsMap = new Map))
    }
    let dep = depsMap.get(key)
    if(!dep) {
      // set结构防止重复effect
      depsMap.set(key, (dep = new set()))
    }
    if(!dep.has(activeEffect)) {
      dep.add(activeEffect)
    }
}
```
在`track`中已经可以在响应式数据变化的时候可以触发上了`effect`,也就是`触发依赖`我们已经完成啦, 接下来就是去实现`依赖更新`
既然是更新, 我们就应该在`createSetter`中操作
```js
// baseHandlers.js
function createSetter(shallow = false) {
  return function set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver)
    return res
  }
}
```
下面对`createSetter`进行更改
```js
import { hasOwn, isArray, isIntegerKey, isObject, hasChange } from "./utils"
import { trackOpTypes, TriggerOrTypes } from './operators'
import { track, trigger } from './effect'
function createSetter(shallow = false) {
  return function set(target, key, value, receiver) {
    // 获取到旧值
    const oldValue = target[key]
    //  判断是数组且有key, 这个key是数字 还是length
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length :  hasOwn(target, key)
    const res = Reflect.set(target, key, value, receiver)
    if(!hadKey) {
      // 新增
      trigger(target, TriggerOrTypes.ADD, key, value)
    }else if(hasChange(value, oldVal)) {
      // 修改
      trigger(target, TriggerOrTypes.SET, key, value, oldVal)
    }
    return res
  }
}
```
`utils` 新增几个函数
```js
// utils.js
export const isArray = Array.isArray
export const isIntegerKey = (key) => parseInt(key) + '' === key
export const hasChange = (newValue, oldValue) => newValue === oldValue
export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)
```
`operators` 新增`TriggerOrTypes`类型标记
```js
// operators.js
export const TriggerOrTypes = {
  ADD: 0,
  SET: 1
}
```
下面详细的的讲讲本次的`重点`, `trigger`函数
```js
// effect.js
// 找属性对象的effect
export const trigger = (target, type, key, value, newValue) => {
 const add = (effectsToAdd) => {
  effectsToAdd.forEach((effect) => {
     effects.add(effect)
  })
 }
  // 看看targetMap 中有没有对应target
  let depsMap = targetMap.get(target)
  if(!depsMap) return;
  // 收集所有的effect, 到一个集合中
  const effects = new Set() // set优点: 不重复
  //判断比较复杂的情况
  if(key === 'length' && isArray(target)) {
    // 如果对应的长度, 有依赖收集需要更新
    depsMap.forEach((dep,key) => {
       if(key === 'length' || key > value) {
         add(dep)
       }
    })
  }else {
    // 非数组, 对象
    if(key != undefined) {
      add(depsMap.get(key))
    }
    // 是否做添加操作
    switch(type) {
      case TriggerOrTypes.ADD:
        if(isArray(target) && isIntegerKey(key)) {
          add(depsMap.get('length'))
        }
   }
  }
  effects.forEach((effect) => effect)
}
```