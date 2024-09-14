---
top: 1
sticky: 1000
sidebar:
  title: EveryT
  step: 5
  isTimeLine: true
title: EveryT
tags:
  - 笔记
categories:
  - 笔记
---

# EveryT

## 每日 3 问（2024-9-13）

### 在页面中添加水印可以通过控制台移除，那么怎么样才能避免用户移除水印呢?

可以通过用 MutationObserver 监听，重新添加水印

示例代码：

```js
function watermark(options = {}) {
  const {
    container = document.body, // 容器
    width = "240", // canvas元素宽
    height = "100", // canvas元素高
    textAlign = "left", // 文字对齐
    textBaseline = "bottom", // 基准线
    font = "16px Microsoft Yahei", // 字体大小及样式
    fillStyle = "#000", // 自定义水印的颜色
    content = "进制外传", // 水印内容
    globalAlpha = 0.3, // 设置图形和图像透明度的值
    rotate = 16, // 文字旋转角度
    zIndex = 1000, // 元素堆叠顺序
  } = options;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  const ctx = canvas.getContext("2d"); // 获取 canvas2d 上下文
  ctx.globalAlpha = globalAlpha;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.rotate((Math.PI * rotate) / 180);
  // ctx.rotate(-10 * Math.PI / 140);
  ctx.fillText(content, 50, 50);

  const base64Url = canvas.toDataURL(); // 返回一个包含图片展示的 data URI

  const __wm = document.querySelector(".__wm"); // 选择器
  const watermarkDiv = __wm || document.createElement("div");
  const waterMarkStyle = `
    position:absolute;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
    z-index:${zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${base64Url}')`;

  watermarkDiv.setAttribute("style", waterMarkStyle);
  watermarkDiv.classList.add("__wm"); // 为元素添加“__wm”类名

  container.style.position = "relative";
  container.appendChild(watermarkDiv); // 添加元素

  // 监听删除 防止用户去手动删除，如果手动删除 ，在重新添加
  const MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;
  // 检查浏览器是否支持这个API
  if (MutationObserver) {
    const args = arguments[0];
    const __wm = document.querySelector(".__wm");
    let mo = new MutationObserver(function () {
      // 只在__wm元素变动才重新调用
      if (
        (__wm && __wm.getAttribute("style") !== waterMarkStyle) ||
        !__wm ||
        document.body.style.position !== "relative"
      ) {
        // 避免一直触发
        mo.disconnect();
        mo = null;
        watermark(args);
      }
    });
    mo.observe(__wm, {
      // 视情况开启
      attributes: true, // 观察目标节点的属性节点
      subtree: false, // 观察目标节点的所有后代节点
      childList: true, // 观察目标节点的子节点
    });
  }
}
export default watermark;
```

### width:100% 与 width:auto 有什么区别呢?

- width:100% : 子元素的 content 撑满父元素的 content，如果子元素还有 padding、border 等属性，或者是在父元素上设置了边距和填充，都有可能会造成子元素区域溢出显示

- width:auto : 子元素的 content + padding + border + margin 等撑满父元素的 content 区域

### 运行 npm run xxx 的时候发生了什么？

运行 npm run xxx 的时候，npm 会先在当前目录的 node_modules/.bin 查找要执行的程序，如果找到则运行
没有找到则从全局的 node_modules/.bin 中查找
如果全局目录还是没找到，那么就从 path 环境变量中查找有没有其他同名的可执行程序

## 每日 3 问（2024-9-12）

### ES 如何实现 let 和 const 呢？

**let 的特性**

- 在块级作用域内有效
- 不能重复声明
- 不能预处理，不存在变量提升，即未声明之前的代码不能调用

我们可以通过匿名函数和闭包的形式来模拟 let

```js
(function () {
  var c = 3;
  console.log(c); // 1
})();
console.log(c); // c is not defined
```

**count 的特性**

- 在块级作用域内有效
- 不能重复声明
- 不能预处理，不存在变量提升，即未声明之前的代码不能调用

我们可以通过 Object.defineProperty 来模拟 const

```js
function _const(key, value) {
  window[key] = value;
  Object.defineProperty(window, key, {
    enumerable: false, // 不可枚举
    configurable: false, // 不可配置
    get: function () {
      return value;
    },
    set: function (newValue) {
      if (newValue !== value) {
        throw TypeError("这是只读变量，不可修改");
      } else {
        return value;
      }
    },
  });
}
```

### base64 为什么比 png 大？

一般情况下，base64 编码后的字符串长度会比原始图片的大小大约为 4/3 左右。这是因为 base64 编码将 3 个字节转换为 4 个字符，同时可能会添加一些填充字符。
此外，图片在编码为 base64 格式时，通常会进行二进制转换，将每个像素的颜色信息转换为二进制数据，然后再将这些二进制数据编码为 base64 字符串。由于 base64 编码使用的是文本形式表示二进制数据，因此在编码过程中可能会引入一些额外的开销和填充，从而导致编码后的字符串比原始图片的大小更大。

### 为什么 Vue3 中使用 ref 定义的变量要用 .value 呢?

源码中 使用 了 get value 函数和 set value 函数, 在使用 getter 和 setter 的时候为实例创建一个伪属性（value）

大概源码展示:

```js
class RefImpl {
  private _value // 私有的值
  private _rawValue // 私有的原始值
  public readonly __v_isRef = true
  constructor(value, public readonly __v_isShallow: boolean) {
    this._rawValue = value
    this._value = __v_isShallow ? value : toReactive(value)
  }

