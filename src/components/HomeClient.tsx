// src/app/[locale]/components/HomeClient.tsx
'use client';
import React, { useState, useEffect } from 'react';
import HomeContent from '@/components/HomeContent';

interface HomeClientProps {
  initialPosts: any[];
  locale: string;
}

export default function HomeClient({ initialPosts, locale }: HomeClientProps) {
  const [posts, setPosts] = useState<any[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false); // 默认false，可改为true模拟加载

  // 如果需要客户端动态加载数据，可用下面代码模拟
  /*
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      // 这里可以调用API获取数据替代服务端静态数据
      setPosts(initialPosts);
      setIsLoading(false);
    }, 1500);
  }, [initialPosts]);
  */

  if (!posts.length) {
    return (
      <section className="text-center text-gray-400 py-20">
        暂无文章数据
      </section>
    );
  }

  return <HomeContent posts={posts} locale={locale} />;
}
