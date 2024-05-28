---
top: 2
sticky: 999
sidebar: 
 title: 4月记
 step: 1
 isTimeLine: true
title: 4月记
tags:
 - 知识中心
categories:
 - 知识中心
---


# 4月信息

## 简介
这是属于我 4 月份收集的一些记录的知识

## base64 为什么比 png 大？
一般情况下，base64编码后的字符串长度会比原始图片的大小大约为4/3左右。这是因为base64编码将3个字节转换为4个字符，同时可能会添加一些填充字符。
此外，图片在编码为base64格式时，通常会进行二进制转换，将每个像素的颜色信息转换为二进制数据，然后再将这些二进制数据编码为base64字符串。由于base64编码使用的是文本形式表示二进制数据，因此在编码过程中可能会引入一些额外的开销和填充，从而导致编码后的字符串比原始图片的大小更大。

## 自动生成CHANGELOG ⭐️⭐️⭐️
CHANGELOG 会记录所有的 commit 信息并归类版本，可以快速跳转到该条 commit 记录，它能让你方便知道项目里哪个版本做了哪些功能有哪些 bug 等信息。也方便排查 bug，对于提交记录一目了然，不用一个一个去翻去查。
我们使用 standard-version 来实现自动生成 CHANGELOG

```shell
yarn add standard-version -D
```
package.json 增加命令

```json
{
  "scripts": {
    "release": "standard-version"
  }
}

```
当执行以下命令时会自动生成CHANGELOG

```shell
yarn release
```
当然 standard-version 提供自定义配置不同类型对应显示文案，在根目录新建 .versionrc 文件

```json
// .versionrc
{
  "header": "# 更新日志 \n\n",
  "types": [{
      "type": "feat",
      "section": "✨ Features | 新功能",
      "hidden": false
    },
    {
      "type": "fix",
      "section": "🐛 Bug Fixes | Bug 修复",
      "hidden": false
    },
    {
      "type": "init",
      "section": "🎉 Init | 初始化",
      "hidden": true
    },
    {
      "type": "docs",
      "section": "✏️ Documentation | 文档",
      "hidden": false
    },
    {
      "type": "style",
      "section": "💄 Styles | 风格",
      "hidden": true
    },
    {
      "type": "refactor",
      "section": "♻️ Code Refactoring | 代码重构",
      "hidden": true
    },
    {
      "type": "perf",
      "section": "⚡ Performance Improvements | 性能优化",
      "hidden": true
    },
    {
      "type": "test",
      "section": "✅ Tests | 测试",
      "hidden": true
    },
    {
      "type": "revert",
      "section": "⏪ Revert | 回退",
      "hidden": true
    },
    {
      "type": "build",
      "section": "📦‍ Build System | 打包构建",
      "hidden": true
    },
    {
      "type": "chore",
      "section": "🚀 Chore | 构建/工程依赖/工具",
      "hidden": true
    },
    {
      "type": "ci",
      "section": "👷 Continuous Integration | CI 配置",
      "hidden": true
    }
  ]
}

```
## css 文字多行省略
```css
.box {
  width: 100px;
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* 块容器中的内容限制为指定的行数 */
  /* display 属性设置成 -webkit-box 或者 -webkit-inline-box 并且 box-orient 属性设置成 vertical时才有效果。 */
  -webkit-line-clamp: 2;
}
```
## this.$toast这种方式是如何实现的？
**vue2**

- 首先创建一个 toast.vue 组件，然后定义好需要的属性，比如：type、content 等
- 然后使用 vue.extend 创建一个子类构造器，然后通过 new 创建一个实例
- 有了实例之后调用 $mount 方法，将组件挂载到页面上
- 然后可以将 toast 实例元素挂载通过 appendChild 添加到 document.body 上 
- 将上面的过程封装成一个方法，然后将这个方法挂载到原型上

**vue3**

vue3 中，我们可以使用 createApp 创建一个应用实例，通过$mount 方法，将组件挂载到页面上
然后通过 app.config.globalProperties.xxx 添加一个全局属性，然后就可以直接通过 this.xxx 调用了

