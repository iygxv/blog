# vue3知识进阶

## 响应式基础(ref和reactive)

### reactive

可以使用 [reactive()](https://staging-cn.vuejs.org/api/reactivity-core.html#reactive)函数创建一个响应式对象或数组

```javascript
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

要在组件模板中使用响应式状态，请在 `setup()` 函数中定义并返回。

```vue
<div>{{ state.count }}</div>
```

```javascript
import { reactive } from 'vue'

export default {
  // `setup` 是一个专门用于组合式 API 的特殊钩子
  setup() {
    const state = reactive({ count: 0 })

    // 暴露 state 到模板
    return {
      state
    }
  }
}
```

在 `setup()` 函数中手动暴露状态和方法可能非常繁琐。当使用单文件组件（SFC）时，我们可以使用 `<script setup>` 来简化大量样板代码。

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })
</script>

<template>
   <div>{{ state.count }}</div>
</template>
```

### DOM 更新时机

当你更改响应式状态后，DOM 也会自动更新。然而，你得注意 DOM 的更新并不是同步的。相反，Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次声明更改，每个组件都只需要更新一次。

若要等待一个状态改变后的 DOM 更新完成，你可以使用 [nextTick()](https://staging-cn.vuejs.org/api/general.html#nexttick) 这个全局 API：

```javascript
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // 访问更新后的 DOM
  })
}
```

### 深层响应性

在 Vue 中，状态都是默认深层响应式的。这意味着即使在更改深层次的对象或数组，你的改动也能被检测到。

```javascript
import { reactive } from 'vue'

const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.nested.count++
  obj.arr.push('baz')
}
```

### 响应式代理 vs 原始对象

值得注意的是，`reactive()` 返回的是一个原始对象的 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，它和原始对象是不相等的：

```javascript
const raw = {}
const proxy = reactive(raw)

// 代理和原始对象不是全等的
console.log(proxy === raw) // false
```

只有代理是响应式的，更改原始对象不会触发更新。因此，使用 Vue 的响应式系统的最佳实践是 **仅使用你声明对象的代理版本**。

为保证访问代理的一致性，对同一个对象调用 `reactive()` 会总是返回同样的代理，而对一个已存在代理调用 `reactive()` 也是返回同样的代理：

```javascript
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true
```

这个规则对嵌套对象也适用。依靠深层响应性，响应式对象内的嵌套对象依然是代理：

```javascript
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### reactive的局限性

`reactive()` API 有两条限制：

1. 仅对对象类型有效（对象、数组和 `Map`、`Set` 这样的[集合类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#%E4%BD%BF%E7%94%A8%E9%94%AE%E7%9A%84%E9%9B%86%E5%90%88%E5%AF%B9%E8%B1%A1)），而对 `string`、`number` 和 `boolean` 这样的 [原始类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) 无效。
2. 因为 Vue 的响应式系统是通过 property 访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失：

```javascript
let state = reactive({ count: 0 })

// 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
state = reactive({ count: 1 })
```

同时这也意味着当我们`将响应式对象的 property 赋值或解构至本地变量时`，或是`将该 property 传入一个函数时`，`我们会失去响应性`：

```javascript
const state = reactive({ count: 0 })

// n 是一个局部变量，同 state.count
// 失去响应性连接
let n = state.count
// 不影响原始的 state
n++

// count 也和 state.count 失去了响应性连接
let { count } = state
// 不会影响原始的 state
count++

// 该函数接收一个普通数字，并且
// 将无法跟踪 state.count 的变化
callSomeFunction(state.count)
```

### ref

为了解决 `reactive()` 带来的限制，Vue 也提供了一个 [ref()](https://staging-cn.vuejs.org/api/reactivity-core.html#ref) 方法来允许我们创建可以使用任何值类型的响应式 **ref**：

```javascript
import { ref } from 'vue'

const count = ref(0)
```

`ref()` 从参数中获取到值，将其包装为一个带 `.value` property 的 ref 对象：

```javascript
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

一个包含对象类型值的 ref `可以响应式地替换整个对象`：

```javascript
const objectRef = ref({ count: 0 })

// 这是响应式的替换
objectRef.value = { count: 1 }
```

**ref 被传递给函数或是从一般对象上被解构时，不会丢失响应性**

```javascript
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// 该函数接收一个 ref
// 需要通过 .value 取值
// 但它会保持响应性
callSomeFunction(obj.foo)

// 仍然是响应式的
const { foo, bar } = obj
```

一言以蔽之，`ref()` 使我们能创造一种任意值的 “引用” 并能够不丢失响应性地随意传递。这个功能非常重要，因为它经常用于将逻辑提取到 [组合函数](https://staging-cn.vuejs.org/guide/reusability/composables.html) 中。

### ref 在模板中的解包

当 ref 在模板中作为顶层 property 被访问时，它们会被自动“解包”，所以不需要使用 `.value`。下面是之前的计数器例子，用 `ref()` 代替：

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- 无需 .value -->
  </button>
</template>
```

**请注意，仅当 ref 是模板渲染上下文的顶层 property 时才适用自动“解包”。 例如， foo 是顶层 property，但 object.foo 不是。**

例如:

```javascript
const object = { foo: ref(1) }
```

下面的表达式将**不会**像预期的那样工作：

```javascript
{{ object.foo + 1 }}
```

渲染的结果会是一个 `[object Object]`，因为 `object.foo` 是一个 ref 对象。我们可以通过让 `foo` 成为顶级 property 来解决这个问题：

```javascript
const { foo } = object

{{ foo + 1 }}
```

现在渲染结果将是 `2`。

### ref 在响应式对象中的解包

当一个 `ref` 作为一个响应式对象的 property 被访问或更改时，它会自动解包，因此会表现得和一般的 property 一样：

```javascript
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

如果将一个新的 ref 赋值给一个关联了已有 ref 的 property，那么它会替换掉旧的 ref：

```javascript
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// 原始 ref 现在已经和 state.count 失去联系
console.log(count.value) // 1
```

只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为[浅层响应式对象](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)的 property 被访问时不会解包。

#### 数组和集合类型的 ref 解包

不像响应式对象，当 ref 作为响应式数组或像 `Map` 这种原生集合类型的元素被访问时，不会进行解包。

```javascript
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)
```

## 计算属性computed

推荐使用**计算属性**来描述依赖响应式状态的复杂逻辑

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

在这里定义了一个计算属性 `publishedBooksMessage`。`computed()` 方法`期望接收一个 getter 函数`，返回值为一个**计算属性 ref**。和其他一般的 ref 类似，你可以通过 `publishedBooksMessage.value` 访问计算结果。计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 `.value`。

Vue 的计算属性会自动追踪响应式依赖。它会检测到 `publishedBooksMessage` 依赖于 `author.books`，所以当 `author.books` 改变时，任何依赖于 `publishedBooksMessage` 的绑定都会同时更新。

### 计算属性缓存 vs 方法

你可能注意到我们在表达式中像这样调用一个函数也会获得和计算属性相同的结果：

```javascript
<p>{{ calculateBooksMessage() }}</p>
```

```javascript
// 组件中
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}
```

若我们将同样的函数定义为一个方法而不是计算属性，两种方式在结果上确实是完全相同的，然而，不同之处在于**计算属性值会基于其响应式依赖被缓存**。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要 `author.books` 不改变，无论多少次访问 `publishedBooksMessage` 都会立即返回先前的计算结果，而不用重复执行 getter 函数。

### 最佳实践

**计算函数不应有副作用**

计算属性的计算函数应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。

举个例子，不要在计算函数中做异步请求或者更改 DOM！一个计算属性的声明中描述的是如何根据其他值派生一个值。因此计算函数的职责应该仅为计算和返回该值。在之后的指引中我们会讨论如何使用[监听器](https://staging-cn.vuejs.org/guide/essentials/watchers.html)根据其他响应式状态的变更来创建副作用。

**避免直接修改计算属性值**

从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。



## watch

### 侦听来源类型

`watch` 的第一个参数可以是不同形式的“来源”：它可以是一个`ref (包括计算属性`)、`一个响应式对象`、`一个 getter 函数`、或`多个来源组成的数组`：

```javascript
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

**!!!注意，你不能侦听响应式对象的 property，例如:**

```javascript
const obj = reactive({ count: 0 })

// 这不起作用，因为你是向 watch() 传入了一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
```

**而是用 getter 函数：**

```javascript
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

### 深层侦听器

直接给 `watch()` 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发：

```javascript
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的 property 变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++
```

这不同于返回响应式对象的 getter 函数：只有在 getter 函数返回不同的对象时，才会触发回调：

```javascript
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)
```

然而，在上面的例子里，你可以显式地加上 `deep` 选项，强制转成深层侦听器：

```javascript
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true }
)
```

**谨慎使用**

深度侦听需要遍历被侦听对象中的所有嵌套的 property，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。

### watchEffect

`watch()` 是懒执行的：仅在侦听源变化时，才会执行回调。

但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。举个例子，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。我们可以这样写：

```javascript
const url = ref('https://...')
const data = ref(null)

watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

### `watch` vs `watchEffect`

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch` 只追踪明确侦听的源。它不会追踪任何在回调中访问到的东西。另外，仅在响应源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式 property。这更方便，而且代码往往更简洁，但其响应性依赖关系不那么明确。

### 回调的刷新时机

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。

默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

如果想在侦听器回调中能访问被 Vue 更新**之后**的DOM，你需要指明 `flush: 'post'` 选项：

```javascript
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

后置刷新的 `watchEffect()` 有个更方便的别名 `watchPostEffect()`：

```javascript
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

### 停止侦听器

在 `setup()` 或 `<script setup>` 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，你无需关心怎么停止一个侦听器。

一个关键点是，侦听器必须用**同步**语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。如下方这个例子：

```javascript
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

要手动停止一个侦听器，请调用 `watch` 或 `watchEffect` 返回的函数：

```javascript
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```

注意，需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑：

```javascript
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```

## 模板ref

虽然 Vue 的声明性渲染模型为你抽象了大部分对 DOM 的直接操作，但在某些情况下，我们仍然需要直接访问底层 DOM 元素。要实现这一点，我们可以使用特殊的 `ref` attribute：

```html
<input ref="input">
```

`ref` 是一个特殊的 attribute，和 `v-for` 中提到的 `key` 类似。它允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用。这可能很有用，比如说在组件挂载时编程式地聚焦到一个 input 元素上，或在一个元素上初始化一个第三方库。

### 访问模板 ref

为了通过组合式 API 获得该模板 ref，我们需要声明一个同名的 ref：

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

注意，你只可以**在组件挂载后**才能访问 ref。如果你想在模板中的表达式上访问 `input`，在初次渲染时会是 `null`。这是因为在初次渲染前这个元素还压根不存在呢！

如果你正试图观察一个模板 ref 的变化，确保考虑到 ref 的值为 `null` 的情况：

```javascript
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
  }
})
```

### `v-for` 中的 ref

**tip: 需要 v3.2.25 及以上版本**

当 `ref` 在 `v-for` 中使用时，相应的 ref 中包含的值是一个数组，它将在元素被挂载后填充：

```javascript
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

