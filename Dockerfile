# 使用官方 Node 运行环境（本地已导入 node:20-alpine）
FROM node:20-alpine

# 安装全局工具 pnpm 和 pm2
RUN npm install -g pnpm pm2

# 设置工作目录
WORKDIR /app

# 拷贝依赖文件用于缓存安装
COPY pnpm-lock.yaml package.json ./

# 安装依赖，锁定版本，防止自动更新依赖
RUN pnpm install --frozen-lockfile --network-concurrency=1

# 拷贝完整源码
COPY . .

# ✅ 拷贝环境变量文件用于构建（必须先复制）
COPY .env.production .env

# 设置构建相关环境变量
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=1024"

# 构建项目（此处会用到 .env 中的环境变量）
RUN pnpm run build

# ✅ 拷贝构建产物
RUN mkdir -p /app/deploy/standalone/.next \
 && cp -r .next/standalone/* /app/deploy/standalone/ \
 && cp -r .next/* /app/deploy/standalone/.next/ \
 && cp -r public /app/deploy/standalone/public \
 && cp pm2.config.js /app/deploy/standalone/pm2.config.js \
 && cp .env.production /app/deploy/standalone/.env

# 设置运行目录为部署目录
WORKDIR /app/deploy/standalone

# 容器监听端口
EXPOSE 3000

# 使用 pm2 启动服务
CMD ["pm2-runtime", "pm2.config.js"]
