// src/app/[locale]/HomeServer.tsx
import HomeClient from '@/components/HomeClient';
import { getAllPosts } from '@/lib/markdown';

interface HomeServerProps {
  locale: string;
}

export default function HomeServer({ locale }: HomeServerProps) {
  // 服务端获取数据
  const posts = getAllPosts(locale);
  return <HomeClient initialPosts={posts} locale={locale} />;
}
