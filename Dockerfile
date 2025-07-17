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
RUN pnpm run build 

# ✅ 拷贝静态资源供 Nginx 使用（关键部分）
RUN mkdir -p /etc/nginx/www/blog/.next/static /etc/nginx/www/blog/public \
  && cp -r deploy/standalone/.next/static/* /etc/nginx/www/blog/.next/static/ \
  && cp -r deploy/standalone/public/* /etc/nginx/www/blog/public/

# 拷贝 PM2 配置
COPY pm2.config.js /app/pm2.config.js

# 设置最终运行路径
WORKDIR /app/deploy/standalone

# 暴露端口
EXPOSE 3000

# 使用 PM2 启动应用
CMD ["pm2-runtime", "/app/pm2.config.js"]
