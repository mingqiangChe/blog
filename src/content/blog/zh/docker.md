---
title: 'Docker + Next.js 部署实战教程'
date: '2025-06-15'
description: 'Next.js + Docker + PM2 + Nginx'
tags: ['Docker', '部署']
author: 'Thomas che'
cover: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%9C%BA%E8%BD%A6_PixCake/DSC04445.jpg'
---

# 一、环境准备与服务器搭建

</br>

## 1. 服务器基础环境

</br>

```harsp
操作系统：Linux (CentOS、Alpine、Ubuntu 等均可，示例用的是 Alpine 基础镜像)

Node.js：使用官方 Node 20 Alpine 版本镜像

包管理工具：pnpm

进程管理：PM2

容器管理：Docker 和 Docker Compose

反向代理：Nginx

```

</br>

## 2.特点与需求

</br>

```harsp
使用 Next.js（含 SSR 和静态资源）

使用 pnpm 管理依赖

构建产物包含 standalone 文件夹，方便容器运行时无需额外依赖

Docker 容器化部署，要求镜像尽量轻量且高效缓存

nginx 反向代理，支持 HTTPS，使用 Certbot 自动申请和续期证书

自动重载 nginx 配置，保障证书续期后服务不中断

静态资源做长缓存，页面和 API请求走代理转发

```

</br>

# 二、项目结构与代码准备

</br>

```harsp
/root/cheche-deploy/
├── Dockerfile
├── docker-compose.yml
├── nginx/
│   └── cheche-blog.conf
├── nginx-out/               # 本地存放 Nginx 配置供脚本使用
├── package.json
├── pm2.config.js
├── scripts/
│   └── deploy.sh
├── src/
├── public/
└── ...
```

</br>

nginx/cheche-blog.conf 是 Nginx 配置文件的原始存放目录

</br>

nginx-out/ 是本地用于同步和部署时复制的目录

</br>

scripts/deploy.sh 是自动构建、启动和同步 Nginx 配置的脚本

</br>

# 三、Dockerfile 编写

</br>

```dockerfile
FROM node:20-alpine

RUN npm install -g pnpm pm2

WORKDIR /app

COPY . /app

# 将 nginx 配置复制到容器指定目录（构建时）
COPY nginx/cheche-blog.conf /nginx-out/

RUN pnpm install --frozen-lockfile

RUN pnpm run build && pnpm run build:deploy

COPY pm2.config.js /app/pm2.config.js

WORKDIR /app/deploy/standalone

EXPOSE 3000

CMD ["pm2-runtime", "/app/pm2.config.js"]

```

</br>

# 四、docker-compose.yml 示例

</br>

```yaml
version: '3.9'

services:
  cheche-blog:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: cheche-blog
    ports:
      - '3000:3000'
    volumes:
      - ./nginx-out:/nginx-out # 本地 nginx-out 目录映射到容器
    restart: always
```

</br>

# 五、scripts/deploy.sh 自动化部署脚本

</br>

```bash
#!/bin/bash

set -e

echo "🚀 正在构建并启动 Docker 容器..."

# 构建并启动
docker compose up -d --build

# 确保 nginx-out 目录存在，并同步配置文件
mkdir -p ./nginx-out
cp ./nginx/cheche-blog.conf ./nginx-out/

NGINX_SOURCE="./nginx-out/cheche-blog.conf"
NGINX_TARGET="/etc/nginx/conf.d/cheche-blog.conf"

if [ -f "$NGINX_SOURCE" ]; then
  echo "📂 同步 nginx 配置到系统目录..."
  cp "$NGINX_SOURCE" "$NGINX_TARGET"
  echo "🔄 测试并重载 Nginx 配置..."
  nginx -t && nginx -s reload
  echo "✅ Nginx 配置已重载"
else
  echo "⚠️ 未找到 nginx 配置文件: $NGINX_SOURCE"
  exit 1
fi

echo -e "\n🎉 部署完成！请访问: https://thomasche.top"
```

</br>

# 六、常见问题汇总与解决方案

</br>

![买入卖出形态](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/Snipaste_2025-07-01_20-28-55.png)

</br>

# 七、构建产物说明

</br>

/app/deploy/standalone：Next.js 15 版本的独立运行包，包含服务端启动文件 server.js 和静态资源

</br>

相关静态资源复制到对应目录确保独立运行

</br>

PM2 负责管理 Node 服务，使用 pm2.config.js 配置启动参数

</br>

# 八、后续优化

</br>

构建加速： 本地提前构建，构建结果通过 CI/CD 上传制品，服务器只做部署，减少容器构建时间

缓存管理： 利用 Docker 缓存机制，减少重复安装依赖

日志监控： 整合日志收集工具，便于线上排查

环境配置管理：使用 .env 文件或 Secrets 管理生产环境变量

多环境支持：编写不同环境的 Nginx 配置及部署脚本
