import React from 'react';
import FuturisticHistoryBg from './FuturisticHistoryBg';

export default function MilestoneTimelineSkeleton() {
  return (
    <FuturisticHistoryBg>
      <section className="min-h-screen py-12 px-4 pt-24 max-w-3xl mx-auto text-gray-300">
        {Array.from({ length: 3 }).map((_, idx) => (
          <section key={idx} className="relative mb-16 animate-pulse">
            {/* 时间线骨架 */}
            <section className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center">
              <section className="w-2 h-2 bg-blue-400 rounded-full mb-2"></section>
              <section className="flex-1 w-1 bg-gradient-to-b from-blue-400 to-transparent"></section>
            </section>
            {/* 标题骨架 */}
            <section className="ml-12 h-8 w-3/5 bg-blue-400 rounded mb-2"></section>
            {/* 描述骨架 */}
            <section className="ml-12 h-5 w-4/5 bg-blue-300 rounded mb-4"></section>
            {/* 卡片骨架 */}
            <section
              className="group ml-12 block relative rounded-3xl overflow-hidden bg-white/20 backdrop-blur-lg border border-cyan-300/30 shadow-lg"
              style={{ width: '100%', minHeight: 200 }}
            >
              <section className="flex flex-col md:flex-row md:items-center gap-6 p-4">
                {/* 封面骨架 */}
                <section className="md:w-1/2 w-full h-40 rounded-xl bg-blue-400/40"></section>
                {/* 信息骨架 */}
                <section className="md:w-1/2 w-full flex flex-col justify-center py-4 px-2 space-y-3">
                  <section className="h-6 bg-blue-400 rounded w-3/4"></section>
                  <section className="h-4 bg-blue-300 rounded w-1/2"></section>
                  <section className="flex gap-2">
                    <section className="h-5 bg-blue-300 rounded w-12"></section>
                    <section className="h-5 bg-blue-300 rounded w-16"></section>
                    <section className="h-5 bg-blue-300 rounded w-10"></section>
                  </section>
                </section>
              </section>
            </section>
          </section>
        ))}
      </section>
    </FuturisticHistoryBg>
  );
}
