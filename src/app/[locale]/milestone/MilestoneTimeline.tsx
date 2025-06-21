import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/markdown';
import FuturisticHistoryBg from './components/FuturisticHistoryBg';

function formatDateZh(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}
function formatDateEn(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function MilestoneTimeline() {
  // 只展示 isMilestone 的文章
  const posts = getAllPosts('zh').filter((post) => post.isMilestone !== false);

  if (!posts.length) {
    return (
      <div className="text-center text-gray-500 py-20">暂无里程碑数据</div>
    );
  }

  return (
    <FuturisticHistoryBg>
      <div className="min-h-screen py-12 px-4 pt-24">
        <div className="max-w-3xl mx-auto">
          {posts.map((post) => (
            <section key={post.slug} className="relative mb-16">
              {/* 时间线 */}
              <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-6 mb-2"></div>
                <div className="flex-1 w-1 bg-gradient-to-b from-blue-400 to-transparent"></div>
              </div>
              {/* 标题和描述 */}
              <h2 className="ml-12 text-2xl font-bold text-gray-700 mb-2">
                {post.title}
              </h2>
              <div className="ml-12 text-gray-500 text-base mb-4 flex items-center">
                {formatDateZh(post.date)}，{post.description}
                <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {formatDateEn(post.date)}
                </span>
              </div>
              {/* 卡片（Link包裹） */}
              <Link
                href={`/zh/blog/${encodeURIComponent(post.slug)}`}
                className="group ml-12 block relative rounded-3xl overflow-hidden bg-white/90 backdrop-blur-lg border border-cyan-300/30 shadow-lg hover:shadow-cyan-500/50 cursor-pointer transition-all duration-300"
                style={{ width: '100%', minHeight: 200 }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* 封面 */}
                  <div className="md:w-1/2 w-full">
                    <div className="relative h-40 w-full rounded-xl overflow-hidden">
                      <Image
                        src={
                          post.cover ||
                          'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%9C%BA%E8%BD%A6_PixCake/DSC04445.jpg'
                        }
                        alt={post.title}
                        fill
                        className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75 group-hover:blur-sm"
                        draggable={false}
                        priority
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold bg-blue-600/80 px-4 py-1 rounded-full">
                          《{post.title}》
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 信息浮现层 */}
                  <div className="md:w-1/2 w-full flex flex-col justify-center py-4 px-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-400 mb-1">
                      {post.author} · {formatDateEn(post.date)} · {post.author}{' '}
                      · {formatDateEn(post.date)} ·
                      {typeof post.readingTime === 'number'
                        ? `${post.readingTime}分钟 · `
                        : ''}
                      {typeof post.content === 'string'
                        ? `${post.content.length}字`
                        : ''}
                    </div>
                    {/* 内容超出自动隐藏 */}
                    {/* <div className="text-gray-700 text-sm line-clamp-2">{post.content}</div> */}
                  </div>
                </div>
                {/* 发光边框 */}
                <span className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-cyan-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </section>
          ))}
        </div>
      </div>
    </FuturisticHistoryBg>
  );
}