  // 代理
  get value() {
    // 收集依赖
    track(this, trackOpTypes.GET, 'value')
    return this._value
  }
  set value(newVal) {
    if(hasChanged(newVal, this._rawValue)) {
       this._rawValue = newVal
       this._value =  this.__v_isShallow ? newVal : toReactive(newVal)
       // 触发依赖
       trigger(this, TriggerOrTypes.SET, 'value', newVal)
    }
  }
}
```

## npm、yarn、pnpm 的区别？（2024-9-11）

[npm、yarn、pnpm 的区别？](https://icodehub.top/blog/engineering/npm%E3%80%81yarn%E3%80%81pnpm%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F.html)

## 每日 3 问（2024-9-10）

### Javascript 本地存储的方式有哪些，有什么区别，及有哪些应用场景？

`javaScript` 本地缓存的方法我们主要讲述以下四种：

- cookie
- sessionStorage
- localStorage
- indexedDB

**cookie**

`Cookie`，类型为「小型文本文件」，指某些网站为了辨别用户身份而储存在用户本地终端上的数据。是为了`解决 HTTP 无状态导致的问题`

作为一段一般不超过 4KB 的小型文本数据，它由一个名称（Name）、一个值（Value）和其它几个用于控制 cookie 有效期、安全性、使用范围的可选属性组成

但是 cookie 在每次请求中都会被发送，如果不使用 HTTPS 并对其加密，其保存的信息很容易被窃取，导致安全风险。举个例子，在一些使用 cookie 保持登录态的网站上，如果 cookie 被窃取，他人很容易利用你的 cookie 来假扮成你登录网站

**localStorage**

- 生命周期：持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的
- 存储的信息在同一域中是共享的
- 当本页操作（新增、修改、删除）了`localStorage` 的时候，本页面不会触发 storage 事件,但是别的页面会触发`storage` 事件。
- 大小：5M（跟浏览器厂商有关系）
- `localStorage` 本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡
- 受同源策略的限制

**sessionStorage**

`sessionStorage` 和 `localStorage` 使用方法基本一致，唯一不同的是生命周期，一旦页面（会话）关闭，`sessionStorage` 将会删除数据

**indexedDB**

`indexedDB` 是一种低级 API，用于客户端存储大量结构化数据(包括, 文件/ blobs)。该 API 使用索引来实现对该数据的高性能搜索

虽然 Web Storage 对于存储较少量的数据很有用，但对于存储更大量的结构化数据来说，这种方法不太有用。`IndexedDB` 提供了一个解决方案

**区别**

- 存储大小： `cookie` 数据大小不能超过 4k，`sessionStorage` 和`localStorage` 虽然也有存储大小的限制，但比`cookie` 大得多，可以达到 5M 或更大

- 有效时间：`localStorage `存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；` sessionStorage` 数据在当前浏览器窗口关闭后自动删除；`cookie`设置的 `cookie` 过期时间之前一直有效，即使窗口或浏览器关闭

- 数据与服务器之间的交互方式， `cookie` 的数据会自动的传递到服务器，服务器端也可以写 cookie 到客户端；` sessionStorage` 和` localStorage` 不会自动把数据发给服务器，仅在本地保存

**应用场景**

在了解了上述的前端的缓存方式后，我们可以看看针对不对场景的使用选择：

- 标记用户与跟踪用户行为的情况，推荐使用`cookie`
- 适合长期保存在本地的数据（令牌），推荐使用`localStorage`
- 敏感账号一次性登录，推荐使用`sessionStorage`
- 存储大量数据的情况、在线文档（富文本编辑器）保存编辑历史的情况，推荐使用`indexedDB`

### 前端跨页面通信，你知道哪些方法？

在前端中，有几种方法可用于实现跨页面通信：

- **LocalStorage 或 SessionStorage**：这两个 Web 存储 API 可以在不同页面之间共享数据。一个页面可以将数据存储在本地存储中，另一个页面则可以读取该数据并进行相应处理。通过监听 storage 事件，可以实现数据的实时更新。

- **Cookies**：使用 Cookies 也可以在不同页面之间传递数据。通过设置和读取 Cookie 值，可以在同一域名下的不同页面之间交换信息。

- **PostMessage**：window.postMessage() 方法允许从一个窗口向另一个窗口发送消息，并在目标窗口上触发 message 事件。通过指定目标窗口的 origin，可以确保只有特定窗口能够接收和处理消息。

- **Broadcast Channel**：Broadcast Channel API 允许在同一浏览器下的不同上下文（例如，在不同标签页或 iframe 中）之间进行双向通信。它提供了一个类似于发布-订阅模式的机制，通过创建一个广播频道，并在不同上下文中加入该频道，可以实现消息的广播和接收。

- **SharedWorker**：SharedWorker 是一个可由多个窗口或标签页共享的 Web Worker，它可以在不同页面之间进行跨页面通信。通过 SharedWorker，多个页面可以通过 postMessage 进行双向通信，并共享数据和执行操作。

- **IndexedDB**：IndexedDB 是浏览器提供的一个客户端数据库，可以在不同页面之间存储和共享数据。通过在一个页面中写入数据，另一个页面可以读取该数据。

- **WebSockets**：WebSockets 提供了全双工的、双向通信通道，可以在客户端和服务器之间进行实时通信。通过建立 WebSocket 连接，可以在不同页面之间通过服务器传递数据并实现实时更新。

### 如何判断元素是否在可视区域？

**如何判断元素是否在可视区域？主要有三种方法**

**方法一**

- 通过 document.documentElement.clientHeight 获取屏幕可视窗口高度
- 通过 element.offsetTop 获取元素相对于文档顶部的距离
- 通过 document.documentElement.scrollTop 获取浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离

然后判断 ②-③<① 是否成立，如果成立，元素就在可视区域内。

<img class="question-img"  src="https://www.icodehub.top/seeking-wd/assets/js-view-methods-1.png" alt="image" style="zoom:50%;" />

**方法二：通过 getBoundingClientRect 方法**
通过 getBoundingClientRect()方法来获取元素的大小以及位置，MDN 上是这样描述的：
`Element.getBoundingClientRect() 方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置。`

<img class="question-img"  src="https://www.icodehub.top/seeking-wd/assets/element-box-diagram.png" alt="image" style="zoom:70%;" />

我们这样判断：

```js
function isInSight(el) {
  const bound = el.getBoundingClientRect();
  const clientHeight = window.innerHeigh;
  // 这里有个+100是为了提前加载。
  return bound.top <= clientHeight + 100;
}
```

**方法三：通过 IntersectionObserver 方法**
IntersectionObserver 可以自动观察元素是否在视口内。

```js
const io = new IntersectionObserver((ioes) => {
  ioes.forEach((ioe) => {
    const el = ioe.target;
    const intersectionRatio = ioe.intersectionRatio;
    if (intersectionRatio > 0 && intersectionRatio <= 1) {
      // intersectionRatio来判断是否在可视区域内，当intersectionRatio > 0 && intersectionRatio <= 1即在可视区域内。
    }
    el.onload = el.onerror = () => io.unobserve(el);
  });
});
```

**总结：**

判断元素是否在可视区域的三种方法

- 通过 document 中的一些方法
- 通过 getBoundingClientRect 方法
- 通过 IntersectionObserver 方法

## 每日 3 问（2024-9-9）

### vue 中怎么缓存当前的组件？缓存后怎么更新？

开发中缓存组件使用 **keep-alive 组件，keep-alive 是 vue 内置组件**，keep-alive 包裹动态组件 component 时，会缓存不活动的组件实例，而不是销毁它们，这样在组件切换过程中将状态保留在内存中，防止重复渲染 DOM。

结合属性 include 和 exclude 可以明确指定缓存哪些组件或排除缓存指定组件。

vue3 中结合 vue-router 时变化较大，之前是 keep-alive 包裹 router-view，现在需要反过来用 router-view 包裹 keep-alive

缓存后如果要获取数据，解决方案可以有以下两种：

- beforeRouteEnter：在有 vue-router 的项目，每次进入路由的时候，都会执行 beforeRouteEnter
- actived：在 keep-alive 缓存的组件被激活的时候，都会执行 actived 钩子

### 为什么 [ ] == [ ] 为 false, [ ] == ![ ] 为 true？

①：为什么 [ ] == [ ] 为 false

在 JS 中对象（包括数组）的`比较是基于它们的引用地址`，而不是它们的内容。即使两个对象的内容相同，它们的引用地址也不同，所以比较结果是 false

②：为什么 [ ] == ![ ] 为 true

- 因为`！`的优先级高于 `==`，首先将空数组转换为 `true`，再取反得 `false`；
- 接着是 `[] == false`，这是布尔值和非布尔值类型比较，首先将 `false` 转换为 `0`，然后调用对象的`toString `方法，返回一个空对象''
- 最后`空对象转换为数值0`，即 `0 == 0 `，结果返回 `true `。

### 三个页面地址为www.baidu.com/a、www.baidu.com/b、www.qq.com` sessionStorage 是否能在这些页面共享，为什么? localStorage 呢?

