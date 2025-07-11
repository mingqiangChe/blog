'use client';

import React, { useEffect, useRef, useState } from 'react';

const STAR_COUNT = 80;
const SHOOTING_STAR_INTERVAL = 7000; // 每 7 秒出现一颗流星

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface Star {
  id: number;
  size: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  velocity: number;
}

export default function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const shootingStarRef = useRef<HTMLDivElement | null>(null);

  // 初始化静态星星
  useEffect(() => {
    const initialStars = Array.from({ length: STAR_COUNT }).map((_, i) => ({
      id: i,
      size: getRandom(1, 2.5),
      top: getRandom(0, 100),
      left: getRandom(0, 100),
      duration: getRandom(4, 8),
      delay: getRandom(0, 10),
      velocity: getRandom(0.02, 0.05),
    }));
    setStars(initialStars);
  }, []);

  // 星星随页面缓慢移动（上下浮动）
  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setStars((prevStars) =>
        prevStars.map((star) => {
          let newTop = star.top + star.velocity;
          if (newTop > 100) newTop = 0;
          return { ...star, top: newTop };
        })
      );
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // 控制流星出现
  useEffect(() => {
    const interval = setInterval(() => {
      if (!shootingStarRef.current) return;
      shootingStarRef.current.classList.remove('animate-shooting');
      void shootingStarRef.current.offsetWidth; // 触发重绘
      shootingStarRef.current.classList.add('animate-shooting');
    }, SHOOTING_STAR_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      {/* 银河雾气 */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-transparent to-indigo-900/20 blur-3xl opacity-40" />

      {/* 星星们 */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white opacity-40 animate-flicker"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* 流星 */}
      <div
        ref={shootingStarRef}
        className="absolute top-1/4 left-1/4 w-[150px] h-[2px] bg-white opacity-60 rotate-[-30deg] pointer-events-none"
      />
    </div>
  );
}
