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
    img.crossOrigin = 'anonymous'; // 需要 OSS 支持跨域
    img.src = photo.url;

    img.onload = () => {
      const maxWidth = 300;
      const ratio = img.height / img.width;
      const width = Math.min(img.width, maxWidth);
      const height = width * ratio;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      // 可选：添加半透明水印
      ctx.font = '16px sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText(photo.tip || '', 10, 20);
    };
  }, [inView, photo.url, photo.tip]);

  return (
    <section
      ref={ref}
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
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
