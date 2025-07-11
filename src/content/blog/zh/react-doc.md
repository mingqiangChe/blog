---
title: 'react相关'
date: '2025-07-07'
description: '常用HOOK'
tags: ['react']
author: 'Thomas che'
cover: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/reactimg.jpg'
---

</br>

# 开发理念

</br>

**父组件（或页面、布局）默认是服务端组件（Server Component），它负责数据获取、SEO、渲染静态内容，性能更好。**

</br>

**子组件只在需要交互、状态管理、浏览器 API 等客户端功能时，单独加 "use client"，让它成为客户端组件（Client Component）。**

</br>

**这样父组件在服务器渲染，子组件在客户端渲染，二者共存，互不冲突。**

</br>

---

</br>

# 组件用法

</br>

## 函数式写法

</br>

```bash
<!-- 定义约束父组件传过来的事件 参数类型 -->
interface Props {
  photos: Photo[];
  currentIdx: number;
  onClose: () => void;
  onChangeIndex: (i: number) => void;
}
<!-- 使用方式 -->
export default function ClientLightbox({
  photos,
  currentIdx,
  onClose,
  onChangeIndex,
}: Props) {
  return (
    <Lightbox
      open
      slides={photos.map((p) => ({
        src: p.url,
        title: p.tip,
        description: p.desc,
      }))}
      index={currentIdx}
      close={onClose}
      onSlideChange={onChangeIndex}
      plugins={[Captions]}
      render={{
        slide: ({ slide }: { slide: { src: string } }) => (
          <ZoomableCanvas url={slide.src} />
        ),
      }}
    />
  );
}

```

</br>

## 类式写法

</br>

```bash

<!-- 该写法不常用 -->
import React from 'react';

class Greeting extends React.Component {
  render() {
    return <div>Hello, {this.props.name}</div>;
  }
}

```

</br>

---

</br>

</br>

# 样式定义

</br>

## 外部引入

</br>

```harsp
<!-- 外部定义一个.css文件 -->

<!-- 内部引入 -->

import styles from '../page.module.css';

<!-- 使用 -->
   <section className={styles['page-bg']}></section>
<!-- 或 -->
    <section className={styles.sectionTitle}></section>
```

</br>

## 内联样式

</br>

```bash
   <section
      ref={ref}
      className={styles.card}
      onClick={onClick}
      style={{ width: '100%', height: 'auto' }}
    ></section>

```

</br>

## Taiwindcss

</br>

```harsp
<!-- 全局或单个导入 -->
@import 'tailwindcss';
@tailwind utilities;
/* Tailwind 基础导入 */

   <section className="min-h-screen bg-gradient-to-br from-purple-600  pt-20 overflow-x-hidden">
   </section>
```

</br>

# 常用 HOOK

</br>

## useState-- 状态管理

</br>

### 原理：

</br>

React 在组件首次渲染时，初始化状态值。

</br>

setState 更新状态后，组件重新渲染，useState 返回最新状态。

</br>

状态通过 React 内部 Fiber 链表结构按调用顺序管理，保证每次渲染状态对应正确。

</br>

### 特点：

</br>

支持基本类型、对象、数组等任意类型状态。

</br>

每次更新只会影响当前组件

</br>

多次调用可创建多个独立状态

</br>

异步批量更新（可使用回调函数安全读取旧值）

</br>

### 用法

</br>

```bash
import React, { useState } from 'react';

export default function Counter() {
  // 初始化状态count为0，setCount是更新count的函数
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>当前计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>点击增加</button>
    </div>
  );
}

```

</br>

## useEffect --副作用处理

</br>

### 原理

</br>

用于执行副作用逻辑（如请求数据、订阅事件、定时器），依赖数组控制副作用执行时机。

</br>

### 特点

</br>

没有依赖数组时，每次渲染后都会执行。

</br>

有依赖数组时，只有依赖变化时才执行。

</br>

可以返回清理函数，类似 class 组件的 componentWillUnmount。

</br>

### 用法

</br>

