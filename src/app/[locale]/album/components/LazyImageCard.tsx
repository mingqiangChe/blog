'use client';

import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../page.module.css';
import type { Photo } from '../photo';

interface Props {
  photo: Photo;
  onClick: () => void;
}

export default function LazyImageCard({ photo, onClick }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px' });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!inView || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = photo.url;

    img.onload = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;

      const dpr = window.devicePixelRatio || 1;

      // 图片宽高比
      const imgRatio = img.width / img.height;

      // 判断移动端（屏幕宽度小于768）且是横图，做特殊处理
      const isMobile = window.innerWidth <= 768;
      let drawWidth = containerWidth;
      let drawHeight = drawWidth / imgRatio;

      if (isMobile && imgRatio > 1) {
        // 移动端且横图，限制宽度为containerWidth，确保完整显示
        // 高度自适应，防止被裁剪
        drawWidth = containerWidth;
        drawHeight = drawWidth / imgRatio;
      } else {
        // 其他情况，按container宽度等比缩放
        drawWidth = containerWidth;
        drawHeight = drawWidth / imgRatio;
      }

      // 设置canvas尺寸（像素尺寸）
      canvas.width = drawWidth * dpr;
      canvas.height = drawHeight * dpr;

      // 设置canvas显示尺寸（css尺寸）
      canvas.style.width = `${drawWidth}px`;
      canvas.style.height = `${drawHeight}px`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
    };
  }, [inView, photo.url, photo.tip]);

  return (
    <section
      ref={ref}
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ width: '100%', height: 'auto' }} // 让父元素宽度撑满，自动撑开高度
    >
      <section className={styles['card-tip']}>{photo.tip}</section>
      {inView ? (
        <canvas ref={canvasRef} className={styles['card-img']} />
      ) : (
        <section style={{ height: 180, background: '#eee' }} />
      )}
      <section className={styles['card-desc']}>{photo.desc}</section>
    </section>
  );
}
