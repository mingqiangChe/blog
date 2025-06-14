// app/[locale]/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '@/components/CodeBlock';

interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const enPosts = getAllPosts('en');
  const zhPosts = getAllPosts('zh');
  const allPosts = [...enPosts, ...zhPosts];

  return allPosts.map((post) => ({
    locale: post.locale,
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug, params.locale);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose prose-lg max-w-none dark:prose-invert">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          <time className="text-gray-600 dark:text-gray-400">
            {new Date(post.date).toLocaleDateString(params.locale)}
          </time>
        </header>

        <ReactMarkdown
          components={{
            code: CodeBlock,
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
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}

function generateId(children: any): string {
  const text = typeof children === 'string' ? children : children.toString();
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}