**注意的是，ref 数组**不能**保证与源数组相同的顺序**

### 函数型 ref

除了使用字符串值作名字，`ref` attribute 还可以绑定为一个函数，会在每次组件更新时都被调用。函数接受该元素引用作为第一个参数：

```vue
<input :ref="(el) => { /* 将 el 分配给 property 或 ref */ }">
```

如果你正在使用一个动态的 `:ref` 绑定，我们也可以传一个函数。当元素卸载时，这个 `el` 参数会是 `null`。你当然也可以使用一个方法而不是内联函数。

### 组件上的 ref

`ref` 也可以被用在一个子组件上。此时 ref 中引用的是组件实例：

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value 是 <Child /> 组件的实例
})
</script>

<template>
  <Child ref="child" />
</template>
```

如果一个子组件使用的是选项式 API 或`没有使用 <script setup>`，被引用的组件实例和该子组件的 `this` 完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权。这使得在父组件和子组件之间创建紧密耦合的实现细节变得很容易，当然也因此，应该只在绝对需要时才使用组件引用。大多数情况下，你应该首先使用标准的 props 和 emit 接口来实现父子组件交互。

有一个例外的情况，使用了 `<script setup>` 的组件是**默认私有**的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 `defineExpose` 宏显式暴露：

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

当父组件通过模板 ref 获取到了该组件的实例时，得到的实例类型为 `{ a: number, b: number }` (ref 都会自动解包，和一般的实例一样)。

## 深入组件

### 依赖注入

通常情况下，当我们需要从父组件向子组件传递数据时，会使用 [props](https://staging-cn.vuejs.org/guide/components/props.html)。想象一下这样的结构：有一些多层级嵌套的组件，形成了一颗巨大的组件树，而某个深层的子组件需要一个较远的祖先组件中的部分内容。在这种情况下，如果仅使用 props 则必须将其沿着组件链逐级传递下去，这会非常麻烦：

为解决这一问题，可以使用 `provide` 和 `inject` 一个父组件相对于其所有的后代组件，会作为**依赖提供者**。任何后代的组件树，无论层级有多深，都可以**注入**由父组件提供给整条链路的依赖。

**Provide (供给)**

要为组件后代供给数据，需要使用到 [provide()](https://staging-cn.vuejs.org/api/composition-api-dependency-injection.html#provide) 函数：

```javascript
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
```

`provide()` 函数接收两个参数。第一个参数被称为**注入名**，可以是一个字符串或是一个 `Symbol`。

后代组件会用注入名来查找期望注入的值。一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值。

第二个参数是供给的值，值可以是任意类型，包括响应式的状态，比如一个 ref：

```javascript
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

