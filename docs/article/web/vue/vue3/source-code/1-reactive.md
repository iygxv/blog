## 前言

在vue3中,将引用数据类型(数组,对象)变为`响应式数据`应用的最多的是`reactive`吧, 例如:

```js
let state = reactive({
  list: []
})
```

其实还有几个也可以将引用数据类型变为`响应式数据`, 分别是: `shallowReactive` 、`readonly` 、`shallowReadonly`

```js
// shallowReactive
let state = shallowReactive({
  list: []
})

// readonly
let state = readonly({
  list: []
})

// shallowReadonly
let state = shallowReadonly({
  list: []
})
```
区别如其名 
**shallowReactive**:  浅响应式, 只对第一层进行响应式 
**readonly**:  响应式, 但是仅读
**shallowReadonly**:  浅响应式且仅读

## 实现
**tip**: 此次主要使用的是rollup进行打包
首先, 先建立好如下目录
```js
|-- reactive
    |-- package.json
    |-- rollup.config.js  // rollup配置
    |-- yarn.lock
    |-- core // 核心代码
        |-- index.js  // 主文件
        |-- reactive.js // reactive文件
        |-- proxyMap.js // 缓存响应式数据
        |-- utils.js // 工具文件
        |-- baseHandlers.js // 代理函数
```
下面进入实现`reactive` 、`shallowReactive` 、`readonly` 、`shallowReadonly`的过程 <br />
```js
// index.js
export {
  reactive,
  shallowReactive,
  readonly,
  shallowReadonly
} from './reactive'
```
既然需要这四个函数, 那么我们先在`index.js`导出4个函数 <br />
我们将核心逻辑放在了`reactive.js`

```js
// reactive.js
export function reactive(target) {}
export function shallowReactive(target) {}
export function readonly(target) {}
export function shallowReadonly(target) {}

```
创建`createReactiveObject`函数, 帮助我们去实现4种`reactive`
```js
// reactive.js
/**
 * 实现4种reactive
 * @param {*} target 目标对象
 * @param {*} isReadonly  是否仅读
 * @param {*} baseHandlers 处理函数
 * @param {*} proxyMap weakMap存储已经响应式的对象
 */
function createReactiveObject(target, isReadonly, baseHandlers, proxyMap) {}
```
然后对4个核心函数进行`createReactiveObject`
```js
// reactive.js
import {
  mutableHandlers,
  shallowReactiveHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers

}from './baseHandlers'
import {
  reactiveMap,
  shallowReactiveMap,
  readonlyMap,
  shallowReadonlyMap

} from './proxyMap'
/**
 * 实现4种reactive
 * @param {*} target 目标对象
 * @param {*} baseHandlers 处理函数
 * @param {*} proxyMap weakMap存储已经响应式的对象
 */
function createReactiveObject(target, baseHandlers, proxyMap) {}

// 深度并且可读写响应式
export function reactive(target) {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}
// 浅度但可读写响应式(一层响应式)
export function shallowReactive(target) {
  return createReactiveObject(target, shallowReactiveHandlers, shallowReactiveMap)
}
// 仅读响应式
export function readonly(target) {
  return createReactiveObject(target, readonlyHandlers, readonlyMap)
}
// 浅度且仅读响应式
export function shallowReadonly(target) {
  return createReactiveObject(target, shallowReadonlyHandlers, shallowReadonlyMap)
}

```
然后实现`createReactiveObject`的逻辑
```js
// reactive.js
function createReactiveObject(target, baseHandlers, proxyMap) {
  // 1.target必须是个对象
  if(!isObject(target)) {
    return target;
  }
   // 2.判断时候是已经拦截过的
   const existingProxy = proxyMap.get(target)
   if(existingProxy) {
     return existingProxy 
   }
  
  // 3.没有拦截过的, 则使用proxy进行拦截(核心)
  const proxy = new Proxy(target, baseHandlers)
  proxyMap.set(target, proxy) // 进行存储
  return proxy

}
```
接下下就是去实现`proxyMap` 和 `baseHandlers` , 如果不懂proxy的话[移至此处](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) <br/>
`proxyMap`, 使用weakMap是因为会垃圾回收, 不会造成内存泄漏
```js
// proxyMap.js
// WeakMap 会垃圾回收, 不会造成内存泄漏
export const reactiveMap = new WeakMap()
export const shallowReactiveMap = new WeakMap()
export const readonlyMap = new WeakMap()
export const shallowReadonlyMap = new WeakMap()
```
baseHandlers的话可以通过设置`get` 和 `set` 来拦截数据的读写功能, 通过实现一个`createGetter` 和 `createSetter`函数来帮我们写出4个不一样的get和set <br/>
```js
// baseHandlers.js
/**
 * 创建get
 * @param {*} isReadonly 是否仅读
 * @param {*} shallow 是否浅层次的
 */
function createGetter(isReadonly = false, shallow = false) {}

/**
 * 创建set
 * @param {*} shallow 是否浅层次的
 */
function createSetter(shallow = false) {}
```
定义不同的`get` 和 `set`
```js
// baseHandlers.js
/ 定义get 和 set
const get = createGetter()
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

const set = createSetter()
const shallowSet = createSetter(true)


export const mutableHandlers = {
  get,
  set
}
export const shallowReactiveHandlers = {
  get: shallowGet,
  set: shallowSet
}

// 仅读属性无set, 如果设置了则警告⚠️
export const readonlyHandlers = {
  get: readonlyGet,
  set: (target, key) => {
    console.warn(`set on key ${key} failed`)
  }
}
export const shallowReadonlyHandlers = {
  get: shallowReadonlyGet,
  set: (target, key) => {
    console.warn(`set on key ${key} failed`)
  }
}
```
实现`createGetter` 和 `createSetter`函数的逻辑
```js
// baseHandlers.js
import { isObject } from "./utils"
import {reactive, readonly} from '.index' // 用于递归

/**
 * 创建get
 * @param {*} isReadonly 是否仅读
 * @param {*} shallow 是否浅层次的
 */
function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    // 1. 非仅读
    if (!isReadonly) {
      // 收集依赖的过程
    }
    // 2. 浅的, 直接返回就行
    if (shallow) {
      return res 
    }
    // 3.如果还是对象, 递归
    if(isObject(res)) {
       return isReadonly ? readonly(res) : reactive(res)
    }
    // 4.其他
    return res
  }
}
/**
 * 创建set
 * @param {*} shallow 是否浅层次的
 */

function createSetter(shallow = false) {
  return function set(target, key, value, receiver) {
    const res = Reflect.get(target, key, value, receiver)
    // 1. 浅的, 直接返回就行
      if (shallow) {
        return res 
      }
      // 2.如果还是对象, 递归
      if(isObject(res)) {
         return reactive(res)
      }
      return res
  }
}
```
## 使用
新建一个examples文件夹,当前目录为
```js
|-- reactive
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

```
rollup 的配置为
```js
export default {
  input: './core/index.js',
  output: {
     name: 'VueReactivity',
     file: 'dist/reactive.global.js',
     format: "iife"
  }
}

```
使用的代码为
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
    <script src="../dist/reactive.global.js"></script>
    <script>
      let { reactive, shallowReactive, readonly, shallowReadonly}  = VueReactivity
      let state = shallowReactive ({
        name: '浅层(初始)',
        v: {
          name: '深层(初始)'
        }
      })
    </script>
  </body>
</html>

```
到这里, 已经走完整个reactive的流程了 <br />
`最后`总结一下:
- 响应式数据的4中实现形式: `reactive` 、`shallowReactive` 、`readonly` 、`shallowReadonly`
- 主要通过`proxy`去实现拦截