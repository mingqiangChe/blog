'use client';
import React, { useState, useEffect } from 'react';
import MilestoneTimelineSkeleton from './MilestoneTimelineSkeleton';
import MilestoneTimelineContent from './MilestoneTimelineContent';

export default function MilestoneTimelineClient({
  initialPosts,
}: {
  initialPosts: any[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(false);

  // 如果需要客户端动态加载数据，可以用 useEffect
  // 这里示例不再加载，直接用传入的初始数据

  if (isLoading) {
    return <MilestoneTimelineSkeleton />;
  }

  if (!posts.length) {
    return (
      <section className="text-center text-gray-400 py-20">
        暂无里程碑数据
      </section>
    );
  }

  return <MilestoneTimelineContent posts={posts} />;
}
