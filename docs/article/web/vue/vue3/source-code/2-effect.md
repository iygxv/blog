# effect实现

## 前言

effect是什么呢？ effect就相当于vue2中的Watcher（依赖收集、依赖触发）, 但是想比较而言,effect的实现更加容易看明白。effect也是经常提到的**副作用函数**。

## 副作用函数

什么事副作用函数呢？副作用函数就是指会产生副作用的函数，如下面代码所示：

```typescript
effect(() => {
  document.body.innerHTML = 'hello effec'
})
```

当effect函数执行时，它会设置body的html内容，但除了effect函数之外的任何函数都可以读取或者设置body的html内容。也就是说，effect函数的执行会直接或者间接影响其他函数的执行，这时我们说effect函数产生的副作用。

## **实现**

### effect函数

首先，既然要用到effect函数， 我们肯定要内部中定义一个effect函数。

```typescript
/**
 * effect fn
 * @param fn 用户自定义的函数,例如: effect(() => 123)
 * @param options 配置选项 ,例如: effect(() => 123, {lazy: true})
 */
export function effect(fn, options: any = {}) {
  // 让effect变成响应式, 可以做到数据变化重新执行
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    effect()
  }
  return effect
}
```

在上面的代码中， 我们定义了一个effect函数， 参数分别是fn、options， fn代表的是用户自定义的函数，如下面代码所示：

```vue
const fn = () => 123
effect(fn) // fn的执行返回的结果会成功effect函数的结果
```

options是我们的配置选项， 我们可以配置属性来决定这个effect函数该怎么运行。例如：

```typescript
effect(() => 123, {
  lazy: false // lazy表示懒执行
})
```

上面代码options.lazy属性表示对effect函数懒执行，当lazy为true时不会立即触发，为false时会立即触发。

### createReactiveEffect函数

从上面effect函数中, 我们创建了一个createReactiveEffect函数， 这个函数是帮助我们去创建一个具有标识性的effect。

```typescript
 // 让effect变成响应式, 可以做到数据变化重新执行
  const effect = createReactiveEffect(fn, options)
```

 我们通过下面所示的代码来了解createReactiveEffect函数是如何创建一个具有标识性的effect的。

```typescript
let uid = 0 // 初始全局uid
let activeEffect // 存储当前的effect(暴露effect给外面函数使用)
let effectStack = [] // 存储当前effect
function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      try {
        // 进栈
        effectStack.push(effect)
        activeEffect = effect
        return fn() // 执行用户传过来的函数 -- 函数会去取到值, 触发get
      } finally {
        // 无论结果怎么样
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  effect.id = uid++ // 制作effect标识id
  effect._isEffect = true // 用于标识这个是响应式effect
  effect.raw = fn // 保留原fn
  effect.options = options // 保存options选项
  return effect
}
```

从上面代码中， 我们可以知道effect是一个**reactiveEffect函数**，并且扩展了effect的一些属性： 例如它的id、_isEffect、raw、options等等属性。

### **reactiveEffect函数**

```typescript
let activeEffect // 存储当前的effect(暴露effect给外面函数使用)
let effectStack = [] // 存储当前effect
const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      try {
        // 进栈
        effectStack.push(effect)
        activeEffect = effect
        return fn() // 执行用户传过来的函数 -- 函数会去取到值, 触发get
      } finally {
        // 无论结果怎么样
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
```

这里我们单独把**reactiveEffect函数**拿出来讲， 因为这个函数是effect的核心内容。

#### effect栈结构

首先我们可以看到这个函数通过栈的形式对effect进行入栈和出栈，为什么要这样子呢？因为函数调用是栈型结构，所以定义一个effectStack通过入栈和出栈保留对effect的一致。举个例子来说明为什么需要这样子。

例如：

```typescript
effect(()=> {
  state.name  
  effect(()=> {
    state.name2 
  })
  state.age
})
```

我们可以看到上面的代码有两个effect的嵌套形式， 如果不采用栈的形式， 那么对应依赖对应的effect可能会有问题， 如下面所示

```typescript
effect(()=> {
  state.name   // 对应effect1
  effect(()=> {
    state.name2  // 对应effect2
  })
  state.age // 可能会对应effect2
})
```

这样子就会有问题， 我们原本是想要这样子的

