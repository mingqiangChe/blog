// MilestonePage.tsx
import React from 'react';

const milestonesData = [
  {
    section: '博客搭建',
    items: [
      {
        dateEn: 'June 15, 2025',
        dateCn: '2025 年 6 月 15 日',
        title: 'next搭建博客网站',
        description: (
          <>
            之前网站过于简陋
            且风格不是很好。突然看到别人网站很舒服，就想搞一个。他们都介绍模版，我这边是借助ai然后一步步搞出来。
          </>
        ),
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      },
    ],
  },
  {
    section: '前端开发',
    items: [
      {
        dateEn: 'June 1, 2020',
        dateCn: '2020 年 6 月 1 日',
        title: '前端开发',
        description: `成为一名前端开发工程师`,
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      },
    ],
  },
  {
    section: '计算机生',
    items: [
      {
        dateEn: 'September 1, 2017',
        dateCn: '2017 年 9 月 1 日',
        title: '理科生',
        description: `计算机理科生 在这一年选择专科计算机放弃本科艺体生`,
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      },
    ],
  },
  {
    section: '艺体生',
    items: [
      {
        dateEn: 'June 15, 2016',
        dateCn: '2016 年 6 月 15 日',
        title: '编导艺体生身份',
        description: `编导艺体生 在这一年选择`,
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
