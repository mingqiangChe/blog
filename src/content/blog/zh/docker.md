---
title: 'Docker + Next.js 部署实战教程'
date: '2025-06-15'
description: 'ocker + Next.js 部署实战教程'
tags: ['Docker', '部署']
author: 'Thomas che'
cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
---

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

### 1. 更新 next.config.js

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

### 2. 创建 .dockerignore

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
     可选：挂载数据卷
     volumes:
       - ./data:/app/data

  可选：添加 Nginx 反向代理
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
 查看运行中的容器
docker ps

查看所有容器
docker ps -a

停止容器
docker stop nextjs-container

 启动容器
docker start nextjs-container

重启容器
docker restart nextjs-container

删除容器
docker rm nextjs-container
```

### 镜像管理

```bash
 查看镜像
docker images

删除镜像
docker rmi my-nextjs-app

清理未使用的镜像
docker image prune

查看镜像构建历史
docker history my-nextjs-app
```

### 调试命令

```bash
进入容器内部
docker exec -it nextjs-container sh

 查看容器日志
docker logs nextjs-container

实时查看日志
docker logs -f nextjs-container

 查看容器资源使用情况
docker stats nextjs-container
```

## 🔍 故障排除

### 常见问题及解决方案

#### 1. 构建失败

```bash
 清理 Docker 缓存
docker system prune -a

 重新构建（不使用缓存）
docker build --no-cache -t my-nextjs-app .
```

#### 2. 端口被占用

```bash
 查看端口占用
lsof -i :3000

使用不同端口
docker run -p 3001:3000 my-nextjs-app
```

#### 3. 环境变量问题

```bash
 检查容器内环境变量
docker exec nextjs-container env

 使用 .env 文件
docker run --env-file .env.production -p 3000:3000 my-nextjs-app
```

## 📊 性能优化

### 1. 多阶段构建优化

```dockerfile
使用更小的基础镜像
FROM node:18-alpine AS base

只复制必要文件
COPY package.json pnpm-lock.yaml ./

清理缓存
RUN pnpm store prune
```

### 2. 镜像大小优化

```bash
查看镜像大小
docker images my-nextjs-app

分析镜像层
docker history my-nextjs-app

使用 dive 工具分析
dive my-nextjs-app
```

## 🚀 生产环境部署

### 1. 推送到 Docker Hub

```bash
 登录 Docker Hub
docker login

标记镜像
docker tag my-nextjs-app username/my-nextjs-app:latest

推送镜像
docker push username/my-nextjs-app:latest
```

### 2. 在服务器上部署

```bash
 拉取镜像
docker pull username/my-nextjs-app:latest

运行容器
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
