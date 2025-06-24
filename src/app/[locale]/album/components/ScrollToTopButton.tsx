'use client';

import React, { useEffect, useState } from 'react';
import styles from '../page.module.css';

export default function ScrollToTopButton() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const handler = () => setVis(window.pageYOffset > 300);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  if (!vis) return null;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div
      className={styles.scrolltotop}
      onClick={scrollToTop}
      role="button"
      tabIndex={0}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4l-8 8h6v8h4v-8h6z" />
      </svg>
    </div>
  );
}
