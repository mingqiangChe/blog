# 架构

首页：展示个人
博客：md 文档方式编写文章 集成代码高亮和技术示例 响应式设计适配移动端
工具：个人常用网页集成展示
待续：
中英文切换

# 项目结构

cheche-next-blog/
├── app/ # 应用路由器（核心目录）
│ ├── favicon.ico # 网站图标
│ ├── globals.css # 全局样式
│ ├── layout.tsx # 根布局文件
│ └── page.tsx # 首页（路径"/"）
├── public/ # 静态资源目录
│ ├── next.svg
│ └── vercel.svg
├── next.config.mjs # Next.js 配置文件
├── package.json # 项目依赖和脚本
├── tailwind.config.ts # Tailwind 配置
├── postcss.config.mjs # PostCSS 配置
└── tsconfig.json # TypeScript 配置

# 核心技术栈

Next.js 14 + App Router：现代化的 React 框架

TypeScript：类型安全的开发体验

next-i18next：国际化支持

MDX/Markdown：博客内容管理

Tailwind CSS：样式框架

gray-matter：Markdown 元数据解析

react-markdown：Markdown 渲染

# 运行

pnpm
node 20
