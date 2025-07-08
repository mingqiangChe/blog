'use client';

import { useState, useMemo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  slug: string;
  title: string;
  description?: string;
  cover?: string;
  date: string;
  tags?: string[];
  author?: string;
  readingTime?: number;
}

interface BlogListClientProps {
  posts: BlogPost[];
  locale: string;
}

const PAGE_SIZE = 10;

export default function BlogListClient({ posts, locale }: BlogListClientProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedTag, setSelectedTag] = useState('全部');

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedTag === '全部') return posts;
    return posts.filter((p) => p.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && visibleCount < filteredPosts.length) {
      const timer = setTimeout(() => {
        setVisibleCount((c) => Math.min(c + PAGE_SIZE, filteredPosts.length));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView, visibleCount, filteredPosts.length]);

  const onTagClick = (tag: string) => {
    setSelectedTag(tag);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* 分类标签 */}
      <section className="mb-8 flex flex-wrap justify-center gap-4 pt-14">
        {['全部', ...allTags].map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`px-4 py-2 rounded-full border ${
              selectedTag === tag
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white'
            } transition`}
          >
            {tag}
          </button>
        ))}
      </section>

      {/* 文章列表 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visiblePosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="block group hover:no-underline"
          >
            <article className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
              <section className="relative h-48 overflow-hidden">
                {post.cover ? (
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 6}
                  />
                ) : (
                  <section className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center relative">
                    <span className="text-white text-4xl select-none">📝</span>
                  </section>
                )}
              </section>

              <section className="p-6">
                <h2 className="text-white text-xl font-bold line-clamp-2 mb-2 group-hover:text-blue-300 transition-colors">
                  {post.title}
                </h2>

                <section className="flex items-center text-slate-300 text-sm mb-3">
                  <section className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-white">
                      {post.author?.charAt(0) || 'A'}
                    </span>
                  </section>
                  <span>
                    {post.author || (locale === 'zh' ? '匿名' : 'Anonymous')}
                  </span>
                </section>

                <section className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <time>
                    📅{' '}
                    {new Date(post.date).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  {post.readingTime && (
                    <span>
                      ⏱️{' '}
                      {locale === 'zh'
                        ? `${post.readingTime} 分钟`
                        : `${post.readingTime} min`}
                    </span>
                  )}
                </section>

                {post.description && (
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 h-[3rem]">
                    {post.description}
                  </p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <section className="flex flex-wrap gap-2 mt-3">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 4 && (
                      <span className="text-xs text-slate-500 self-center">
                        +{post.tags.length - 4}
                      </span>
                    )}
                  </section>
                )}
              </section>
            </article>
          </Link>
        ))}
      </section>

      {/* 无限滚动哨兵 */}
      <div
        ref={visibleCount < filteredPosts.length ? ref : null}
        className="h-12"
      />
    </section>
  );
}
