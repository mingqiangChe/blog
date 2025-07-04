# 使用官方 Node 运行环境（已在服务器通过 node-20-alpine.tar 导入）
FROM node:20-alpine

# 安装全局工具
RUN npm install -g pnpm pm2

# 设置工作目录
WORKDIR /app

# 拷贝源码（包括构建脚本和 .next 等）
COPY . /app

# 拷贝 nginx 配置
COPY nginx/cheche-blog.conf /nginx-out/

# 安装依赖
RUN pnpm install --frozen-lockfile

# 构建产物（包括 .next/standalone）
RUN pnpm run build

# 确保复制完整的 .next 文件夹，而非只复制 .next/static
RUN mkdir -p /app/deploy/standalone/.next \
 && cp -r .next/standalone/* /app/deploy/standalone/ \
 && cp -r .next/* /app/deploy/standalone/.next/ \
 && cp -r public /app/deploy/standalone/public \
 && cp pm2.config.js /app/deploy/standalone/pm2.config.js

# 设置最终运行路径
WORKDIR /app/deploy/standalone

# 暴露端口
EXPOSE 3000

# 使用 PM2 启动应用
CMD ["pm2-runtime", "pm2.config.js"]
