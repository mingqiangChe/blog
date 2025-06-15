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
0:{"P":null,"b":"r5jBgWm4-cGd78y75qlcv","p":"","c":["","zh","blog","docker"],"i":false,"f":[[["",{"children":[["locale","zh","d"],{"children":["blog",{"children":[["slug","docker","d"],{"children":["__PAGE__",{}]}]}]}]},"$undefined","$undefined",true],["",["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/df2ccef7881ba81f.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}]],["$","html",null,{"lang":"en","suppressHydrationWarning":true,"children":["$","body",null,{"className":"__variable_5cfdac __variable_9a8899 antialiased min-h-screen flex flex-col bg-gray-50","children":["$","$L2",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L3",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]}]}]]}],{"children":[["locale","zh","d"],["$","$1","c",{"children":[null,"$L4"]}],{"children":["blog",["$","$1","c",{"children":[null,["$","$L2",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L3",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":[["slug","docker","d"],["$","$1","c",{"children":[null,["$","$L2",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L3",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":["__PAGE__",["$","$1","c",{"children":["$L5",["$","$L6",null,{"children":"$L7"}],null,["$","$L8",null,{"children":["$L9","$La",["$","$Lb",null,{"promise":"$@c"}]]}]]}],{},null,false]},null,false]},null,false]},null,false]},null,false],["$","$1","h",{"children":[null,["$","$1","fUZ2ka5M0xlHdlIa7oM5V",{"children":[["$","$Ld",null,{"children":"$Le"}],["$","meta",null,{"name":"next-size-adjust","content":""}]]}],null]}],false]],"m":"$undefined","G":["$f","$undefined"],"s":false,"S":true}
10:"$Sreact.suspense"
11:I[22533,[],"AsyncMetadata"]
13:I[13932,["215","static/chunks/1951f239-02bbd5c2000d56b3.js","893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","450","static/chunks/app/%5Blocale%5D/layout-be467e10ac9d095e.js"],"default"]
14:I[42404,["215","static/chunks/1951f239-02bbd5c2000d56b3.js","893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","450","static/chunks/app/%5Blocale%5D/layout-be467e10ac9d095e.js"],"default"]
16:I[88260,["215","static/chunks/1951f239-02bbd5c2000d56b3.js","893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","450","static/chunks/app/%5Blocale%5D/layout-be467e10ac9d095e.js"],"default"]
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
17:I[6252,["893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","304","static/chunks/304-c5959ee959d9d71f.js","414","static/chunks/app/%5Blocale%5D/blog/%5Bslug%5D/page-2cd112f7737b867b.js"],""]
18:I[49831,["893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","304","static/chunks/304-c5959ee959d9d71f.js","414","static/chunks/app/%5Blocale%5D/blog/%5Bslug%5D/page-2cd112f7737b867b.js"],"default"]
19:I[74893,["893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","304","static/chunks/304-c5959ee959d9d71f.js","414","static/chunks/app/%5Blocale%5D/blog/%5Bslug%5D/page-2cd112f7737b867b.js"],"Image"]
1a:I[15507,["893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","304","static/chunks/304-c5959ee959d9d71f.js","414","static/chunks/app/%5Blocale%5D/blog/%5Bslug%5D/page-2cd112f7737b867b.js"],"default"]
1c:I[43741,["893","static/chunks/893-2827a8eb2d446d83.js","252","static/chunks/252-2ca7c4e9d85929dd.js","304","static/chunks/304-c5959ee959d9d71f.js","414","static/chunks/app/%5Blocale%5D/blog/%5Bslug%5D/page-2cd112f7737b867b.js"],"default"]
a:null
1b:T19a2,
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
5:["$","div",null,{"className":"max-w-5xl mx-auto px-4 py-8 mt-32 ","children":["$","div",null,{"className":"grid relative grid-cols-1 lg:grid-cols-4 gap-8","children":[["$","div",null,{"className":"lg:col-span-3","children":["$","article",null,{"className":"prose prose-lg max-w-none dark:prose-invert","children":[["$","header",null,{"className":"mb-8","children":[["$","h1",null,{"className":"text-4xl font-bold text-gray-900 dark:text-white mb-4","children":"Docker + Next.js 部署实战教程"}],["$","div",null,{"className":"flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6","children":[["$","time",null,{"children":"2025年6月15日"}],["$","span",null,{"children":["作者：","Thomas che"]}],["$","span",null,{"children":"5 分钟阅读"}]]}],["$","div",null,{"className":"flex flex-wrap gap-2 mb-6","children":[["$","$L17","Docker",{"href":"/zh/blog/tags/Docker","className":"inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors no-underline","children":["#","Docker"]}],["$","$L17","部署",{"href":"/zh/blog/tags/%E9%83%A8%E7%BD%B2","className":"inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors no-underline","children":["#","部署"]}]]}],["$","p",null,{"className":"text-lg text-gray-600 dark:text-gray-400 italic border-l-4 border-blue-500 pl-4 mb-6","children":"ocker + Next.js 部署实战教程"}],["$","$L18",null,{"headings":[{"id":"docker-部署-next-js-应用完整指南","title":"Docker 部署 Next.js 应用完整指南","level":1},{"id":"准备工作","title":"📋 准备工作","level":2},{"id":"1-安装-docker","title":"1. 安装 Docker","level":3},{"id":"2-项目结构检查","title":"2. 项目结构检查","level":3},{"id":"创建-dockerfile","title":"🐳 创建 Dockerfile","level":2},{"id":"配置-next-js","title":"⚙️ 配置 Next.js","level":2},{"id":"1-更新-next-config-js","title":"1. 更新 `next.config.js`","level":3},{"id":"2-创建-dockerignore","title":"2. 创建 `.dockerignore`","level":3},{"id":"docker-compose-配置-可选","title":"🔧 Docker Compose 配置（可选）","level":2},{"id":"构建和运行","title":"🚀 构建和运行","level":2},{"id":"方法一-使用-docker-命令","title":"方法一：使用 Docker 命令","level":3},{"id":"方法二-使用-docker-compose","title":"方法二：使用 Docker Compose","level":3},{"id":"常用-docker-命令","title":"📝 常用 Docker 命令","level":2},{"id":"容器管理","title":"容器管理","level":3},{"id":"查看运行中的容器","title":"查看运行中的容器","level":1},{"id":"查看所有容器","title":"查看所有容器","level":1},{"id":"停止容器","title":"停止容器","level":1},{"id":"启动容器","title":"启动容器","level":1},{"id":"重启容器","title":"重启容器","level":1},{"id":"删除容器","title":"删除容器","level":1},{"id":"镜像管理","title":"镜像管理","level":3},{"id":"查看镜像","title":"查看镜像","level":1},{"id":"删除镜像","title":"删除镜像","level":1},{"id":"清理未使用的镜像","title":"清理未使用的镜像","level":1},{"id":"查看镜像构建历史","title":"查看镜像构建历史","level":1},{"id":"调试命令","title":"调试命令","level":3},{"id":"进入容器内部","title":"进入容器内部","level":1},{"id":"查看容器日志","title":"查看容器日志","level":1},{"id":"实时查看日志","title":"实时查看日志","level":1},{"id":"查看容器资源使用情况","title":"查看容器资源使用情况","level":1},{"id":"故障排除","title":"🔍 故障排除","level":2},{"id":"常见问题及解决方案","title":"常见问题及解决方案","level":3},{"id":"1-构建失败","title":"1. 构建失败","level":4},{"id":"清理-docker-缓存","title":"清理 Docker 缓存","level":1},{"id":"重新构建-不使用缓存","title":"重新构建（不使用缓存）","level":1},{"id":"2-端口被占用","title":"2. 端口被占用","level":4},{"id":"查看端口占用","title":"查看端口占用","level":1},{"id":"使用不同端口","title":"使用不同端口","level":1},{"id":"3-环境变量问题","title":"3. 环境变量问题","level":4},{"id":"检查容器内环境变量","title":"检查容器内环境变量","level":1},{"id":"使用-env-文件","title":"使用 .env 文件","level":1},{"id":"性能优化","title":"📊 性能优化","level":2},{"id":"1-多阶段构建优化","title":"1. 多阶段构建优化","level":3},{"id":"只复制必要文件","title":"只复制必要文件","level":1},{"id":"清理缓存","title":"清理缓存","level":1},{"id":"2-镜像大小优化","title":"2. 镜像大小优化","level":3},{"id":"查看镜像大小","title":"查看镜像大小","level":1},{"id":"分析镜像层","title":"分析镜像层","level":1},{"id":"使用-dive-工具分析","title":"使用 dive 工具分析","level":1},{"id":"生产环境部署","title":"🚀 生产环境部署","level":2},{"id":"1-推送到-docker-hub","title":"1. 推送到 Docker Hub","level":3},{"id":"登录-docker-hub","title":"登录 Docker Hub","level":1},{"id":"标记镜像","title":"标记镜像","level":1},{"id":"推送镜像","title":"推送镜像","level":1},{"id":"2-在服务器上部署","title":"2. 在服务器上部署","level":3},{"id":"拉取镜像","title":"拉取镜像","level":1},{"id":"运行容器","title":"运行容器","level":1},{"id":"学习资源","title":"📚 学习资源","level":2},{"id":"docker-官方文档","title":"Docker 官方文档","level":3},{"id":"next-js-docker-部署","title":"Next.js Docker 部署","level":3},{"id":"实用工具","title":"实用工具","level":3}]}]]}],["$","div",null,{"className":"mb-8 flex justify-center","children":["$","div",null,{"className":"relative w-full","style":{"height":"400px"},"children":["$","$L19",null,{"src":"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800","alt":"Docker + Next.js 部署实战教程","fill":true,"className":"rounded-lg shadow-lg object-cover"}]}]}],["$","$L1a",null,{"content":"$1b"}],["$","footer",null,{"className":"mt-12 pt-8 border-t border-gray-200 dark:border-gray-700","children":["$","div",null,{"className":"flex justify-between items-center","children":["$","$L17",null,{"href":"/zh/blog","className":"text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 no-underline","children":["← ","返回博客列表"]}]}]}]]}]}],["$","div",null,{"className":"fixed top-16 right-16 lg:col-span-1 overflow-visible","children":["$","div",null,{"className":"hidden lg:block","children":["$","$L1c",null,{"headings":"$5:props:children:props:children:0:props:children:props:children:0:props:children:4:props:headings"}]}]}]]}]}]
e:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
9:null
12:{"metadata":[["$","title","0",{"children":"Thomasche Blog"}],["$","meta","1",{"name":"description","content":"车明强的个人博客 - Che Mingqiang Personal Blog"}]],"error":null,"digest":"$undefined"}
c:{"metadata":"$12:metadata","error":null,"digest":"$undefined"}