**sessionStorage 和 localStorage** 只能在同一个域名下共享，不同域名下是不共享的。

所以`www.baidu.com/a`、`www.baidu.com/b` 可以共享，但是和`www.qq.com` 不共享。

## 每日 3 问（2024-9-8）

### vue3 中 watch 和 watchEffect 的区别？

vue3 中 watch 和 watchEffect 的区别主要分下面四个方面来说

**触发时机**

- watch 显式指定依赖源，依赖源更新时执行回调函数
- watchEffect 自动收集依赖源，依赖源更新时重新执行自身

**使用场景**

- watch 适用于比较复杂的场景
- watchEffect 适用于比较简单的场景

**返回值**

- watch:返回一个取消函数，可以使用该函数来取消对数据的监听
- watchEffect:没有返回值

**初始情况**

- watchEffect 在使用时，传入的函数会立刻执行一次。
- watch 默认情况下并不会执行回调函数，除非我们手动设置 immediate 选项

### slot 是什么？有什么作用？原理是什么？

`slot` 又名插槽，是 Vue 的内容分发机制，组件内部的模板引擎使用 slot 元素作为承载分发内容的出口。插槽 slot 是子组件的一个模板标签元素，而这一个标签元素是否显示，以及怎么显示是由父组件决定的。slot 又分三类，`默认插槽`、`具名插槽`和`作用域插槽`。

**默认插槽**：又名匿名查抄，当 slot 没有指定 name 属性值的时候一个默认显示插槽，一个组件内只能有一个匿名插槽。
**具名插槽**：带有具体名字的插槽，也就是带有 name 属性的 slot，一个组件可以出现多个具名插槽。
**作用域插槽**：默认插槽、具名插槽的一个变体，可以是匿名插槽，也可以是具名插槽，该插槽的不同点是在子组件渲染作用域插槽时，可以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过来的数据决定如何渲染该插槽。

实现原理：当子组件 vm 实例化时，获取到父组件传入的 slot 标签的内容，存放在 `vm.$slot` 中，默认插槽为 `vm.$slot.default` ，具名插槽为 `vm.$slot.xxx`，xxx 为插槽名，当组件执行渲染函数时候，遇到 slot 标签，使用 `$slot` 中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。

### Vue3 通过 proxy 监听数组和对象有何区别？

在 Vue 3 中，使用 Proxy 来监听数组和对象的变化是通过 reactive API 实现的。reactive 函数用于创建响应式对象，而 ref 用于创建响应式基本类型（比如字符串、数字、布尔值）或者可响应式引用对象（比如数组或对象）。

当你使用 reactive 对象时，Vue 会通过 Proxy 包装你的对象，从而在对象内部的属性被访问、修改、添加或删除时，都能够触发响应性系统的更新。

对于数组，Vue 3 为数组的变异方法（例如 push、splice 等）提供了特殊处理，使得它们能够触发视图更新，而不需要额外的操作。

```js
import { reactive, ref } from "vue";

// 响应式对象
const state = reactive({
  object: {
    key: "value",
  },
  array: [1, 2, 3],
});

// 响应式基本类型
const count = ref(0);

// 监听对象属性的变化
state.object.key = "new value"; // 触发更新

// 监听数组的变化
state.array.push(4); // 触发更新

// 监听基本类型的变化
count.value++; // 触发更新
```

## 每日 3 问（2024-9-7）

### reactive 和 ref 的区别, ref 可以定义响应式对象吗?

reactive 和 ref 的区别

- reactive 主要用于定义响应式对象
- ref 主要用于定义响应式基础数据

**总结：**

ref 也是可以定义响应式对象的但是会走 reactive 的逻辑

**最后**

`reactive是通过proxy实现的, 而proxy只支持对象`

`ref是通过Object.defineProperty实现的`

### 说说 vue 中的 nextTick 的使用和原理？

**nextTick 是等待下一次 DOM 更新刷新的工具方法。**

Vue 有个异步更新策略，意思是如果数据变化，Vue 不会立刻更新 DOM，而是开启一个队列，把组件更新函数保存在队列中，在同一事件循环中发生的所有数据变更会异步的批量更新。这一策略导致我们对数据的修改不会立刻体现在 DOM 上，此时如果想要获取更新后的 DOM 状态，就需要使用 nextTick。

开发时，有两个场景我们会用到 nextTick：

- created 中想要获取 DOM 时
- 响应式数据变化后获取 DOM 更新后的状态，比如希望获取列表更新后的高度。

在 Vue 内部，nextTick 之所以能够让我们看到 DOM 更新后的结果·是因为我们传入的 callback 会被添加到队列刷新函数(flushSchedulerQueue)的后面，这样等队列内部的更新函数都执行完毕，所有 DOM 操作也就结束了，callback 自然能够获取到最新的 DOM 值。

### v-model 是如何实现的，语法糖实际是什么？

**① 作用在表单元素上**

动态绑定了 input 的 value 指向了 message 变量，并且在触发 input 事件的时候去动态把 message 设置为目标值：

```html
<input v-model="sth" />
<!-- 等同于 -->
<input v-bind:value="message" v-on:input="message=$event.target.value" />

<!-- $event 指代当前触发的事件对象;
$event.target 指代当前触发的事件对象的dom;
$event.target.value 就是当前dom的value值;
在@input方法中，value => sth;
在:value中,sth => value; -->
```

**② 作用在组件上**

在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件

**本质是一个父子组件通信的语法糖，通过 prop 和 emit 实现** 。 因此父组件 v-model 语法糖本质上可以修改为：

```vue
<child
  :value="message"
  @input="
    function (e) {
      message = e;
    }
  "
></child>
```

**扩展**

- 使用 `model `选项 可以定义 prop 和 emit
- 使用了 sync 修饰符, 就不用再父组件中接受子组件发射的事件

## 每日 3 问（2024-9-6）

### forEach 中 return 有效果吗？如何中断 forEach 循环？

有效果,但是只是不走本次循环,后边的还是会走 **使用`break/continue`无效,会报语法错误**

```js
let arr = [1, 2, 3];
arr.forEach((item, index) => {
  return; //无效
});
```

中断方法：
**官方推荐方法（替换方法）**

- 用 every 和 some 替代 forEach 函数
- every 在碰到 return false 的时候，中止循环
- some 在碰到 return true 的时候，中止循环

### localhost:3000 与 localhost:5000 的 cookie 信息是否共享

**共享**，原因：根据同源策略，cookie 是区分端口的，但是浏览器可以实现 cookie 区分域，而不区分端口，也就是说，同一个 ip 下的多个端口下的 cookie 是共享的！

