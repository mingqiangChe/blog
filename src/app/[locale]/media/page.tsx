'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import VideoBackground from './components/Videobg';
import { items } from './media';

const categories = ['全部', '电影', '电视剧', '书籍'];

export default function BookMovieGallery() {
  const [filter, setFilter] = useState('全部');
  const filtered =
    filter === '全部' ? items : items.filter((item) => item.type === filter);

  return (
    <section className="relative z-10 bg-white min-h-screen flex flex-col items-center py-20 px-6">
      {/* 背景视频 */}
      <VideoBackground
        videoSrc="https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/mov_1750092393646.mov"
        opacity={0.25}
      />

      {/* 顶部标题和描述 */}
      <div className="max-w-4xl text-center mb-12 z-10 relative">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-wide">
          书影音精选
        </h1>
        <p className="text-gray-700 text-lg font-light max-w-3xl mx-auto leading-relaxed">
          读一本书，观一部电影，追一部剧，体验别人的人生故事。这里是我的精选书影音合集，带你感受墨水与光影交织的未来感。
        </p>
      </div>

      {/* 分类切换按钮 */}
      <div className="flex flex-wrap justify-center gap-4 mb-16 z-10 relative">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`
                            px-6 py-2 rounded-full font-semibold cursor-pointer
                            bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg
                            transition-transform duration-300
                            ${
                              filter === cat
                                ? 'scale-110 ring-4 ring-cyan-400 shadow-cyan-400'
                                : 'opacity-80 hover:opacity-100 hover:scale-105'
                            }
                            select-none
                            backdrop-blur-sm
                        `}
            style={{
              letterSpacing: '0.08em',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 卡片网格，遍历filtered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl w-full z-10 relative">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/blog/${encodeURIComponent(item.href)}`}
            className="group relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-lg border border-cyan-300/30 shadow-lg hover:shadow-cyan-500/50 cursor-pointer transition-all duration-300 flex flex-col justify-end"
            style={{ width: 220, height: 320 }}
          >
            {/* 封面 */}
            <img
              src={item.cover}
              alt={item.title}
              className="w-full object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75 group-hover:blur-sm"
              style={{ width: 220, height: 320 }}
              draggable={false}
            />
            {/* 信息浮现层 */}
            <div
              className="
                                absolute inset-0 flex flex-col justify-end
                                bg-gradient-to-t from-black/80 via-black/30 to-transparent
                                opacity-0 pointer-events-none
                                group-hover:opacity-100 group-hover:pointer-events-auto
                                transition-opacity duration-300 p-5
                                text-cyan-100 font-sans select-none
                            "
            >
              <h3 className="text-xl font-bold mb-1 tracking-wide drop-shadow-lg">
                {item.title}
              </h3>
              <div className="text-sm mb-2 opacity-80">
                {item.type} · {item.year}
              </div>
              <p className="text-sm line-clamp-3">{item.desc}</p>
              <div className="flex flex-wrap gap-2 mt-3 items-center">
                {item.rating && (
                  <span className="text-yellow-400 font-semibold text-sm drop-shadow-lg">
                    ★ {item.rating.valueOf()}
                  </span>
                )}
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-cyan-900/70 rounded-full px-3 py-1 text-xs font-medium tracking-wider drop-shadow-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* 发光边框 */}
            <span className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-cyan-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
