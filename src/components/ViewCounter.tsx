'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface ViewCounterProps {
  slug: string;
}

// 初始化 Supabase 客户端，替换成你自己的项目地址和匿名key
const supabase = createClient(
  'https://fusrmsbzfmnicfsbyjzd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1c3Jtc2J6Zm1uaWNmc2J5anpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTgwNDgsImV4cCI6MjA2ODIzNDA0OH0.xtmEdoPwsT_O8WqNnpvg-eHNst33O-ncc3B4rJ8MqUA'
);

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;

    // 统计阅读量逻辑
    const recordView = async () => {
      try {
        // 1. 插入记录或忽略（不报错）
        await supabase
          .from('views')
          .upsert({ slug, count: 1 }, { onConflict: 'slug' });

        // 2. 通过 RPC 自定义函数增加 count
        await supabase.rpc('increment_view_count', { slug_param: slug });

        // 3. 读取最新的阅读量
        const { data, error } = await supabase
          .from('views')
          .select('count')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (data) setCount(data.count);
      } catch (error) {
        console.error('ViewCounter error:', error);
      }
    };

    recordView();
  }, [slug]);

  return (
    <p className="text-sm text-gray-400">
      👁️ 阅读量：{count !== null ? count : '加载中...'} 次
    </p>
  );
}
