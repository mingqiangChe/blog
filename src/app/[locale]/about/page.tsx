// 服务器组件 Page.tsx
import type { Metadata } from 'next';
import MySelf from './MySelf';

export const metadata: Metadata = {
  title: '关于我',
  description: '车明强个人信息',
};

interface PageProps {
  params: { locale: string };
}

export default function Page({ params }: PageProps) {
  const { locale } = params;
  console.log('当前语言(Page):', locale);

  return <MySelf locale={locale} />;
}
