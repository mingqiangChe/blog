import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chemingqiang.oss-cn-shenzhen.aliyuncs.com',
        port: '',
        pathname: '/img/**',
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
      // 你还可以继续添加你用到的其他图片域名
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // 控制打包时 ESLint 检查
  },
};

export default nextConfig;
