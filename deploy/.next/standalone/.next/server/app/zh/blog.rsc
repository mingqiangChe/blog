1:"$Sreact.fragment"
2:I[32329,[],""]
3:I[63725,[],""]
6:I[92207,[],"MetadataBoundary"]
8:I[92207,[],"OutletBoundary"]
b:I[22533,[],"AsyncMetadataOutlet"]
d:I[92207,[],"ViewportBoundary"]
f:I[5992,[],""]
:HL["/_next/static/media/569ce4b8f30dc480-s.p.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/media/93f479601ee12b01-s.p.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/css/df2ccef7881ba81f.css","style"]
0:{"P":null,"b":"WedGPZs9-aHl84Jv2YQ1A","p":"","c":["","zh","blog"],"i":false,"f":[[["",{"children":[["locale","zh","d"],{"children":["blog",{"children":["__PAGE__",{}]}]}]},"$undefined","$undefined",true],["",["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/df2ccef7881ba81f.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}]],["$","html",null,{"lang":"en","suppressHydrationWarning":true,"children":["$","body",null,{"className":"__variable_5cfdac __variable_9a8899 antialiased min-h-screen flex flex-col bg-gray-50","children":["$","$L2",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L3",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]}]}]]}],{"children":[["locale","zh","d"],["$","$1","c",{"children":[null,"$L4"]}],{"children":["blog",["$","$1","c",{"children":[null,["$","$L2",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L3",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":["__PAGE__",["$","$1","c",{"children":["$L5",["$","$L6",null,{"children":"$L7"}],null,["$","$L8",null,{"children":["$L9","$La",["$","$Lb",null,{"promise":"$@c"}]]}]]}],{},null,false]},null,false]},null,false]},null,false],["$","$1","h",{"children":[null,["$","$1","IWFBRlMPo-zYjbRZPP-i3",{"children":[["$","$Ld",null,{"children":"$Le"}],["$","meta",null,{"name":"next-size-adjust","content":""}]]}],null]}],false]],"m":"$undefined","G":["$f","$undefined"],"s":false,"S":true}
10:"$Sreact.suspense"
11:I[22533,[],"AsyncMetadata"]
13:I[13932,["215","static/chunks/1951f239-02bbd5c2000d56b3.js","893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","450","static/chunks/app/%5Blocale%5D/layout-be467e10ac9d095e.js"],"default"]
14:I[42404,["215","static/chunks/1951f239-02bbd5c2000d56b3.js","893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","450","static/chunks/app/%5Blocale%5D/layout-be467e10ac9d095e.js"],"default"]
16:I[88260,["215","static/chunks/1951f239-02bbd5c2000d56b3.js","893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","450","static/chunks/app/%5Blocale%5D/layout-be467e10ac9d095e.js"],"default"]
17:I[6252,["893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","454","static/chunks/app/%5Blocale%5D/blog/page-d3a4bafb2152df2c.js"],""]
18:I[74893,["893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","454","static/chunks/app/%5Blocale%5D/blog/page-d3a4bafb2152df2c.js"],"Image"]
7:["$","$10",null,{"fallback":null,"children":["$","$L11",null,{"promise":"$@12"}]}]
15:T19a2,
# Docker 部署 Next.js 应用完整指南

## 📋 准备工作

### 1. 安装 Docker

```
Windows/Mac: 下载 Docker Desktop
https://www.docker.com/products/docker-desktop

 Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose

 CentOS/RHEL
sudo yum install docker docker-compose

 验证安装
docker --version
docker-compose --version
```

### 2. 项目结构检查

确保你的项目结构如下：

```
your-nextjs-project/
├── src/
├── public/
├── package.json
├── pnpm-lock.yaml
├── next.config.js
├── .env.production
└── Dockerfile (即将创建)
```

![Perplexity Logo](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800)

## 🐳 创建 Dockerfile

在项目根目录创建 `Dockerfile`：

```
多阶段构建，优化镜像大小
FROM node:18-alpine AS base

启用 pnpm
RUN corepack enable pnpm

 设置工作目录
WORKDIR /app

复制 package 文件
COPY package.json pnpm-lock.yaml ./

 ========== 依赖安装阶段 ==========
FROM base AS deps
 安装生产依赖
RUN pnpm install --frozen-lockfile --prod

========== 构建阶段 ==========
FROM base AS builder
复制所有文件
COPY . .
安装所有依赖（包括 devDependencies）
RUN pnpm install --frozen-lockfile
 构建应用
RUN pnpm build

========== 运行阶段 ==========
FROM node:18-alpine AS runner
WORKDIR /app

 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

复制构建产物
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

切换到非 root 用户
USER nextjs

暴露端口
EXPOSE 3000

 启动应用
CMD ["node", "server.js"]
```

