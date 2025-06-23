import BlogContributionCalendar from '@/components/BlogContributionCalendar';
import RecentPosts from '@/components/RecentPosts';
import { getAllPosts } from '@/lib/markdown';
import Image from 'next/image';
import VideoCard from '@/components/VideoCard';
interface LocaleLayoutProps {
  params: Promise<{ locale: string }>;
}
// 引入国际化部分
import Page_h from './components/Page_h';
export default async function Home({ params }: LocaleLayoutProps) {
  // 使用 await 获取 params
  const { locale } = await params;
  // 获取当前语言的所有文章
  const posts = getAllPosts(locale);
  const year = 2025;
  const recentPosts = posts.slice(0, 6);

  return (
    <main className="home-bg min-h-screen bg-no-repeat bg-top overflow-x-hidden pt-24">
      <div className="flex items-center justify-center">
        <Image
          src="https://avatars.githubusercontent.com/u/85379334?v=4"
          alt="头像"
          width={96} // 指定宽度
          height={96} // 指定高度
          className="rounded-full object-cover"
          priority
        />
      </div>
      <Page_h />
      {/* 文章贡献日历 */}
      <div className="flex items-center justify-center pt-32">
        <BlogContributionCalendar posts={posts} year={year} />
      </div>
      {/* 最近的文章 */}
      <div className="flex items-center justify-center pt-32 pb-32">
        {/* 这里可以添加最近文章列表 */}
        <RecentPosts posts={recentPosts} />
      </div>
      {/* <div className="flex items-center justify-center pt-32 pb-32">
        <VideoCard
          src="https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/mov_1750092393646.mov"
          title="video"
        />
      </div> */}
    </main>
  );
}
