'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface ViewCounterProps {
  slug: string;
}

// 初始化 Supabase 客户端
const supabase = createClient(
  'https://fusrmsbzfmnicfsbyjzd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1c3Jtc2J6Zm1uaWNmc2J5anpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTgwNDgsImV4cCI6MjA2ODIzNDA0OH0.xtmEdoPwsT_O8WqNnpvg-eHNst33O-ncc3B4rJ8MqUA'
);

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const recordView = async () => {
      setLoading(true);
      try {
        // upsert 插入或忽略
        await supabase
          .from('views')
          .upsert({ slug, count: 1 }, { onConflict: 'slug' });

        // 调用数据库RPC自增
        await supabase.rpc('increment_view_count', { slug_param: slug });

        // 查询最新计数
        const { data, error } = await supabase
          .from('views')
          .select('count')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (data) setCount(data.count);
      } catch (error) {
        console.error('ViewCounter error:', error);
      } finally {
        setLoading(false);
      }
    };

    recordView();
  }, [slug]);

  return (
    <p className="text-sm text-gray-400">
      👁️ 阅读量：{loading ? '加载中...' : count ?? '暂无数据'} 次
    </p>
  );
}
