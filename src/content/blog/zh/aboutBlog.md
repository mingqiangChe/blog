---
title: '关于博客搭建'
date: '2025-06-14'
description: '内容关于这个博客的架构 搭建'
tags: ['架构', 'next', 'react']
author: 'Thomas che'
cover: '/blog/cover/DSC0445.jpg'
---

# 初衷

    为了炫 为了推动自己作为动力 也作为了解自己频道

# 架构
 next+react去使用
 

本项目共使用了 **35 个依赖**，其中生产依赖（dependencies）24 个，开发依赖（devDependencies）11 个，涵盖了 UI、国际化、Markdown 解析、图片处理、类型定义、代码规范、CSS 框架和构建工具等功能。

## 生产依赖（24 个）

| 依赖名 | 主要作用 |
| :-- | :-- |
| @emotion/react | CSS-in-JS 方案，支持动态样式 |

| @emotion/styled | 基于 Emotion 的 styled 组件写法 |

| @mui/lab | MUI 实验性组件库 |

| @mui/material | MUI 主体组件库，UI 设计 |

| @types/react-syntax-highlighter | 语法高亮 TypeScript 类型定义 |

| gray-matter | 解析 Markdown 文件头部元数据 |

| i18next | 国际化（i18n）核心库 |

| i18next-resources-to-backend | i18next 资源后端加载器 |

| next | Next.js 框架，React SSR/SSG 支持 |

| next-i18n-router | Next.js 路由国际化 |

| next-intl | Next.js 国际化解决方案 |

| parse-numeric-range | 解析数字范围字符串 |

| react | React 主库 |

| react-dom | React DOM 渲染库 |

| react-i18next | i18next 的 React 绑定 |
| react-icons | 常用图标库 |

| react-image-lightbox | 图片灯箱组件 |

| react-intersection-observer | 视口监听，懒加载等场景 |

| react-markdown | Markdown 渲染为 React 组件 |

| react-masonry-css | 瀑布流布局组件 |

| react-syntax-highlighter | 代码高亮组件 |

| remark | Markdown 解析器 |

| remark-html | Markdown 转 HTML 插件 |

| styled-jsx | Next.js 内置 CSS-in-JS 方案 |

## 开发依赖（11 个）

| 依赖名 | 主要作用 |

| @eslint/eslintrc | ESLint 配置支持 |

| @tailwindcss/postcss | Tailwind CSS 与 PostCSS 集成 |

| @tailwindcss/typography | Tailwind CSS 排版插件 |

| @types/node | Node.js 类型定义 |

| @types/react | React 类型定义 |

| @types/react-dom | React DOM 类型定义 |

| eslint | 代码规范检查工具 |

| eslint-config-next | Next.js 推荐 ESLint 配置 |

| fs-extra | 文件系统扩展工具 |

| tailwindcss | 原子化 CSS 框架 |

| typescript | TypeScript 支持 |

## 总结

- **生产依赖**：24 个，涵盖 UI、国际化、Markdown 解析、图片处理等功能。
- **开发依赖**：11 个，主要用于类型定义、代码规范、CSS 框架和构建工具。
- **总计**：35 个依赖，满足博客系统的开发与运行需求。


# 功能实现


