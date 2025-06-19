// FuturisticHistoryBg.tsx
import React from 'react';

export default function FuturisticHistoryBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f4f6fb]">
      {/* 历史感：淡雅纸张渐变 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 60% 20%, #e9e7e1 60%, #f4f6fb 100%)',
          opacity: 0.85,
        }}
      />
      {/* 未来感：蓝紫色发光线条+数字流 */}
      <svg
        className="absolute left-0 top-0 z-10"
        width="100%"
        height="100%"
        style={{ pointerEvents: 'none' }}
      >
        {/* 未来感线条 */}
        <linearGradient id="futuristicLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7f9cf5" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <line
          x1="5%"
          y1="5%"
          x2="5%"
          y2="95%"
          stroke="url(#futuristicLine)"
          strokeWidth="4"
          opacity="0.18"
        />
        <line
          x1="97%"
          y1="0%"
          x2="97%"
          y2="100%"
          stroke="url(#futuristicLine)"
          strokeWidth="2"
          opacity="0.07"
        />
        {/* 未来感数字流 */}
        <text
          x="50%"
          y="90%"
          textAnchor="middle"
          fontSize="32"
          fill="#a5b4fc"
          opacity="0.06"
          style={{ letterSpacing: 12, fontFamily: 'monospace' }}
        >
          2025 2016 2020 1999 2049
        </text>
      </svg>
      {/* 历史感：颗粒/柔光 */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{
        background: 'radial-gradient(circle at 60% 60%, #fff6 0%, #fff0 60%)',
        mixBlendMode: 'soft-light',
        opacity: 0.7,
      }} />
      {/* 未来感：蓝色发光边框 */}
      <div className="absolute inset-0 z-30 pointer-events-none border-2 border-blue-200 rounded-3xl"
        style={{
          boxShadow: '0 0 60px 8px #a5b4fc66, 0 0 0 2px #818cf866',
          opacity: 0.12,
        }}
      />
      {/* 页面内容 */}
      <div className="relative z-50">{children}</div>
    </div>
  );
}
