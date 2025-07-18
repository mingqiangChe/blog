'use client';
import ParticleCanvas from './ParticleCanvas';

export default function AE86HistoryBg({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-700 to-gray-300">
      {/* 复古纸张质感，黑白渐变叠加 */}
      <section
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 60% 20%, #1a1a1a 40%, #f0f0f0 95%)',
          opacity: 0.85,
          mixBlendMode: 'multiply',
        }}
      />
      {/* AE86风赛道条纹线条 */}
      <svg
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id="ae86Line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="50%" stopColor="#f00" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <pattern
            id="ae86TextPattern"
            patternUnits="userSpaceOnUse"
            width="300"
            height="40"
            patternTransform="translate(0,0)"
          >
            <text
              x="0"
              y="30"
              fill="#fff"
              fontSize="40"
              fontFamily="monospace"
              opacity="0.3"
              letterSpacing="18"
            >
              AE86 1983 2025 1999 2049
            </text>
          </pattern>
        </defs>

        {/* 粗线条，带红白渐变 */}
        <line
          x1="10%"
          y1="10%"
          x2="10%"
          y2="90%"
          stroke="url(#ae86Line)"
          strokeWidth="10"
          opacity="0.7"
          className="animate-lineGlow"
        />
        {/* 细线条，白色 */}
        <line
          x1="95%"
          y1="0%"
          x2="95%"
          y2="100%"
          stroke="#fff"
          strokeWidth="4"
          opacity="0.3"
          className="animate-lineGlow delay-2500"
        />

        {/* 旋转圆环，白色发光 */}
        <circle
          cx="85%"
          cy="15%"
          r="70"
          stroke="#fff"
          strokeWidth="5"
          fill="none"
          opacity="0.2"
          className="animate-spin-slow"
        />

        {/* 底部滚动数字改成AE86相关内容 */}
        <rect
          x="0"
          y="94%"
          width="100%"
          height="40"
          fill="url(#ae86TextPattern)"
          className="animate-textFlow"
        />
      </svg>

      {/* 柔光颗粒，冷白色 */}
      <section
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 60% 60%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)',
          mixBlendMode: 'screen',
          opacity: 0.8,
        }}
      />

      {/* 发光角标，改成红白双色 */}
      <section className="absolute left-0 top-0 w-40 h-40 rounded-full bg-red-600/60 blur-3xl opacity-90 z-30 animate-float" />
      <section className="absolute right-0 bottom-0 w-60 h-60 rounded-full bg-white/40 blur-3xl opacity-70 z-30 animate-float delay-1000" />

      {/* 细微动态粒子 */}
      <section className="absolute inset-0 z-25 pointer-events-none">
        <ParticleCanvas />
      </section>

      {/* 内容区 */}
      <section className="relative z-40">{children}</section>

      <style jsx>{`
        @keyframes lineGlow {
          0%,
          100% {
            stroke-opacity: 0.7;
            filter: drop-shadow(0 0 6px #fff);
          }
          50% {
            stroke-opacity: 1;
            filter: drop-shadow(0 0 14px #f00);
          }
        }
        .animate-lineGlow {
          animation: lineGlow 5s ease-in-out infinite;
        }
        .delay-2500 {
          animation-delay: 2.5s;
        }
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 150s linear infinite;
          transform-origin: 50% 50%;
        }
        @keyframes textFlow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-300px);
          }
        }
        .animate-textFlow {
          animation: textFlow 15s linear infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
