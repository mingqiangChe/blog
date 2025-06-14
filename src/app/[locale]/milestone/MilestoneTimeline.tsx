// MilestonePage.tsx
import React from 'react';

const milestonesData = [
  {
    section: '阿里云',
    items: [
      {
        dateEn: 'Oct 9, 2024',
        dateCn: '2024 年 10 月 9 日',
        title:
          'Hugo 部署至阿里云 边缘安全加速 ESA Edge Security Acceleration。',
        description: `2024 年 10 月 9 日，Hugo 部署至阿里云边缘安全加速（ESA），提升访问速度和安全性。`,
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      },
    ],
  },
  {
    section: 'Shiki',
    items: [
      {
        dateEn: 'Aug 15, 2024',
        dateCn: '2024 年 8 月 15 日',
        title: '切换代码高亮工具为 Shiki',
        description: (
          <>
            经过 2 个月测试后，把博客的代码语法高亮器切换到 <code>Shiki</code>。
            细节可参考文章：在 Hugo 中使用 Shiki·1050 字·3 分钟代码。 Shiki
            是基于 VS Code
            语法高亮引擎的工具，支持多种编程语言和主题，无需维护自定义正则表达式或
            CSS。
          </>
        ),
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      },
    ],
  },
  {
    section: '火山引擎',
    items: [
      {
        dateEn: 'Jul 20, 2024',
        dateCn: '2024 年 7 月 20 日',
        title: '博客 www 子域名解析到火山引擎实现分区解析',
        description: `国内解析到阿里云 OSS 和 CDN，国外解析到 Cloudflare Pages，分担 CDN 流量压力。`,
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      },
    ],
  },
];

export default function MilestonePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-6">
      <div className="max-w-5xl mx-auto bg-slate-800/70 backdrop-blur-md rounded-2xl p-10 shadow-2xl border border-slate-700/50">
        <h1 className="text-5xl font-extrabold text-white mb-16 text-center tracking-wide">
          里程碑
        </h1>

        {milestonesData.map(({ section, items }) => (
          <section key={section} className="mb-20">
            <h2 className="text-3xl font-semibold text-blue-400 border-b border-blue-600 pb-3 mb-12 tracking-wide">
              {section}
            </h2>

            <div className="relative border-l-4 border-blue-600 pl-12 space-y-16">
              {items.map(
                ({ dateEn, dateCn, title, description, image }, idx) => (
                  <article
                    key={idx}
                    className="relative flex flex-col md:flex-row md:items-start md:space-x-10"
                  >
                    {/* 时间点圆 */}
                    <span className="absolute -left-7 top-2 w-6 h-6 bg-blue-500 rounded-full border-4 border-slate-800 shadow-lg"></span>

                    {/* 日期 */}
                    <time className="text-blue-300 font-semibold w-40 flex-shrink-0 mb-6 md:mb-0 md:text-right select-none">
                      <div className="text-lg">{dateEn}</div>
                      <div className="text-sm text-slate-400">{dateCn}</div>
                    </time>

                    {/* 内容 */}
                    <div className="flex-1 bg-slate-700 rounded-xl p-6 shadow-lg hover:shadow-blue-500/40 transition-shadow duration-300">
                      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                        {title}
                      </h3>
                      <p className="text-slate-300 mb-6 prose prose-invert max-w-none">
                        {description}
                      </p>

                      {image && (
                        <img
                          src={image}
                          alt={title}
                          className="rounded-lg border border-slate-600 shadow-md max-w-full h-auto object-contain"
                        />
                      )}
                    </div>
                  </article>
                )
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
