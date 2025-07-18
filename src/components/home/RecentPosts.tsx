'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/markdown';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface RecentPostsProps {
  posts: BlogPostMeta[];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  const t = useTranslations('PageIndex');

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [views, setViews] = useState<Record<string, number>>({});
  useEffect(() => {
    const slugs = posts.map((p) => p.slug);
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slugs }),
    })
      .then((res) => res.json())
      .then((data) => {
        setViews(data.counts || {});
      });
  }, [posts]);

  return (
    <section className="overflow-hidden px-2">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--ae86-white)] mb-8 tracking-wide font-[RacingSans] text-shadow-glow">
        {t('sect1')}
      </h2>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {sortedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl overflow-hidden bg-[var(--ae86-gray-bg)] border border-[var(--ae86-red)] shadow-[0_0_15px_var(--ae86-glow-light)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_var(--ae86-glow)] flex flex-col font-[RacingSans]"
          >
            <section className="relative h-44 md:h-40 w-full">
              <Image
                src={post.cover || '/default-cover.jpg'}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <section className="absolute inset-0 bg-gradient-to-t from-[var(--ae86-black)]/80 via-transparent to-transparent" />
              <section className="absolute bottom-3 left-0 w-full px-4">
                <p className="text-lg font-bold text-[var(--ae86-white)] drop-shadow-sm">
                  《{post.title}》
                </p>
                {post.author && (
                  <p className="text-xs text-[var(--ae86-red)] font-medium mt-1">
                    @{post.author}
                  </p>
                )}
              </section>
            </section>

            <section className="p-4 flex-1 flex flex-col justify-between">
              {post.description && (
                <p className="text-sm text-[var(--ae86-white)]/80 mb-3 line-clamp-3">
                  {post.description}
                </p>
              )}

              <section className="text-xs text-[var(--ae86-white)]/60 mb-2 flex flex-wrap items-center gap-2">
                <span>
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>
                  👁️{' '}
                  {views[post.slug] !== undefined
                    ? `${views[post.slug]} 次`
                    : '加载中...'}
                </span>
                {post.readingTime && (
                  <>
                    <span>·</span>
                    <span>{post.readingTime} 分钟</span>
                  </>
                )}
              </section>

              <section className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[var(--ae86-white)] bg-[var(--ae86-red)]/80 px-2 py-0.5 rounded-full tracking-wide shadow-sm hover:brightness-125 transition"
                  >
                    #{tag}
                  </span>
                ))}
              </section>
            </section>
          </Link>
        ))}
      </section>
    </section>
  );
}
