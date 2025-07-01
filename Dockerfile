FROM node:20-alpine

# 安装依赖工具
RUN apk add --no-cache git openssh

# 安装 pnpm 与 pm2（使用 corepack 启用 pnpm 也可行）
RUN npm install -g pnpm pm2

# 创建工作目录
WORKDIR /app

# 拉取仓库代码（支持传参）
ARG REPO=https://github.com/user/cheche-blog.git
ARG BRANCH=main

RUN git clone -b $BRANCH $REPO . && \
    echo "✅ 拉取代码完成"

# 复制 nginx 配置文件（后续同步出容器）
COPY nginx/cheche-blog.conf /nginx-out/

# 安装项目依赖
RUN pnpm install --frozen-lockfile

# 构建项目并导出 deploy 包
RUN pnpm run build && pnpm exec node scripts/build-deploy.js

# 设置 PM2 启动配置文件
COPY pm2.config.js .

# 设置部署目录为运行目录
WORKDIR /app/deploy/standalone

# 开放端口
EXPOSE 3000

# 启动服务
CMD ["pm2-runtime", "/app/pm2.config.js"]
