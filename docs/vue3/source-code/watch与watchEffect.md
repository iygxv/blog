---
sidebar: 
 title: watch 与 watchEffect
 step: 1
 isTimeLine: true
title: watch 与 watchEffect
tags:
 - Vue3
 - Vue3 源码实现
categories:
 - Vue3
---


# watch与watchEffect

## watchEffect

**vue3文档描述:** 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行

### 参数

第一个参数就是要运行的副作用函数。这个副作用函数的参数也是一个函数，用来注册清理回调。清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用，例如等待中的异步请求 (参见下面的示例)。

第二个参数是一个可选的选项，可以用来调整副作用的刷新时机或调试副作用的依赖。

返回值是一个用来停止该副作用的函数。

### 示例

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> 输出 0

count.value++
// -> 输出 1
```

### 副作用清除：

```js
watchEffect(async (onCleanup) => {
  const { response, cancel } = doAsyncWork(id.value)
  // `cancel` 会在 `id` 更改时调用
  // 以便取消之前
  // 未完成的请求
  onCleanup(cancel)
  data.value = await response
})
```

### 停止侦听器：

```js
const stop = watchEffect(() => {})

// 当不再需要此侦听器时:
stop()
```

### 选项：

```js
watchEffect(() => {}, {
  flush: 'post', // pre post sync
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
```

### 副作用刷新时机

- pre ( 组件`更新前`执行)
- post (强制效果始终`同步`触发)
- sync (组件`更新后`执行)

## watchPostEffect()

[`watchEffect()`](https://staging-cn.vuejs.org/api/reactivity-core.html#watcheffect) 使用 `flush: 'post'` 选项时的别名

```js
watchEffect(() => {}, {
  flush: 'post'
})
```

## watchSyncEffect()

[`watchEffect()`](https://staging-cn.vuejs.org/api/reactivity-core.html#watcheffect) 使用 `flush: 'sync'` 选项时的别名

```js
watchEffect(() => {}, {
  flush: 'sync'
})
```

## watch

侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数

### 详细信息

`watch()` 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数

第一个参数是侦听器的**源**。这个来源可以是以下几种：

- 一个函数，返回一个值
- 一个 ref
- 一个响应式对象
- ...或是由以上类型的值组成的数组

第二个参数是在发生变化时要调用的回调函数。这个回调函数接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数。该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用，例如等待中的异步请求。`注: 当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值`

```js
watch([ref(1), (newVal, oldVal, onCleanup) => {
  
}]
```

第三个可选的参数是一个对象，支持以下这些选项：

- **`immediate`**：在侦听器创建时立即触发回调。第一次调用时旧值是 `undefined`。
- **`deep`**：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。参考[深层侦听器](https://staging-cn.vuejs.org/guide/essentials/watchers.html#deep-watchers)一节。
- **`flush`**：调整回调函数的刷新时机。参考[回调的刷新时机](https://staging-cn.vuejs.org/guide/essentials/watchers.html#callback-flush-timing)一节。
- **`onTrack / onTrigger`**：调试侦听器的依赖。参考[调试侦听器](https://staging-cn.vuejs.org/guide/extras/reactivity-in-depth.html#watcher-debugging)一节

与 [`watchEffect()`](https://staging-cn.vuejs.org/api/reactivity-core.html#watcheffect) 相比，`watch()` 使我们可以：

- 懒执行副作用；
- 更加明确是应该由哪个状态触发侦听器重新执行；
- 可以访问所侦听状态的前一个值和当前值。



## watch  vs  watchEffect

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

`watch`可以明确侦听的数据源

`watchEffect`响应性依赖关系会不那么明确, options属性中并没有`immediate`和`deep`属性



## 原理解析

```js
/**
 * 
 * @param source 数据源
 * @param cb 回调函数
 * @param options 选项 
 * @returns 
 */
function doWatch(
  source: WatchSource | WatchSource[] | WatchEffect | object,
  cb: WatchCallback | null,
  { immediate, deep, flush, onTrack, onTrigger }: WatchOptions = EMPTY_OBJ
): WatchStopHandle {
  // 如果处于开发环境并且没有回调函数
  if (__DEV__ && !cb) {
    // 没有immediate
    if (immediate !== undefined) {
      warn(
        `watch() "immediate" option is only respected when using the ` +
          `watch(source, callback, options?) signature.`
      )
    }
    // 没有deep
    if (deep !== undefined) {
      warn(
        `watch() "deep" option is only respected when using the ` +
          `watch(source, callback, options?) signature.`
      )
    }
  }

  // 当前实例
  const instance = currentInstance
  let getter: () => any
  let forceTrigger = false
  // 是否多个数据源
  let isMultiSource = false
  if (isRef(source)) {
    // 监听ref
    getter = () => source.value
    forceTrigger = isShallow(source)
  } else if (isReactive(source)) {
    // 监听 reactive
    getter = () => source
    deep = true
  } else if (isArray(source)) {
    // 多个数据源
    isMultiSource = true
    forceTrigger = source.some(isReactive)
    getter = () =>
      source.map(s => {
        if (isRef(s)) {
          return s.value
        } else if (isReactive(s)) {
           // traverse遍历 reactive 下的所有元素
          return traverse(s)
        } else if (isFunction(s)) {
          // 返回执行的结果
          return callWithErrorHandling(s, instance, ErrorCodes.WATCH_GETTER)
        } else {
           // 非响应式数据报异常，只能监听 响应式变量
          __DEV__ && warnInvalidSource(s)
        }
      })
  } else if (isFunction(source)) {
    // 数据源是一个函数
    if (cb) {
      // 有回调 watch
      getter = () =>
        callWithErrorHandling(source, instance, ErrorCodes.WATCH_GETTER)
    } else {
       // watchEffect
      getter = () => {
        if (instance && instance.isUnmounted) {
          return
        }
        if (cleanup) {
          cleanup()
        }
        // 返回 watchEffect 的执行结果，传入实参 onInvalidate
        return callWithAsyncErrorHandling(
          source,
          instance,
          ErrorCodes.WATCH_CALLBACK,
          [onCleanup]
        )
      }
    }
  } else {
    // 非 响应式数据 直接报警告
    getter = NOOP
    __DEV__ && warnInvalidSource(source)
  }

  // watch 且 deep 为true，使用 traverse 深层遍历让其所有 响应式元素 搜集依赖
  if (cb && deep) {
    const baseGetter = getter
    getter = () => traverse(baseGetter())
  }
  // 清除副作用执行
  let cleanup: () => void
  let onCleanup: OnCleanup = (fn: () => void) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, ErrorCodes.WATCH_CLEANUP)
    }
  }

 // 初始化老值
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE
  // 执行 watch 或 watchEffect
  const job: SchedulerJob = () => {
    if (!effect.active) {
      return
    }
    if (cb) {
      // watch(source, cb)
      // 拿到新值
      const newValue = effect.run()
      if (
        deep ||
        forceTrigger ||
        (isMultiSource
          ? (newValue as any[]).some((v, i) =>
              hasChanged(v, (oldValue as any[])[i])
            )
          : hasChanged(newValue, oldValue)) ||
        (__COMPAT__ &&
          isArray(newValue) &&
          isCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance))
      ) {
        // cleanup before running cb again
        if (cleanup) {
          cleanup()
        }
        // 执行 cb 传入形参 newValue oldVaue onInvalidate
        callWithAsyncErrorHandling(cb, instance, ErrorCodes.WATCH_CALLBACK, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          // 第一次更改时，将undefined作为旧值传递
          oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
          onCleanup
        ])
        oldValue = newValue
      }
    } else {
      // watchEffect
      effect.run()
    }
  }

  // important: mark the job as a watcher callback so that scheduler knows
  // it is allowed to self-trigger (#1727)
  job.allowRecurse = !!cb
  // 调度器
  let scheduler: EffectScheduler
  if (flush === 'sync') {
    // sync 强制始终同步触发
    scheduler = job as any // the scheduler function gets called directly
  } else if (flush === 'post') {
    // post组件更新后执行
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense)
  } else {
    // default: 'pre'
    // pre 组件更新前执行
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job)
      } else {
        // with 'pre' option, the first call must happen before
        // the component is mounted so it is called synchronously.
        job()
      }
    }
  }

  const effect = new ReactiveEffect(getter, scheduler)

  if (__DEV__) {
    effect.onTrack = onTrack
    effect.onTrigger = onTrigger
  }

  // 初始运行
  if (cb) {
    // immediate 立即执行
    if (immediate) {
      job() // job是一个调度函数
    } else {
      oldValue = effect.run()
    }
  } else if (flush === 'post') {
    // 组件更新后执行
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    )
  } else {
    effect.run()
  }

  return () => {
    effect.stop()
    if (instance && instance.scope) {
      remove(instance.scope.effects!, effect)
    }
  }
}
```



## watch的实现

```js
export function watch(
  source,cb,options
) {
  return doWatch(source, cb, options)
}

```

注: `options中无 immediate/ deep这俩个属性`

## watchEffect的实现

```js
export function watchEffect(
  effect,options
) {
  return doWatch(effect, null, options)
}
```



## 参考链接

[vue3文档](https://staging-cn.vuejs.org/api/reactivity-core.html#watch)

<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸
