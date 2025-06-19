// MilestonePage.tsx
import React from 'react';
import Image from 'next/image';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black py-16 px-6 pt-36">
      <div className="max-w-5xl mx-auto bg-slate-900/40 backdrop-blur-lg rounded-3xl p-12 shadow-[0_0_30px_#4f46e5] border border-indigo-600/50">
        <h1 className="text-6xl font-extrabold text-indigo-400 mb-20 text-center tracking-widest drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">
          里程碑
        </h1>

        {milestonesData.map(({ section, items }) => (
          <section key={section} className="mb-24">
            <h2 className="text-4xl font-semibold text-indigo-400 border-b-4 border-indigo-600 pb-4 mb-16 tracking-wide drop-shadow-[0_0_8px_rgba(99,102,241,0.7)]">
              {section}
            </h2>

            <div className="relative border-l-4 border-gradient-to-b from-indigo-500 to-purple-600 pl-14 space-y-20">
              {items.map(({ dateEn, dateCn, title, description, image }, idx) => (
                <article
                  key={idx}
                  className="relative flex flex-col md:flex-row md:items-start md:space-x-12"
                >
                  {/* 时间点圆 */}
                  <span className="absolute -left-9 top-3 w-8 h-8 bg-gradient-to-tr from-indigo-400 to-purple-600 rounded-full border-4 border-black shadow-[0_0_15px_#7c3aed] animate-pulse"></span>

                  {/* 日期 */}
                  <time className="text-indigo-300 font-semibold w-44 flex-shrink-0 mb-8 md:mb-0 md:text-right select-none tracking-wide">
                    <div className="text-xl">{dateEn}</div>
                    <div className="text-sm text-indigo-500">{dateCn}</div>
                  </time>

                  {/* 内容 */}
                  <div className="flex-1 bg-black/40 backdrop-blur-md rounded-2xl p-8 shadow-[0_0_25px_#7c3aed] hover:shadow-[0_0_40px_#a78bfa] transition-shadow duration-500 cursor-pointer">
                    <h3 className="text-3xl font-bold text-indigo-300 mb-6 tracking-tight drop-shadow-[0_0_6px_rgba(139,92,246,0.9)]">
                      {title}
                    </h3>
                    <p className="text-indigo-200 mb-8 prose prose-indigo max-w-none">
                      {description}
                    </p>

                    {image && (
                      <Image
                        src={image}
                        alt={title}
                        width={800}
                        height={600}
                        className="rounded-xl border border-indigo-700 shadow-lg max-w-full h-auto object-contain"
                      />
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

