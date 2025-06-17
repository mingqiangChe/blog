'use client';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../page.module.css';
import type { Photo } from '../photo';

interface LazyImageCardProps {
  photo: Photo;
  onClick: () => void;
}

const LazyImageCard: React.FC<LazyImageCardProps> = ({ photo, onClick }) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '100px' });

  return (
    <div
      ref={ref}
      className={styles.card}
      onClick={onClick}
      tabIndex={0}
      aria-label={photo.desc}
      role="button"
      style={{ position: 'relative' }} // 确保标签定位正确
    >
      {/* 标签显示在图片最上方 */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: '#fff',
          padding: '2px 8px',
          borderRadius: 12,
          fontSize: 12,
          fontWeight: 'bold',
          zIndex: 10,
          userSelect: 'none',
          pointerEvents: 'none', // 标签不响应鼠标事件，避免阻挡点击
        }}
      >
        {photo.tip}
      </div>

      {inView ? (
        <img
          src={photo.url}
          alt={photo.desc}
          className={styles['card-img']}
          loading="lazy"
        />
      ) : (
        <div style={{ height: 180, background: '#eee' }} />
      )}
      <div className={styles['card-desc']}>{photo.desc}</div>
    </div>
  );
};

export default LazyImageCard;
