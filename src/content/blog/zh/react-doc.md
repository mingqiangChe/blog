---
title: 'react相关'
date: '2025-07-07'
description: '常用HOOK'
tags: ['react']
author: 'Thomas che'
cover: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%9C%BA%E8%BD%A6_PixCake/DSC04465.jpg'
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

## useState 状态管理

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

多个状态变量可多次调用 useState。

</br>

状态更新是异步的，且批量处理。

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

## useEffect 执行副作用操作（数据请求、订阅、DOM 操作、定时器等）

</br>

### 原理

</br>

组件渲染后执行传入的副作用函数，依赖数组控制副作用的执行时机，返回函数用于清理副作用。

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


```

</br>

## .useContext 跨组件共享数据，避免逐层传递 props

</br>

### 原理

</br>

通过 React 的 Context 机制，直接读取祖先组件提供的上下文值，实现组件间状态共享

</br>

### 特点

</br>

适合全局主题、用户信息等共享状态。

</br>

依赖 Context 的变化自动触发组件更新。

</br>

### 用法

</br>

```bash

```

</br>

## useRef 创建可变的引用，保存不参与渲染的变量或 DOM 节点

</br>

### 原理

</br>

返回一个可变的 current 对象，组件重新渲染时该对象不变，常用于存储 DOM 引用或计时器

</br>

### 特点

</br>

修改 ref.current 不会触发组件重新渲染。

</br>

常用于访问 DOM 元素或保持跨渲染周期的变量。

</br>

### 用法

</br>

```bash

```

</br>

## useReducer 管理复杂状态逻辑，类似 Redux 的局部状态管理

</br>

### 原理

</br>

通过 dispatch 触发 reducer 纯函数，根据 action 返回新状态，适合多子值或复杂更新逻

</br>

### 特点

</br>

适合复杂状态管理，比 useState 更灵活。

</br>

适合局部组件状态，不是全局状态管理方案。

</br>

### 用法

</br>

```bash

```

</br>

## useMemo 缓存计算结果，避免重复计算

</br>

### 原理

</br>

依赖数组控制缓存更新，只有依赖变化时才重新计算或创建函数

</br>

### 特点

</br>

用于性能优化。

</br>

避免子组件不必要的重新渲染。

</br>

### 用法

</br>

```bash

```

</br>

## useCallback 缓存函数实例，避免不必要的函数重新创建。

</br>

### 原理

</br>

依赖数组控制缓存更新，只有依赖变化时才重新计算或创建函数

</br>

### 特点

</br>

用于性能优化。

</br>

避免子组件不必要的重新渲染。

</br>

### 用法

</br>

```bash

```

</br>
</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

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

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

---

</br>

</br>

</br>

</br>

</br>

</br>

</br>