供给的响应式状态使后代组件可以由此和供给者建立响应式的联系。

**应用层 Provide**

除了供给一个组件的数据，我们还可以在整个应用层面做供给：

```javascript
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```

应用级的供给在应用的所有组件中都可以注入。这在你编写[插件](https://staging-cn.vuejs.org/guide/reusability/plugins.html)时会特别有用，因为插件一般都不会使用组件形式来供给值

**Inject (注入)**

要注入祖先组件供给的数据，需使用 [inject()](https://staging-cn.vuejs.org/api/composition-api-dependency-injection.html#inject) 函数：

```javascript
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

如果供给的值是一个 ref，注入进来的就是它本身，而**不会**自动解包。这使得被注入的组件保持了和供给者的响应性链接。

**注入的默认值**

默认情况下，`inject` 假设传入的注入名会被某个祖先链上的组件提供。如果该注入名的确没有任何组件提供，则会抛出一个运行时警告。

如果在供给的一侧看来属性是可选提供的，那么注入时我们应该声明一个默认值，和 props 类似：

```javascript
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')
```

在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得。

为了避免在不使用可选值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值：

```javascript
const value = inject('key', () => new ExpensiveClass())
```

## 单文件组件

### CSS 作用域

当 `style` 标签带有 scoped attribute 的时候，它的 CSS 只会应用到当前组件的元素上。这类似于 Shadow DOM 中的样式封装。它带有一些注意事项，不过好处是不需要任何的 polyfill。它的实现方式是通过 PostCSS 将以下内容：

```vue
<style scoped>
  .example {
    color: red;
  }
</style>

<template>
<div class="example">hi</div>
</template>
```

转换为：

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### 子组件的根元素

使用 scoped 后，父组件的样式将不会渗透到子组件中。不过，子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

### 深度选择器

处于 scoped 样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件，可以使用 :deep() 这个伪类：

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

上面的代码会被编译成：

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

**TIP**: 通过 v-html 创建的 DOM 内容不会被作用域样式影响，但你仍然可以使用深度选择器来设置其样式。

### 插槽选择器

默认情况下，作用域样式不会影响到 slot/ 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。使用 :slotted 伪类以明确地将插槽内容作为选择器的目标：

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### 混合使用局部与全局样式

```css
<style>
/* 全局样式 */
</style>

<style scoped>
/* 局部样式 */
</style>
```

### 作用域样式提示

- **作用域样式并没有消除对 class 的需求**。由于浏览器渲染各种各样 CSS 选择器的方式，p { color: red } 结合作用域样式使用时 (即当与 attribute 选择器组合的时候) 会慢很多倍。如果你使用 class 或者 id 来替代，例如 .example { color: red }，那你几乎就可以避免性能的损失。

- **小心递归组件中的后代选择器**！对于一个使用了 .a .b 选择器的样式规则来说，如果匹配到 .a 的元素包含了一个递归的子组件，那么所有的在那个子组件中的 .b 都会匹配到这条样式规则。

## CSS Modules

一个 style module 标签会被编译为 [CSS Modules](https://github.com/css-modules/css-modules) 并且将生成的 CSS class 作为 $style 对象暴露给组件：

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

得出的 class 将被哈希化以避免冲突，实现了同样的将 CSS 仅作用于当前组件的效果。

### 自定义注入名称

你可以通过给 module attribute 一个值来自定义注入 class 对象的 property 键：

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### 与组合式 API 一同使用

可以通过 **useCssModule API** 在 setup() 和 script setup 中访问注入的 class。对于使用了自定义注入名称的 style module块，useCssModule 接收一个匹配的 module attribute 值作为第一个参数：

```js
import { useCssModule } from 'vue'

// 在 setup() 作用域中...
// 默认情况下, 返回 <style module> 的 class 
useCssModule()

// 具名情况下, 返回 <style module="classes"> 的 class 
useCssModule('classes')
```

### CSS 中的 v-bind()

单文件组件的style标签支持使用 v-bind CSS 函数将 CSS 的值链接到动态的组件状态：

```vue
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

实际的值会被编译成哈希化的 CSS 自定义 property，因此 CSS 本身仍然是静态的。自定义 property 会通过内联样式的方式应用到组件的根元素上，并且在源值变更的时候响应式地更新。

## 其他

[vue3文档](https://staging-cn.vuejs.org/guide/introduction.html)

