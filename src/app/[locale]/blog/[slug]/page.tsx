//  博客详情页
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/markdown';
import { extractHeadings } from '@/lib/extractHeadings';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '@/components/CodeBlock';
import TableOfContents from '@/components/TableOfContents';
import Link from 'next/link';
import MobileTableOfContents from '@/components/MobileTableOfContents';

interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = params;

  // 根据slug和locale获取文章
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  // 提取文章标题用于目录
  const headings = extractHeadings(post.content);

  // 维护已用id集合，避免重复id
  const usedIds = new Set<string>();

  // 递归提取纯文本
  function extractText(children: any): string {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.map(extractText).join('');
    if (children && typeof children === 'object' && 'props' in children) {
      return extractText(children.props.children);
    }
    return '';
  }

  // 生成唯一id
  function generateUniqueId(children: any): string {
    let baseId = extractText(children)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    if (!baseId) baseId = 'heading';

    let uniqueId = baseId;
    let counter = 1;
    while (usedIds.has(uniqueId)) {
      uniqueId = `${baseId}-${counter}`;
      counter++;
    }
    usedIds.add(uniqueId);
    return uniqueId;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-32">
      <div className="grid relative grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 主要内容区域 */}
        <div className="lg:col-span-3">
          <article className="prose prose-lg max-w-none dark:prose-invert">
            <header className="mb-8">
              {/* 返回博客列表链接 */}
              {/* <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 no-underline"
              >
                ← {locale === 'zh' ? '返回博客列表' : 'Back to Blog'}
              </Link> */}

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
                      className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors no-underline"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* 文章描述 */}
              {post.description && (
                <p className="text-lg text-gray-600 dark:text-gray-400 italic border-l-4 border-blue-500 pl-4 mb-6">
                  {post.description}
                </p>
              )}

              {/* 移动端目录 */}
              <MobileTableOfContents headings={headings} />
            </header>

            {/* 封面图片 - 插入在标题下方、内容上方 */}
            {post.cover && (
              <div className="mb-8 flex justify-center">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Markdown 内容渲染 */}
            <ReactMarkdown
              components={{
                code: CodeBlock,
                h1: ({ children, ...props }) => (
                  <h1 id={generateUniqueId(children)} {...props}>
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2 id={generateUniqueId(children)} {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3 id={generateUniqueId(children)} {...props}>
                    {children}
                  </h3>
                ),
                h4: ({ children, ...props }) => (
                  <h4 id={generateUniqueId(children)} {...props}>
                    {children}
                  </h4>
                ),
                h5: ({ children, ...props }) => (
                  <h5 id={generateUniqueId(children)} {...props}>
                    {children}
                  </h5>
                ),
                h6: ({ children, ...props }) => (
                  <h6 id={generateUniqueId(children)} {...props}>
                    {children}
                  </h6>
                ),
                a: ({ href, children, ...props }) => (
                  <a
                    href={href}
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={
                      href?.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    {...props}
                  >
                    {children}
                  </a>
                ),
                img: ({ src, alt, ...props }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="rounded-lg shadow-md mx-auto max-w-full h-auto"
                    loading="lazy"
                    {...props}
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>

            {/* 文章底部信息 */}
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

        {/* 右侧目录导航 */}
        <div className="fixed top-16 right-16 lg:col-span-1 overflow-visible">
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