例如, 在设置 cookie 时, 服务器应该发送类似以下的 HTTP 头部: `Set-Cookie: name=value; Path=/; Domain=localhost; HttpOnly`

这样设置后, 只要浏览器允许, localhost 下的任何端口都可以访问这个 cookie。但是出于安全考虑, 开发者应该谨慎地共享 cookie, 特别是在涉及敏感数据时。

### Array(100).map(x => 1) 结果是多少

`Array(100)` 将会创建一个稀疏数组 (sparse array)，即不存在真实元素，节省内存空间。在控制台上显示为`[empty]`，正因为没有元素，所以它也不会有 `map`操作，所以`Array(100).map(x => 1)`仍然返回为 `[empty]`

## 每日 3 问（2024-9-5）

### flex:1 代表啥?

**flex:1 实际代表的是三个属性的简写**

- flex-grow 是用来增大盒子的，比如，当父盒子的宽度大于子盒子的宽度，父盒子的剩余空间可以利用 flex-grow 来设置子盒子增大的占比
- flex-shrink 用来设置子盒子超过父盒子的宽度后，超出部分进行缩小的取值比例
- flex-basis 是用来设置盒子的基准宽度，并且 basis 和 width 同时存在 basis 会把 width 干掉

```css
.box {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

**总结**

- flex-grow 控制 设置子盒子`放大`比例
- flex-shrink 控制 设置子盒子`缩小`比例
- flex-basis 用来设置盒子的基准`宽度`

### setTimeout 延时写成 0，我们一般什么情况会这么做？

在 JavaScript 中，`setTimeout` 函数用于延迟执行一段代码。通常情况下，`setTimeout` 函数的第二个参数表示延迟的时间（以毫秒为单位），**但将这个参数设置为 0 时，并不意味着代码会立即执行，而是将指定的函数作为异步任务添加到异步任务队列中**，等到当前同步任务执行完毕后，再执行 setTimeout 队列中的任务。实际上，这样做是为了改变任务执行的先后顺序，延迟该任务的发生，使之异步执行。

## Promise.all 和 Promise.race 和 Promise.allSettled 有什么区别？

- `Promise.all()`: 接受一个 promise 数组作为参数，如果不是则会调用`Promise.resolve()`方法，将参数转为`Promise`实例再进一步处理(参数可以不是数组，但必须具有`Iterator`接口，且返回的每个成员都是`Promise`实例)，当数组内每个成员的状态变为成功状态时，返回由成员返回值组成的数组。当数组内有一个或多个成员变为失败状态时，返回第一个失败状态成员的返回值

- `Promise.race()`: 参数同`Promise.all()`，只要数组成员有一个成员状态改变，`Promise.race()`返回的 promise 实例状态就会改变

- `Promise.allSettled()`(ES2020)：参数同`Promise.all()`，`Promise.all()`可以确定所有请求都成功了，但是只要有一个请求失败，他就会报错，不管另外的请求是否结束，而`Promise.allSettled()`来确定一组异步操作是否都结束了(不管成功或失败)，当数组每个成员状态都改变时，`Promise.allSettled()`返回的新 promise 对象状态才会改变

## 如何解决前端常见的竞态问题？（2024-9-4）

### 什么是竞态问题

**竞态问题，又叫竞态条件（race condition），它旨在描述一个系统或者进程的输出依赖于不受控制的事件出现顺序或者出现时机。**

**此词源自于两个信号试着彼此竞争，来影响谁先输出。**

简单来说，竞态问题出现的原因是无法保证异步操作的完成会按照他们开始时同样的顺序。举个例子：

- 有一个分页列表，快速地切换第二页，第三页；
- 先后请求 data2 与 data3，分页器显示当前在第三页，并且进入 loading；
- 但由于网络的不确定性，先发出的请求不一定先响应，所以有可能 data3 比 data2 先返回；
- 在 data2 最终返回后，分页器指示当前在第三页，但展示的是第二页的数据。

这就是竞态条件，在前端开发中，常见于搜索，分页，选项卡等切换的场景。

为了有效解决这些问题，可以采取以下几种策略：

### 取消旧请求

当发起新的请求时，取消尚未完成的旧请求是防止竞态问题的一种有效方法。这可以通过不同的 HTTP 请求库来实现：

- XMLHttpRequest (XHR): 使用 abort()方法立即中止请求
  ```js
  const xhr = new XMLHttpRequest();
  xhr.open("GET"， "https://example.com/data");
  xhr.send();
  // 当需要取消请求时
  xhr.abort();
  ```
- Fetch API: 利用 AbortController 来取消请求
  ```js
  const controller = new AbortController();
  const signal = controller.signal;
  fetch("https://example.com/data"， { signal })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error("Fetch error:"， err));
  // 当需要取消请求时
  controller.abort();
  ```
- Axios: 从 v0.22.0 开始，axios 支持通过 AbortController 来取消请求，v0.22.0 之前可以使用 CancelToken 来取消请求

  ```js
  // v0.22.0 之后（包括 v0.22.0）
  const controller = new AbortController();
  axios
    .get("/xxx"， { signal: controller.signal })
    .then(function (response) {
      // 处理成功情况
    })
    .catch(function (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled"， error.message);
      } else {
        // 处理错误情况
      }
    });
  // 当需要取消请求时
  controller.abort();
  ```

  ```js
  // v0.22.0 之前
  const source = axios.CancelToken.source();
  axios
    .get("/xxx"， {
      cancelToken: source.token，
    })
    .then(function (response) {
      // ...
    });

  source.cancel(); // 取消请求
  ```

### 忽略旧请求

另一种策略是忽略旧请求的响应，我们又有哪些方式来忽略旧的请求呢？：

- 封装指令式 promise
- 使用唯一 id 标识每次请求

### 封装指令式 promise

利用指令式 promise，我们可以手动调用 cancel API 来忽略上次请求。

但是如果每次都需要手动调用，会导致项目中相同的模板代码过多，偶尔也可能忘记 cancel。

我们可以基于指令式 promise 封装一个自动忽略过期请求的高阶函数 onlyResolvesLast。

在每次发送新请求前，cancel 掉上一次的请求，忽略它的回调。

```js
function onlyResolvesLast(fn) {
  // 保存上一个请求的 cancel 方法
  let cancelPrevious = null;

  const wrappedFn = (...args) => {
    // 当前请求执行前，先 cancel 上一个请求
    cancelPrevious && cancelPrevious();
    // 执行当前请求
    const result = fn.apply(this， args);

    // 创建指令式的 promise，暴露 cancel 方法并保存
    const { promise， cancel } = createImperativePromise(result);
    cancelPrevious = cancel;

    return promise;
  };

  return wrappedFn;
}

// 使用
const fn = (duration) =>
  new Promise((r) => {
    setTimeout(r， duration);
  });

const wrappedFn = onlyResolvesLast(fn);

wrappedFn(500).then(() => console.log(1));
wrappedFn(1000).then(() => console.log(2));
wrappedFn(100).then(() => console.log(3));

