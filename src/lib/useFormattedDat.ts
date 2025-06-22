// 创建客户端 Hook 处理日期格式化
'use client';

import { useState, useEffect } from 'react';

export function useFormattedDateZh(dateStr: string | undefined) {
  const [formatted, setFormatted] = useState<string | null>(null);

  useEffect(() => {
    if (dateStr) {
      const d = new Date(dateStr);
      setFormatted(
        `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
      );
    }
  }, [dateStr]);

  return formatted;
}

export function useFormattedDateEn(dateStr: string | undefined) {
  const [formatted, setFormatted] = useState<string | null>(null);

  useEffect(() => {
    if (dateStr) {
      const d = new Date(dateStr);
      setFormatted(
        d.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      );
    }
  }, [dateStr]);

  return formatted;
}
