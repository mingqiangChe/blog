// app/[locale]/page.tsx - 多语言首页
import BlogContributionCalendar from '@/components/BlogContributionCalendar';
import { getAllPosts } from '@/lib/markdown';

interface LocaleLayoutProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: LocaleLayoutProps) {
  // 使用 await 获取 params
  const { locale } = await params;

  // 获取当前语言的所有文章
  const posts = getAllPosts(locale);
  const year = 2025;

  return (
    <main className="min-h-screen p-32">
      <div className="flex items-center justify-center">
        <img
          src="/self/DSC0443.jpg"
          alt="头像"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center mt-4 text-3xl font-bold">
        车车
      </div>

      <div className="flex items-center justify-center font-bold">
        「向生活比个耶✌️」
      </div>

      {/* 文章贡献日历 */}
      <div className="flex items-center justify-center mt-8">
        <BlogContributionCalendar posts={posts} year={year} />
      </div>

      {/* 最近的文章 */}
      <div className="mt-8">{/* 这里可以添加最近文章列表 */}</div>
    </main>
  );
}
