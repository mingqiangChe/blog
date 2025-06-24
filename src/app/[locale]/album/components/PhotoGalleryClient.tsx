'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import styles from '../page.module.css';
import { photos, PHOTOS_PER_PAGE } from '../photo';
import LazyImageCard from './LazyImageCard';
import dynamic from 'next/dynamic';
import ScrollToTopButton from './ScrollToTopButton';
import { useInView } from 'react-intersection-observer';

const ClientLightbox = dynamic(() => import('./ClientLightbox'), {
  ssr: false,
});

const breakpointColumnsObj = { default: 3, 1100: 2, 700: 1 };

export default function PhotoGalleryClient() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [selectedTip, setSelectedTip] = useState<string>('全部');
  const [page, setPage] = useState(1);
  const { ref: loadMoreRef, inView } = useInView({ rootMargin: '200px' });

  const uniqueTips = useMemo(
    () => ['全部', ...Array.from(new Set(photos.map((p) => p.tip)))],
    []
  );

  const filtered = useMemo(
    () =>
      selectedTip === '全部'
        ? photos
        : photos.filter((p) => p.tip === selectedTip),
    [selectedTip]
  );

  const visible = useMemo(
    () => filtered.slice(0, page * PHOTOS_PER_PAGE),
    [filtered, page]
  );

  // 分页逻辑：滚动到底加载下一页
  useEffect(() => {
    if (inView && visible.length < filtered.length) {
      const timer = setTimeout(() => setPage((p) => p + 1), 300);
      return () => clearTimeout(timer);
    }
  }, [inView, visible.length, filtered.length]);

  // 标签切换时重置分页
  useEffect(() => {
    setPage(1);
  }, [selectedTip]);

  return (
    <div className={styles['page-bg']}>
      <div className="px-6 pb-6 flex gap-3 flex-wrap">
        {uniqueTips.map((tip) => (
          <button
            key={tip}
            onClick={() => setSelectedTip(tip)}
            className={`px-4 py-1 rounded-full font-semibold text-sm ${
              selectedTip === tip
                ? 'bg-blue-600 text-white border-2 border-blue-800'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tip}
          </button>
        ))}
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles['masonry-grid']}
        columnClassName={styles['masonry-grid_column']}
      >
        {visible.map((photo, idx) => (
          <LazyImageCard
            key={photo.url}
            photo={photo}
            onClick={() => setLightboxIdx(idx)}
          />
        ))}
      </Masonry>

      {visible.length < filtered.length && (
        <div ref={loadMoreRef} className="py-12 flex justify-center">
          <div className="w-40 h-6 bg-gray-200 animate-pulse rounded" />
        </div>
      )}

      {lightboxIdx !== null && (
        <ClientLightbox
          photos={filtered}
          currentIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onChangeIndex={setLightboxIdx}
        />
      )}

      <ScrollToTopButton />
    </div>
  );
}
