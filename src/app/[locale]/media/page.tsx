'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import VideoBackground from './components/VideoBackground';
import { items } from './media';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const categories = ['全部', '电影', '电视剧', '书籍'];

export default function BookMovieGallery() {
  const t = useTranslations('media');
  const [filter, setFilter] = useState('全部');
  const filtered =
    filter === '全部' ? items : items.filter((item) => item.type === filter);

  function LazyImage({
    src,
    alt,
    className,
    style,
  }: {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
  }) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading="lazy"
        draggable={false}
      />
    );
  }

  return (
    <section className="relative z-10 bg-[#0d0d0f] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen flex flex-col items-center py-20 px-6 overflow-hidden">
      {/* 背景视频 */}
      <VideoBackground
        videoSrc="https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/6876868767656757.mp4"
        posterSrc="https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/Snipaste_2025-06-24_00-27-19.png"
        opacity={1}
      />

      {/* 顶部标题和描述 */}
      <section className="max-w-4xl text-center mb-12 z-10 relative mx-auto">
        <section className="inline-block px-8 py-8 rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-2xl">
          <h1
            className="text-5xl font-extrabold text-white mb-4 tracking-wide drop-shadow-[0_0_10px_#00fff7] neontext"
            style={{
              textShadow: '0 0 8px #00fff7, 0 0 16px #00fff7',
              fontFamily: 'Racing Sans One, sans-serif',
            }}
          >
            {t('title')}
          </h1>
          <p className="text-gray-700 dark:text-gray-200 text-lg font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {t('dec')}
          </p>
        </section>
      </section>

      {/* 分类按钮 */}
      <section className="flex flex-wrap justify-center gap-4 mb-16 z-10 relative">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`
              px-6 py-2 rounded-full font-semibold cursor-pointer transition-all duration-300
              bg-gradient-to-r from-[#00c9ff] to-[#92fe9d] text-gray-900 dark:text-white
              shadow-[0_0_10px_rgba(0,255,255,0.4)] ring-2 ring-cyan-300/20
              ${
                filter === cat
                  ? 'scale-110 ring-4 ring-cyan-300'
                  : 'hover:scale-105 opacity-90'
              }
            `}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.08em',
            }}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* 卡片网格（加入 motion.div 包裹每个卡片） */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl w-full z-10 relative">
        {filtered.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: index * 0.05,
            }}
          >
            <Link
              href={`/blog/${encodeURIComponent(item.href)}`}
              className="group relative rounded-3xl overflow-hidden 
                bg-gradient-to-br from-[#111] via-[#1e293b]/40 to-[#0f172a]/60
                backdrop-blur-lg border border-cyan-400/30 shadow-lg 
                hover:shadow-[0_0_20px_#00fff7] transition-all duration-300 
                flex flex-col justify-end transform hover:scale-[1.02]"
              style={{ width: 220, height: 320 }}
            >
              {/* 封面图 */}
              <LazyImage
                src={item.cover}
                alt={item.title}
                className="w-full h-full object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
              />

              {/* 信息浮层 */}
              <section
                className="absolute inset-0 flex flex-col justify-end
                bg-gradient-to-t from-black/80 via-black/30 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5
                text-cyan-100 font-mono"
              >
                <h1 className="text-xl font-bold mb-1 tracking-wide drop-shadow-lg">
                  {item.title}
                </h1>
                <section className="text-sm mb-2 opacity-80">
                  {item.type} · {item.year}
                </section>
                <p className="text-sm line-clamp-3">{item.desc}</p>
                <section className="flex flex-wrap gap-2 mt-3 items-center">
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
                </section>
              </section>

              {/* 发光边框 */}
              <span className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-cyan-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </motion.div>
        ))}
      </section>
    </section>
  );
}
