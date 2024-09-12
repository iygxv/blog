---
sidebar:
  title: 深入this指向
  step: 995
  isTimeLine: true
title: 深入this指向
tags:
  - JavaScript
categories:
  - JavaScript
---

# 深入 this 指向

## **this 到底指向什么呢?**

**this 的绑定规则**

- 绑定一: 默认绑定
- 绑定二: 隐式绑定
- 绑定三: 显示绑定
- 绑定四: new 绑定

## **规则一:默认绑定**

什么情况下使用默认绑定呢?独立函数调用。

独立的函数调用我们可以理解成函数没有被绑定到某个对象上进行调用

```js
function foo() {
  console.log(this); // window
}
foo();
```

## **规则二:隐式绑定**

隐式绑定是指调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含

```js
const obj = {
  name: "vvv",
  bar: function () {
    console.log(this);
  },
};
obj.bar(); // obj
```

```js
function foo() {
  console.log(this.a);
}
var obj2 = {
  a: 42,
  foo: foo,
};
var obj1 = {
  a: 42,
  obj2: obj2,
};

obj1.obj2.foo(); // 42
```

### 隐式丢失

隐式绑定的常见问题隐式丢失

一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式

```js
function foo() {
  console.log(this.a);
}
var obj3 = {
  a: 6,
  foo: foo,
};
var a = "global a";
var bar = obj.foo;
bar(); // 'global a'
```

## **规则三:显示绑定**

直接指定 this 的绑定对象，因此我们称之为显式绑定(也就是使用`call/apply/bind`)

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 3,
};
foo.call(obj); // 3
foo.apply(obj); // 3

// 如果希望一个函数总是显示的绑定一个对象中,可以使用bind
let bar = foo.bind(obj);
bar(); // 3
```

## **规则四: new 绑定**

```js
function Person(name) {
  this.name = name;
  console.log(this);
}
var p = new Person("vvv"); // 实例p
```

## **规则优先级**

如果一个函数调用位置应用了多 条规则，优先级谁更高呢?

### **1.默认规则的优先级最低**

毫无疑问，默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定 this

#### **2.显示绑定优先级高于隐式绑定**

```js
function foo() {
  console.log(this.a);
}
var obj1 = {
  a: 2,
  foo: foo,
};
var obj2 = {
  a: 3,
  foo: foo,
};
// 隐式绑定
obj1.foo(); // 2
obj2.foo(); // 3
// 显示绑定
obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2
```

#### **3.new 绑定优先级高于隐式绑定**

```js
function foo(something) {
  this.a = something;
}
var obj1 = {
  foo: foo,
};
var bar = new obj1.foo(4);
console.log(obj1.a); // undefined
console.log(bar.a); // 4
```

##### **4.new 绑定优先级高于 bind**

new 和 call/apply 无法一起使用，因此无法通过 new foo.call(obj1)来直接进行测试。但是我们可以使用硬绑定来测试它俩的优先级

```js
function foo(something) {
  this.a = something;
}
var obj1 = {};
var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
```

## **this 规则之外 – 忽略显示绑定**

如果在显示绑定中，我们传入一个 null 或者 undefined，那么这个显示绑定会被忽略，使用默认规则

```js
function foo() {
  console.log(this.a);
}
var obj = {
  name: "vvv",
};
foo.call(obj); // obj
foo.call(null); // window
foo.call(undefined); // window
```

## **ES6 箭头函数 this**

之前的代码在 ES6 之前是我们最常用的方式，从 ES6 开始，我们会使用箭头函数

- 为什么在 setTimeout 的回调函数中可以直接使用 this 呢?
- 因为箭头函数并不绑定 this 对象，那么 this 引用就会从上层作用于中找到对应的 this

```js
let obj = {
  data: [1, 2, 3],
  getData: function () {
    setTimeout(() => {
      console.log(this.data); // [1, 2, 3]
    }, 1000);
  },
};
obj.getData();
```

```js
let obj = {
  data: [1, 2, 3],
  getData: () => {
    setTimeout(() => {
      console.log(this.data); //  undefined
    }, 1000);
  },
};
obj.getData();
```

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
