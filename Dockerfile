# 使用官方 Node 运行环境（本地已导入 node:20-alpine）
FROM node:20-alpine

# 设置构建时参数（供 ENV 使用）
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SITE_NAME

# 设置环境变量供 Next.js 构建使用（注意：必须使用 NEXT_PUBLIC 前缀）
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME
ENV NODE_OPTIONS="--max-old-space-size=1024"

# 安装工具
# RUN npm install -g pnpm pm2

# 设置工作目录
WORKDIR /app

# 复制依赖文件用于缓存依赖
# COPY pnpm-lock.yaml package.json ./

# 安装依赖
# RUN pnpm install --frozen-lockfile --network-concurrency=1

# 复制项目源码
COPY . .

# 构建产物
RUN pnpm run build

# 打包部署文件
RUN mkdir -p /app/deploy/standalone/.next \
 && cp -r .next/standalone/* /app/deploy/standalone/ \
 && cp -r .next/* /app/deploy/standalone/.next/ \
 && cp -r public /app/deploy/standalone/public \
 && cp pm2.config.js /app/deploy/standalone/pm2.config.js

# 设置生产部署工作目录
WORKDIR /app/deploy/standalone

# 容器监听端口
EXPOSE 3000

# 启动服务
CMD ["pm2-runtime", "pm2.config.js"]
