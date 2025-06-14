// 创建标签页面
import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';

interface TagPageProps {
  params: Promise<{
    locale: string;
    tag: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { locale, tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const allPosts = getAllPosts(locale);
  const taggedPosts = allPosts.filter((post) =>
    post.tags?.includes(decodedTag)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href={`/${locale}/blog`}
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← {locale === 'zh' ? '返回博客' : 'Back to Blog'}
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {locale === 'zh' ? `标签: ${decodedTag}` : `Tag: ${decodedTag}`}
        </h1>

        <p className="text-gray-600">
          {locale === 'zh'
            ? `找到 ${taggedPosts.length} 篇相关文章`
            : `Found ${taggedPosts.length} posts`}
        </p>
      </div>

      <div className="space-y-6">
        {taggedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {post.title}
            </h2>
            <time className="text-sm text-gray-600">
              {new Date(post.date).toLocaleDateString(locale)}
            </time>
            {post.description && (
              <p className="text-gray-700 mt-2">{post.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
