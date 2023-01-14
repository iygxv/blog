## 响应系统

### 1.什么是effect？

effect是一个副作用函数。

#### 2.什么是副作用函数？

副作用函数是指，在这个函数中改变了变量会影响到外面的变量。

### 3.为什么使用weakMap作用存储依赖的数据结构呢？

weakMap对key是弱引用，不会影响垃圾回收器的工作。

### 4.obj 会让我们的effect陷入无限递归循环，那如何避免的呢？

这里增加了依赖触发执行的副作用函数如果跟当前正在执行的副作用函数相同，那就不触发执行

### 5.effect的第二个函数，可以决定用户函数执行的时机

```js
effect(fn, {
  lazy: false, 
  scheduler() {
    // 会优先执行调度器
  }
})
```

### 6.如何让effect不会立即执行(例如计算属性场景)

effect的第二个参数option中设置lazy属性为true

```js
effect(fn, {
  lazy: true
})
```

### 7.computed的实现原理

本质上设置effect的第二个参数option中设置lazy属性为true, 懒执行

然后通过dirty来进行是否缓存

```js
function computed(getter) {
  let value
  let dirty = true // 是否需要缓存
  const effectFn = effect(getter, {
    lazy: true, // 懒执行
    scheduler() {
      // 每次依赖的值变化, dirty为true,需要重新获取值
      dirty = true
      // 当计算属性依赖的响应式数据发生变化时, 需要手动触发依赖
      trigger(obj, 'value')
    }
  })
  const obj = {
    get value() {
      if(dirty) {
        value = effectFn()
      }
      // 当读取value时,应该手动追踪依赖
      track(obj, 'value')
      return value
    }
  }
  return obj
}
```

### 8.watch的实现原理

watch的本质就是利用了`effect`和`options.scheduler`选项

```js
watch接受俩个参数, source是响应式数据, cb是回调函数
function watch(source, cb) {
  // ()=>source.xxx 是一个getter函数 用于指定watch依赖哪些数据
  effect(() => source.xxx, {
    scheduler() {
      // 当数据变化时, 调用回调函数cb
      cb()
    }
  })
}
```

### 9.过期的副作用引起的竞态问题

例如:

```js
let finalData
watch(obj, async() => {
  // 发送请求
  const res = await fetch('/get/list')
  // 赋值
  finalData = res
})
// 第一次修改
obj.a++
setTimeout(() => {
  // 第二次修改
  obj.a++
},200)
```

每一次修改obj的值, 都会导致watch的回调函数执行, 假设第一次请求需要1000ms才能返回结果, 第二次修改obj的值是在200ms内发生, 此时就会有一个竞态的问题

此时俩次请求都在进行,那么哪一个请求会优先返回结果呢, 我们并不确定, 就会导致最终的finalData结果不正确

**解决办法**

watch的回调函数接受第三个参数`onInvalidate`, 他是一个函数, 类似于事件监听器, 我们可以使用`onInvalidate`函数注册一个回调, 这个回调函数会在当前副作用函数过期时执行

```js
let finalData
watch(obj, async(newValaue, oldValue, onInvalidate) => {
  // 定义一个标志, 代表当前副作用函数是否过期, 默认为false, 代表没有过期
  let expired = false
  // 调用onInvalidate函数注册一个过期回调
  onInvalidate(() => {
    expired = true
  })
  // 发送请求
  const res = await fetch('/get/list')
  
  // 只有当副作用函数没有过期, 参会执行后面操作
  if(!expired) {
   finalData = res 
  }
})
// 第一次修改
obj.a++
setTimeout(() => {
  // 第二次修改
  obj.a++
},200)
```



`onInvalidate: `可以用来清除无效的副作用
