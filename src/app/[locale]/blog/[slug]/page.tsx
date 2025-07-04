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
    <section className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] flex justify-center px-2 overflowclip">
      <section className="relative max-w-5xl w-full mt-32 mx-auto p-8 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl border border-cyan-400/30">
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 主要内容 */}
          <section className="lg:col-span-3">
            <article
              className="prose prose-lg max-w-none prose-invert"
              style={{ color: '#e3f6ff' }}
            >
              <header className="mb-8">
                <h1
                  className="text-4xl font-extrabold mb-4 neontext"
                  style={{
                    color: '#fff',
                    textShadow: '0 0 16px #00fff7, 0 0 32px #00fff7',
                  }}
                >
                  {post.title}
                </h1>
                <section
                  className="flex flex-wrap items-center gap-4 text-sm mb-6"
                  style={{ color: '#7de2fc' }}
                >
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
                </section>
                {post.tags && post.tags.length > 0 && (
                  <section className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/${locale}/blog/tags/${encodeURIComponent(tag)}`}
                        className="inline-block bg-cyan-900/40 text-cyan-200 text-xs px-2 py-1 rounded-full border border-cyan-400 hover:bg-cyan-700/60 transition-colors no-underline"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </section>
                )}
                {post.description && (
                  <p
                    className="text-lg italic border-l-4 border-cyan-400 pl-4 mb-6"
                    style={{ color: '#b2fefa' }}
                  >
                    {post.description}
                  </p>
                )}
                <MobileTableOfContents headings={headings} />
              </header>

              {post.cover && (
                <section className="mb-8 flex justify-center">
                  <section
                    className="relative w-full max-w-2xl rounded-lg overflow-hidden"
                    style={{
                      height: '50vw', // 移动端高度自适应屏幕宽度的一半
                      maxHeight: '400px', // 最大高度不超过400px
                      minHeight: '180px', // 最小高度，避免过矮
                    }}
                  >
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="rounded-lg shadow-lg object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </section>
                </section>
              )}

              {/* Markdown 内容渲染 */}
              <section style={{ color: '#e3f6ff' }}>
                <ClientMarkdownRenderer content={post.content} />
              </section>

              <footer className="mt-12 pt-8 border-t border-cyan-400/30">
                <section className="flex justify-between items-center">
                  <Link
                    href={`/${locale}/blog`}
                    className="text-cyan-300 hover:text-cyan-400 no-underline transition-colors"
                  >
                    ← {locale === 'zh' ? '返回博客列表' : 'Back to Blog'}
                  </Link>
                </section>
              </footer>
            </article>
          </section>

          {/* 目录导航 */}
          <section className="hidden lg:block">
            <section className="sticky top-24 z-50">
              <section
                className="rounded-xl bg-white/10 backdrop-blur border border-cyan-400/20 p-4 shadow-lg h-[800px] overflow-y-auto scrollbar scrollbar-thumb-cyan-400 scrollbar-track-white/10"
                style={{ scrollbarWidth: 'thin' }} // Firefox 支持
              >
                <TableOfContents headings={headings} />
              </section>
            </section>
          </section>
        </section>
        {/* 可选：页面角落加个发光霓虹球/粒子动效等 */}
        <section className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/30 rounded-full blur-2xl pointer-events-none"></section>
      </section>
    </section>
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