```typescript
effect(()=> {
  state.name  // 对应effect1
  effect(()=> {
    state.name2 // 对应effect2
  })
  state.age // 对应effect1
})
```

这样子才是我们想要的。那么为了解决这个问题，所以使用的栈结构。

**当effect开始执行后， 入栈， 当执行完毕后， 出栈**

#### 无限循环问题

另外，还有一个问题， 如下面代码所示

```typescript
effect(() => {
  state.age ++
})
```

这个 state.age ++， 因为一直执行自增操作， 所以依赖一直变化，从而造成无限循环，最终导致栈溢出。所以我们必须重复的effect进行处理，避免这种无限循环的问题。

```typescript
let effectStack = [] // 存储当前effect
const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      try {
        // 进栈
        effectStack.push(effect)
        activeEffect = effect
        return fn() // 执行用户传过来的函数 -- 函数会去取到值, 触发get
      } finally {
        // 无论结果怎么样
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
```

这种无限循环的问题解决办法就是每次effect加入到effect栈的时候，我们都判断这个effect是否已经在栈中，如果在栈中，我们就跳过加入，不在才加入到栈中。

### 依赖收集和依赖触发

有了effect函数我们还不够， 我们还需要去主动去触发effect， 让其达到更新的效果。

那么我们应该在什么时候去收集这个effect函数，什么时候去触发这个函数呢？

**在进行get操作的时候（读取操作）， 我们去收集这个effect函数**

**在进行set操作的时候（设置操作），我们去触发这个effect函数**

#### **依赖收集（收集effect函数）**

收集effect函数（依赖）如下面代码所示：

```typescript
// 收集当前target对应的effect函数
const targetMap = new WeakMap()
// 收集依赖(effect)
export function track(target, type, key) {

  // 当前没有当前effect
  if (!activeEffect) return
  // 是否已经收集过了
  let depsMap = targetMap.get(target)
  // 没有收集过才起去收集
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map))
  }
  // 是否已经收集过了该对象属性了
  let dep = depsMap.get(key)
  if (!dep) {
    // set结构防止重复
    depsMap.set(key, (dep = new Set))
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
  }
}
```

上面的代码中， 我们定义了一个全局的targetMap， 这里使用了new WeakMap()， 好处是可以自动垃圾回收。

track就是我们依赖收集函数， 这里传入三个参数target, type, key分别**对应收集的目标、进行什么类型操作（例如：get、add、set等等操作）、目标键**。在track代码内部中，我们先是判断有没有activeEffect， 也就是，你有没有使用effect函数， 如果没有则不收集，如果有才去收集。例如：

```typescript
const state = reactive({name: 'vvv'})
console.log(state.name)
```

上面的代码中并没有用到effect函数，因此，并不会去收集依赖。

```typescript
const state = reactive({name: 'vvv'})
effect(() => {
  console.log(state.name)
})
```

上面的代码有用到effect函数，因此，会去收集依赖。

#### **依赖触发（触发effect函数）**

依赖收集好之后， 我们需要时机去触发这些依赖， 那么需要怎么的时机呢？ 当依赖的值发生变化， 如下面代码所示：

```typescript
const state = reactive({name: 'vvv'})
effect(() => {
  console.log(state.name)
})

state.name = '123vvv' // state.name发生改变， 进行set操作
```

上面代码中state.name发生改变， 会进行set操作， 因此，我们只要把触发依赖的函数放在set就行， 当依赖的值发生变化，就会重新effect函数。

下面是**依赖触发**的具体实现：

