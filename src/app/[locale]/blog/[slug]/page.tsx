// 博客详情页（高科技酷炫风格）
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/markdown';
import { extractHeadings } from '@/lib/extractHeadings';
import TableOfContents from '@/components/TableOfContents';
import Link from 'next/link';
import MobileTableOfContents from '@/components/MobileTableOfContents';
import ClientMarkdownRenderer from '@/components/ClientMarkdownRenderer';
import Image from 'next/image';
import type { Metadata } from 'next';

interface PageParams {
  params: { locale: string; slug: string };
}

// 生成 Metadata，await params 解包
export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;

  const post = await getPostBySlug(slug, locale);
  if (!post) return {};

  const title = post.title;
  const description =
    post.description || '车明强的个人博客 - 记录技术与生活成长';

  // 默认图地址，且确保封面是有效链接
  const defaultCover =
    'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%9C%BA%E8%BD%A6_PixCake/DSC04465.jpg';
  const cover =
    post.cover && post.cover.startsWith('http') ? post.cover : defaultCover;

  const url = `https://thomasche.top/${locale}/blog/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Thomasche Blog',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'article',
      images: [
        {
          url: cover,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [cover],
    },
    metadataBase: new URL('https://thomasche.top'),
  };
}

// 组件主函数，await params 解包
export default async function BlogPostPage(props: any) {
  const params = await props.params;
  const { locale, slug } = params;

  const post = await getPostBySlug(slug, locale);
  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  // 保障 tags 是数组，避免 undefined 导致错误
  const tags = Array.isArray(post.tags) ? post.tags : [];

  // 默认图地址，保证展示图片不空
  const defaultCover =
    'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%9C%BA%E8%BD%A6_PixCake/DSC04465.jpg';
  const cover =
    post.cover && post.cover.startsWith('http') ? post.cover : defaultCover;

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

                {tags.length > 0 && (
                  <section className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
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

              {/* 使用默认图替代缺失封面 */}
              <section className="mb-8 flex justify-center">
                <section
                  className="relative w-full max-w-2xl rounded-lg overflow-hidden"
                  style={{
                    height: '50vw',
                    maxHeight: '400px',
                    minHeight: '180px',
                  }}
                >
                  <Image
                    src={cover}
                    alt={post.title}
                    fill
                    priority
                    className="rounded-lg shadow-lg object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </section>
              </section>

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
                style={{ scrollbarWidth: 'thin' }}
              >
                <TableOfContents headings={headings} />
              </section>
            </section>
          </section>
        </section>

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
