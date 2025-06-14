# 架构

首页：展示个人
博客：md 文档方式编写文章 集成代码高亮和技术示例 响应式设计适配移动端
工具：个人常用网页集成展示
待续：
中英文切换

# 项目结构

cheche-next-blog/
├── app/
│ ├── [locale]/
│ │ ├── layout.tsx # 国际化布局
│ │ ├── page.tsx # 多语言首页
│ │ ├── blog/
│ │ │ ├── page.tsx # 博客列表
│ │ │ └── [slug]/
│ │ │ └── page.tsx # 博客详情
│ │ ├── tools/
│ │ │ └── page.tsx # 工具页面
│ │ └── about/
│ │ └── page.tsx # 个人介绍
│ ├── globals.css
│ └── layout.tsx
├── components/
│ ├── Header.tsx # 导航组件
│ ├── LanguageSwitcher.tsx # 语言切换
│ ├── BlogPost.tsx # 博客组件
│ └── CodeBlock.tsx # 代码高亮组件
├── content/
│ ├── blog/
│ │ ├── en/ # 英文博客
│ │ └── zh/ # 中文博客
├── lib/
│ ├── markdown.ts # Markdown 处理
│ ├── i18n.ts # 国际化配置
├── public/
│ └── locales/ # 翻译文件
│ ├── en/
│ └── zh/
├── i18nConfig.js # 国际化路由配置
└── middleware.ts # 中间件

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

# 运行

pnpm
node 20

## locale

中英文切换
[locale]
/en - 英文首页

/zh - 中文首页

/en/blog - 英文博客页面

/zh/blog - 中文博客页面

/en/about - 英文关于页面

/zh/about - 中文关于页面

middleware.ts 控制 形成映射关系

export default async function Page({
params,
}: {
params: Promise<{ locale: string }>
}) {
const { locale } = await params
} 可以获取
