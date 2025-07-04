# 使用官方 Node 运行环境（已在服务器通过 node-20-alpine.tar 导入）
FROM node:20-alpine AS base

# 安装全局工具
RUN npm install -g pnpm pm2

# 设置工作目录
WORKDIR /app

# 拷贝依赖配置文件（利用缓存）
COPY pnpm-lock.yaml package.json ./

# 安装依赖（仅安装，不运行构建）
RUN pnpm install --frozen-lockfile

# 拷贝其余源码（延后 COPY 可加快缓存利用）
COPY . .

# 拷贝 Nginx 配置
COPY nginx/cheche-blog.conf /nginx-out/

# 构建 deploy 产物（包含 standalone 输出）
RUN pnpm run build && pnpm run build:deploy

# 拷贝 PM2 配置（建议放根目录）
COPY pm2.config.js /app/pm2.config.js

# 设置最终运行目录
WORKDIR /app/deploy/standalone

# 暴露端口
EXPOSE 3000

# 使用 PM2 启动应用
CMD ["pm2-runtime", "/app/pm2.config.js"]
