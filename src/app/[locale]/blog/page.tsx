//  博客列表页
import { getAllPosts, debugDirectoryStructure } from '@/lib/markdown';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '博客列表',
  description: '查看车明强发布的所有博客文章。',
};

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  // 添加目录结构调试
  console.log('🚀 博客页面开始渲染');
  debugDirectoryStructure();

  const posts = getAllPosts(locale);

  console.log('📊 页面渲染数据:');
  console.log('- 当前语言:', locale);
  console.log('- 文章数量:', posts.length);
  console.log(
    '- 文章列表:',
    posts.map((p) => ({ title: p.title, slug: p.slug, cover: p.cover }))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900  pt-32">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            {locale === 'zh' ? '博客文章' : 'Blog Posts'}
          </h1>
          <p className="text-slate-400 text-lg">
            {locale === 'zh'
              ? '探索技术世界，分享编程心得'
              : 'Explore the tech world, share programming insights'}
          </p>
        </div>

        {/* 文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="block group hover:no-underline"
            >
              <article className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
                {/* 封面图片 */}
                <div className="relative h-48 overflow-hidden">
                  {post.cover ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 6} // 前6篇文章优先加载
                      />
                      {/* 渐变遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                      {/* 标题叠加在图片上 */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="text-white text-xl font-bold line-clamp-2 mb-2 group-hover:text-blue-300 transition-colors">
                          {post.title}
                        </h2>

                        {/* 作者信息 */}
                        <div className="flex items-center text-slate-300 text-sm">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                            <span className="text-xs font-medium text-white">
                              {post.author?.charAt(0) || 'A'}
                            </span>
                          </div>
                          <span>{post.author || 'Anonymous'}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center relative">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">📝</div>
                        <span className="text-sm font-medium">
                          {locale === 'zh' ? '暂无封面' : 'No Cover'}
                        </span>
                      </div>

                      {/* 标题叠加 */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="text-white text-xl font-bold line-clamp-2 mb-2">
                          {post.title}
                        </h2>
                        <div className="flex items-center text-slate-200 text-sm">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-2">
                            <span className="text-xs font-medium">
                              {post.author?.charAt(0) || 'A'}
                            </span>
                          </div>
                          <span>{post.author || 'Anonymous'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 文章信息 */}
                <div className="p-6">
                  {/* 文章元信息 */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <time className="flex items-center gap-1">
                      <span>📅</span>
                      {new Date(post.date).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    {post.readingTime && (
                      <span className="flex items-center gap-1">
                        <span>⏱️</span>
                        {locale === 'zh'
                          ? `${post.readingTime} 分钟`
                          : `${post.readingTime} min`}
                      </span>
                    )}
                  </div>

                  {/* 文章描述 */}
                  {post.description && (
                    <p className="text-slate-300 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {post.description}
                    </p>
                  )}

                  {/* 标签 */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
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
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* 空状态 */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📝</div>
            <div className="text-slate-400 text-xl mb-4">
              {locale === 'zh' ? '暂无博客文章' : 'No blog posts found'}
            </div>
            <div className="text-slate-500 text-sm">
              {locale === 'zh'
                ? '请检查文章目录或添加新文章'
                : 'Check your content directory or add new posts'}
            </div>
          </div>
        )}

        {/* 加载更多按钮（可选） */}
        {posts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl">
              {locale === 'zh' ? '加载更多' : 'Load More'}
            </button>
          </div>
        )}

        {/* 调试信息 - 仅开发环境显示 */}
        {/* {process.env.NODE_ENV === 'development' && (
          <div className="mt-12 p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <h3 className="text-white font-bold mb-4">🔧 调试信息</h3>
            <div className="text-slate-300 space-y-2">
              <p>
                当前语言: <span className="text-blue-400">{locale}</span>
              </p>
              <p>
                找到文章: <span className="text-green-400">{posts.length}</span>{' '}
                篇
              </p>
              <details className="mt-4">
                <summary className="cursor-pointer text-blue-400 hover:text-blue-300">
                  查看文章详情
                </summary>
                <pre className="mt-3 text-xs bg-slate-900/50 p-4 rounded-lg overflow-auto max-h-60 text-slate-400">
                  {JSON.stringify(
                    posts.map((p) => ({
                      title: p.title,
                      cover: p.cover,
                      tags: p.tags,
                      author: p.author,
                    })),
                    null,
                    2
                  )}
                </pre>
              </details>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

// 生成静态参数
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
