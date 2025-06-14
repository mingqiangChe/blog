import type { NextConfig } from 'next';
const nextConfig = {
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
      // 你还可以继续添加你用到的其他图片域名
    ],
  },
};

export default nextConfig;
