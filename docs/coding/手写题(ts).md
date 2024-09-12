---
sidebar:
  title: 手撕代码（ts 版本）
  step: 4
  isTimeLine: true
title: 手撕代码（ts 版本）
tags:
  - 手撕代码
categories:
  - 手撕代码
---

# 手写题(ts)

## 手写的要求

有自己的思考

## 防抖节流

### **防抖**

防抖: 在给定的时间间隔内只允许你提供的回调函数执行一次，以此降低它的执行频率

```typescript
class Debounced {
  /**
   * 11.22
   * @param fn 需要防抖的函数
   * @param wait 等待时间
   * @param immediate 是否立即触发
   */
  static use(fn: Function, wait = 500, immediate = false) {
    let timer: NodeJS.Timeout | null = null;
    return (...args: any) => {
      if (timer) {
        clearTimeout(timer);
      }
      if (immediate) {
        // 马上触发
        if (!timer) fn.call(this, ...args);
        timer = setTimeout(() => {
          timer = null; //n 秒内 多次触发事件,重新计算timer
        }, wait);
      } else {
        // 等待触发
        timer = setTimeout(() => {
          fn.call(this, ...args);
        }, wait);
      }
    };
  }
}

// 使用方式
Debounced.use(fn, wait, immediate);
```

### 防抖场景

- search 搜索联想，用户在不断输入值时，用防抖来节约请求资源。
- window 触发 resize 的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

### **节流**

节流: 单位时间内只能触发一次

```typescript
class Throttle {
  /**
   * 11.22
   * @param fn 需要节流的函数
   * @param wait 等待的时间
   * @param isSetTimeout  是否启动定时器版本 (另一时间搓版本)
   */
  static use(fn: Function, wait = 500, isSetTimeout = false) {
    // 定时器版本
    if (isSetTimeout) {
      let timer: NodeJS.Timeout | null = null;
      return (...args: any) => {
        if (!timer) {
          fn.call(this, ...args); // 放在外面第一次不需要等待时间 就会触发
          timer = setTimeout(() => {
            timer && clearTimeout(timer);
            timer = null;
          }, wait);
        }
      };
    } else {
      // 时间搓版本
      let prevTime = 0;
      return (...args: any) => {
        let nowTime = Date.now();
        if (nowTime - prevTime >= wait) {
          // 达到可以触发的时间
          fn.call(this, ...args);
          prevTime = nowTime; // 闭包缓存变量
        }
      };
    }
  }
}

// 使用方式
Throttle.use(fn, wait, isSetTimeout);
```

### 节流场景

- 鼠标不断点击触发，mousedown(单位时间内只触发一次)
- 监听滚动事件，比如是否滑到底部自动加载更多，用 throttle 来判断

## LRU 缓存算法

LRU 算法的原理: 每次获取值的时候都会重新设置值, 所以最近最少使用的必然是最前面的那个

```typescript
/**
 * 11.23
 * LRUCache缓存算法
 * LRU算法的原理: 每次获取值的时候都会重新设置值, 所以最近最少使用的必然是最前面的那个
 */
export class LRUCache {
  capacity: Number;
  cacheMap: Map<any, any>;
  constructor(capacity: Number) {
    this.capacity = capacity;
    this.cacheMap = new Map();
  }
  /**
   * get的情况
   * cacheMap已经有这个key了, 我们需要 重新设置这个key, 并排在最后(最后的为最新的)
   * @param key cacheMap中的键
   */
  get(key: any): number {
    if (this.cacheMap.has(key)) {
      let value = this.cacheMap.get(key);
      this.cacheMap.delete(key);
      // 重新设置
      this.cacheMap.set(key, value);
      return value;
    }
    return -1;
  }
  /**
   * set分3种情况
   * 1. 如果已经存在, 删除重新设置
   * 2. 容量没有上限, 继续添加
   * 3. 容量已经上限 ,先添加进去, 再删除第一个
   * @param key cacheMap中的键
   */
  set(key: any, value: any): void {
    if (this.cacheMap.has(key)) {
      this.cacheMap.delete(key);
      this.cacheMap.set(key, value);
    } else if (this.cacheMap.size < this.capacity) {
      this.cacheMap.set(key, value);
    } else {
      this.cacheMap.set(key, value);
      // 删除第一个
      this.cacheMap.delete(this.cacheMap.keys().next().value);
    }
  }
}
```

## 函数柯里化

柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，
并且返回接受余下的参数且返回结果的新函数的技术

```typescript
/**
 * 11.24
 * 函数柯里化
 * 柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，
 * 并且返回接受余下的参数且返回结果的新函数的技术
 */
function currying(fn: Function, ...args: any[]): Function {
  // 1.获取当前函数参数的长度
  const fnLength: number = fn.length;
  let allArgs: any[] = [...args];
  // 2.使用闭包保存参数
  const dfs = (...args2: any[]) => {
    allArgs = [...allArgs, ...args2];
    // 3.比较俩这者, 如果相等, 则收集完参数了
    if (fnLength === allArgs.length) {
      // 4.收集完可以执行函数fn了
      return fn(...allArgs);
    } else {
      // 3.1 如果不等, 继续收集
      return dfs; // 不用写参数
    }
  };
  return dfs;
}

// 测试
const fn = (a: number, b: number, c: number): number => {
  return a + b + c;
};
const ret: unknown = currying(fn, 3)(4)(5);
console.log(ret);
```

## 剔除对象的属性

- **对对象进行浅拷贝**
- **进行属性的删除**

```typescript
/**
 * 11.25
 * @param obj 需要剔除属性的对象
 * @param args 剔除的属性数组
 * @returns 剔除属性后的对象
 */
export const omit = (obj: {}, ...args: any[]) => {
  const shallowCopy = Object.assign({}, obj);
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    if (key in shallowCopy) {
      Reflect.deleteProperty(shallowCopy, key);
    }
  }
  return shallowCopy;
};

const obj = {
  name: "vvv",
  age: 18,
};
console.log(omit(obj, "age"));
```

### 扩展： **Record**

**Record：定义一个对象的 key 和 value**
**基本用法：Record<key type, value type> **

**Record 的实现**

```typescript
type Record<K extends string | number | symbol, T> = {
  [P in K]: T;
};

/**
 * 解释
 * 泛型K 为第一个参数
 * p in xx 又是什么意思呢？
 * in的意思就是遍历，如上就是将 类型string进行遍历，也就是string
 * 每个属性都是传入的T类型，如 string: PersonModel
 */
```

## 对象值查找

```javascript
/**
 * 11.28
 * 对象值查找
 * @param obj 对象
 * @param keyName 键名
 */
export const lookup = (obj: Record<string, unknown>, keyName: string) => {
  if (!keyName.includes(".") || keyName === ".") return;

  const keys = keyName.split("."); // [a, c]
  let temp: any = obj;
  keys.forEach((key) => {
    temp = temp[key]; // 循环每次将结果,给到下一次
  });
  //循环结束后返回temp
  return temp;
};

const obj2: Record<string, unknown> = {
  a: {
    b: {
      c: 456,
    },
  },
};
console.log(lookup(obj2, "a.b.c")); // 456
```

## 实现 Object.create

```typescript
/**
 * 11.29创建一个对象,并且传入改对象的原型
 * @param prototype 原型
 * @returns
 */
const create = (prototype: Record<string, unknown>): => {
  // 创建一个构造函数
  function F() {}
  F.prototype = prototype
  return new F() // 返回实例 -- 其目标缺少构造签名的 "new" 表达式隐式具有 "any" 类型（待补充）
}
```

## 实现模版字符串

```typescript
/**
 * 11.30模板字符串解析
 * @param template 模版
 * @param data 数据
 * @returns
 */
const render = (template: string, data: Record<string, unknown>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, ...key: any[]) => {
    /*
     *match =>{{name}} 字符串中匹配到的
     *key => 查看下面MDN对replace的描述
     */

    return key[0] && data[key[0]];
  });
};

let template = "我是{{name}}，年龄{{age}}";
let data = {
  name: "小明",
  age: 18,
};

// 要求写一个函数使编译结果为
console.log(render(template, data)); // 我是小明，年龄18
```

[replace 的描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace?qs=replace)

## 大数相加

```typescript
/**
 * 12.1大数相加
 * @param a 数1
 * @param b 数2
 * @returns 结果
 */
export const add = (a: string, b: string): string => {
  // 1.补齐俩个的位数(使2个位数一样)
  const maxLength = Math.max(a.length, b.length);
  // 1.1开始补位
  a = a.padStart(maxLength, "0");
  b = b.padStart(maxLength, "0");
  // 2.循环遍历
  let t = 0; // 十位
  let f = 0; // 进位
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    t = Number(a[i]) + Number(b[i]) + f;
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }
  // 最后是否还存在进位
  if (f !== 0) {
    sum = "" + f + sum;
  }
  return sum;
};

let a = "9007199254740991";
let b = "123456789999999999";
console.log(add(a, b)); // 132463989254740990
```

