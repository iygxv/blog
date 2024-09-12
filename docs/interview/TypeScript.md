---
sidebar:
  title: TypeScript试炼
  step: 1
  isTimeLine: true
title: TypeScript试炼
tags:
  - 试炼
categories:
  - 试炼
---

# TypeScript 试炼

## **什么是 TypeScript？**

**Typescript 是一个强类型的 JavaScript 超集**，支持 ES6 语法，支持面向对象编程的概念，如类、接口、继承、泛型等。Typescript 并不直接在浏览器上运行，需要编译器编译成纯 Javascript 来运行。

## **为什么要使用 TypeScript ? TypeScript 相对于 JavaScript 的优势是什么？**

增加了静态类型，可以在开发人员编写脚本时检测错误，使得代码质量更好，更健壮。
优势:

- 杜绝手误导致的变量名写错类型

- 可以一定程度上充当文档;
- IDE 自动填充，自动联想

## **TypeScript 中 const 和 readonly 的区别？枚举和常量枚举的区别？接口和类型别名的区别？**

`const 和 readonly`: const 可以防止变量的**值**被修改，readonly 可以防止变量的**属性**被修改。

`枚举和常量枚举`: 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。 常量枚举成员在使用的地方会被内联进来。 之所以可以这么做是因为，常量枚举不允许包含计算成员。
`接口和类型别名`: 两者都可以用来描述对象或函数的类型。与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。

## **TypeScript 中 any 类型的作用是什么？**

为编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。

## **TypeScript 中 any、never、unknown、null & undefined 和 void 有什么区别？**

`any`: 动态的变量类型（失去了类型检查的作用）。
`never`: 永不存在的值的类型。例如：never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
`unknown`: 任何类型的值都可以赋给 unknown 类型，但是 unknown 类型的值只能赋给 unknown 本身和 any 类型。
`null & undefined`: 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。当你指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。
`void`: 没有任何类型。例如：一个函数如果没有返回值，那么返回值可以定义为 void。

## **TypeScript 中 interface 可以给 Function / Array / Class（Indexable）做声明吗？**

可以， 见下面例子：

```ts
// 函数声明
interface Say {
  (name: string): viod;
}
let say: Say = (name: string): viod => {};
// Array 声明
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
// Class 声明
interface PersonalIntl {
  name: string;
  sayHi(name: string): string;
}
```

## **TypeScript 中可以使用 String、Number、Boolean、Symbol、Object 等给类型做声明吗？**

可以， 见下面例子：

```ts
let name: string = "bob";
let decLiteral: number = 6;
let isDone: boolean = false;
let sym: symbol = Symbol();
interface Person {
  name: string;
  age: number;
}
```

## **TypeScript 中的 this 和 JavaScript 中的 this 有什么差异？**

TypeScript：noImplicitThis: true 的情况下，必须去声明 this 的类型，才能在函数或者对象中使用 this。

Typescript 中箭头函数的 this 和 ES6 中箭头函数中的 this 是一致的。

## **TypeScript 中使用 Union Types（联合类型） 时有哪些注意事项？**

**属性或方法访问**: 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。

```ts
function getLength(something: string | number): number {
  return something.length;
}
// index.ts(2,22): error TS2339: Property 'length' does not exist on type >'string | number'.
//   Property 'length' does not exist on type 'number'.

function getString(something: string | number): string {
  return something.toString();
}
// 公共方法和属性可以访问
```

## **TypeScript 中的泛型是什么？**

泛型是一种在定义函数、类或接口时不指定具体类型，以下是一个使用泛型的例子：

```ts
function compare<T>(a: T, b: T): number {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}
```

## **TypeScript 中如何联合枚举类型的 Key?**

```ts
enum str {
  A,
  B,
  C,
}
type strUnion = keyof typeof str; // 'A' | 'B' | 'C'
```

## **TypeScript 中 type 和 interface 的区别?**

相同点：

- 都可以描述 '对象' 或者 '函数'
- 都允许拓展(extends)

不同点：

- type 可以声明基本类型，联合类型，元组
- type 可以使用 typeof 获取实例的类型进行赋值
- 多个相同的 interface 声明可以自动合并

使用 interface 描述‘数据结构’，使用 type 描述‘类型关系’

## **TypeScript 中 ?.、??、!、!.、\_、\*\* 等符号的含义？**

`?. 可选链` 遇到 null 和 undefined 可以立即停止表达式的运行。
`?? 空值合并运算符` 当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数。
`! 非空断言运算符` x! 将从 x 值域中排除 null 和 undefined
`!. ` 在变量名后添加，可以断言排除 undefined 和 null 类型
`_ 数字分割符` 分隔符不会改变数值字面量的值，使人更容易读懂数字 .e.g 1_101_324。
`** `求幂

## **简单介绍一下 TypeScript 模块的加载机制？**

假设有一个导入语句 `import { a } from "moduleA"`;

- 首先，编译器会尝试定位需要导入的模块文件，通过绝对或者相对的路径查找方式；
- 如果上面的解析失败了，没有查找到对应的模块，编译器会尝试定位一个`外部模块声明`（.d.ts）；
- 最后，如果编译器还是不能解析这个模块，则会抛出一个错误 `error TS2307: Cannot find module 'moduleA'.`

## **简单聊聊你对 TypeScript 类型兼容性的理解？**

