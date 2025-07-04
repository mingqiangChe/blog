# 使用官方 Node 运行环境（已在服务器通过 node-20-alpine.tar 导入）
FROM node:20-alpine

# 安装全局工具 pnpm 和 pm2
RUN npm install -g pnpm pm2

# 设置工作目录
WORKDIR /app

# 拷贝全部源码，包括构建脚本和 .next 文件夹
COPY . /app

# 拷贝 nginx 配置文件到容器指定目录（容器内可根据需要挂载或拷贝）
COPY nginx/cheche-blog.conf /nginx-out/

# 安装依赖，锁定版本，防止自动更新依赖
RUN pnpm install --frozen-lockfile --network-concurrency=1

# 限制 Node 最大内存，防止构建时内存溢出卡死
ENV NODE_OPTIONS="--max-old-space-size=1024"

# 运行构建命令，生成生产环境产物（含 .next/standalone）
RUN pnpm run build

# 拷贝构建产物，确保 .next 全部拷贝，静态资源和 public 目录完整
RUN mkdir -p /app/deploy/standalone/.next \
 && cp -r .next/standalone/* /app/deploy/standalone/ \
 && cp -r .next/* /app/deploy/standalone/.next/ \
 && cp -r public /app/deploy/standalone/public \
 && cp pm2.config.js /app/deploy/standalone/pm2.config.js

# 设置运行时工作目录为部署产物目录
WORKDIR /app/deploy/standalone

# 容器监听端口
EXPOSE 3000

# 使用 pm2-runtime 启动应用，保持容器存活
CMD ["pm2-runtime", "pm2.config.js"]
