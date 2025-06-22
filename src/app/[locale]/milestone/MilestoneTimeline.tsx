import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/markdown';
import FuturisticHistoryBg from './components/FuturisticHistoryBg';
import ClientDateWrapper from './components/ClientDateWrapper';

export default function MilestoneTimeline() {
  const posts = getAllPosts('zh').filter((post) => post.isMilestone !== false);

  if (!posts.length) {
    return (
      <div className="text-center text-gray-400 py-20">暂无里程碑数据</div>
    );
  }

  return (
    <FuturisticHistoryBg>
      <div className="min-h-screen py-12 px-2 sm:px-4 pt-24 max-w-4xl mx-auto text-gray-300">
        <ol className="relative border-s-2 border-cyan-400/40 pl-12">
          {posts.map((post) => (
            <li key={post.slug} className="mb-20 relative">
              {/* 时间线圆圈 */}
              <span
                className="absolute top-2 w-7 h-7 rounded-full bg-cyan-400 border-4 border-[#111827] shadow-[0_0_16px_#00eaff] z-10 flex items-center justify-center"
                aria-hidden="true"
                style={{ left: '-61px' }}
              >
                <span className="block w-3 h-3 rounded-full bg-white/70"></span>
              </span>
              {/* 标题+日期 */}
              <div className="flex items-center gap-3 mb-1">
                <span className="text-cyan-300 text-xl sm:text-2xl font-bold tracking-wide leading-tight drop-shadow-[0_2px_8px_#00eaff]">
                  {post.title}
                </span>
                <span className="text-base text-cyan-100 font-light ml-2">
                  <ClientDateWrapper dateStr={post.date} />
                </span>
                <span className="ml-auto text-xs text-cyan-200 bg-cyan-900/30 px-3 py-1 rounded-full hidden sm:inline-block">
                  {post.dateEn}
                </span>
              </div>
              {/* 描述 */}
              <p className="mb-4 text-cyan-400 text-base">{post.description}</p>
              {/* 卡片 */}
              <Link
                href={`/zh/blog/${encodeURIComponent(post.slug)}`}
                className="group block rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-cyan-900/10 backdrop-blur-xl border border-cyan-400/20 shadow-lg hover:shadow-cyan-500/40 transition-shadow duration-300"
                style={{ minHeight: 160 }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-5 p-4">
                  {/* 封面 */}
                  <div className="md:w-1/2 w-full h-40 relative rounded-xl overflow-hidden shadow">
                    <Image
                      src={
                        post.cover ||
                        'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%9C%BA%E8%BD%A6_PixCake/DSC04445.jpg'
                      }
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
                      draggable={false}
                      priority
                    />
                    {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-white text-lg font-semibold bg-cyan-600/90 px-5 py-1 rounded-full tracking-wide shadow-[0_0_10px_#00eaff]">
                        《{post.title}》
                      </span>
                    </div> */}
                  </div>
                  {/* 信息 */}
                  <div className="md:w-1/2 w-full flex flex-col justify-center text-sm text-cyan-300">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="bg-cyan-800/60 text-cyan-300 px-3 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-cyan-400 mb-1">
                      {post.author} ·{' '}
                      {typeof post.readingTime === 'number'
                        ? `${post.readingTime} 分钟 · `
                        : ''}
                      {typeof post.content === 'string'
                        ? `${post.content.length} 字`
                        : ''}
                    </div>
                  </div>
                </div>
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </FuturisticHistoryBg>
  );
}
