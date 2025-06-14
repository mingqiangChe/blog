// 进度条 监听滚动条滚动距离 渲染长度 100vh=100vw
'use client';
import { useState, useEffect } from 'react';

export default function ProgressBar() {
  const [widthVW, setWidthVW] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollable = docHeight - winHeight;

      const scrollRatio = scrollable > 0 ? scrollTop / scrollable : 0;
      const width = Math.min(scrollRatio * 100, 100); // 最大不超过100vw
      setWidthVW(width);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        backgroundColor: '#3762e3',
        width: `${widthVW}vw`,
        transition: 'width 0.05s linear',
        zIndex: 9999,
      }}
    />
  );
}