## 设备像素（dp）、css 像素（css px）、设备像素比（dpr） ⭐️⭐️⭐️
### 设备像素（dp）
设备像素（dp）是设备屏幕上显示的物理像素，它与设备屏幕的分辨率是一一对应的。
### css像素（css px）
css 像素是 Web 编程的概念，指的是 CSS 样式代码中使用的逻辑像素
### 设备像素比（dpr）
设备像素比（dpr）是设备屏幕上物理像素与 CSS 像素的比值，它表示设备屏幕的分辨率与 CSS 样式代码中设置的分辨率的比值。

在浏览器上 iPhone6/7/8 375px ，通过 window.devicePixelRatio 可以获取到  iPhone6/7/8 设备像素比为 2
所以一般开发都是使用二倍图来开发


## 异常捕获

```js
try{
 	 // 可能出错的代码
}catch(e){
 	 // 处理try代码块中抛出的异常
 	 // e 错误信息
 	 throw // 抛出自定义异常
}finally{
 	 // 无论什么情况都会执行代码块
}
```

## 判断可迭代对象

```js
typeof obj[Symbol.iterator] === 'function'
// 如果为true, 则是可迭代对象
// 如果为false, 则不是可迭代对象
```

## Symbol 的元编程能力(改写语法本身)
```js
let obj = {
  a: '1',
  [Symbol.toStringTag]: 'vity'
}
console.log(Object.prototype.toString.call(obj)) // [object vity]
```

## 0.1 + 0.2 != 0.3 问题
0.1 + 0.2 != 0.3 的原因：
我们小数在转换成二进制的时候，结果是无限循环的，但是我们计算机存储的时候，存储的位数是有限，那么就必须做一些近似值的取舍，这样就导致了小数精度丢失了

`解决方法:` 先将小数乘以10的n次方倍，装换为整数，再将计算后的结果除以10的n次方倍

```js
let a = 0.1
let b = 0.2
(a * 10 + b * 10) / 10 === 0.3 // true

```
## String.prototype.replace()
replace第二个参数是一个函数的问题
```js
function render(template, data) {
  // \为转义
  let str = template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    console.log(match)
    console.log(key)
    /*
     *match =>{{name}} 字符串中匹配到的子串
     *key =>name  代表括号匹配的字符串 （重点：括号 -> \w+）
     */
    return data[key]
  })
  return str
}

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}'
let data = {
  name: '小明',
  age: 18
}

render(template, data) // 我是小明，年龄18，性别undefined
```
这里可以知道
- match会匹配到字符串的子串
- key会匹配括号里的内容

## es5实现const
```js
Object.defineProperty(window, 'name', {
    value: 'vvv',
    writable: false // 控制可写属性
})
// 这样子相当于 const name = 'vvv'
window.name = '123'
window.name // 'vvv' 
```

## 有 1000 个 dom，需要更新其中的 100 个，如何操作才能减少 dom 的操作？
添加多个dom元素，可以把元素先append进DocumentFragment中去，最后再统一将DocumentFragment添加到页面中(`文档碎片流`)

`提醒: 不会进行多次重排和重绘, 只进行一次`
```js
const ul = document.createElement('ul')
const fragment = document.createDocumentFragment()
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li')
  li.innerHTML = `index: ${i}`
  // 正序插入
  // fragment.appendChild(li)
  // 倒序插入
  fragment.insertBefore(li, fragment.childNodes[0])
}
ul.appendChild(fragment)
```

## webpack中的source map是什么,生产环境怎么用?

source map 构建了处理前的代码和处理后的代码之间的桥梁,在打包之后也可以看到打包之前的代码,可以快速定位 bug]

## 隐式转换 ⭐️⭐️⭐️
### 特例
- null == undefined 为 true；
- NaN 不与任何值相等，包括它自己；
- null 和 undefined 不会进行数据转换；

### 数值和非数值类型比较
- 数值和字符串

  ```js
  console.log('' == 0); // true
  console.log('1' == 1); // true
  console.log('000' == 0); // true
  console.log('sy' == 0); // false
  
  ```
   当一个数据类型是数值，另一个是字符串，会将字符串转换为数值，再与之比较。比如其中`'sy'`会转换为数字`NaN`，所以返回       `false`。