// 输出 3
```

#### 使用唯一 id 标识每次请求

除了指令式 promise，我们还可以给「请求标记 id」的方式来忽略上次请求。

具体思路是：

- 利用全局变量记录最新一次的请求 id
- 在发请求前，生成唯一 id 标识该次请求
- 在请求回调中，判断 id 是否是最新的 id，如果不是，则忽略该请求的回调

伪代码如下：

```js
function onlyResolvesLast(fn) {
  // 利用闭包保存最新的请求 id
  let id = 0;

  const wrappedFn = (...args) => {
    // 发起请求前，生成新的 id 并保存
    const fetchId = id + 1;
    id = fetchId;

    // 执行请求
    const result = fn.apply(this， args);

    return new Promise((resolve， reject) => {
      // result 可能不是 promise，需要包装成 promise
      Promise.resolve(result).then(
        (value) => {
          // 只处理最新一次请求
          if (fetchId === id) {
            resolve(value);
          }
        }，
        (error) => {
          // 只处理最新一次请求
          if (fetchId === id) {
            reject(error);
          }
        }
      );
    });
  };

  return wrappedFn;
}
```

### 总结

关于前端方面的竞态的问题，取消请求可以使用 **abort()** 方法进行终止；忽略请求方面是可以 **使用唯一 id 标识每次请求** 忽略上次请求；还可以使用 防抖节流 等方案处理问题；在实际业务场景中需要根据真实的业务场景合理考虑技术方案，在复杂的业务中可能也需要结合 loading 等 UI 层的效果来提升用户的体验

## 什么情况下会产生跨域？（2024-9-3）

跨域主要是由于**浏览器的同源策略**引用的，同源策略是浏览器的安全机制，**当协议，域名，端口三者有一个不同，浏览器就禁止访问资源**

### 扩展

**1、服务端请求服务端会跨域吗？**

不会，跨域主要针对对象是浏览器

**2、webpack 或者 vite 中可以使用 proxy 解决跨域，它解决跨域的原理是什么？**

webpack 或者 vite 中可以使用 proxy 解决跨域， 其实现是提供一个中间服务器进行代理。
webpack 提供服务器的工具是 webpack-dev-server，**只适用于开发阶段**。

**3、为什么跨域的时候有时候请求会发两次？**

当发起跨域请求时，浏览器会先发送一个预请求（通常是 OPTIONS 请求），用于询问服务器是否允许该跨域请求。如果服务器返回允许，则再发送正式的请求。如果预请求失败，则不会发送正式的请求

**4、那为什么非要有这个预检请求呢？**

**检查跨域请求的安全性**： 预检请求用于验证是否允许发起跨域请求，以保障跨域请求的安全性。这有助于防止潜在的安全风险，如跨站请求伪造（CSRF）攻击。

**检查跨域请求的支持**： 预检请求允许服务器检查客户端的请求头（Request Headers）和方法（HTTP Methods），以确定是否支持跨域请求。这有助于服务器根据实际情况决定是否允许客户端访问资源。

**提供更好的错误信息**： 如果服务器不支持跨域请求，预检请求可以提供更详细的错误信息，以便客户端开发者了解问题所在。

**减少潜在的冲突**： 预检请求还可以用于避免一些潜在的冲突，如浏览器缓存问题，从而确保请求的顺利进行。

## 每日 3 问（2024-9-2）

### 隐藏元素的方法有哪些?

- **display: none**：渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。
- **visibility: hidden**：元素在页面中仍占据空间，但是不会响应绑定的监听事件。
- **opacity: 0**：将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。
- **position: absolute**：通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。
- **z-index: 负值**：来使其他元素遮盖住该元素，以此来实现隐藏。
- **clip/clip-path** ：使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。
- **transform: scale(0，0)**：将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

### display:none 与 visibility:hidden 的区别

这两个属性都是让元素隐藏，不可见。两者区别如下：

（1）**在渲染树中**

- `display:none`会让元素完全从渲染树中消失，渲染时不会占据任何空间；
- `visibility:hidden`不会让元素从渲染树中消失，渲染的元素还会占据相应的空间，只是内容不可见。

（2）**是否是继承属性**

- `display:none`是非继承属性，子孙节点会随着父节点从渲染树消失，通过修改子孙节点的属性也无法显示；
- `visibility:hidden`是继承属性，子孙节点消失是由于继承了`hidden`，通过设置`visibility:visible`可以让子孙节点显示；

（3）修改常规文档流中元素的 `display` 通常会造成文档的重排，但是修改`visibility`属性只会造成本元素的重绘；

（4）如果使用读屏器，设置为`display:none`的内容不会被读取，设置为`visibility:hidden`的内容会被读取。

### 单行、多行文本溢出隐藏

- 单行文本溢出

```css
.box {
  /* 溢出隐藏 */
  overflow: hidden;
  /* 溢出用省略号显示 */
  text-overflow: ellipsis;
  /* 文本不换行 */
  white-space: nowrap;
}
```

- 多行文本溢出

```css
.box {
  /* 溢出隐藏 */
  overflow: hidden;
  /* 作为弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 溢出用省略号显示 */
  text-overflow: ellipsis;
  /* 设置伸缩盒子的子元素排列方式：从上到下垂直排列 */
  -webkit-box-orient: vertical;
  /* 显示的行数 */
  -webkit-line-clamp: 3;
}
```

**注意：**
由于上面的三个属性都是 CSS3 的属性，没有浏览器可以兼容，所以要在前面加一个`-webkit-` 来兼容一部分浏览器。

## 每日 3 问（2024-9-1）

### img 标签的 title 和 alt 有什么作用呢？

`img` 标签在 HTML 中用于嵌入图像。对于图像来说，`title` 和 `alt` 属性各自扮演着重要的角色，它们的作用如下：

**title 属性**

`title` 属性用于为元素提供额外的信息，通常作为提示信息（tooltip）显示。当鼠标悬停在具有 `title` 属性的元素上时，会显示这个属性的值作为一个小框（通常称为“工具提示”）。对于 `img` 标签来说，`title` 属性可以用来提供图像的额外信息，比如图像的版权信息、作者的姓名或者图像的简短描述等。但需要注意的是，`title` 属性并不应该用来替代 `alt` 属性，因为 `title` 属性提供的信息并不是对图像内容的替代描述，而是为了增强用户体验或提供额外信息。

**alt 属性**

`alt（alternative text，替代文本）`属性用于指定图像的替代文本。这个属性对于无法查看图像的用户（如视力障碍者使用屏幕阅读器）来说尤为重要，因为它提供了图像内容的描述。此外，当图像因为某些原因（如加载失败或网络延迟）无法显示时，`alt` 文本也会被显示在图像原本应该出现的位置，从而保证了网页内容的可访问性和完整性。

**总结：**

- **alt**：提供图像的替代文本，主要用于提高网页的可访问性，确保图像内容能够被所有人理解，包括那些无法看到图像的用户。
- **title**：为元素提供额外的信息，通常作为工具提示显示，用于增强用户体验或提供图像的额外信息，但不应该替代 alt 属性。

### script 标签中 defer 和 async 的区别

如果没有 defer 或 async 属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。

下图可以直观的看出三者之间的区别:

<img src="./assets/script-defer-async.png" alt="deep-example" />

其中蓝色代表 js 脚本网络加载时间，红色代表 js 脚本执行时间，绿色代表 html 解析。

**defer 和 async 属性都是去异步加载外部的 JS 脚本文件，它们都不会阻塞页面的解析**，其区别如下：

- **执行顺序**：
  - 多个带 async 属性的标签，不能保证加载的顺序
  - 多个带 defer 属性的标签，按照加载顺序执行
- **脚本是否并行执行**：
  - async 属性，表示**后续文档的加载和执行与 js 脚本的加载和执行是并行进行的**，即异步执行
  - defer 属性，加载后续文档的过程和 js 脚本的加载(此时仅加载不执行)是并行进行的(异步)，js 脚本需要等到文档所有元素解析完成之后才执行，DOMContentLoaded 事件触发执行之前。

**总结：**

- `defer` 是延迟
- `async` 是异步执行

### 常⽤的 meta 标签有哪些

`meta` 标签由 `name` 和 `content` 属性定义，**用来描述网页文档的属性**，比如网页的作者，网页描述，关键词等，除了 HTTP 标准固定了一些`name`作为大家使用的共识，开发者还可以自定义 name。

常用的 meta 标签：

（1）`charset`，用来描述 HTML 文档的编码类型：

```html
<meta charset="UTF-8" />
```

（2） `keywords`，页面关键词：

```html
<meta name="keywords" content="关键词" />
```

（3）`description`，页面描述：

```html
<meta name="description" content="页面描述内容" />
```

（4）`refresh`，页面重定向和刷新：

```html
<meta http-equiv="refresh" content="0;url=" />
```

（5）`viewport`，适配移动端，可以控制视口的大小和比例：

```html
<meta
  name="viewport"
  content="width=device-width， initial-scale=1， maximum-scale=1"
