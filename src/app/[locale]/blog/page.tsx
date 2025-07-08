import { getAllPosts, debugDirectoryStructure } from '@/lib/markdown';
import dynamic from 'next/dynamic';
const BlogListClient = dynamic(() => import('./components/BlogListClient'), {
  loading: () => <p>正在加载...</p>, // 可选：加载时的占位内容
});

export const metadata = {
  title: '博客列表',
  description: '查看车明强发布的所有博客文章。',
};

interface BlogPageProps {
  params: { locale: string };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = params;

  debugDirectoryStructure();

  const posts = getAllPosts(locale);

  return <BlogListClient posts={posts} locale={locale} />;
}
