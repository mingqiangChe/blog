#!/bin/bash

set -euo pipefail  # 严格模式，防止错误忽略

echo -e "\U0001F680 正在构建并启动 Docker 容器..."
docker compose up -d --build

NGINX_SOURCE="./nginx-out/cheche-blog.conf"
NGINX_TARGET="/etc/nginx/conf.d/cheche-blog.conf"

if [ -f "$NGINX_SOURCE" ]; then
  echo -e "\U0001F4C2 同步 nginx 配置到系统路径..."
  sudo cp "$NGINX_SOURCE" "$NGINX_TARGET"

  echo -e "\uD83D\uDD04 测试 nginx 配置..."
  sudo nginx -t

  echo -e "\uD83D\uDD04 重载 nginx 服务..."
  sudo nginx -s reload

  echo -e "\u2705 Nginx 配置已重载"
else
  echo "⚠️ 未找到 nginx 配置文件: $NGINX_SOURCE"
  exit 1
fi

echo -e "\n🚀 部署完成！请访问: https://thomasche.top"