/>
```

其中，`content` 参数有以下几种：

- `width viewport` ：宽度(数值/device-width)
- `height viewport` ：高度(数值/device-height)
- `initial-scale` ：初始缩放比例
- `maximum-scale` ：最大缩放比例
- `minimum-scale` ：最小缩放比例
- `user-scalable` ：是否允许用户缩放(yes/no）

（6）搜索引擎索引方式：

```html
<meta name="robots" content="index，follow" />
```

其中，`content` 参数有以下几种：

- `all`：文件将被检索，且页面上的链接可以被查询；
- `none`：文件将不被检索，且页面上的链接不可以被查询；
- `index`：文件将被检索；
- `follow`：页面上的链接可以被查询；
- `noindex`：文件将不被检索；
- `nofollow`：页面上的链接不可以被查询。

## 每日 3 问（2024-8-31）

### vue 中的 key 有什么作用呢？

每个元素都有一个唯一的 key 值，Vue 使用这个 key 来跟踪每个节点的身份，从而复用现有元素，提高渲染性能

```js
const isSameVNodeType = (n1， n2) => {
  return n1.type === n2.type && n1.key === n2.key;
};

function diff(oldVNode， newVNode) {
  if (isSameVNodeType(oldVNode， newVNode)) {
    // 比较节点
  } else {
    // 没啥好比，直接整个节点替换
  }
}
```

### scope 作用域隔离的原理

- 通过给组件里面的元素添加一个唯一的 `data-v-xxx` 属性来保证他的唯一性
- 会在每句编译后的 css 选择器末尾添加一个当前组件的属性选择器（如[data-v-69538f99]）来私有化样式
- 如果组件内部还有其他组件，只会给`其他组件的最外层元素添加当前组件的 data-v-xxx 属性`，这也就是为什么我们修改一些第三方 ui 库的样式时需要使用深度选择器 `:deep()` 实现样式穿透的原因，因为第三方的子组件内部的元素不会添加当前组件的 `data-v-xxx` 属性，而转译后的 css 又会在末尾添加含有该 `data-v-xxx` 属性的属性选择器，这样就会导致设置的样式无法准确命中。

<img src="./assets/scope-example.png" alt="deep-example" />

### vue 样式穿透（deep）的原理

先来看一个例子，下面为 input 使用 还是未使用 deep 都 展示了 css 样式编译后的结果

```css
<style scoped lang="scss">
.deep-scope-demo {
  /* 不加 depp */
  input {
    background-color: skyblue;
  }
  /* 加入 depp */
  :deep(input) {
    background-color: skyblue;
  }
}
</style>
```

**没使用:deep()之前，css 样式编译后的结果是**

```css
.deep-scope-demo input[data-v-7a7a37b1] {
  background-color: skyblue;
}
```

但是 scoped 的特性只会在子组件的最外层元素添加上父组件的 data-v-xxx 属性， 所以 input 是没有 data-v-xxx 属性的，因此编译后的 css 样式无法找到该元素。

**使用:deep()之前，css 样式编译后的结果是**

```css
.deep-scope-demo[data-v-7a7a37b1] input {
  background-color: skyblue;
}
```

可以看到，使用:deep()之后，编译后的 css 样式中，添加了上层元素添加了 data-v-xxx 属性，因此可以找到该元素。

因此：**使用 deep 之后，编译后的 css 样式中，添加了上层元素添加了 data-v-xxx 属性，因此可以找到该元素。**

## token 无感刷新你了解多少呢？（2024-8-30）

### token 无感刷新的定义

token 无感刷新：指的是在用户操作应用程序时，如果 accessToken（访问令牌）即将过期或已过期，系统能够自动使用 refreshToken（刷新令牌）获取新的 accessToken，而无需用户重新登录或进行任何额外操作。这种机制确保了用户在使用应用时的流畅性和连贯性。

### 实现原理

token 无感刷新的实现主要依赖于双 token 机制，即 accessToken 和 refreshToken：

- **accessToken（访问令牌）**：
  - 用户直接用于访问受保护资源的令牌
  - 有效期通常较短，几分钟到几小时不等，以减少被泄露的风险
  - 每次用户请求受保护资源时，都需在请求头中携带 accessToken
- **refreshToken（刷新令牌）**：
  - 用于在 accessToken 过期后重新获取新的 accessToken
  - 有效期较长，可以是几天甚至更长，以减少用户重新登录的频率
  - refreshToken 不会频繁在网络上传输，而是安全存储在客户端或服务器端，以降低被窃取的风险

### 实现步骤

- **获取 accessToken 和 refreshToken**
  - 在用户认证成功后，后端应返回 accessToken 和 refreshToken 给客户端
  - 客户端将这两个 token 保存到本地缓存中
- **设置请求拦截器**
  - 在客户端设置请求拦截器，用于在发送请求前检查 accessToken 的有效性
  - 如果 accessToken 即将过期或已过期，拦截器会暂停当前请求，并使用 refreshToken 向后端发送刷新请求
- **刷新 accessToken**
  - 后端接收到 refreshToken 的刷新请求后，验证其有效性
  - 如果 refreshToken 有效，后端生成一个新的 accessToken 并返回给客户端
- **更新 token 并继续请求**
  - 客户端收到新的 accessToken 后，替换本地缓存中的旧 token
  - 使用新的 accessToken 继续之前的请求

### 优势和应用场景

- 优势：
  - **提升用户体验**：用户无需频繁登录，操作更加流畅
  - **增强安全性**：通过分离短期和长期凭证，降低了 token 被泄露的风险
  - **减少服务器负载**：减少了因用户频繁登录而产生的服务器请求
- 应用场景：
  - Web 应用
  - 移动应用
  - 单页应用
  - 需要长生命周期 token 和多终端登录的场景

:::tip 注意事项

- **安全性**：确保 refreshToken 的安全存储和传输，避免被窃取
- **时间同步**：客户端和服务器之间的时间同步对于 token 有效性的判断至关重要
- **错误处理**：在 token 刷新过程中，应妥善处理可能出现的错误情况，如 refreshToken 过期或无效等
  :::

### 代码实现

需要注意会出现的 `2` 个问题

**如何防止多次刷新 token**

我们通过一个变量 isRefreshing 去控制是否在刷新 token 的状态

```js
import axios from "axios";
// 是否正在刷新的标记
let isRefreshing = false;