## ⚙️ 配置 Next.js

### 1. 更新 `next.config.js`

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // 启用 standalone 模式
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 允许所有域名的图片
      },
    ],
  },
  // 其他配置...
};

module.exports = nextConfig;
```

### 2. 创建 `.dockerignore`

```
 忽略不需要的文件，减小构建上下文
node_modules
.next
.git
.gitignore
README.md
Dockerfile
.dockerignore
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env*.local
```

## 🔧 Docker Compose 配置（可选）

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  nextjs-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=https://your-domain.com
      - NEXT_PUBLIC_SITE_NAME=Cheche Blog
    restart: unless-stopped
    # 可选：挂载数据卷
    # volumes:
    #   - ./data:/app/data

  # 可选：添加 Nginx 反向代理
  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - nextjs-app
    restart: unless-stopped
```

## 🚀 构建和运行

### 方法一：使用 Docker 命令

```yaml
1. 构建镜像
docker build -t my-nextjs-app .

2. 运行容器
docker run -p 3000:3000 \
-e NODE_ENV=production \
-e NEXT_PUBLIC_SITE_URL=https://your-domain.com \
-e NEXT_PUBLIC_SITE_NAME="Cheche Blog" \
--name nextjs-container \
my-nextjs-app

3. 后台运行
docker run -d -p 3000:3000 \
-e NODE_ENV=production \
--name nextjs-container \
--restart unless-stopped \
my-nextjs-app
```

### 方法二：使用 Docker Compose

```bash
 1. 构建并启动
docker-compose up --build

 2. 后台运行
docker-compose up -d

 3. 查看日志
docker-compose logs -f

 4. 停止服务
docker-compose down
```

## 📝 常用 Docker 命令

### 容器管理

```bash
# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 停止容器
docker stop nextjs-container

# 启动容器
docker start nextjs-container

# 重启容器
docker restart nextjs-container

# 删除容器
docker rm nextjs-container
```

### 镜像管理

```bash
# 查看镜像
docker images

# 删除镜像
docker rmi my-nextjs-app

# 清理未使用的镜像
docker image prune

# 查看镜像构建历史
docker history my-nextjs-app
```

### 调试命令

```bash
# 进入容器内部
docker exec -it nextjs-container sh

# 查看容器日志
docker logs nextjs-container

# 实时查看日志
docker logs -f nextjs-container

# 查看容器资源使用情况
docker stats nextjs-container
```

## 🔍 故障排除

### 常见问题及解决方案

#### 1. 构建失败

```bash
# 清理 Docker 缓存
docker system prune -a

# 重新构建（不使用缓存）
docker build --no-cache -t my-nextjs-app .
```

#### 2. 端口被占用

```bash
# 查看端口占用
lsof -i :3000

# 使用不同端口
docker run -p 3001:3000 my-nextjs-app
```

#### 3. 环境变量问题

```bash
# 检查容器内环境变量
docker exec nextjs-container env

# 使用 .env 文件
docker run --env-file .env.production -p 3000:3000 my-nextjs-app
```

## 📊 性能优化

### 1. 多阶段构建优化

```dockerfile
使用更小的基础镜像
FROM node:18-alpine AS base

# 只复制必要文件
COPY package.json pnpm-lock.yaml ./

# 清理缓存
RUN pnpm store prune
```

### 2. 镜像大小优化

```bash
# 查看镜像大小
docker images my-nextjs-app

# 分析镜像层
docker history my-nextjs-app

# 使用 dive 工具分析
dive my-nextjs-app
```

## 🚀 生产环境部署

### 1. 推送到 Docker Hub

```bash
# 登录 Docker Hub
docker login

# 标记镜像
docker tag my-nextjs-app username/my-nextjs-app:latest

# 推送镜像
docker push username/my-nextjs-app:latest
```

### 2. 在服务器上部署

```bash
# 拉取镜像
docker pull username/my-nextjs-app:latest

# 运行容器
docker run -d -p 80:3000 \
  --name production-app \
  --restart unless-stopped \
  username/my-nextjs-app:latest
```

## 📚 学习资源

### Docker 官方文档

