'use client';
import ParticleCanvas from './ParticleCanvas';

export default function FuturisticHistoryBg({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a1a2b] via-[#112240] to-[#0f1e3a]">
      {/* 复古纸张质感渐变 */}
      <section
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 60% 20%, #2a2f3d 40%, #0f1e2a 100%)',
          opacity: 0.9,
          mixBlendMode: 'multiply',
        }}
      />
      {/* 未来感发光线条和数字流 */}
      <svg
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id="futuristicLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00eaff" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <pattern
            id="textPattern"
            patternUnits="userSpaceOnUse"
            width="300"
            height="40"
            patternTransform="translate(0,0)"
          >
            <text
              x="0"
              y="30"
              fill="#a5b4fc"
              fontSize="40"
              fontFamily="monospace"
              opacity="0.25"
              letterSpacing="18"
            >
              2025 2016 2020 1999 2049
            </text>
          </pattern>
        </defs>

        <line
          x1="10%"
          y1="10%"
          x2="10%"
          y2="90%"
          stroke="url(#futuristicLine)"
          strokeWidth="8"
          opacity="0.6"
          className="animate-lineGlow"
        />
        <line
          x1="95%"
          y1="0%"
          x2="95%"
          y2="100%"
          stroke="url(#futuristicLine)"
          strokeWidth="4"
          opacity="0.35"
          className="animate-lineGlow delay-2000"
        />

        <circle
          cx="85%"
          cy="15%"
          r="70"
          stroke="#00eaff"
          strokeWidth="5"
          fill="none"
          opacity="0.25"
          className="animate-spin-slow"
        />

        <rect
          x="0"
          y="94%"
          width="100%"
          height="40"
          fill="url(#textPattern)"
          className="animate-textFlow"
        />
      </svg>

      {/* 柔光颗粒 */}
      <section
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 60% 60%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)',
          mixBlendMode: 'screen',
          opacity: 0.85,
        }}
      />

      {/* 未来感发光角标，带浮动动画 */}
      <section className="absolute left-0 top-0 w-40 h-40 rounded-full bg-cyan-400/50 blur-3xl opacity-90 z-30 animate-float" />
      <section className="absolute right-0 bottom-0 w-60 h-60 rounded-full bg-purple-400/40 blur-3xl opacity-80 z-30 animate-float delay-1000" />

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
            stroke-opacity: 0.6;
            filter: drop-shadow(0 0 10px #00eaff);
          }
          50% {
            stroke-opacity: 1;
            filter: drop-shadow(0 0 20px #00eaff);
          }
        }
        .animate-lineGlow {
          animation: lineGlow 4s ease-in-out infinite;
        }
        .delay-2000 {
          animation-delay: 2s;
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
          animation: spinSlow 120s linear infinite;
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
          animation: textFlow 12s linear infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
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
