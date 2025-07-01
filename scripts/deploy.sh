#!/bin/bash

set -e

# 处理 Docker 构建
echo "\U0001F680 正在构建并启动 Docker 容器..."
docker compose up -d --build

# 处理 nginx 配置
NGINX_SOURCE="./nginx-out/cheche-blog.conf"
NGINX_TARGET="/etc/nginx/conf.d/cheche-blog.conf"

if [ -f "$NGINX_SOURCE" ]; then
  echo "\U0001F4C2 同步 nginx 配置到系统路径..."
  cp "$NGINX_SOURCE" "$NGINX_TARGET"
  echo "\uD83D\uDD04 测试并重载 Nginx..."
  nginx -t && nginx -s reload
  echo "\u2705 Nginx 配置已重载"
else
  echo "⚠️ 未找到 nginx 配置文件: $NGINX_SOURCE"
  exit 1
fi

# 完成提示
echo "\n🚀 部署完成！请访问: https://thomasche.top"