- [Docker 官方教程](https://docs.docker.com/get-started/)
- [Dockerfile 最佳实践](https://docs.docker.com/develop/dev-best-practices/)

### Next.js Docker 部署

- [Next.js Docker 官方指南](https://nextjs.org/docs/deployment#docker-image)
- [Next.js 生产环境部署](https://nextjs.org/docs/deployment)

### 实用工具

- **Portainer**: Docker 可视化管理界面
- **Watchtower**: 自动更新 Docker 容器
- **Traefik**: 反向代理和负载均衡
4:["$","div",null,{"className":"flex flex-col min-h-screen bg-cover bg-center","style":{"backgroundImage":"url('/self/DSC04463.jpg')"},"children":[["$","$L13",null,{}],["$","$L14",null,{"posts":[{"slug":"docker","locale":"zh","title":"Docker + Next.js 部署实战教程","date":"2025-06-15","description":"ocker + Next.js 部署实战教程","content":"$15","tags":["Docker","部署"],"author":"Thomas che","readingTime":5,"cover":"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"},{"slug":"two","locale":"zh","title":"关于博客搭建","date":"2025-06-14","description":"内容关于这个博客的架构 搭建","content":"\n# 欢\n\n这是我使用 Next.js 创建的第一篇博客文章。\n\n## 代码示例\n\n发热五六天可 u 看\n\n# 级\n\n发的时候看见啊哈\n","tags":["架构","next","react"],"author":"Thomas che","readingTime":1,"cover":"/blog/cover/DSC0445.jpg"},{"slug":"first-post","locale":"zh","title":"新篇章 新开始","date":"2025-06-14","description":"新的开始 希望美好的开始","content":"\n# 希望\n\n今天是搭建这个博客第一天，希望也是自己美好的扬帆起航 ⛵️\n","tags":["祝福"],"author":"Thomas che","readingTime":1,"cover":"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"}],"locale":"zh"}],["$","$L16",null,{"children":["$","$L2",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L3",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]}],["$","footer",null,{"className":"bg-gray-900 text-white py-8 ","children":["$","div",null,{"className":"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8","children":["$","div",null,{"className":"flex flex-col md:flex-row justify-between items-center","children":[["$","div",null,{"className":"mb-4 md:mb-0","children":[["$","p",null,{"className":"text-sm","children":"© 2025 Cheche博客. 保留所有权利."}],["$","p",null,{"className":"text-xs text-gray-400 mt-1","children":"备案号：鲁ICP备2024107635号-1版权所有 © 2024"}]]}],["$","div",null,{"className":"flex space-x-6","children":[["$","a",null,{"href":"/zh/about","className":"text-sm text-gray-300 hover:text-white transition-colors","children":"联系我"}],["$","a",null,{"href":"https://github.com/mingqiangChe?tab=repositories","className":"text-sm text-gray-300 hover:text-white transition-colors","target":"_blank","rel":"noopener noreferrer","children":"GitHub"}]]}]]}]}]}]]}]
5:["$","div",null,{"className":"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900  pt-32","children":["$","div",null,{"className":"max-w-7xl mx-auto px-4 py-12","children":[["$","div",null,{"className":"text-center mb-12","children":[["$","h1",null,{"className":"text-5xl font-bold text-white mb-4","children":"博客文章"}],["$","p",null,{"className":"text-slate-400 text-lg","children":"探索技术世界，分享编程心得"}]]}],["$","div",null,{"className":"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8","children":[["$","$L17","docker",{"href":"/zh/blog/docker","className":"block group hover:no-underline","children":["$","article",null,{"className":"bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2","children":[["$","div",null,{"className":"relative h-48 overflow-hidden","children":["$","div",null,{"className":"relative w-full h-full","children":[["$","$L18",null,{"src":"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800","alt":"Docker + Next.js 部署实战教程","fill":true,"className":"object-cover group-hover:scale-110 transition-transform duration-500","sizes":"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw","priority":true}],["$","div",null,{"className":"absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"}],["$","div",null,{"className":"absolute bottom-0 left-0 right-0 p-6","children":[["$","h2",null,{"className":"text-white text-xl font-bold line-clamp-2 mb-2 group-hover:text-blue-300 transition-colors","children":"Docker + Next.js 部署实战教程"}],["$","div",null,{"className":"flex items-center text-slate-300 text-sm","children":[["$","div",null,{"className":"w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2","children":["$","span",null,{"className":"text-xs font-medium text-white","children":"T"}]}],["$","span",null,{"children":"Thomas che"}]]}]]}]]}]}],["$","div",null,{"className":"p-6","children":[["$","div",null,{"className":"flex items-center justify-between text-xs text-slate-400 mb-3","children":[["$","time",null,{"className":"flex items-center gap-1","children":[["$","span",null,{"children":"📅"}],"2025年6月15日"]}],["$","span",null,{"className":"flex items-center gap-1","children":[["$","span",null,{"children":"⏱️"}],"5 分钟"]}]]}],["$","p",null,{"className":"text-slate-300 text-sm line-clamp-3 mb-4 leading-relaxed","children":"ocker + Next.js 部署实战教程"}],["$","div",null,{"className":"flex flex-wrap gap-2","children":[[["$","span","Docker",{"className":"inline-block bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors","children":["#","Docker"]}],["$","span","部署",{"className":"inline-block bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors","children":["#","部署"]}]],false]}]]}]]}]}],["$","$L17","two",{"href":"/zh/blog/two","className":"block group hover:no-underline","children":["$","article",null,{"className":"bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2","children":[["$","div",null,{"className":"relative h-48 overflow-hidden","children":["$","div",null,{"className":"relative w-full h-full","children":[["$","$L18",null,{"src":"/blog/cover/DSC0445.jpg","alt":"关于博客搭建","fill":true,"className":"object-cover group-hover:scale-110 transition-transform duration-500","sizes":"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw","priority":true}],["$","div",null,{"className":"absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"}],["$","div",null,{"className":"absolute bottom-0 left-0 right-0 p-6","children":[["$","h2",null,{"className":"text-white text-xl font-bold line-clamp-2 mb-2 group-hover:text-blue-300 transition-colors","children":"关于博客搭建"}],["$","div",null,{"className":"flex items-center text-slate-300 text-sm","children":[["$","div",null,{"className":"w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2","children":["$","span",null,{"className":"text-xs font-medium text-white","children":"T"}]}],["$","span",null,{"children":"Thomas che"}]]}]]}]]}]}],["$","div",null,{"className":"p-6","children":[["$","div",null,{"className":"flex items-center justify-between text-xs text-slate-400 mb-3","children":[["$","time",null,{"className":"flex items-center gap-1","children":[["$","span",null,{"children":"📅"}],"2025年6月14日"]}],["$","span",null,{"className":"flex items-center gap-1","children":[["$","span",null,{"children":"⏱️"}],"1 分钟"]}]]}],["$","p",null,{"className":"text-slate-300 text-sm line-clamp-3 mb-4 leading-relaxed","children":"内容关于这个博客的架构 搭建"}],["$","div",null,{"className":"flex flex-wrap gap-2","children":[[["$","span","架构",{"className":"inline-block bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors","children":["#","架构"]}],["$","span","next",{"className":"inline-block bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors","children":["#","next"]}],["$","span","react",{"className":"inline-block bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors","children":["#","react"]}]],false]}]]}]]}]}],["$","$L17","first-post",{"href":"/zh/blog/first-post","className":"block group hover:no-underline","children":["$","article",null,{"className":"bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2","children":[["$","div",null,{"className":"relative h-48 overflow-hidden","children":["$","div",null,{"className":"relative w-full h-full","children":[["$","$L18",null,{"src":"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800","alt":"新篇章 新开始","fill":true,"className":"object-cover group-hover:scale-110 transition-transform duration-500","sizes":"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw","priority":true}],["$","div",null,{"className":"absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"}],["$","div",null,{"className":"absolute bottom-0 left-0 right-0 p-6","children":[["$","h2",null,{"className":"text-white text-xl font-bold line-clamp-2 mb-2 group-hover:text-blue-300 transition-colors","children":"新篇章 新开始"}],["$","div",null,{"className":"flex items-center text-slate-300 text-sm","children":[["$","div",null,{"className":"w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2","children":["$","span",null,{"className":"text-xs font-medium text-white","children":"T"}]}],["$","span",null,{"children":"Thomas che"}]]}]]}]]}]}],["$","div",null,{"className":"p-6","children":[["$","div",null,{"className":"flex items-center justify-between text-xs text-slate-400 mb-3","children":[["$","time",null,{"className":"flex items-center gap-1","children":[["$","span",null,{"children":"📅"}],"2025年6月14日"]}],["$","span",null,{"className":"flex items-center gap-1","children":[["$","span",null,{"children":"⏱️"}],"1 分钟"]}]]}],["$","p",null,{"className":"text-slate-300 text-sm line-clamp-3 mb-4 leading-relaxed","children":"新的开始 希望美好的开始"}],["$","div",null,{"className":"flex flex-wrap gap-2","children":[[["$","span","祝福",{"className":"inline-block bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors","children":["#","祝福"]}]],false]}]]}]]}]}]]}],false,["$","div",null,{"className":"text-center mt-12","children":["$","button",null,{"className":"bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl","children":"加载更多"}]}]]}]}]
a:null
e:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
9:null
12:{"metadata":[["$","title","0",{"children":"博客列表 | Thomasche Blog"}],["$","meta","1",{"name":"description","content":"查看车明强发布的所有博客文章。"}]],"error":null,"digest":"$undefined"}
c:{"metadata":"$12:metadata","error":null,"digest":"$undefined"}
