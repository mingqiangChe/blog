// 博客详情页（高科技酷炫风格）
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/markdown';
import { extractHeadings } from '@/lib/extractHeadings';
import TableOfContents from '@/components/TableOfContents';
import Link from 'next/link';
import MobileTableOfContents from '@/components/MobileTableOfContents';
import ClientMarkdownRenderer from '@/components/ClientMarkdownRenderer';
import Image from 'next/image';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  // 获取文章数据
  const post = await getPostBySlug(slug, locale);
  if (!post) {
    notFound();
  }

  // 提取标题用于目录
  const headings = extractHeadings(post.content);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] flex justify-center px-2">
      <div className="relative max-w-5xl w-full mt-32 mx-auto p-8 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl border border-cyan-400/30">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 主要内容 */}
          <div className="lg:col-span-3">
            <article className="prose prose-lg max-w-none prose-invert" style={{ color: '#e3f6ff' }}>
              <header className="mb-8">
                <h1
                  className="text-4xl font-extrabold mb-4 neontext"
                  style={{
                    color: '#fff',
                    textShadow: '0 0 16px #00fff7, 0 0 32px #00fff7'
                  }}
                >
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm mb-6" style={{ color: '#7de2fc' }}>
                  <time>
                    {new Date(post.date).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.author && (
                    <span>
                      {locale === 'zh' ? '作者：' : 'By '}
                      {post.author}
                    </span>
                  )}
                  {post.readingTime && (
                    <span>
                      {locale === 'zh'
                        ? `${post.readingTime} 分钟阅读`
                        : `${post.readingTime} min read`}
                    </span>
                  )}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/${locale}/blog/tags/${encodeURIComponent(tag)}`}
                        className="inline-block bg-cyan-900/40 text-cyan-200 text-xs px-2 py-1 rounded-full border border-cyan-400 hover:bg-cyan-700/60 transition-colors no-underline"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
                {post.description && (
                  <p className="text-lg italic border-l-4 border-cyan-400 pl-4 mb-6" style={{ color: '#b2fefa' }}>
                    {post.description}
                  </p>
                )}
                <MobileTableOfContents headings={headings} />
              </header>

              {post.cover && (
                <div className="mb-8 flex justify-center mb-36">
                  <div className="relative w-full" style={{ height: '400px' }}>
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="rounded-lg shadow-lg object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Markdown 内容渲染 */}
              <div style={{ color: '#e3f6ff' }}>
                <ClientMarkdownRenderer content={post.content} />
              </div>

              <footer className="mt-12 pt-8 border-t border-cyan-400/30">
                <div className="flex justify-between items-center">
                  <Link
                    href={`/${locale}/blog`}
                    className="text-cyan-300 hover:text-cyan-400 no-underline transition-colors"
                  >
                    ← {locale === 'zh' ? '返回博客列表' : 'Back to Blog'}
                  </Link>
                </div>
              </footer>
            </article>
          </div>

          {/* 目录导航 */}
          <div className="hidden lg:block">
            <div className="sticky top-24 z-50">
              <div className="rounded-xl bg-white/10 backdrop-blur border border-cyan-400/20 p-4 shadow-lg">
                <TableOfContents headings={headings} />
              </div>
            </div>
          </div>
        </div>
        {/* 可选：页面角落加个发光霓虹球/粒子动效等 */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/30 rounded-full blur-2xl pointer-events-none"></div>
      </div>
    </div>
  );
}

// 生成静态参数
export async function generateStaticParams() {
  const enPosts = getAllPosts('en');
  const zhPosts = getAllPosts('zh');
  const allPosts = [...enPosts, ...zhPosts];

  return allPosts.map((post) => ({
    locale: post.locale,
    slug: post.slug,
  }));
}