```typescript
// 触发依赖(effect())
export function trigger(target, type, key, value?, oldVal?) {
  console.log(target, type, key, value, oldVal);

  // 如果这个对象没有收集过effect
  const depsMap = targetMap.get(target)
  if (!depsMap) return;

  // 将所以要执行的effect 全部存储到一个集合中, 最终一起执行
  const effects = new Set() // 优点: 去重

  const add = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach((effect) => {
        effects.add(effect) // forEach 循环加入 effect
      })
    }
  }
  console.log(depsMap)
  // 特殊处理
  if (key === 'length' && isArray(target)) {
    
    
    // 如果对应的长度, 有依赖收集需要更新
    depsMap.forEach((dep, key) => {
      console.log('key:' +key);
      console.log('value:' + value);
      /**
       * value => 更改的长度(newValue)
       * key => 数组的长度
       * 更改的长度小于数组的长度才会触发依赖添加
       * 例如: effect(() => state.arr.length)   总state.arr.length = 3
       * 下面对state.arr.length进行修改 => state.arr.length = 10
       * 更改的长度大于数组的长度  => 不进行依赖触发
       * 
       * 下面对state.arr.length进行修改 => state.arr.length = 2
       * 更改的长度小于数组的长度 => 进行依赖触发
       */
      if (key === 'length' || key > value) { // 更改的长度小于索引
        add(dep)
      }
    })
  } else {
    if (key != undefined) {
      
      // 获取到depsMap.get(key)里面的
      add(depsMap.get(key))
    }
    /**
     * 如果是新增, 但是在effect并没有收集到arr.length的依赖就没必要出触发更新了
     * 例如: effect(() => state.arr[2]) 
     * 然后 state.arr[10] = 10  => 这种其实是收集length
     */
    switch(type) {
      case TriggerOrTypes.ADD:
        // console.log('key:' +key);
        // 新的索引添加到数组中 => length变化
        if(isArray(target) && isIntegerKey(key)) {
          add(depsMap.get('length'))
        }
   }
  }  
  effects.forEach((effect: any) => {
      effect()
  })
}
```

上面的代码中，我们通过effects把所有需要触发的依赖都放入其中， 并且effects的格式具有去重的优点，这样也不用担心依赖会重复的加入了。这里处理问题比较多的是数组的问题， 下面展示数组的相关问题以及解决办法。

#### （1）、收集的依赖属性是length， 更改的属性也是length

```typescript
effect(() => {
  app.innerHTML = state.arr.length
})
setTimeout(() => {
  state.arr.length = 10
}, 1000)
```

这种情况收集的依赖属性是length，  更改的属性也是length， 会重新触发effect。

#### （2）、收集的依赖属性是length， 更改的属性也是索引（新增索引）

```typescript
effect(() => {
  app.innerHTML = state.arr.length
})
setTimeout(() => {
  state.arr[10] = 10
}, 1000)
```

这种情况收集的依赖属性是length，  更改的属性也是新索引， 也会重新触发effect。

#### （3）、收集的依赖属性是索引2， 更改的属性也是索引2

```typescript
effect(() => {
  app.innerHTML = state.arr[2]
})
setTimeout(() => {
  state.arr[2] = 10
}, 1000)
```

这种情况收集的依赖属性是索引2，  更改的属性也是索引2， 也会重新触发effect。

#### （4）、收集的依赖属性是索引2， 更改的属性也是索引10 (新增索引)

```typescript
effect(() => {
  app.innerHTML = state.arr[2]
})
setTimeout(() => {
  state.arr[10] = 10
}, 1000)
```

这种情况收集的依赖属性是索引2，  更改的属性也是索引10（新增索引）， **并不会重新触发effect， 因为不相干**。

#### （5）、收集的依赖属性是索引2， 更改的属性也是索引1 (其他索引)

```typescript
effect(() => {
  app.innerHTML = state.arr[2]
})
setTimeout(() => {
  state.arr[1] = 10
}, 1000)
```

这种情况收集的依赖属性是索引2，  更改的属性也是索引1（其他索引）， **并不会重新触发effect， 因为不相干**。

#### （6）、收集的依赖属性是length， 更改的属性也是索引1 (其他索引)

```typescript
 effect(() => {
      console.log(123)
      app.innerHTML = state.arr.length
    })
    setTimeout(() => {
      state.arr[1] = 10
    }, 1000)
```

这种情况收集的依赖属性是length，  更改的属性也是索引1（其他索引）， **并不会重新触发effect， length不受影响**。

结论：

- 当收集的属性为length， 会重新触发effect的有（length变化、新增的索引大于数组长度）
- 当收集的属性为索引（数组存在的索引），会重新触发effect只有本身发生变化。



## mini-vue3实现相关

[reactive实现](https://codevity.top/article/web/vue/vue3/source-code/1-reactive.html)

[ref实现](https://codevity.top/article/web/vue/vue3/source-code/3-ref.html)

[effect实现](https://codevity.top/article/web/vue/vue3/source-code/2-effect.html)

[computed实现](https://codevity.top/article/web/vue/vue3/source-code/5-computed.html)