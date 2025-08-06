---
title: 'tailwindcss响应式开发'
date: '2025-07-16'
description: 'tailwindcss 响应式开发'
tags: ['react']
author: 'Thomas che'
cover: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/tailwindcss.webp'
---

</br>

## 核心理念

将样式写在 className 上，按“移动优先”（Mobile First）从小到大渐进增强，通过断点类（如 sm、md、lg）进行响应式控制。

## 响应式断点

| 屏幕大小 | 修饰符 | 适用宽度 |
| -------- | ------ | -------- |
| 小屏     | `sm:`  | ≥ 640px  |
| 中屏     | `md:`  | ≥ 768px  |
| 大屏     | `lg:`  | ≥ 1024px |
| 超大屏   | `xl:`  | ≥ 1280px |
| 2K 屏    | `2xl:` | ≥ 1536px |

## 案例

```js
<p className="text-sm sm:text-base md:text-lg lg:text-xl">响应式文字大小</p>
```

默认：text-sm

≥640px：text-base

≥768px：text-lg

≥1024px：text-xl

### 示例 2：响应式布局（卡片/列）

```js
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  <div className="bg-gray-100 p-4">卡片1</div>
  <div className="bg-gray-100 p-4">卡片2</div>
  <div className="bg-gray-100 p-4">卡片3</div>
</div>
```

默认 1 列

≥640px：2 列

≥768px：3 列

### 示例 3：按钮大小适配屏幕

```js
<button className="px-4 py-2 text-sm md:px-6 md:py-3 md:text-base bg-blue-500 text-white rounded">
  响应式按钮
</button>
```

### 示例 4：导航栏响应式（移动折叠）

```js
<div className="flex flex-col sm:flex-row justify-between items-center">
  <div>LOGO</div>
  <div className="hidden sm:flex gap-4">
    <a href="#">首页</a>
    <a href="#">关于</a>
  </div>
</div>
```

默认隐藏导航菜单（hidden）

sm 屏以上展示菜单（sm:flex）

</br>

## 开发建议

| 建议                               | 理由                 |
| ---------------------------------- | -------------------- |
| 从 `mobile-first` 开始设计         | 符合 Tailwind 哲学   |
| 使用 `flex` + `gap` + `w-full`     | 组合灵活，减少嵌套   |
| 熟练掌握断点修饰符 `sm:` `md:`     | 实现大部分响应式控制 |
| 尽量使用内置 spacing 和 typography | 保持 UI 一致性       |
| Tailwind Play 在线工具辅助         | 快速预览 class 效果  |

## 推荐工具

官方文档：https://tailwindcss.com/docs/responsive-design

可视化编辑器：Tailwind Play

插件推荐：

VSCode 插件：Tailwind CSS IntelliSense

PostCSS + Tailwind 插件链自动化构建
