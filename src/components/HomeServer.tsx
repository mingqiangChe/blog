import { getAllPosts } from '@/lib/markdown';
import dynamic from 'next/dynamic';
// 懒加载 只适合客户端渲染组件
const HomeClient = dynamic(() => import('@/components/HomeClient'), {
  loading: () => <p>正在加载...</p>, // 可选：加载时的占位内容
});
interface HomeServerProps {
  locale: string;
}

export default function HomeServer({ locale }: HomeServerProps) {
  // 服务端获取数据
  const posts = getAllPosts(locale);
  return <HomeClient initialPosts={posts} locale={locale} />;
}