## LazyMan

```typescript
/**
 * 12.2 LazyMan
 * 核心: 链式调用
 */
export class LazyMan {
  name: string;
  tasks: Function[];
  constructor(name: string) {
    this.name = name;
    this.tasks = []; // 任务列表
    const task = () => {
      console.log(`Hi! my name is ${name}`);
      this.run(); // 执行下个任务
    };
    this.tasks.push(task);
    // 开始任务
    setTimeout(() => {
      this.run();
    }, 0);
  }
  run() {
    const taskFn = this.tasks.shift(); // 取第一个任务执行
    taskFn && taskFn();
  }
  sleep(time: number) {
    const task = () => {
      setTimeout(() => {
        console.log(`等待${time}s`);
        this.run();
      }, time * 1000);
    };
    this.tasks.push(task);
    return this;
  }
  eat(food: string) {
    const task = () => {
      console.log(`eat ${food}`);
      this.run();
    };
    this.tasks.push(task);
    return this;
  }
}

const vvv = new LazyMan("vvv");
vvv.sleep(2).eat("dinner");
```

## 实现并行限制的 Promise 调度器

```typescript
/**
 * 12.5 Scheduler
 * 核心: 循环 => 并行
 */
class Scheduler {
  queue: Function[];
  limit: number;
  runCounts: number;
  constructor(limit: number) {
    this.limit = limit; // 最大运行限制
    this.queue = []; // 队列
    this.runCounts = 0; // 正在运行
  }
  add(time: number, task: string) {
    const createTask = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(task);
          resolve(task);
        }, time);
      });
    };
    this.queue.push(createTask);
  }
  request() {
    if (!this.queue.length || this.runCounts >= this.limit) return;
    const taskFn = this.queue.shift();
    const task = taskFn && taskFn();
    task.then((res: string) => {
      // 执行完毕后runCounts--
      this.runCounts--;
      // 并执行下一个任务
      this.request();
    });
  }
  start() {
    for (let i = 0; i < this.limit; i++) {
      // 多个任务一起执行（并行）
      this.request();
    }
  }
}
const scheduler = new Scheduler(2);
const addTask = (time: number, order: string) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.start(); // 2 3 1 4
```

## 实现 maxRequest

实现 maxRequest，成功后 resolve 结果，失败后重试，尝试超过一定次数才返回真正的 reject

```typescript
/**
 * 12.6
 * 实现maxRequest，成功后resolve结果，失败后重试，尝试超过一定次数才返回真正的reject
 * @param fetch  请求
 * @param max 最大可尝试次数
 */
const maxRequest = (request: Promise<unknown>, max: number) => {
  return new Promise((resolve, reject) => {
    const dfs = (num: number) => {
      const value = request
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          if (num > 0) {
            num--;
            // 如果还有次数尝试,继续递归
            dfs(num);
          } else {
            // 没有次数了, 返回reject
            reject(err);
          }
        });
      Promise.resolve(value);
    };
    dfs(max);
  });
};

const request = new Promise((resolve, reject) => {
  reject("发送请求失败");
});
maxRequest(request, 3)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

## 深拷贝

```typescript
const isObject = (val: unknown): val is boolean =>
  typeof val === "object" && val !== null;
/**
 * 12.7深拷贝
 * @param obj
 * @param map
 * @returns
 */
export const deepCopy = (
  obj: Record<string, any> | unknown[],
  map = new WeakMap()
) => {
  // 如果已经深拷贝过了, 就返回原值
  if (map.has(obj)) {
    return obj;
  }
  // 没有深拷贝过,进行深拷贝
  let newObj: Record<string, any> | unknown[] = obj instanceof Array ? [] : {};
  // 循环遍历
  for (let key in obj) {
    // 不拷贝继承属性
    if (obj.hasOwnProperty(key)) {
      // as keyof typeof obj 遍历出obj的所有属性类型
      /**
       * 举例子
       * const obj = {
       *  a: 1,
       *  b: 2
       * }
       * type test = keyof typeof obj  === type test = "a" | "b"
       */
      let _key = key as keyof typeof newObj;
      newObj[_key] = isObject(obj[_key]) ? deepCopy(obj[_key], map) : obj[_key];
    }
  }
  return newObj;
};

