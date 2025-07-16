'use client';

import React, { useEffect, useState } from 'react';

interface ViewCounterProps {
  slug: string;
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const recordAndFetchView = async () => {
      try {
        const res = await fetch('/api/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug }),
        });

        const data = await res.json();
        if (res.ok) {
          setCount(data.count);
        } else {
          console.error('API error', data.error);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    recordAndFetchView();
  }, [slug]);

  return (
    <p className="text-sm text-gray-400">
      👁️ 阅读量：{loading ? '加载中...' : count ?? '暂无数据'} 次
    </p>
  );
}
