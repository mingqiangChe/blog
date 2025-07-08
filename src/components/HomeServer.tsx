import { getAllPosts } from '@/lib/markdown';
import dynamic from 'next/dynamic';
import SkeletonPlaceholder from '@/components/SkeletonBlogList';
// 懒加载 只适合客户端渲染组件
const HomeClient = dynamic(() => import('@/components/HomeClient'), {
  loading: () => <SkeletonPlaceholder />,
});
interface HomeServerProps {
  locale: string;
}

export default function HomeServer({ locale }: HomeServerProps) {
  // 服务端获取数据
  const posts = getAllPosts(locale);
  return <HomeClient initialPosts={posts} locale={locale} />;
}