// 对象
let obj1: Record<string, any> = { a: 1, c: { b: 3 } };
let newObj = deepCopy(obj1);
obj1 === newObj; // false =>深拷贝
```

:::info
**小知识**

- **使用 WeakMap 来检测是否有循环引用问题**
- **as keyof typeof obj 遍历出 obj 的所有属性类型（常用在 obj[key]身上）**

**相关**

- **浅拷贝: 对象 Object.assign 数组 slice concat 扩展运行符**
- **深拷贝: JSON.parse(JSON.stringify(obj)) 缺点: 不支持 function, undefined symbol**
  :::

## 对象扁平化

```typescript
const isObject = (val: unknown): val is boolean =>
  typeof val === "object" && val !== null;
const isArray = Array.isArray;
/**
 * 12.8对象扁平化
 * @param obj 需要扁平的对象
 */
const flattenObj = (obj: Record<string, any>) => {
  // 接受结果
  const ret: Record<string, any> = {};
  const dfs = (target: Record<string, any>, oldKey: string) => {
    // 循环
    for (let key in target) {
      let newKey: string;
      // 通过是否有oldKey,来判断是不是是初始化情况
      if (oldKey) {
        // 非初始化情况
        if (isArray(target)) {
          // 数组是a[0]
          newKey = oldKey + `[${key}]`;
        } else {
          //对象a.c样子
          newKey = oldKey + `.${key}`;
        }
      } else {
        // 初始化情况
        if (isArray(target)) {
          // 数组是[0] / [1] 这样子的
          newKey = `[${key}]`;
        } else {
          // 对象
          newKey = `${key}`;
        }
      }
      // 递归的去处理
      if (isObject(target[key])) {
        dfs(target[key], newKey);
      } else if (target[key] !== null && target[key] !== undefined) {
        // 递归出口, 赋值
        ret[newKey] = target[key];
      }
    }
  };
  // 递归
  dfs(obj, "");
  return ret;
};
const inputObj = {
  a: 1,
  b: [1, 2, { c: true }, [3]],
  d: { e: 2, f: 3 },
  g: null,
};
console.log(flattenObj(inputObj));
```

:::info
**核心就是使用递归去处理， 需要注意一下两个点**

- **区分初始化和有 oldKey 情况**
- **数组和对象的处理不一样**
  :::

## compose 组合函数

```typescript
/**
 * 12.9组合函数
 * @param fns 多个函数fn
 */
const composeRight = (...fns: Function[]): Function => {
  return function (...args: any[]) {
    // 获取fns 的长度 => 有多少个寒暑
    const fnLen: number = fns.length;
    if (fnLen === 0) {
      return args;
    } else if (fnLen === 1) {
      return fns[0](...args);
    } else {
      // fnLen >=2
      // 获取到最后一个函数
      const lastFn: Function | undefined = fns.pop();
      // 获取到最后一个函数执行的结果
      const prev = lastFn && lastFn(...args);
      // 需要注意reduceRight从右往左
      return fns.reduceRight((prev, cur) => {
        return cur(prev);
      }, prev);
    }
  };
};
function add(a: number, b: number) {
  return a + b;
}
function len(str: number) {
  return String(str).length;
}
function preFix(str: string) {
  return `###${str}`;
}

let retFn = composeRight(preFix, len, add); // 返回一个函数
console.log(retFn(1, 10)); // ###2
```

:::info
**组合函数的注意点**

- **需要区分函数的个数（在 0 个、1 个、多个）的时候应该如何处理**
- **使用 reduceRight 来写， 会方便且易理解很多**
  :::

## 使用代理（优化获取）

```javascript
// 使用代理
const instance = {
  props: { a: 1 },
  setupState: { b: 2, c: 3 },
};
// 我们访问props中的a属性  instance.props.a  过于长, 那么使用代理可以简化成proxy.a 就可以访问
const proxy = new Proxy(instance, {
  get(target, key) {
    const { setupState, props } = target;
    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    } else {
      return undefined;
    }
  },
  set(target, key, newValue) {
    const { setupState, props } = target;
    if (hasOwn(setupState, key)) {
      setupState[key] = newValue;
    } else if (hasOwn(props, key)) {
      props[key] = newValue;
    }
  },
});
console.log(proxy.a); // 1
console.log(proxy.b); // 2
console.log(proxy.c); // 3
```

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
