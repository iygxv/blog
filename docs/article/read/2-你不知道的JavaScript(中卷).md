# 你不知道的JavaScript(中卷)
## 类型

1. JavaScript有七种内置类型：

- 空值（null）

- 未定义（undefined）

- 布尔值（boolean）

- 数字（number）

- 字符串（string）

- 对象（object）

- 符号（symbol, ES6中新增）

除对象之外，其他统称为“基本类型”。



2.function（函数）也是JavaScript的一个内置类型。然而查阅规范就会知道，它实际上是object的一个“子类型”。具体来说，函数是“可调用对象”，它有一个内部属性[[Call]]，该属性使其可以被调用。

3.很多开发人员将undefined和undeclared混为一谈，但在JavaScript中它们是两码事。undefined是值的一种。undeclared则表示变量还没有被声明过。

4.JavaScript中的“整数”就是没有小数的十进制数。所以42.0即等同于“整数”42

5.toPrecision(..)方法用来指定有效数位的显示位数

```js
var a = 42.59
a.toPrecision(2) // 43
a.toPrecision(3) // 42.6
a.toPrecision(4) // 42.59
```

6.小数精度问题

```js
0.1 + 0.2 === 0.3 // false
```

从数学角度来说，上面的条件判断应该为true，可结果为什么是false呢？

简单来说，二进制浮点数中的0.1和0.2并不是十分精确，它们相加的结果并非刚好等于0.3，而是一个比较接近的数字0.30000000000000004，所以条件判断结果为false。

那么应该怎样来判断0.1 + 0.2和0.3是否相等呢

最常见的方法是设置一个误差范围值，通常称为“机器精度”（machine epsilon），对JavaScript的数字来说，这个值通常是2^-52 (2.220446049250313e-16)。

从ES6开始，该值定义在Number.EPSILON中，我们可以直接拿来用，也可以为ES6之前的版本写polyfill：

```js
if(!Number.EPSILON) {
  Number.EPSILON = Math.pow(2, -52)
}
```

可以使用Number.EPSILON来比较两个数字是否相等（在指定的误差范围内）：

```js
function compare(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON
}
const a = 0.1 + 0.2
const b = 0.3
compare(a, b) // true
```

7.要检测一个值是否是整数，可以使用ES6中的Number.isInteger(..)方法

ES6之前的版本polyfill Number.isInteger(..)方法：

```js
if(Number.isInteger) {
  Number.isInteger = function(num) {
    return typeof num === 'number' && num % 1 === 0
  }
}
```

8.Infinity 与 Number.MAX_VALUE

```js
Infinity // 代表可能溢出最大安全数字
Number.MAX_VALUE // 代表最大安全数字

Infinity >= Number.MAX_VALUE // true
Infinity < Number.MAX_VALUE // false
```

9.由于基本类型值没有．length和．toString()这样的属性和方法，需要通过封装对象才能访问，此时JavaScript会自动为基本类型值包装（box或者wrap）一个封装对象

10.如果想要自行封装基本类型值，可以使用Object(..)函数（不带new关键字）

```js
let str = 'abc'
let strObj = Object(str)

typeof str // 'string'
typeof strObj // 'object'
```

11.获取封装对象的值

```js
const a = new String('abc')
const b = new Number(42)
const c = new Boolean(true)

a.valueOf() // 'abc'
b.valueOf() // 42
c.valueOf() // true
```

12.构造函数Array(..)不要求必须带new关键字。不带时，它会被自动补上。因此Array(1,2,3)和new Array(1,2,3)的效果是一样的

13.获取时间搓

```js
const timestamp = + new Date()
const timestamp = new Date().getTime()
// es5中的
const timestamp = Date.now()
```

我们不建议对日期类型使用强制类型转换，应该使用Date.now()来获得当前的时间戳，使用new Date(..).getTime()来获得指定时间的时间戳。

14.~运算符

`~x大致等同于-(x+1)`

```js
const arr = [1, 2, 3, 4]
!~arr.indexOf(6)// true
~arr.indexOf(6) // 0 -> -(-1 + 1) => -0
!0 // true
```

15.~~运算符

用~~来截除数字值的小数部分

```js
// 正数
Math.floor(49.6) // 49
~~49.6 // 49

// 负数的时候
Math.floor(-49.6) // -50
~~-49.6 // -49
```

```js
49.6 >>> 0 // 也可以移除小数部分
```

16.宽松相等（loose equals）`==`和严格相等（strict equals）`===`都用来判断两个值是否“相等”, `==`允许在相等比较中进行强制类型转换，而`===`不允许

## 异步和性能
