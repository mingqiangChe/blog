---
title: '关于博客搭建'
date: '2025-06-14'
description: '内容关于这个博客的架构 搭建'
tags: ['react']
author: 'Thomas che'
cover: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%9C%BA%E8%BD%A6_PixCake/DSC04465.jpg'
---

# 初衷

    为了炫 为了推动自己作为动力 也作为了解自己频道

# 项目依赖说明（基于 package.json）

## 项目基本信息

- 项目名称：cheche-blog
- 版本号：0.1.0
- 私有项目（private: true）

## 脚本命令

- **dev**：启动开发环境（Next.js）
- **build**：构建生产环境代码
- **build:deploy**：构建并执行部署脚本
- **build:deploy:zip**：构建部署并打包为 zip 文件
- **deploy:clean**：清理部署文件夹及压缩包
- **start**：启动生产环境服务器
- **lint**：代码规范检查（ESLint）

---

## 生产依赖（dependencies）

- **@emotion/react** (v^11.14.0)  
  CSS-in-JS 动态样式方案

- **@emotion/styled** (v^11.14.0)  
  Emotion styled 组件写法

- **@mui/lab** (v7.0.0-beta.13)  
  MUI 实验性组件库

- **@mui/material** (v^7.1.1)  
  MUI 主体组件库，UI 设计

- **@next/env** (v^15.3.4)  
  Next.js 环境变量管理

- **@swc/helpers** (v^0.5.17)  
  编译辅助库

- **@types/react-syntax-highlighter** (v^15.5.13)  
  代码高亮 TS 类型定义

- **gray-matter** (v^4.0.3)  
  解析 Markdown 文件头部元数据

- **i18next** (v^25.2.1)  
  国际化核心库

- **i18next-resources-to-backend** (v^1.2.1)  
  i18next 资源加载器

- **klouds** (v^3.0.0)  
  文件系统相关工具

- **next** (v15.3.3)  
  Next.js 框架

- **next-i18n-router** (v^5.5.2)  
  Next.js 国际化路由

- **next-intl** (v^4.1.0)  
  Next.js 国际化解决方案

- **parse-numeric-range** (v^1.3.0)  
  解析数字范围字符串

- **react** (v^18.3.1)  
  React 主库

- **react-dom** (v^18.3.1)  
  React DOM 渲染库

- **react-i18next** (v^15.5.2)  
  i18next React 绑定

- **react-icons** (v^5.5.0)  
  常用图标库

- **react-intersection-observer** (v^9.16.0)  
  视口监听，懒加载

- **react-markdown** (v^10.1.0)  
  Markdown 渲染为 React 组件

- **react-masonry-css** (v^1.0.16)  
  瀑布流布局组件

- **react-syntax-highlighter** (v^15.6.1)  
  代码高亮组件

- **rehype-raw** (v^7.0.0)  
  Markdown 转 HTML 插件

- **remark** (v^15.0.1)  
  Markdown 解析器

- **remark-html** (v^16.0.1)  
  Markdown 转 HTML 插件

- **styled-jsx** (v^5.1.7)  
  Next.js 内置 CSS-in-JS 方案

- **yet-another-react-lightbox** (v^3.23.2)  
  图片灯箱组件

---

## 开发依赖（devDependencies）

- **@eslint/eslintrc** (v^3)  
  ESLint 配置支持

- **@tailwindcss/postcss** (v4.1.10)  
  Tailwind CSS 与 PostCSS 集成

- **@tailwindcss/typography** (v0.5.16)  
  Tailwind CSS 排版插件

- **@types/node** (v^20)  
  Node.js 类型定义

- **@types/react** (v^19)  
  React 类型定义

- **@types/react-dom** (v^19)  
  React DOM 类型定义

- **@types/webpack** (v^5.28.5)  
  Webpack 类型定义

- **autoprefixer** (v10.4.21)  
  CSS 自动添加前缀

- **eslint** (v^9)  
  代码规范检查工具

- **eslint-config-next** (v15.3.3)  
  Next.js 推荐 ESLint 配置

- **fs-extra** (v^11.3.0)  
  文件系统扩展工具

- **lightningcss** (v^1.30.1)  
  CSS 优化构建工具

- **postcss** (v8.5.6)  
  CSS 处理器

- **tailwind-scrollbar** (v^4.0.2)  
  Tailwind CSS 滚动条插件

- **tailwindcss** (v4.1.10)  
  原子化 CSS 框架

- **typescript** (v^5)  
  TypeScript 支持

## 总结

- 本项目依赖丰富，涵盖了 UI 设计、国际化、多语言支持、Markdown 解析、图片处理、代码规范等多个方面。
- 生产依赖共 24 个，开发依赖 11 个，满足博客系统开发和运行需求。
- 依赖版本保持较新，保证功能和性能的稳定性。

---
