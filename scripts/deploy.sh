#!/bin/bash
set -euo pipefail

DOMAIN="thomasche.top"
EMAIL="thomaschefowshu@gmail.com"
NGINX_CONF_SRC="./nginx/cheche-blog.conf"
NGINX_CONF_DST="/etc/nginx/conf.d/cheche-blog.conf"
CERTBOT_RENEW_HOOK="/usr/local/bin/certbot-renew-hook.sh"

echo -e "🚀 构建并启动 Docker 容器..."
docker compose up -d --build

if [ -f "$NGINX_CONF_SRC" ]; then
  echo -e "📄 复制 nginx 配置文件到系统路径..."
  sudo cp "$NGINX_CONF_SRC" "$NGINX_CONF_DST"
else
  echo "❌ 未找到 nginx 配置文件: $NGINX_CONF_SRC"
  exit 1
fi

echo -e "🔧 创建 certbot 自动续期钩子..."
sudo tee "$CERTBOT_RENEW_HOOK" > /dev/null <<EOF
#!/bin/bash
set -e
echo "[\$(date)] 证书续期成功，正在重载 nginx..."
nginx -s reload
EOF
sudo chmod +x "$CERTBOT_RENEW_HOOK"

echo -e "📜 申请或续期证书（自动配置 nginx）..."
sudo certbot certonly --nginx -d "$DOMAIN" --deploy-hook "$CERTBOT_RENEW_HOOK" --agree-tos --non-interactive -m "$EMAIL"

echo -e "🔍 测试 nginx 配置..."
sudo nginx -t

echo -e "🔁 重载 nginx..."
sudo nginx -s reload

echo -e "\n✅ 部署完成！访问地址：https://$DOMAIN"
