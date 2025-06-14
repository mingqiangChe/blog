//  博客列表页
import { getAllPosts, debugDirectoryStructure } from '@/lib/markdown';
import Link from 'next/link';

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
    posts.map((p) => ({ title: p.title, slug: p.slug }))
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 临时调试信息显示 */}
      {/* <div className="mb-4 p-4 bg-yellow-100 rounded border">
        <h3 className="font-bold">调试信息:</h3>
        <p>当前语言: {locale}</p>
        <p>找到文章: {posts.length} 篇</p>
        {posts.length === 0 && (
          <p className="text-red-600">
            ⚠️ 没有找到文章，请检查 content/blog/{locale} 目录
          </p>
        )}
      </div> */}

      <h1 className="text-4xl font-bold text-red-900 mb-8">
        {locale === 'zh' ? '博客文章' : 'Blog Posts'}
      </h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="block border-b border-gray-200 pb-8 group hover:no-underline"
          >
            <article>
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {post.title}
              </h2>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <time>{new Date(post.date).toLocaleDateString(locale)}</time>
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
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{post.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {post.description && (
                <p className="text-gray-700 mt-3">{post.description}</p>
              )}
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

// 生成静态参数
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
