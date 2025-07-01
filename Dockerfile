# 使用官方 Node 运行环境（已在服务器通过 node-20-alpine.tar 导入）
FROM node:20-alpine

# 安装全局工具
RUN npm install -g pnpm pm2

# 设置工作目录
WORKDIR /app

# 将本地代码复制到容器中（包含 cheche-blog 项目）
COPY . /app


# 拷贝 nginx 配置到输出目录（可选）
COPY nginx/cheche-blog.conf /nginx-out/

# 安装依赖
RUN pnpm install --frozen-lockfile

# 构建并导出 deploy 包
RUN pnpm run build && pnpm run build:deploy



# 拷贝 PM2 启动配置
COPY pm2.config.js /app/pm2.config.js

# 设置最终运行目录
WORKDIR /app/deploy/standalone

# 容器开放端口
EXPOSE 3000

# 使用 PM2 启动服务
CMD ["pm2-runtime", "/app/pm2.config.js"]
