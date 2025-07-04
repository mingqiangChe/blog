import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chemingqiang.oss-cn-shenzhen.aliyuncs.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.iyf.tv',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.nikon-asia.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'r2cdn.perplexity.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // 控制打包时 ESLint 检查
  },
  output: 'standalone', //打包后文件逻辑

  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push(
      (
        context: { request?: string },
        callback: (err?: Error | null, result?: string | false) => void
      ) => {
        if (context.request === '@next/env') {
          return callback(null, false);
        }
        callback();
      }
    );
    return config;
  },
  // basePath: '/blog',//通过 /blog 路径访问 Next.js 应用，建议在 next.config.js 中配置：生成的静态资源路径和路由都会带上 /blog 前缀
};

export default withNextIntl(nextConfig);
