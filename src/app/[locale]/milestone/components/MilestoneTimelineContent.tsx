import FuturisticHistoryBg from './FuturisticHistoryBg';
import Link from 'next/link';
import Image from 'next/image';
import ClientDateWrapper from './ClientDateWrapper';
import { dict } from '../../../../../messages/dict';
import { useTranslations, useLocale } from 'next-intl';
export default function MilestoneTimelineContent({ posts }: { posts: any[] }) {
  const locale = useLocale();
  const lang = locale == 'en' ? 'en' : 'zh';

  const milestones = dict.milestone[lang];
  // 从字典文件里取当前语言对应的内容
  return (
    <FuturisticHistoryBg>
      <section className="min-h-screen py-12 px-4 pt-24 max-w-3xl mx-auto text-gray-300">
        {posts.map((post, index) => (
          <section key={post.slug} className="relative mb-16">
            {/* 时间线 */}
            <section className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center">
              <section className="w-2 h-2 bg-blue-400 rounded-full mt-6 mb-2"></section>
              <section className="flex-1 w-1 bg-gradient-to-b from-blue-400 to-transparent"></section>
            </section>
            {/* 标题和描述 */}
            <h1 className="ml-12 text-2xl font-bold text-white-700 mb-2">
              {milestones[index]}
            </h1>
            <section className="ml-12 text-white-500 text-base mb-4 flex items-center">
              <ClientDateWrapper dateStr={post.date} />
            </section>
            {/* 卡片（Link包裹） */}
            <Link
              href={`/zh/blog/${encodeURIComponent(post.slug)}`}
              className="group ml-12 block relative rounded-3xl overflow-hidden bg-white/90 backdrop-blur-lg border border-cyan-300/30 shadow-lg hover:shadow-cyan-500/50 cursor-pointer transition-all duration-300"
              style={{ width: '100%', minHeight: 200 }}
            >
              <section className="flex flex-col md:flex-row md:items-center gap-6">
                {/* 封面 */}
                <section className="md:w-1/2 w-full">
                  <section className="relative h-40 w-full rounded-xl overflow-hidden">
                    <Image
                      src={
                        post.cover ||
                        'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%9C%BA%E8%BD%A6_PixCake/DSC04445.jpg'
                      }
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="rounded-xl object-cover transition-transform duration-300"
                      draggable={false}
                      priority
                    />
                    {/* <section className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-white text-lg font-semibold bg-blue-600/80 px-4 py-1 rounded-full">
                        《{post.title}》
                      </span>
                    </section> */}
                  </section>
                </section>
                {/* 信息浮现层 */}
                <section className="md:w-1/2 w-full flex flex-col justify-center py-4 px-2">
                  <section className="flex flex-wrap gap-2 mb-2">
                    {post.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </section>
                  <section className="text-xs text-gray-400 mb-1">
                    {post.author} ·{' '}
                    {/* {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}{' '} */}
                    {post.description}·
                    {typeof post.readingTime === 'number'
                      ? `${post.readingTime}分钟 · `
                      : ''}
                    {typeof post.content === 'string'
                      ? `${post.content.length}字`
                      : ''}
                  </section>
                  {/* 内容超出自动隐藏 */}
                  {/* <section className="text-gray-700 text-sm line-clamp-2">{post.content}</section> */}
                </section>
              </section>
              {/* 发光边框 */}
              <span className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-cyan-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </section>
        ))}
      </section>
    </FuturisticHistoryBg>
  );
}
