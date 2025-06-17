'use client';
import React, { useState, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import styles from './page.module.css';
import { photos, Photo } from './photo';
import LazyImageCard from './components/LazyImageCard';
import dynamic from 'next/dynamic';

const ClientLightbox = dynamic(() => import('./components/ClientLightbox'), {
  ssr: false,
});

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const PhotoGallery: React.FC = () => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [selectedTip, setSelectedTip] = useState<string>('全部');

  // 提取唯一标签，包含“全部”选项
  const uniqueTips = useMemo(() => {
    const tipsSet = new Set(photos.map((p) => p.tip));
    return ['全部', ...Array.from(tipsSet)];
  }, []);

  // 根据选中标签过滤照片
  const filteredPhotos = useMemo(() => {
    if (selectedTip === '全部') return photos;
    return photos.filter((p) => p.tip === selectedTip);
  }, [selectedTip]);

  const handlePrev = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx(
      (lightboxIdx + filteredPhotos.length - 1) % filteredPhotos.length
    );
  };

  const handleNext = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % filteredPhotos.length);
  };

  return (
    <div className={styles['page-bg']}>
      {/* 标签栏 */}
      <div
        style={{
          padding: '0 24px 24px',
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        {uniqueTips.map((tip) => (
          <button
            key={tip}
            onClick={() => setSelectedTip(tip)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border:
                selectedTip === tip ? '2px solid #0070f3' : '1px solid #ccc',
              background: selectedTip === tip ? '#0070f3' : '#f0f0f0',
              color: selectedTip === tip ? '#fff' : '#333',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {tip}
          </button>
        ))}
      </div>

      {/* 瀑布流图片 */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles['masonry-grid']}
        columnClassName={styles['masonry-grid_column']}
      >
        {filteredPhotos.map((photo, idx) => (
          <LazyImageCard
            key={photo.url}
            photo={photo}
            onClick={() => setLightboxIdx(idx)}
          />
        ))}
      </Masonry>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <ClientLightbox
          photos={filteredPhotos}
          currentIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default PhotoGallery;
