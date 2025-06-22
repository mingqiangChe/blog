// ClientDate.tsx
'use client';
import { useFormattedDateZh, useFormattedDateEn } from '@/lib/useFormattedDat';

interface ClientDateProps {
  dateStr: string;
}

export default function ClientDate({ dateStr }: ClientDateProps) {
  const formattedDateZh = useFormattedDateZh(dateStr);
  const formattedDateEn = useFormattedDateEn(dateStr);

  return (
    <>
      <time suppressHydrationWarning>{formattedDateZh || '加载中...'}</time>
      <span className="ml-auto text-xs bg-cyan-700/30 px-3 py-1 rounded-full">
        {formattedDateEn || 'Loading...'}
      </span>
    </>
  );
}
