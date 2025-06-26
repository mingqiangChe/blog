// src/components/HomeSkeleton.tsx
import React from 'react';

export default function HomeSkeleton() {
  return (
    <main className="home-bg min-h-screen bg-no-repeat bg-top overflow-x-hidden pt-24">
      {/* 头像骨架 */}
      <section className="flex items-center justify-center">
        <section className="rounded-full bg-gray-300 animate-pulse w-24 h-24" />
      </section>
      {/* 标题骨架 */}
      <section className="h-8 w-48 bg-gray-300 rounded mx-auto mt-8 animate-pulse" />
      {/* 日历骨架 */}
      <section className="flex items-center justify-center pt-32">
        <section className="w-96 h-32 bg-gray-200 rounded-lg animate-pulse" />
      </section>
      {/* 最近文章骨架 */}
      <section className="flex items-center justify-center pt-32 pb-32">
        <section className="space-y-4 w-full max-w-2xl">
          {Array.from({ length: 3 }).map((_, i) => (
            <section
              key={i}
              className="h-16 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </section>
      </section>
    </main>
  );
}