`ts 类型兼容：` 当一个类型 Y 可以赋值给另一个类型 X 时， 我们就可以说类型 X 兼容类型 Y。也就是说两者在结构上是一致的，而不一定非得通过 extends 的方式继承而来
`接口的兼容性：X = Y `只要目标类型 X 中声明的属性变量在源类型 Y 中都存在就是兼容的（ Y 中的类型可以比 X 中的多，但是不能少）
`函数的兼容性：X = Y ` Y 的每个参数必须能在 X 里找到对应类型的参数，参数的名字相同与否无所谓，只看它们的类型（参数可以少但是不能多。与接口的兼容性有区别，原因参考第 17 问）

## **协变、逆变、双变和抗变的理解？**

`协变：X = Y `Y 类型可以赋值给 X 类型的情况就叫做协变，也可以说是 X 类型兼容 Y 类型

```ts
interface X {
  name: string;
  age: number;
}
interface Y {
  name: string;
  age: number;
  hobbies: string[];
}
let x: X = { name: "xiaoming", age: 16 };
let y: Y = { name: "xiaohong", age: 18, hobbies: ["eat"] };
x = y;
```

`逆变：printY = printX` 函数 X 类型可以赋值给函数 Y 类型，因为函数 Y 在调用的时候参数是按照 Y 类型进行约束的，但是用到的是函数 X 的 X 的属性和方法，ts 检查结果是类型安全的。这种特性就叫做逆变，函数的参数有逆变的性质。

```ts
let printY: (y: Y) => void;
printY = (y) => {
  console.log(y.hobbies);
};
let printX: (x: X) => void;
printX = (x) => {
  console.log(x.name);
};
printY = printX;
```

`双变（双向协变）：X = Y；Y = X`父类型可以赋值给子类型，子类型可以赋值给父类型，既逆变又协变，叫做“双向协变”（ts2.x 之前支持这种赋值，之后 ts 加了一个编译选项 strictFunctionTypes，设置为 true 就只支持函数参数的逆变，设置为 false 则支持双向协变）
`抗变（不变）：`非父子类型之间不会发生型变，只要类型不一样就会报错

## **TypeScript 中对象展开会有什么副作用吗？**

展开对象后面的属性会覆盖前面的属性；

仅包含对象自身的可枚举属性，不可枚举的属性将会丢失。

## **类型的全局声明和局部声明**

如果声明文件内不包含`import、export`，那么这个文件声明的类型就会变成全局声明。

反之，若是这个文件包含了`import、export`，那么这个文件包含的类型声明则会是局部声明，不会影响到全局声明。

## **TypeScript 中同名的 interface 或者同名的 interface 和 class 可以合并吗？**

同名的 interface 会自动合并，同名的 interface 和 class 会自动聚合。

## **如何使 TypeScript 项目引入并识别编译为 JavaScript 的 npm 库包？**

- 选择安装 ts 版本，`npm install @types/包名 --save`；
- 对于没有类型的 js 库，需要编写同名的.d.ts 文件

## **TypeScript 的 tsconfig.json 中有哪些配置项信息？**

```json
{
  "files": [],
  "include": [],
  "exclude": [],
  "compileOnSave": false,
  "extends": "",
  "compilerOptions": { ... }
}
```

`files` 是一个数组列表，里面包含指定文件的相对或绝对路径，用来指定待编译文件，编译器在编译的时候只会编译包含在 files 中列出的文件。
`include & exclude` 指定编译某些文件，或者指定排除某些文件。
`compileOnSave：true` 让 IDE 在保存文件的时候根据 tsconfig.json 重新生成文件。
`extends` 可以通过指定一个其他的 tsconfig.json 文件路径，来继承这个配置文件里的配置。
`compilerOptions` 编译配置项，如何对具体的 ts 文件进行编译

## **TypeScript 中如何设置模块导入的路径别名？**

通过 tsconfig.json 中的 paths 项来配置:

```json
{
  "compilerOptions":
    {
      "baseUrl": ".",
      "paths": {
         "@/*": ["src/*"],
         ...
      }
   }
```

## **declare，declare global 是什么？**

`declare` 是用来定义全局变量、全局函数、全局命名空间、js modules、class 等
`declare global` 为全局对象 `window` 增加新的属性

```ts
declare global {
  interface Window {
    csrf: string;
  }
}
```

## **对 TypeScript 类中成员的 public、private、protected、readonly 修饰符的理解？**

`public`: 成员都默认为`public`，被此限定符修饰的成员是可以被外部访问；
`private`: 被此限定符修饰的成员是只可以被类的内部访问；
`protected`: 被此限定符修饰的成员是只可以被类的内部以及类的子类访问;
`readonly`: 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

## **keyof 和 typeof 关键字的作用？**

`keyof 索引类型查询操作符` 获取索引类型的属性名，构成联合类型。
`typeof` 获取一个变量或对象的类型。

## **简述工具类型 `Exclude`、`Omit`、`Merge`、`Intersection`、`Overwrite`的作用**

`Exclude<T, U>` 从 `T` 中排除出可分配给 `U`的元素。
`Omit<T, K>` 的作用是忽略`T`中的某些属性。
`Merge<O1, O2>` 是将两个对象的属性合并。
`Compute<A & B>` 是将交叉类型合并
`Intersection<T, U>`的作用是取`T`的属性,此属性同样也存在与`U`。
`Overwrite<T, U>` 是用`U`的属性覆盖`T`的相同属性。

## **数组定义的两种方式**

```ts
type Foo = Array<string>;
interface Bar {
  baz: Array<{ name: string; age: number }>;
}

type Foo = string[];
interface Bar {
  baz: { name: string; age: number }[];
}
```

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
