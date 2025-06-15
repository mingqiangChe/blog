// app/[locale]/page.tsx - 多语言首页
import BlogContributionCalendar from '@/components/BlogContributionCalendar';
import RecentPosts from '@/components/RecentPosts';
import { getAllPosts } from '@/lib/markdown';
import Image from 'next/image';
interface LocaleLayoutProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: LocaleLayoutProps) {
  // 使用 await 获取 params
  const { locale } = await params;

  // 获取当前语言的所有文章
  const posts = getAllPosts(locale);
  const year = 2025;
  const recentPosts = posts.slice(0, 6);
  return (
    <main className="min-h-screen pt-94">
      <div className="flex items-center justify-center">
        <Image
          src="https://avatars.githubusercontent.com/u/85379334?v=4"
          alt="头像"
          width={96} // 指定宽度
          height={96} // 指定高度
          className="rounded-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center mt-4 text-3xl font-bold">
        车车
      </div>

      <div className="flex items-center justify-center font-bold">
        「把今天当作人生最后一天」
      </div>

      {/* 文章贡献日历 */}
      <div className="flex items-center justify-center pt-32">
        <BlogContributionCalendar posts={posts} year={year} />
      </div>

      {/* 最近的文章 */}
      <div className="flex items-center justify-center pt-32 pb-32">
        {/* 这里可以添加最近文章列表 */}
        <RecentPosts posts={recentPosts} />
      </div>
    </main>
  );
}
