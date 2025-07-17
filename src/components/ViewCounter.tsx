'use client';

import React, { useEffect, useState } from 'react';

interface ViewCounterProps {
  slug: string;
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function updateAndFetchViews() {
      try {
        // 1. 调用增加接口
        const incRes = await fetch('/api/views/increment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug }),
        });

        if (!incRes.ok) {
          throw new Error(`增加浏览量失败，状态码: ${incRes.status}`);
        }

        const incData = await incRes.json();
        if (incData.error) {
          throw new Error(incData.error);
        }

        // 2. 调用查询接口查询最新浏览量
        const queryRes = await fetch('/api/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slugs: [slug] }),
        });

        if (!queryRes.ok) {
          throw new Error(`查询浏览量失败，状态码: ${queryRes.status}`);
        }

        const queryData = await queryRes.json();
        if (queryData.error) {
          throw new Error(queryData.error);
        }

        const count = queryData.counts?.[slug];
        setViews(typeof count === 'number' ? count : 0);
      } catch (err: any) {
        setError(err.message);
      }
    }

    updateAndFetchViews();
  }, [slug]);

  if (error) {
    return <div>浏览量: 0-0</div>;
  }

  return <div>浏览量：{views === null ? '加载中...' : views}</div>;
}
