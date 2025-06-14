//  博客详情页
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  // 根据slug和locale获取文章
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose prose-lg max-w-none dark:prose-invert">
        <header className="mb-8">
          {/* 返回博客列表链接 */}
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 no-underline"
          >
            ← {locale === 'zh' ? '返回博客列表' : 'Back to Blog'}
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
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

          {/* 标签显示 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/${locale}/blog/tags/${encodeURIComponent(tag)}`}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full hover:bg-blue-200 transition-colors no-underline"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* 文章描述 */}
          {post.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 italic border-l-4 border-blue-500 pl-4">
              {post.description}
            </p>
          )}
        </header>

        {/* Markdown 内容渲染 */}
        <ReactMarkdown
          components={{
            code: CodeBlock, // 确保CodeBlock组件存在
            h1: ({ children, ...props }) => (
              <h1 id={generateId(children)} {...props}>
                {children}
              </h1>
            ),
            h2: ({ children, ...props }) => (
              <h2 id={generateId(children)} {...props}>
                {children}
              </h2>
            ),
            h3: ({ children, ...props }) => (
              <h3 id={generateId(children)} {...props}>
                {children}
              </h3>
            ),
            // 你现有的其他自定义组件配置
          }}
        >
          {post.content}
        </ReactMarkdown>

        {/* 文章底部信息 */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            {/* <Link
              href={`/${locale}/blog`}
              className="text-blue-600 hover:text-blue-800 no-underline"
            >
              ← {locale === 'zh' ? '返回博客列表' : 'Back to Blog'}
            </Link> */}

            {/* 分享按钮（可选） */}
            {/* <div className="flex gap-2">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.description,
                      url: window.location.href,
                    });
                  }
                }}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                {locale === 'zh' ? '分享' : 'Share'}
              </button>
            </div> */}
          </div>
        </footer>
      </article>
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

function generateId(children: any): string {
  const text = typeof children === 'string' ? children : children.toString();
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}
