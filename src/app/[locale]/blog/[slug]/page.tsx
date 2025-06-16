//  博客详情页
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/markdown';
import { extractHeadings } from '@/lib/extractHeadings';
import TableOfContents from '@/components/TableOfContents';
import Link from 'next/link';
import MobileTableOfContents from '@/components/MobileTableOfContents';
import ClientMarkdownRenderer from '@/components/ClientMarkdownRenderer'; // 直接导入，无 dynamic
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
    <div className="max-w-5xl mx-auto px-4 py-8 mt-32 ">
      <div className="grid relative grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 主要内容 */}
        <div className="lg:col-span-3">
          <article className="prose prose-lg max-w-none dark:prose-invert">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm  white:text-gray-400 mb-6">
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
                      className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors no-underline"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {post.description && (
                <p className="text-lg text-white-600 white:text-white-400 italic border-l-4 border-blue-500 pl-4 mb-6">
                  {post.description}
                </p>
              )}

              <MobileTableOfContents headings={headings} />
            </header>

            {post.cover && (
              <div className="mb-8 flex justify-center">
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

            {/* 这里使用客户端组件渲染 Markdown 内容 */}
            <ClientMarkdownRenderer content={post.content} />

            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <Link
                  href={`/${locale}/blog`}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 no-underline"
                >
                  ← {locale === 'zh' ? '返回博客列表' : 'Back to Blog'}
                </Link>
              </div>
            </footer>
          </article>
        </div>

        {/* 目录导航 */}
        <div className="fixed top-20 right-16 z-50 overflow-visible">
          <div className="hidden lg:block">
            <TableOfContents headings={headings} />
          </div>
        </div>
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
