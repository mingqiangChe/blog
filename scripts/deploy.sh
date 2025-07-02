#!/bin/bash
set -euo pipefail

DOMAIN="thomasche.top"
NGINX_CONF_SRC="./nginx-out/cheche-blog.conf"
NGINX_CONF_DST="/etc/nginx/conf.d/cheche-blog.conf"
CERTBOT_RENEW_HOOK="/usr/local/bin/certbot-renew-hook.sh"

echo -e "\U0001F680 开始构建并启动 Docker 容器..."
docker compose up -d --build

if [ -f "$NGINX_CONF_SRC" ]; then
  echo -e "\U0001F4C2 复制 nginx 配置文件到系统目录..."
  sudo cp "$NGINX_CONF_SRC" "$NGINX_CONF_DST"
else
  echo "⚠️ 未找到 nginx 配置文件: $NGINX_CONF_SRC"
  exit 1
fi

echo -e "\U0001F4C4 创建 Certbot 自动续期钩子脚本..."
sudo tee "$CERTBOT_RENEW_HOOK" > /dev/null <<EOF
#!/bin/bash
set -e
echo "[\$(date)] 证书续期成功，正在重载 nginx..."
sudo nginx -s reload
echo "[\$(date)] nginx 重载完成"
EOF

sudo chmod +x "$CERTBOT_RENEW_HOOK"

echo -e "\U0001F4A1 申请或续期证书（自动部署到 nginx）..."
sudo certbot certonly --nginx -d "$DOMAIN" --deploy-hook "$CERTBOT_RENEW_HOOK" --agree-tos --non-interactive -m thomaschefowshu@gmail.com

echo -e "\U0001F4A1 测试 nginx 配置..."
sudo nginx -t

echo -e "\U0001F504 重载 nginx..."
sudo nginx -s reload

echo -e "\n🚀 部署完成！请访问：https://$DOMAIN"
echo -e "Certbot 续期钩子已自动配置，续期后 nginx 会自动重载。"
