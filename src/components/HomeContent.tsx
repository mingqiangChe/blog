import React from 'react';
import BlogContributionCalendar from '@/components/home/BlogContributionCalendar';
import dynamic from 'next/dynamic';
import SkeletonPlaceholder from '@/components/SkeletonBlogList';
import { LogoVator } from '@/components/home/LogoVator';
// import AE86DriftCanvas from '@/components/ae86/AE86DriftCanvas';
import EngineSoundButton from '@/components/ae86/EngineSoundButton';
const RecentPosts = dynamic(() => import('@/components/home/RecentPosts'), {
  loading: () => <SkeletonPlaceholder />,
});
const Page_h = dynamic(() => import('@/components/home/Page_h'), {
  loading: () => <SkeletonPlaceholder />,
});
interface HomeContentProps {
  posts: any[];
  locale: string;
}

export default function HomeContent({ posts, locale }: HomeContentProps) {
  const year = 2025;
  const recentPosts = posts.slice(0, 6);

  return (
    <main className="home-bg min-h-screen bg-no-repeat bg-top overflow-x-hidden pt-24">
      {/* <AE86DriftCanvas /> 🚗 AE86 飘移背景车 */}
      <LogoVator />
      <Page_h />
      {/* 文章贡献日历 */}
      <section className="hidden sm:flex items-center justify-center pt-32">
        <BlogContributionCalendar posts={posts} year={year} />
      </section>
      {/* 最近的文章 */}
      <section className="flex justify-center pt-32 pb-32">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <RecentPosts posts={recentPosts} />
        </div>
      </section>
      <EngineSoundButton />
    </main>
  );
}
