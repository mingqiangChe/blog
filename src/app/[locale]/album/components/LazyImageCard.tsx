'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../page.module.css';
import type { Photo } from '../photo';

interface Props {
  photo: Photo;
  onClick: () => void;
}

export default function LazyImageCard({ photo, onClick }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px' });
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
        <img
          src={photo.url}
          alt={photo.desc}
          className={styles['card-img']}
          loading="lazy"
        />
      ) : (
        <section style={{ height: 180, background: '#eee' }} />
      )}
      <section className={styles['card-desc']}>{photo.desc}</section>
    </section>
  );
}
