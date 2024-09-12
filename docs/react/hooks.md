---
sidebar:
  title: 常用的 hooks
  step: 1
  isTimeLine: true
title: 常用的 hooks
tags:
  - React
categories:
  - React
---

# 常用的 hooks

## useState

`useState`： 用于在函数组件中添加和管理状态

```tsx
import { useState } from "react";

function App() {
  const [num, setNum] = useState(0);
  // useState 传入函数时一般是用于复杂计算的, 但是不支持异步
  const [count, setCount] = useState(() => {
    const a = 10;
    const b = 30;
    return a + b;
  });
  const add = () => {
    setNum(num + 1);
  };
  const add2 = () => {
    setCount(count + 10);
  };
  return (
    <>
      <div>{num}</div>
      <button onClick={add}>num增加 + 1</button>
      <hr />
      <div>{count}</div>
      <button onClick={add2}>count增加 + 10</button>
    </>
  );
}

export default App;
```

:::tip 需要注意的点

- 不要在 useState 中写异步逻辑
  :::

## useEffect 和 useLayoutEffect

`useEffect`：副作用 effect 函数是在渲染之外额外执行的一些逻辑。它是根据第二个参数的依赖数组是否变化来决定是否执行 effect，可以返回一个清理函数，会在下次 effect 执行前执行。

`useLayoutEffect`：和 useEffect 差不多，但是 useEffect 的 effect 函数是异步执行的，所以可能中间有次渲染，会闪屏，而 useLayoutEffect 则是同步执行的，所以不会闪屏，但如果计算量大可能会导致掉帧。

```tsx
import { useState, useEffect } from "react";

function App() {
  const [num, setNum] = useState(0);
  const add = () => {
    setNum(num + 1);
  };
  useEffect(() => {
    console.log("useEffect");

    const timer = setInterval(() => {
      console.log(num);
    }, 1000);
    return () => {
      console.log("clean up");
      clearInterval(timer);
    };
  }, [num]);
  return (
    <>
      <div>{num}</div>
      <button onClick={add}>增加</button>
    </>
  );
}

export default App;
```

:::tip 需要注意的点

- useEffect 的第二个参数，是一个数组，当数组中的值发生变化时，才会执行副作用函数
- 如果我们传一个空数组 / 一个常量(1, 2, 3...这些)，那么 useEffect 只会执行一次
- 如果不穿第二个参数，那么 useEffect 每次都会执行
- 如果在 useEffect 里如果跑了一个定时器, 依赖变了,再次执行 useEffect, 又跑了一个 useEffect, 可以在返回值中写一个函数 清楚当前定时器
  :::

## useReducer

`useReducer`：用于在函数组件中管理复杂的状态逻辑

```tsx
import { Reducer, useReducer } from "react";

interface Data {
  result: number;
}

interface Action {
  type: "add" | "minus";
  num: number;
}
function reducer(state: Data, action: Action) {
  switch (action.type) {
    case "add":
      return {
        result: state.result + action.num,
      };
    case "minus":
      return {
        result: state.result - action.num,
      };
  }
  return state;
}

function App() {
  const [res, dispatch] = useReducer<Reducer<Data, Action>>(reducer, {
    result: 0,
  });

  return (
    <div>
      <div onClick={() => dispatch({ type: "add", num: 2 })}>加</div>
      <div onClick={() => dispatch({ type: "minus", num: 1 })}>减</div>
      <div>{res.result}</div>
    </div>
  );
}

export default App;
```

## useRef

`useRef`：保存 dom 引用

```tsx
import { useEffect, useRef } from "react";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(inputRef.current);
    inputRef.current?.focus();
  });

  return (
    <>
      <input type="text" ref={inputRef} />
    </>
  );
}

export default App;
```

ref 其实就是一个有 current 属性的对象，除了可以保存 dom 引用，也可以放别的内容, 但它`不会触发重新渲染`：

```tsx
import { useRef } from "react";

function App() {
  const numRef = useRef<number>(0);

  return (
    <div>
      <div
        onClick={() => {
          numRef.current += 1;
        }}
      >
        {numRef.current}
      </div>
    </div>
  );
}

export default App;
```

## forwardRef + useImperativeHandle

`forwardRef + useImperativeHandle`：用于在函数组件中暴露内部组件的实例

```tsx
import { useRef } from "react";
import { useEffect } from "react";
import React from "react";
import { useImperativeHandle } from "react";

interface RefProps {
  aaa: () => void;
}

const Input: React.ForwardRefRenderFunction<RefProps> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 暴露子组件方法
  useImperativeHandle(
    ref,
    () => {
      return {
        aaa() {
          inputRef.current?.focus();
        },
      };
    },
    [inputRef]
  );

  return (
    <div>
      <input ref={inputRef}></input>
    </div>
  );
};

const WrappedInput = React.forwardRef(Input);

function App() {
  const ref = useRef<RefProps>(null);

  useEffect(() => {
    console.log("ref", ref.current);
    ref.current?.aaa();
  }, []);

  return (
    <div className="App">
      <WrappedInput ref={ref} />
    </div>
  );
}

export default App;
```

## useContext

`useContext`： 跨任意层组件传递数据

```tsx
import React from "react";
import { createContext, useContext } from "react";
const countContext = createContext(0);

function Ccc() {
  const count = useContext(countContext);
  return <h2>context的值为: {count}</h2>;
}

function Bbb() {
  const count = useContext(countContext);
  return (
    <div>
      {count}
      <Ccc></Ccc>
    </div>
  );
}

function App() {
  return (
    <div>
      <countContext.Provider value={66666}>
        <Bbb></Bbb>
      </countContext.Provider>
    </div>
  );
}

export default App;

// useContext 跨任意层组件传递数据
```

## memo + useMemo + useCallback

`memo` 是防止 props 没变时的重新渲染

`useMemo` 和 `useCallback` 是防止 props 的不必要变化。

```tsx
import { memo, useCallback, useEffect, useMemo, useState } from "react";

interface BbbProps {
  count: number;
  callback: () => void;
}
function Bbb(props: BbbProps) {
  console.log("bbb render");
  return <h2>{props.count}</h2>;
}

// memo 的作用是只有 props 变的时候，才会重新渲染被包裹的组件。
const MemoBbb = memo(Bbb);

function App() {
  const [, setNum] = useState(1);
  const [count, setCount] = useState(2);
  useEffect(() => {
    setInterval(() => {
      setNum(Math.random());
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCount(Math.random());
    }, 2000);
  }, []);

  // 因为函数是引用类型，所以每次都会重新渲染。
  // 所以使用 useCallback 包裹函数，这样就不会重新渲染。
  const bbbCallback = useCallback(() => {
    console.log("bbb callback");
  }, []);

  //
  const count2 = useMemo(() => {
    return count * 2;
  }, [count]);

  return (
    <div>
      <MemoBbb count={count2} callback={bbbCallback}></MemoBbb>
    </div>
  );
}

export default App;
```

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