service.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken({
          refreshToken: localStorage.getItem("refreshToken")，
          token: getToken()，
        })
          .then((res) => {
            const { token } = res.data;
            setToken(token);
            response.headers.Authorization = `${token}`;
          })
          .catch((err) => {
            removeToken();
            router.push("/login");
            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
    }
    return response && response.data;
  }，
  (error) => {
    Message.error(error.response.data.msg);
    return Promise.reject(error);
  }
);
```

**同时发起两个或者两个以上的请求时，其他接口怎么解决**

当第二个过期的请求进来，token 正在刷新，我们先将这个请求存到一个数组队列中，想办法让这个请求处于等待中，一直等到刷新 token 后再逐个重试清空请求队列。 那么如何做到让这个请求处于等待中呢？为了解决这个问题，我们得借助 Promise。将请求存进队列中后，同时返回一个 Promise，让这个 Promise 一直处于 Pending 状态（即不调用 resolve），此时这个请求就会一直等啊等，只要我们不执行 resolve，这个请求就会一直在等待。当刷新请求的接口返回来后，我们再调用 resolve，逐个重试。最终代码：

```js
import axios from "axios";

// 是否正在刷新的标记
let isRefreshing = false;
//重试队列
let requests = [];
service.interceptors.response.use(
  (response) => {
    //约定code 409 token 过期
    if (response.data.code === 409) {
      if (!isRefreshing) {
        isRefreshing = true;
        //调用刷新token的接口
        return refreshToken({
          refreshToken: localStorage.getItem("refreshToken")，
          token: getToken()，
        })
          .then((res) => {
            const { token } = res.data;
            // 替换token
            setToken(token);
            response.headers.Authorization = `${token}`;
            // token 刷新后将数组的方法重新执行
            requests.forEach((cb) => cb(token));
            requests = []; // 重新请求完清空
            return service(response.config);
          })
          .catch((err) => {
            //跳到登录页
            removeToken();
            router.push("/login");
            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        // 返回未执行 resolve 的 Promise
        return new Promise((resolve) => {
          // 用函数形式将 resolve 存入，等待刷新后再执行
          requests.push((token) => {
            response.headers.Authorization = `${token}`;
            resolve(service(response.config));
          });
        });
      }
    }
    return response && response.data;
  }，
  (error) => {
    return Promise.reject(error);
  }
);
```

## 单点登录（SSO） 你了解多少呢？（2024-8-29）

### 单点登录的定义

单点登录（SSO）是指用户只需要在多个应用系统中的任意一个进行登录，就可以访问所有相互信任的应用系统，而无需在每个系统中重新输入凭证（如用户名和密码）。这种机制通过共享用户的登录状态来实现，使得用户能够无缝地在多个系统之间切换。

简言之：用户在企业内部多个应用系统（如考勤系统、财务系统、人事系统等）场景下，用户只需要登录一次，就可以访问多个应用系统。

### 单点登录的实现方式

- **基于 Cookie 和 Session 的实现**
  - 用户登录后，`认证服务器`将用户信息存储在 Session 中，并生成一个 Session ID
  - 将 Session ID 存储在 Cookie 中，并返回给用户浏览器
  - 用户访问其他应用系统时，浏览器会自动携带 Cookie 中的 Session ID
  - 应用系统通过 Session ID 向认证服务器验证用户身份，如果验证通过，则允许用户访问系统资源
- **基于 Token 的实现**
  - 用户登录后，`认证服务器`生成一个 Token，并将 Token 存储在共享的存储中（如 Redis、数据库等）
  - 将 Token 返回给用户，用户可以在后续请求中携带 Token
  - 应用系统通过向认证服务器验证 Token 的有效性来确认用户身份

:::tip 提示
**用户是项认证中心登录的**
:::

### 单点登录的优势

- **提升用户体验**：用户只需一次登录，即可访问多个系统，无需反复输入凭证，提高了使用便捷性
- **减轻用户记忆负担**：用户只需记住一套用户名和密码，降低了记忆难度和混淆风险
- **增强安全性**：集中管理身份验证和授权机制，可以实施更强大的安全措施，如多因素认证
- **简化管理和维护**：对于企业和组织来说，用户账户和权限的管理变得更加简便，降低了管理和维护成本
- **降低密码管理复杂性**：用户不再需要在不同应用中设置和更新多个独立的密码

### 单点登录的劣势

- **安全风险增加**：如果 SSO 系统本身出现故障或被攻击，那么所有依赖该系统的应用程序和服务都将受到影响，可能导致用户无法访问这些服务
- **实施复杂性**：整合不同应用程序和服务的身份验证机制可能需要大量的开发和配置工作。不同系统之间的技术差异和兼容性问题可能使得 SSO 的实施变得复杂
- **用户体验问题**：在 SSO 环境中，确保用户在注销时正确地从所有关联的应用程序和服务中注销可能是一个挑战。如果注销过程没有得到妥善处理，可能会导致安全隐患或用户体验问题
- **实施和维护成本**：尽管 SSO 可以降低支持成本（如减少密码重置请求等），但实施和维护 SSO 解决方案本身可能需要额外的投资。组织需要权衡成本和收益，以确定 SSO 是否适合其需求

### 单点登录的应用场景

单点登录广泛应用于需要多个系统协同工作的场景，如企业内部管理系统（如 OA、ERP、CRM 等）、电商平台（如淘宝、天猫等）、在线教育平台等。这些场景下的用户需要频繁地在多个系统之间切换，单点登录能够显著提升用户的使用体验和系统的安全性。

### 单点登录的挑战与解决方案

尽管单点登录带来了诸多优势，但在实际应用中也面临一些挑战，如跨域身份验证、Token 的安全传输和存储等。针对这些挑战，可以采取以下解决方案：

- **跨域身份验证**：通过 CORS（跨源资源共享）机制或设置代理服务器来实现跨域身份验证
- **Token 的安全传输**：使用 HTTPS 协议来加密 Token 的传输过程，防止 Token 被截获和篡改
- **Token 的安全存储**：将 Token 存储在安全的存储介质中（如浏览器的 LocalStorage），并设置合理的过期时间和访问权限

综上所述，单点登录是一种高效、便捷且安全的身份验证和授权机制，它在提升用户体验、减轻用户记忆负担、增强系统安全性等方面发挥着重要作用，然而，单点登录也面临一些挑战和限制，需要权衡成本和收益，根据具体需求选择合适的解决方案。

### 单点登录建议过程图

<img src="./assets/sso.png" alt="单点登录建议过程图" />

### 资料

[一站式登录：揭秘 CAS 单点登录的原理与流程](https://juejin.cn/post/7351700046486487049)

## 浏览器的缓存机制你了解多少呢？（2024-8-28）

览器缓存机制主要通过将用户之前请求过的资源（如 HTML、CSS、JavaScript、图片等）保存在本地，以便在后续请求时直接使用这些缓存的资源，而无需再次从服务器下载。这样可以显著提高页面加载速度，提升用户体验。

### 缓存类型

- **强缓存（Forced Caching）**
- **协商缓存（Revalidating Caching）**
- Service Worker 缓存
- Web Storage 缓存

### 强缓存（Forced Caching）

- **原理**：浏览器在请求资源时，会先检查本地缓存是否存在该资源的副本，并且该副本是否未过期。如果副本未过期，则直接使用本地缓存，不会向服务器发送请求。
- **实现方式**：主要依赖于 HTTP 响应头中的 `Expires` 和 `Cache-Control` 字段。`Expires` 是 HTTP/1.0 中的字段，表示资源的绝对过期时间；而 `Cache-Control` 是 HTTP/1.1 中引入的，更灵活且优先级高于 `Expires`，可以指定资源的最大缓存时间（如 `max-age=3600` 表示资源将在 3600 秒后过期）。

### 协商缓存（Negotiated Caching）

- **原理**：当资源的副本过期或浏览器的缓存被清除时，浏览器会向服务器发送请求，询问该资源是否有更新。服务器会根据资源的最后修改时间或 `ETag`（实体标签）来判断资源是否有更新。
- **实现方式**：主要依赖于 HTTP 请求头中的 `If-Modified-Since` 和 `If-None-Match` 字段，以及 HTTP 响应头中的 `Last-Modified` 和 `ETag` 字段。服务器会比较请求头中的时间戳或 ETag 值与资源当前的状态，如果资源未修改，则返回 304 Not Modified 响应，告知浏览器直接使用本地缓存。

### Service Worker 缓存 （了解即可）

- **原理**：Service Worker 是一种在浏览器后台运行的脚本，可以拦截网络请求并返回缓存的响应。通过 Service Worker，开发者可以自定义缓存策略，实现更灵活、更高效的缓存机制。
- **优势**：可以完全控制网络请求，具有最高优先级，即使是强制缓存也可以被覆盖。

### Web Storage 缓存 （了解即可）

- **包括**：localStorage 和 sessionStorage。
- **原理**：localStorage 用于存储用户在网站上的永久性数据，而 sessionStorage 则用于存储用户会话过程中的临时数据。
- **优先级**：Web Storage 缓存的优先级最低，只有在网络不可用或其他缓存都未命中时才会生效。

### 缓存机制的优势

- **提高页面加载速度**：通过减少网络请求和传输数据量，显著加快页面加载速度。
- **减少网络带宽消耗**：缓存资源可以重复使用，避免重复下载相同的资源，从而减少网络带宽的消耗。
- **降低服务器负载**：减少对服务器的请求次数，降低服务器的负载压力，提高服务器的性能和响应能力。

### 缓存机制的注意事项

- **缓存更新问题**：由于缓存的存在，用户可能无法立即获取到最新的内容。因此，需要合理设置缓存策略，确保用户能够及时获取到更新后的资源。
- **缓存一致性问题**：如果多个地方缓存了同一资源，当一个地方的资源更新时，其他地方的缓存可能仍然是旧的版本。这可能导致显示不一致的内容或功能异常。
- **缓存过期管理**：缓存需要定期更新以确保用户获取到最新的内容。过期管理可能复杂，设置不当或策略不当可能导致用户无法及时获取更新的内容。

### 浏览器资源缓存过程图

<img src="./assets/bs-cache.png" alt="浏览器资源缓存过程图" />

## 浏览器的 Cookie 你了解多少呢？（2024-8-27）

### 1、Cookie 的组成

一个 Cookie 通常包含以下信息：

- **名称（Name）**：Cookie 的唯一标识符。
- **值（Value）**：与名称相关联的数据。
- **过期时间（Expires/Max-Age）**：Cookie 的有效期，指定了 Cookie 何时应该被删除。如果未设置，则 Cookie 会在浏览器会话结束时过期（即浏览器关闭时）。
- **路径（Path）**：指定了哪些路径下的页面可以访问该 Cookie。
- **域（Domain）**：指定了哪些主机可以接受该 Cookie。
- **安全标志（Secure）**：当设置为 Secure 时，Cookie 仅通过 HTTPS 连接发送。
- **HttpOnly 标志**：当设置为 HttpOnly 时，JavaScript 脚本无法访问该 Cookie，这有助于减少跨站脚本攻击（XSS）的风险。

### 2、Cookie 的用途

- **用户认证**：存储用户的登录状态，如会话 ID。
- **个性化设置**：记住用户的偏好设置，如语言选择、主题等。
- **追踪用户行为**：用于分析用户行为，如访问页面、点击链接等，以优化网站或进行广告推送。
- **购物车**：在电子商务网站上存储用户的购物车信息。

### 3、Cookie 的限制

- **大小限制**：每个 Cookie 的大小通常限制在 4KB 左右，浏览器之间可能有所不同。
- **数量限制**：浏览器对单个域名下可以存储的 Cookie 数量有限制，通常是 20 个左右，但总大小限制更为关键。
- **隐私和安全**：Cookie 可以被第三方网站读取（如果设置了相应的域），这可能导致隐私泄露。此外，Cookie 也是跨站脚本攻击（XSS）的常见目标。

### 4、替代技术

由于 Cookie 的局限性，现代 Web 开发中还使用了其他技术来存储客户端数据，如：

- **Web Storage**（包括 LocalStorage 和 SessionStorage）：提供了更大的存储空间，并且没有数量限制，但数据存储在用户的浏览器上，可能会受到浏览器存储限制的影响。
- **IndexedDB**：一个低级的 API，用于客户端存储大量结构化数据，支持事务和查询。
- **Service Workers** 和 **Cache API**：用于在后台处理网络请求和缓存资源，提高应用性能。

### 5、管理和删除 Cookie

用户可以通过浏览器的设置来查看、修改或删除 Cookie。此外，许多浏览器还提供了隐私模式（如 Chrome 的无痕模式），在这种模式下，浏览器不会保存任何浏览历史、Cookie 或网站数据。

总的来说，Cookie 是 Web 开发中不可或缺的一部分，但开发者也需要注意其局限性，并考虑使用其他技术来补充或替代 Cookie 的功能。

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
