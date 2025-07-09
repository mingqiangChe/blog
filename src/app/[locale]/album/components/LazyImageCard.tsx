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

      const isMobile = window.innerWidth <= 768;
      let drawWidth = containerWidth;
      let drawHeight = drawWidth / imgRatio;

      if (isMobile && imgRatio > 1) {
        drawWidth = containerWidth;
        drawHeight = drawWidth / imgRatio;
      } else {
        drawWidth = containerWidth;
        drawHeight = drawWidth / imgRatio;
      }

      // 设置 canvas 像素尺寸（高分屏）
      canvas.width = drawWidth * dpr;
      canvas.height = drawHeight * dpr;

      // 设置 canvas 样式尺寸（布局用）
      canvas.style.width = `${drawWidth}px`;
      canvas.style.height = `${drawHeight}px`;
      canvas.style.minHeight = `${drawHeight}px`;

      // ✅ 防止 CLS 抖动：aspect-ratio 保留原图比例
      canvas.style.aspectRatio = `${img.width} / ${img.height}`;

      // 清空并绘制
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 不再 ctx.scale，直接使用目标绘制区域处理高分屏
      ctx.drawImage(
        img,
        0,
        0, // 源图位置
        img.width,
        img.height, // 源图尺寸
        0,
        0, // canvas 起点
        canvas.width,
        canvas.height // 目标尺寸（物理像素）
      );
    };

    // ✅ 加载失败 fallback
    img.onerror = () => {
      ctx.fillStyle = '#ccc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#666';
      ctx.fillText('加载失败', 10, 30);
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
