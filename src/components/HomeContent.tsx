// src/app/[locale]/components/HomeContent.tsx
import React from 'react';
import BlogContributionCalendar from '@/components/BlogContributionCalendar';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import SkeletonPlaceholder from '@/components/SkeletonBlogList';
const RecentPosts = dynamic(() => import('@/components/RecentPosts'), {
  loading: () => <SkeletonPlaceholder />,
});
const Page_h = dynamic(() => import('@/app/[locale]/components/Page_h'), {
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
      <section className="flex items-center justify-center">
        <Image
          src="https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E5%93%88%E5%A3%AB%E5%A5%87.png"
          alt="头像"
          width={106}
          height={106}
          className=" object-cover"
        />
      </section>
      <Page_h />
      {/* 文章贡献日历 */}
      <section className="flex items-center justify-center pt-32">
        <BlogContributionCalendar posts={posts} year={year} />
      </section>
      {/* 最近的文章 */}
      <section className="flex items-center justify-center pt-32 pb-32">
        <RecentPosts posts={recentPosts} />
      </section>
    </main>
  );
}
