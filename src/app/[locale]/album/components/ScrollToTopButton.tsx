'use client';
import React, { useEffect, useState } from 'react';
import styles from '../page.module.css';
const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 匀速滚动回顶部
  const scrollToTop = () => {
    const scrollDuration = 6; // 缩短总时长，加快速度
    const scrollStep = window.pageYOffset / (scrollDuration / 15);
    const scrollInterval = setInterval(() => {
      if (window.pageYOffset > 0) {
        window.scrollBy(0, -scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  if (!visible) return null;

  return (
    <div
      className={styles.scrolltotop}
      onClick={scrollToTop}
      aria-label="回到顶部"
      role="button"
      tabIndex={0}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4l-8 8h6v8h4v-8h6z" />
      </svg>
    </div>
  );
};

export default ScrollToTopButton;
