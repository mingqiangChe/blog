'use client';

import React, { useEffect, useState } from 'react';

interface ViewCounterProps {
  slug: string;
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      console.warn('ViewCounter: slug is missing or empty');
      return;
    }

    const recordAndFetchView = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slugs: [slug] }),
        });

        const data = await res.json();
        console.log('ViewCounter API response:', data);

        if (res.ok && data.counts && typeof data.counts[slug] === 'number') {
          setCount(data.counts[slug]);
        } else {
          console.error('API error or missing count for slug:', slug);
          setCount(null);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setCount(null);
      } finally {
        setLoading(false);
      }
    };

    recordAndFetchView();
  }, [slug]);

  return (
    <p className="text-sm text-gray-400">
      👁️ 阅读量：{loading ? '加载中...' : count !== null ? count : 0} 次
    </p>
  );
}