- 数值和布尔值

  ```js
  console.log(true == 1);  // true
  console.log(true == 2);  // false
  console.log(false == 0); // true
  console.log(false == 1); // false
  ```

  很容易就能看出，这样的比较，会将`true`转化成数值`1`，`false`转化为`0`。

- 数值和数组

  ```js
  console.log([] == 1); // false
  console.log([] == 0); // true
  console.log([1,2] == 2); // false
  ```

  在这里，数组会先通过调用`toString()`转换为字符串后再转化为数值。比如`['Ywis']`先转化为字符串`'Ywis'`后再转化为数值`NaN`，所以返回`false`。

  **拓展：数组、对象和函数在与其他基本数据类型进行比较时都会先转换为字符串，然后再转换为相应的数据类型。**

### 布尔值和非布尔值类型比较

```js
console.log(true == 1); // true
console.log(true == '00001'); // true
console.log(false == []); // true
console.log(true == ['123']); // false
```

当布尔值和非布尔类型比较，会将`true`转换为 1，`false`转换为 0。将非布尔值类型统统转化成数值，这里的类型转换规则和上面提到的相同。

### 对象和原始值的比较

```js
console.log({} == 0); // false
console.log([] == 1); // false
```

当对象与原始值进行比较时，JS 会先尝试通过调用对象的`valueOf()`方法来获取原始值。如果`valueOf()`方法返回的是一个原始值，JS 会将其转换成与待比较的原始值相同的类型，然后进行比较。如果`valueOf()`方法返回的还是一个对象，则会继续调用对象的`toString()`方法，将其返回值转换为原始值，然后再进行比较。

比如`{} == 0`，对于空对象`{}`它的`valueOf()` 方法返回的是对象本身，因此 JS 会继续调用 `toString()` 方法，返回得到一个字符串 `"[object Object]"`，再转换为数值`NaN`，所以返回`false`。\

### 小测试

问: foo 为何值时能输出 'check in' ?
```js
var foo =  ?
if( foo == 1 && foo == 2) {
  console.log('check in')
}
```
**先给出答案**

```js
var foo  = {
  a: 0, 
  valueOf: function() {
    return ++ this.a 
  }
}
if( foo == 1 && foo == 2) {
  console.log('check in')
}
```
或者
```js
var foo  = {
  a: 1, 
  valueOf: function() {
    return this.a ++ 
  }
}
if( foo == 1 && foo == 2) {
  console.log('check in')
}
```
**解释**

当对象跟数字比较的时候，会调用对象的 valueOf 方法，返回一个数字, 所以我们可以依据这个属性进行运算。



## 为什么 Vue3 中使用 ref 定义的变量要用 .value 呢?
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

## 在页面中添加水印可以通过控制台移除,那么怎么样才能避免用户移除水印呢?
可以通过用 MutationObserver 监听，重新添加水印

