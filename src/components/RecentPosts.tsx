'use client';

import Link from 'next/link';
import type { BlogPost } from '@/lib/markdown';
import Image from 'next/image';
interface RecentPostsProps {
  posts: BlogPost[];
}
import { useTranslations } from 'next-intl';
export default function RecentPosts({ posts }: RecentPostsProps) {
  const t = useTranslations('PageIndex');
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        {t('sect1')}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl overflow-hidden bg-slate-800/80 backdrop-blur-xl shadow-xl border border-slate-700/60 transition hover:scale-105 hover:shadow-2xl flex flex-col"
          >
            {/* 封面 */}
            <div className="relative h-44 md:h-40 w-full overflow-hidden">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={post.cover || '/default-cover.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* 标题和作者遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-5 left-0 w-full px-5">
                <div className="text-lg md:text-xl font-bold text-white drop-shadow mb-1">
                  《{post.title}》
                </div>
                <div className="text-xs text-slate-200/80 flex items-center gap-2">
                  {/* <span>Lucky</span> */}
                  {post.author && (
                    <span className="ml-2 text-purple-300">@{post.author}</span>
                  )}
                </div>
              </div>
            </div>
            {/* 文章信息 */}
            <div className="flex-1 flex flex-col p-5 bg-transparent">
              <div className="font-bold text-lg text-white mb-1 leading-tight">
                {post.title}
              </div>
              <div className="text-slate-400 text-xs mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                {post.content && (
                  <>
                    <span>·</span>
                    <span>{post.content.length} 字</span>
                  </>
                )}
                {post.readingTime && (
                  <>
                    <span>·</span>
                    <span>{post.readingTime} 分钟</span>
                  </>
                )}
              </div>
              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mt-2 mb-1">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-700 text-blue-300 text-xs px-2 py-0.5 rounded shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
