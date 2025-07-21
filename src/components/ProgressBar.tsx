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
      const width = Math.min(scrollRatio * 100, 100);
      setWidthVW(width);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        width: `${widthVW}vw`,
        background:
          'linear-gradient(90deg, var(--ae86-red), var(--ae86-white), var(--ae86-black))',
        boxShadow: '0 0 8px var(--ae86-glow)',
        transition: 'width 0.05s linear',
        zIndex: 9999,
      }}
    />
  );
}
