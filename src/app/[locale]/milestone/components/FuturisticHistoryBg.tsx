// FuturisticHistoryBg.tsx
export default function FuturisticHistoryBg({ children }: { children: React.ReactNode }) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* 历史感纸张渐变 */}
        <div className="absolute inset-0 z-0" style={{
          background: 'radial-gradient(ellipse at 60% 20%, #f5e9d7 60%, #e9e7e1 100%)',
          opacity: 1,
        }} />
        {/* 未来感：发光线条+数字流 */}
        <svg className="absolute inset-0 z-10 w-full h-full pointer-events-none" width="100%" height="100%">
          {/* 未来感线条 */}
          <linearGradient id="futuristicLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00eaff" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <line x1="10%" y1="10%" x2="10%" y2="90%" stroke="url(#futuristicLine)" strokeWidth="7" opacity="0.45" />
          <line x1="95%" y1="0%" x2="95%" y2="100%" stroke="url(#futuristicLine)" strokeWidth="3" opacity="0.25" />
          {/* 未来感圆环 */}
          <circle cx="85%" cy="15%" r="60" stroke="#00eaff" strokeWidth="4" fill="none" opacity="0.18" />
          {/* 历史年份数字流 */}
          <text x="50%" y="94%" textAnchor="middle" fontSize="40" fill="#a5b4fc" opacity="0.18"
            style={{ letterSpacing: 18, fontFamily: 'monospace' }}>
            2025 2016 2020 1999 2049
          </text>
        </svg>
        {/* 颗粒感/柔光 */}
        <div className="absolute inset-0 z-20 pointer-events-none" style={{
          background: 'radial-gradient(circle at 60% 60%, #fff8 0%, #fff0 60%)',
          mixBlendMode: 'soft-light',
          opacity: 0.9,
        }} />
        {/* 未来感发光角标 */}
        <div className="absolute left-0 top-0 w-32 h-32 rounded-full bg-cyan-400/30 blur-2xl opacity-70 z-30" />
        <div className="absolute right-0 bottom-0 w-52 h-52 rounded-full bg-purple-400/20 blur-2xl opacity-60 z-30" />
        {/* 内容区 */}
        <div className="relative z-50">{children}</div>
      </div>
    );
  }
  