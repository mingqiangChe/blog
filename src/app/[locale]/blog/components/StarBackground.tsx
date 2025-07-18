'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '../page.module.css';

const STAR_COUNT = 80;
const SHOOTING_STAR_INTERVAL = 7000; // 7秒一颗流星

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

  // 星星上下缓慢浮动动画
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

  // 流星动画触发
  useEffect(() => {
    const interval = setInterval(() => {
      if (!shootingStarRef.current) return;
      shootingStarRef.current.classList.remove(styles.animateShooting);
      void shootingStarRef.current.offsetWidth; // 触发重绘
      shootingStarRef.current.classList.add(styles.animateShooting);
    }, SHOOTING_STAR_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${styles.starBackground} pointer-events-none fixed inset-0 z-[-1] overflow-hidden`}
    >
      {/* 银河雾气 */}
      <div className={styles.galaxyFog} />

      {/* 静态星星 */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.star}
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
        className={`${styles.shootingStar} ${styles.shootingStarBase}`}
        style={{ top: '25%', left: '25%' }}
      />
    </div>
  );
}
