---
title: '网站优化'
date: '2025-07-09'
description: '针对网站各方面优化'
tags: ['计算机']
author: 'Thomas che'
cover: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_2/%E7%BD%91%E7%AB%99%E4%BC%98%E5%8C%96.jpg'
---

</br>

# 网站优化

</br>

## 架构

</br>

确定好应用属于什么应用 适用于 ssr ssg 还是 csr

| 架构 | 渲染时机             | 优点                 | 缺点                   | 典型应用场景         |
| ---- | -------------------- | -------------------- | ---------------------- | -------------------- |
| SSR  | 请求时服务器动态渲染 | SEO 优，首屏快       | 服务器压力大，响应较慢 | 动态内容多的网站     |
| SSG  | 构建时生成静态页     | 速度快，服务器压力小 | 内容更新需要重建       | 博客、文档、静态站点 |
| ISR  | 静态+后台定时更新    | 静态性能+动态更新    | 配置复杂               | 大型内容站点         |
| CSR  | 浏览器端渲染         | 交互丰富             | 首屏慢，不利 SEO       | SPA、管理后台        |

## 代码方面

</br>

### 交互优化

</br>

#### 骨架屏

</br>

```bash
1、第一种动态引入方式 需要借助next的 dynamic
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('@/components/Header'), {
  loading: () => <SkeletonPlaceholder />,
});
将封装好的组件在借助dynamic动态引入组件过程中loading阶段将页面元素替换成骨架屏组件
```

</br>

```bash
2、第二种动态引入方式 判断react渲染阶段
  const [isLoading, setIsLoading] = useState(false); // 默认false，可改为true模拟加载
 if (isLoading) {
    return <HomeSkeleton />;
  }

```

</br>

## http 资源方面

</br>

### 性能优化

</br>

#### 设置长缓存

</br>

```bash
| 名称                              值
| ------------- | ------------------------------------- |
| Cache-Control | `public, max-age=31536000, immutable` |

为oss资源设置长缓存 强缓存长达 1 年，重复访问将直接走本地缓存

```

</br>

## 搜索引擎方面

</br>

```bash
https://search.google.com/search-console
网站 用于谷歌搜索建立索引 方便用户关键词搜索到网站

```