```bash
import { useEffect, useState } from 'react';

export default function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(id); // 清理定时器
  }, []);

  return <div>秒数：{time}</div>;
}

```

</br>

## useContext--跨组件共享数据

</br>

### 原理

</br>

借助 React.createContext 创建上下文，子组件可直接访问祖先提供的数据。

</br>

### 特点

</br>

避免繁琐的 props 传递

</br>

常用于全局主题、用户信息等

</br>

所依赖的值变化会触发子组件更新

</br>

### 用法

</br>

```bash
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function Child() {
  const theme = useContext(ThemeContext);
  return <div>当前主题：{theme}</div>;
}

export default function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}

```

</br>

## useRef--持久引用 / DOM 操作

</br>

### 原理

</br>

返回一个带有 .current 属性的对象，该对象在组件重渲染时保持不变。

</br>

### 特点

</br>

修改 .current 不会触发组件更新

</br>

常用于：保存定时器 ID、访问 DOM 节点、跨渲染缓存值

</br>

### 用法

</br>

```bash
import { useRef, useEffect } from 'react';

export default function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus(); // 自动聚焦
  }, []);

  return <input ref={inputRef} />;
}
```

</br>

## useReducer-- 管理复杂状态

</br>

### 原理

</br>

通过 dispatch(action) 调用 reducer 函数，返回新的 state。

</br>

### 特点

</br>

状态逻辑复杂时更适合 than useState

</br>

和 Redux 概念类似，但是局部管理

</br>

### 用法

</br>

```bash
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>计数：{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>

  );
}

```

</br>

## useMemo --缓存计算结果

</br>

### 原理

</br>

只在依赖变化时重新计算，避免重复复杂计算。

</br>

### 特点

</br>

用于性能优化。

</br>

避免重复计算、子组件不必要的渲染

</br>

### 用法

</br>

```bash
import { useMemo, useState } from 'react';

export default function ExpensiveCalc() {
  const [count, setCount] = useState(0);

  const result = useMemo(() => {
    console.log('重新计算');
    return count * 100;
  }, [count]);

  return (
    <>
      <p>结果：{result}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </>
  );
}
```

</br>

## useCallback -- 缓存函数引用

</br>

### 原理

</br>

只有依赖项变化时才重新生成函数引用。

</br>

### 特点

</br>

优化传递给子组件的函数 props，避免组件重复渲染

</br>

通常与 memo 搭配使用

</br>

### 用法

</br>

```bash
import { useCallback, useState } from 'react';

export default function CallbackDemo() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('当前 count:', count);
  }, [count]);

  return <button onClick={handleClick}>点击</button>;
}
```

</br>

## 其他扩展

</br>

| Hook                   | 说明                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| `useLayoutEffect`      | 与 `useEffect` 类似，但同步执行于 DOM 更新后（适合测量 DOM 尺寸） |
| `useImperativeHandle`  | 与 `forwardRef` 一起使用，自定义对外暴露的 ref 方法               |
| `useId`                | 生成唯一 ID，适用于服务端渲染场景                                 |
| `useTransition`        | React 18 用于异步 UI 更新，避免阻塞主渲染                         |
| `useDeferredValue`     | React 18 用于延迟某些值更新，避免频繁重渲染                       |
| `useSyncExternalStore` | 订阅外部 store，用于状态库如 Redux 的订阅优化                     |
| `useDebugValue`        | 自定义 Hook 中用于调试显示的值（如开发者工具展示）                |

</br>

## next 动态加载组件

</br>

```bash
import dynamic from 'next/dynamic';

// 动态加载组件，设置loading骨架屏，ssr默认是开启的
const ClientLightbox = dynamic(() => import('./ClientLightbox'), {
  // ssr: false, // 如果组件只能在客户端渲染，取消注释此行
  loading: () => <SkeletonPlaceholder />, // 加载时显示骨架屏
});

export default function Page() {
  return (
    <div>
      <h1>页面标题</h1>
      <ClientLightbox />
    </div>
  );
}

```

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>