水印封装代码:
```js
function watermark(options = {}) {
  const {
    container = document.body, // 容器
    width = '240', // canvas元素宽
    height = '100', // canvas元素高
    textAlign = 'left', // 文字对齐
    textBaseline = 'bottom', // 基准线
    font = '16px Microsoft Yahei', // 字体大小及样式
    fillStyle = '#000', // 自定义水印的颜色
    content = '进制外传', // 水印内容
    globalAlpha = 0.3, // 设置图形和图像透明度的值
    rotate = 16, // 文字旋转角度
    zIndex = 1000, // 元素堆叠顺序
  } = options

  const canvas = document.createElement('canvas')
  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
  const ctx = canvas.getContext('2d') // 获取 canvas2d 上下文
  ctx.globalAlpha = globalAlpha
  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  ctx.font = font
  ctx.fillStyle = fillStyle
  ctx.rotate((Math.PI * rotate) / 180)
  // ctx.rotate(-10 * Math.PI / 140);
  ctx.fillText(content, 50, 50)

  const base64Url = canvas.toDataURL() // 返回一个包含图片展示的 data URI

  const __wm = document.querySelector('.__wm') // 选择器
  const watermarkDiv = __wm || document.createElement('div')
  const waterMarkStyle = `
    position:absolute;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
    z-index:${zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${base64Url}')`

  watermarkDiv.setAttribute('style', waterMarkStyle)
  watermarkDiv.classList.add('__wm') // 为元素添加“__wm”类名

  container.style.position = 'relative'
  container.appendChild(watermarkDiv) // 添加元素

  // 监听删除 防止用户去手动删除，如果手动删除 ，在重新添加
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
  // 检查浏览器是否支持这个API
  if (MutationObserver) {
    const args = arguments[0]
    const __wm = document.querySelector('.__wm')
    let mo = new MutationObserver(function () {
      // 只在__wm元素变动才重新调用
      if ((__wm && __wm.getAttribute('style') !== waterMarkStyle) || !__wm || document.body.style.position !== 'relative') {
        // 避免一直触发
        mo.disconnect()
        mo = null
        watermark(args)
      }
    })
    mo.observe(__wm, {
      // 视情况开启
      attributes: true, // 观察目标节点的属性节点
      subtree: false, // 观察目标节点的所有后代节点
      childList: true // 观察目标节点的子节点
    })
  }
}
export default watermark
```

## vue3 常用方法
ref、reactive、computed、watch、defineProps、defineExpose、defineEmits、withDefaults
- ref 用于定义基础类型变量
- reactive 用于定义引用类型变量
- computed 用于定义计算属性
- watch 用于监听数据变化
- defineProps 用于定义组件属性
- defineExpose 用于暴露组件内部数据
- defineEmits 用于定义组件内部事件
- withDefaults 用于定义组件默认属性值

基本用法

## 什么情况下会产生跨域？

跨域主要是由于**浏览器的同源策略**引用的，同源策略是浏览器的安全机制，**当协议，域名，端口三者有一个不同，浏览器就禁止访问资源**

**扩展**

**① 服务端请求服务端会跨域吗？**

不会，跨域主要针对对象是浏览器

**② webpack 或者 vite 中可以使用 proxy 解决跨域，它解决跨域的原理是什么？**

webpack 或者 vite 中可以使用 proxy 解决跨域， 其实现是提供一个中间服务器进行代理。
webpack 提供服务器的工具是 webpack-dev-server，只适用于开发阶段。

**③ 为什么跨域的时候有时候请求会发两次？**

当发起跨域请求时，浏览器会先发送一个预请求（通常是 OPTIONS 请求），用于询问服务器是否允许该跨域请求。如果服务器返回允许，则再发送正式的请求。如果预请求失败，则不会发送正式的请求

**④ 那为什么非要有这个预检请求呢？**

**检查跨域请求的安全性**： 预检请求用于验证是否允许发起跨域请求，以保障跨域请求的安全性。这有助于防止潜在的安全风险，如跨站请求伪造（CSRF）攻击。

**检查跨域请求的支持**： 预检请求允许服务器检查客户端的请求头（Request Headers）和方法（HTTP Methods），以确定是否支持跨域请求。这有助于服务器根据实际情况决定是否允许客户端访问资源。

**提供更好的错误信息**： 如果服务器不支持跨域请求，预检请求可以提供更详细的错误信息，以便客户端开发者了解问题所在。

**减少潜在的冲突**： 预检请求还可以用于避免一些潜在的冲突，如浏览器缓存问题，从而确保请求的顺利进行。

## cookie 的有效时间设置为 0 会怎么样？
`Cookie` 过期时间设置为 0，表示跟随系统默认，其销毁与 Session 销毁时间相同，会在浏览器关闭后删除

## for...in 和 for...of的区别

for…of 是 ES6 新增的遍历方式，允许遍历一个含有 iterator 接口的数据结构（数组、对象等）并且返回各项的值，和 ES3 中的 for…in 的区别如下

- for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
- for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；

## 样式穿透的写法总结
- css 可以使用 >>>，/deep/，::v-deep
- less 和 node-sass 可以使用/deep/，::v-deep
- dart-sass 可以使用::v-deep
- vue2.7 以上版本以及包括 vue3，应该使用:deep()


**总结**：

for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

<br/>
<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸

