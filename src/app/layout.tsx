import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import GlobalProtector from '@/components/GlobalProtector';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// 🔍 SEO 强化 Metadata
export const metadata: Metadata = {
  title: {
    default: '车明强的博客 | Thomasche Blog',
    template: '%s',
  },
  description: '记录前端开发、技术成长与生活思考的博客。',
  keywords: ['车明强', '博客', '前端', 'React', 'Next.js', '技术成长'],
  authors: [{ name: '车明强', url: 'https://thomasche.top' }],
  creator: '车明强',
  publisher: '车明强',
  applicationName: '车明强博客',

  openGraph: {
    title: '车明强的博客',
    description: '记录前端开发、技术成长与生活思考的博客。',
    url: 'https://thomasche.top',
    siteName: 'Thomasche Blog',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%9C%BA%E8%BD%A6_PixCake/DSC04465.jpg',
        width: 1200,
        height: 630,
        alt: '车明强的博客',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '车明强的博客',
    description: '记录前端开发与技术成长，分享生活体悟。',
    images: [
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%9C%BA%E8%BD%A6_PixCake/DSC04465.jpg',
    ],
  },
  metadataBase: new URL('https://thomasche.top'),
  other: {
    'google-site-verification': '34U60AoX7QlJc9CsMqy8raJwYlFGtAoA7Nq5ToqGaMA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50 `}
      >
        <GlobalProtector />
        {children}
      </body>
    </html>
  );
}
