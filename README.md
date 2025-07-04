# 架构

首页：展示个人

</br>

博客：md 文档方式编写文章 集成代码高亮和技术示例 响应式设计适配移动端

</br>

工具：个人常用网页集成展示

</br>

影剧书：md 记录自己喜欢的电影 电视剧 书

</br>

摄影作品:拍摄作品

</br>

历史记:记录重要节点

</br>

关于我:自我介绍

</br>

# 项目结构

blog/

- app/
  - [locale]/
    - layout.tsx # 国际化布局
    - page.tsx # 多语言首页
    - blog/
      - page.tsx # 博客列表
      - [slug]/
        - page.tsx # 博客详情
    - search/
      - page.tsx # 工具页面
      - page.module.css # 工具样式 import styles from './page.module.css'; styles.bg
    - about/
      - page.tsx # 个人介绍
  - globals.css
  - layout.tsx
- components/
  - Header.tsx
  - LanguageSwitcher.tsx
  - BlogPost.tsx
  - CodeBlock.tsx
- content/
  - blog/
    - en/
    - zh/
- lib/
  - markdown.ts
- i18nConfig.js
- middleware.ts
- next-intl.config.mjs
- i18n/
  - request.ts
  - routing.ts
- messages/
  - en.json
  - zh.json
- next.config.js
- tsconfig.json
- package.json

layout.tsx：布局文件，多个页面共享 UI

page.tsx：页面文件，定义路由的实际内容

loading.tsx：加载状态文件

error.tsx：错误处理文件

not-found.tsx：404 页面文件

# 核心技术栈

Next.js 14 + App Router：现代化的 React 框架

TypeScript：类型安全的开发体验

next-i18next：国际化支持

MDX/Markdown：博客内容管理

Tailwind CSS：样式框架

gray-matter：Markdown 元数据解析

react-markdown：Markdown 渲染

# 开发思路

父组件（或页面、布局）默认是服务端组件（Server Component），它负责数据获取、SEO、渲染静态内容，性能更好。

子组件只在需要交互、状态管理、浏览器 API 等客户端功能时，单独加 "use client"，让它成为客户端组件（Client Component）。

这样父组件在服务器渲染，子组件在客户端渲染，二者共存，互不冲突。
