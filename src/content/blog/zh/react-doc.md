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

```harsp
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

```harsp

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

```harsp
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

   <section className="min-h-screen bg-gradient-to-br from-purple-600  pt-20 overflow-x-hidden"></section>
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
