// lib/metadata.ts
import { Metadata } from 'next';

export interface MetadataContent {
  title: string;
  description: string;
  keywords: string;
}

export const siteMetadata: Record<string, MetadataContent> = {
  zh: {
    title: 'Cheche博客 - 车明强的个人网站',
    description:
      '车明强的个人博客，分享前端技术文章、编程经验和生活感悟。专注于Next.js、React、TypeScript等现代Web开发技术。',
    keywords: '车明强,前端开发,博客,Next.js,React,TypeScript,Web开发,编程技术',
  },
  en: {
    title: 'Cheche Blog - Personal Website of Che Mingqiang',
    description:
      'Personal blog of Che Mingqiang, sharing frontend articles, programming experiences and life insights. Focus on Next.js, React, TypeScript and modern web development.',
    keywords:
      'Che Mingqiang,Frontend Development,Blog,Next.js,React,TypeScript,Web Development,Programming',
  },
};

function getValidBaseUrl(): string {
  // 优先使用环境变量
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    // 确保URL包含协议
    if (envUrl.startsWith('http://') || envUrl.startsWith('https://')) {
      return envUrl;
    } else {
      // 为生产环境添加https，开发环境添加http
      return process.env.NODE_ENV === 'production'
        ? `https://${envUrl}`
        : `http://${envUrl}`;
    }
  }

  // 开发环境默认值
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // 生产环境默认值（请替换为您的实际域名）
  return 'https://your-domain.com';
}

export function generateSiteMetadata(
  locale: string,
  pathname?: string
): Metadata {
  const content = siteMetadata[locale] || siteMetadata.en;
  const baseUrl = getValidBaseUrl();

  // 构建当前页面的完整路径
  const currentPath = pathname || '';
  const canonicalUrl = `${baseUrl}/${locale}${currentPath}`;

  try {
    return {
      title: {
        default: content.title,
        template: `%s | ${content.title}`,
      },
      description: content.description,
      keywords: content.keywords,
      authors: [{ name: '车明强', url: `/${locale}/about` }],
      creator: '车明强',
      publisher: 'Cheche Blog',
      metadataBase: new URL(baseUrl), // 现在baseUrl已经被验证过
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'zh-CN': `${baseUrl}/zh${currentPath}`,
          'en-US': `${baseUrl}/en${currentPath}`,
          'x-default': `${baseUrl}/en${currentPath}`,
        },
      },
      openGraph: {
        title: content.title,
        description: content.description,
        url: canonicalUrl,
        siteName: locale === 'zh' ? 'Cheche博客' : 'Cheche Blog',
        locale: locale === 'zh' ? 'zh_CN' : 'en_US',
        type: 'website',
        images: [
          {
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: content.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: content.title,
        description: content.description,
        images: ['/og-image.jpg'],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);

    // 返回最基本的metadata以避免应用崩溃
    return {
      title: content.title,
      description: content.description,
    };
  }
}
