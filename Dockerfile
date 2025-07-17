# Builder 阶段
FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SITE_NAME

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME
ENV NODE_OPTIONS="--max-old-space-size=1024"

RUN npm install -g pnpm pm2

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile --network-concurrency=1

COPY . .
RUN pnpm run build

RUN mkdir -p /app/deploy/standalone/.next \
 && cp -r .next/standalone/* /app/deploy/standalone/ \
 && cp -r .next/static /app/deploy/standalone/.next/static \
 && cp -r public /app/deploy/standalone/public \
 && cp pm2.config.js /app/deploy/standalone/ \
 && cp .env.production /app/deploy/standalone/

# Runner 阶段
FROM node:20-alpine AS runner

WORKDIR /app/deploy/standalone

# 复制构建产物 + PM2 配置 + 环境变量
COPY --from=builder /app/deploy/standalone ./

# 安装 pm2
RUN npm install -g pm2

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pm2-runtime", "pm2.config.js"]
