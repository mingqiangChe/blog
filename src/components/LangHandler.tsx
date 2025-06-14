// components/LangHandler.tsx
'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function LangHandler() {
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    if (locale && typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', locale);
    }
  }, [locale]);

  return null;
}
