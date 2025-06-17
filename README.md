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
├── next-intl.config.mjs      ← 只给 next-intl 插件用
├── i18nConfig.js             ← 只给 next-i18n-router 用


your-project/
├── i18n/                      # 国际化相关代码和配置
│   ├── request.ts             # next-intl 请求配置
│   ├── routing.ts             # 路由国际化配置
├── messages/                  # 多语言 JSON 文件
│   ├── en.json
│   └── zh.json
├── public/                    # 静态资源（图片、favicon 等）
│   └── locales/               # 也可放语言包，但不适合模块导入
│       ├── en/
│       │   └── translation.json
│       └── zh/
│           └── translation.json
├── next-intl.config.mjs       # next-intl 插件配置
├── next.config.js             # next.js 配置
├── tsconfig.json              # 路径别名配置
└── package.json


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

# 打包

[text](scripts/build-deploy.js) 打包 node 脚本

# 本地

pnpm install
pnpm run build
pnpm run build:deploy # 复制构建产物到 deploy 目录

# 上传 deploy 到服务器

# 服务器

cd deploy

# 如果使用 standalone 模式，直接运行

cd .next/standalone

node server.js

# 否则安装依赖并启动

pnpm install --prod
pnpm run start

# 重启

sudo nginx -t
sudo systemctl reload nginx
