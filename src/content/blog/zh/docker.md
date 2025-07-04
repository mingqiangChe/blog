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
# 使用官方 Node 运行环境（已在服务器通过 node-20-alpine.tar 导入）
FROM node:20-alpine

# 安装全局工具
RUN npm install -g pnpm pm2

# 设置工作目录
WORKDIR /app

# 拷贝源码
COPY . /app

# 拷贝 nginx 配置
COPY nginx/cheche-blog.conf /nginx-out/

# 安装依赖
RUN pnpm install --frozen-lockfile

# 构建 deploy 产物
RUN pnpm run build && pnpm run build:deploy

# 拷贝 PM2 配置
COPY pm2.config.js /app/pm2.config.js

# 设置最终运行路径
WORKDIR /app/deploy/standalone

# 暴露端口
EXPOSE 3000

# 使用 PM2 启动应用
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
      args:
        REPO: https://github.com/user/cheche-blog.git
        BRANCH: main
    container_name: cheche-blog
    ports:
      - '3000:3000'
    # volumes:
    #   - ./nginx-out:/nginx-out # 复制 nginx 配置出容器
    restart: always
```

</br>

# 五、scripts/deploy.sh 自动化部署脚本

</br>

**自动申请证书 续期证书**

</br>

```bash
#!/bin/bash
set -euo pipefail

DOMAIN="thomasche.top"
EMAIL="thomaschefowshu@gmail.com"
NGINX_CONF_SRC="./nginx/cheche-blog.conf"
NGINX_CONF_DST="/etc/nginx/conf.d/cheche-blog.conf"
CERTBOT_RENEW_HOOK="/usr/local/bin/certbot-renew-hook.sh"

echo -e "🚀 构建并启动 Docker 容器..."
docker compose up -d --build

if [ -f "$NGINX_CONF_SRC" ]; then
  echo -e "📄 复制 nginx 配置文件到系统路径..."
  sudo cp "$NGINX_CONF_SRC" "$NGINX_CONF_DST"
else
  echo "❌ 未找到 nginx 配置文件: $NGINX_CONF_SRC"
  exit 1
fi

echo -e "🔧 创建 certbot 自动续期钩子..."
sudo tee "$CERTBOT_RENEW_HOOK" > /dev/null <<EOF
#!/bin/bash
set -e
echo "[\$(date)] 证书续期成功，正在重载 nginx..."
sudo nginx -s reload
EOF
sudo chmod +x "$CERTBOT_RENEW_HOOK"

echo -e "📜 申请或续期证书（自动配置 nginx）..."
sudo certbot --nginx -d "$DOMAIN" \
  --agree-tos --non-interactive -m "$EMAIL" \
  --deploy-hook "$CERTBOT_RENEW_HOOK"

echo -e "🔍 测试 nginx 配置..."
sudo nginx -t

echo -e "🔁 重载 nginx..."
sudo nginx -s reload

echo -e "\n✅ 部署完成！访问地址：https://$DOMAIN"

```

</br>

# 六、.dockerignore 优化（减小构建上下文体积）

</br>

```bash
node_modules
.git
.gitignore
```

</br>

# 七、nginx 配置

</br>

**单文件，Certbot 管理证书**

</br>

```harsp
server {
    listen 443 ssl;
    server_name thomasche.top;

    ssl_certificate /etc/letsencrypt/live/thomasche.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/thomasche.top/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    client_max_body_size 50m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

server {
    listen 80;
    server_name thomasche.top;
    return 301 https://$host$request_uri;
}

```

</br>

# 八、常见问题汇总与解决方案

</br>

![买入卖出形态](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/Snipaste_2025-07-01_20-28-55.png)

</br>

# 九、构建与部署流程总结

</br>

本地或服务器拉取最新代码

执行 ./deploy.sh，自动构建 Docker 镜像并启动容器

</br>

```harsp

[root@VM-12-6-opencloudos cheche-deploy]# chmod +x ./scripts/deploy.sh
[root@VM-12-6-opencloudos cheche-deploy]# ./scripts/deploy.sh

```

</br>

自动复制 nginx 配置到 /etc/nginx/conf.d/

自动申请或续期 HTTPS 证书，并自动创建续期后重载 nginx 的钩子

检查 nginx 配置并重载，使证书生效

访问 https://thomasche.top，支持 HTTPS，静态资源带缓存，API 代理转发到 Node 容器

</br>

# 十、构建产物说明

</br>

/app/deploy/standalone：Next.js 15 版本的独立运行包，包含服务端启动文件 server.js 和静态资源

</br>

相关静态资源复制到对应目录确保独立运行

</br>

PM2 负责管理 Node 服务，使用 pm2.config.js 配置启动参数

</br>

# 十一、后续优化

</br>

构建缓存提升：可使用 Docker BuildKit 的缓存机制或本地缓存服务加速依赖安装

日志管理：nginx 和 pm2 日志分离，定期收集和清理

安全防护：nginx 增加安全 headers（如 HSTS、X-Frame-Options 等）

性能监控：集成 pm2 监控面板或使用 Prometheus 监控服务健康

备份机制：定期备份 nginx 配置、证书文件及重要数据

多环境支持：增加 staging 环境配置，部署测试更安全
