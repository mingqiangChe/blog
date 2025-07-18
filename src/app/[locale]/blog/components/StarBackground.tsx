'use client';

import React, { useEffect, useState } from 'react';
import styles from '../page.module.css'; // 假设样式名为ae86.module.css

const STAR_COUNT = 80;
const SHOOTING_STAR_INTERVAL = 7000;

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
  const [shootingActive, setShootingActive] = useState(false);

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

  // 星星上下缓慢移动动画
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

  // 流星周期动画
  useEffect(() => {
    const interval = setInterval(() => {
      setShootingActive(true);
      setTimeout(() => setShootingActive(false), 1500);
    }, SHOOTING_STAR_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.starBackground}>
      <div className={styles.galaxyFog} />
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
      <div
        className={`${styles.shootingStarBase} ${
          shootingActive ? styles.animateShooting : ''
        }`}
      />
    </div>
  );
}
