'use client';
import Image from 'next/image';

export function LogoVator() {
  return (
    <section className="flex items-center justify-center mt-4">
      <div className="cyber-glow-avatar">
        <Image
          src="/logo86.png"
          alt="AE86 Logo"
          width={106}
          height={106}
          className="object-cover"
        />
      </div>

      <style jsx>{`
        .cyber-glow-avatar {
          width: 106px;
          height: 106px;
          border-radius: 9999px;
          overflow: hidden;
          position: relative;
          border: 3px solid #ff0033;
          box-shadow: 0 0 12px #ff0033cc, 0 0 24px #ff0033aa,
            inset 0 0 10px rgba(255, 0, 51, 0.3);
          animation: pulseGlow 4s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 12px #ff0033cc, 0 0 24px #ff0033aa,
              inset 0 0 10px rgba(255, 0, 51, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 18px #ff3366, 0 0 30px #ff0033,
              inset 0 0 16px rgba(255, 0, 100, 0.4);
            transform: scale(1.05);
          }
          100% {
            box-shadow: 0 0 12px #ff0033cc, 0 0 24px #ff0033aa,
              inset 0 0 10px rgba(255, 0, 51, 0.3);
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
