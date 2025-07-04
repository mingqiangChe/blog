# --- 构建阶段 ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build && pnpm run build:deploy

# --- 运行阶段 ---
FROM node:20-alpine

WORKDIR /app

RUN npm install -g pm2

# 只复制构建产物，不含源码
COPY --from=builder /app/deploy /app/deploy
COPY --from=builder /app/pm2.config.js /app/pm2.config.js

WORKDIR /app/deploy/standalone

EXPOSE 3000
CMD ["pm2-runtime", "/app/pm2.config.js"]
