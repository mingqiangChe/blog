---
title: 'react 概念'
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

## 核心概念

| 模块     | 内容                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| JSX      | JSX 是语法糖，必须包裹单一元素，支持表达式，不支持语句；可以使用 fragment (`<> </>`) 避免多余标签 |
| 组件     | 函数组件 vs 类组件（目前推荐函数组件 + Hook）                                                     |
| Props    | 父组件向子组件传值，具备只读特性（不可修改 props）                                                |
| State    | 状态驱动视图，`useState` 管理局部状态                                                             |
| 事件绑定 | 推荐箭头函数避免 `this` 问题；事件对象不等同于原生 event（是合成事件）                            |

</br>

## 渲染流程

</br>

| 模块     | 内容                                                              |
| -------- | ----------------------------------------------------------------- |
| 渲染流程 | 初次渲染（mount）、更新渲染（update）、卸载渲染（unmount）        |
| 生命周期 | 函数组件用 `useEffect` 模拟 `componentDidMount/WillUnmount`       |
| 批量更新 | React 会合并 `setState` 操作，且异步处理（除事件处理外）          |
| 依赖收集 | `useEffect/useMemo/useCallback` 中依赖数组漏写会导致 BUG 或死循环 |

</br>

## Hooks 使用规范

</br>

| 要点                          | 说明                                                   |
| ----------------------------- | ------------------------------------------------------ |
| 顺序一致                      | Hook 不能在条件语句或循环中调用，必须固定顺序          |
| 自定义 Hook                   | 可复用状态逻辑，命名规范：`useXxx`                     |
| useEffect 清理函数            | 返回的函数会在组件卸载或下次执行前调用，用于解绑操作等 |
| useCallback 与 useMemo 的区别 | 一个是缓存函数，一个是缓存结果（避免不必要渲染）       |

</br>

## 组件设计与通信

</br>

| 模块                   | 内容                                                       |
| ---------------------- | ---------------------------------------------------------- |
| 父传子                 | `props`                                                    |
| 子传父                 | 回调函数传入子组件，子组件中触发                           |
| 跨层通信               | `Context`                                                  |
| 状态提升               | 多个子组件共享状态，提升至最近公共祖先                     |
| 控制组件 vs 非控制组件 | 表单字段值由 React 控制（受控），还是由 DOM 控制（非受控） |

</br>

## 性能优化（中大型项目必须掌握）

</br>

| 优化点       | 工具                                             |
| ------------ | ------------------------------------------------ |
| 避免重复渲染 | `React.memo`、`useCallback`、`useMemo`           |
| 避免虚渲染   | 条件渲染提前返回（如 `if (!data) return null`）  |
| 拆分组件     | 避免一个组件 render 过多逻辑                     |
| 异步渲染控制 | `useTransition`（React 18）、懒加载 `React.lazy` |
| 事件节流防抖 | 自定义 `useThrottle` / `useDebounce`             |

</br>

## 服务端渲染（SSR）与同构应用（Next.js）

</br>

| 要点      | 内容                                               |
| --------- | -------------------------------------------------- |
| SSR 原理  | 首屏由服务端渲染 HTML，客户端接管（hydration）     |
| 数据获取  | `getServerSideProps` / `getStaticProps`（Next.js） |
| 动态路由  | `useRouter` / `[slug].tsx`                         |
| Head 管理 | `next/head` / `Metadata` API                       |
| SEO 优化  | 添加 meta、og、title、img 等信息                   |
| 图片优化  | `next/image` 自动懒加载、压缩                      |

 </br>

## 动画与交互（提升体验）

</br>

| 模块         | 工具                                  |
| ------------ | ------------------------------------- |
| 页面切换动画 | Framer Motion、Transition Group       |
| 滚动监听     | `useScroll`、`IntersectionObserver`   |
| 星星移动背景 | 自定义 `canvas` or DOM 随鼠标偏移实现 |
| Loading 状态 | Skeleton、Spinner、Suspense fallback  |

</br>

## 常见陷阱和误区（避免踩坑）

</br>

| 陷阱                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| setState 不立即更新 | 是异步的，依赖上一次值时要用函数式 `setState(prev => ...)`   |
| useEffect 忘记依赖  | 会造成 stale 问题或死循环                                    |
| 多次请求未清理      | 请求未取消就卸载页面，导致内存泄漏（需加 `AbortController`） |
| 子组件重新渲染频繁  | 函数 props 每次重建（用 `useCallback` 优化）                 |
| 依赖外部变量未 memo | 如 `useEffect` 中使用的外部对象或函数未作为依赖传入          |

</br>

## 调试技巧（调试工具 + 开发习惯）

</br>

| 工具            | 作用                                                |
| --------------- | --------------------------------------------------- |
| React DevTools  | 查看组件树、props、hooks、性能分析等                |
| Profiler        | 性能分析，找出渲染瓶颈                              |
| console.trace() | 查看状态变化调用路径                                |
| 状态打印        | 利用 `useEffect(() => console.log(state), [state])` |

</br>

## 推荐常用库

</br>

| 类别       | 工具                             |
| ---------- | -------------------------------- |
| 表单管理   | `react-hook-form`、`formik`      |
| 状态管理   | `zustand`、`redux`、`jotai`      |
| 数据请求   | `swr`、`react-query`             |
| 动画       | `framer-motion`                  |
| 响应式布局 | `tailwindcss`                    |
| 组件库     | `shadcn/ui`、`chakra-ui`、`antd` |

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

### 用法：

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

### 常见面试题：

</br>

```js
setState 是同步还是异步？
👉 React 内部会批量处理 setState，合并触发一次渲染，因此是“批量异步执行”，但在原生事件中是同步更新。
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

### 常见面试题：

</br>

```js
依赖数组为何不能随意漏？
👉 忽略依赖会导致闭包内使用旧值或内存泄漏。
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

### 常见面试题：

</br>

```js

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

### 常见面试题：

</br>

```js

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

### 常见面试题：

</br>

```js

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

### 常见面试题：

</br>

```js
useMemo 和普通函数调用的区别？
👉 useMemo 会缓存，避免每次都重新执行。
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

### 常见面试题：

</br>

```js

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
