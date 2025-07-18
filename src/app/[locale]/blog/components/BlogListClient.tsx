'use client';

import { useState, useMemo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import styles from '../page.module.css';

const StarBackground = dynamic(() => import('./StarBackground'), {
  ssr: false,
});

interface BlogPostMeta {
  slug: string;
  title: string;
  description?: string;
  cover?: string;
  date: string;
  tags?: string[];
  author?: string;
  readingTime?: number;
}

interface BlogListClientProps {
  posts: BlogPostMeta[];
  locale: string;
}

const PAGE_SIZE = 10;

export default function BlogListClient({ posts, locale }: BlogListClientProps) {
  const [views, setViews] = useState<Record<string, number>>({});

  useEffect(() => {
    const slugs = posts.map((p) => p.slug);
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slugs }),
    })
      .then((res) => res.json())
      .then((data) => {
        setViews(data.counts || {});
      });
  }, [posts]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedTag, setSelectedTag] = useState('全部');

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedTag === '全部') return posts;
    return posts.filter((p) => p.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && visibleCount < filteredPosts.length) {
      const timer = setTimeout(() => {
        setVisibleCount((c) => Math.min(c + PAGE_SIZE, filteredPosts.length));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView, visibleCount, filteredPosts.length]);

  const onTagClick = (tag: string) => {
    setSelectedTag(tag);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className={styles.blogSection}>
      {/* 星空背景 */}
      <StarBackground />

      {/* 主体内容 */}
      <div className={styles.contentWrapper}>
        {/* 分类标签 */}
        <section className={styles.tagList}>
          {['全部', ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`${styles.tagButton} ${
                selectedTag === tag ? styles.tagSelected : ''
              }`}
            >
              {tag}
            </button>
          ))}
        </section>

        {/* 文章列表 */}
        <section className={styles.postGrid}>
          {visiblePosts.length === 0 && (
            <div className={styles.noResult}>没有找到相关文章</div>
          )}

          {visiblePosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className={styles.card}
            >
              <article>
                <section className={styles.cardImageWrapper}>
                  {post.cover ? (
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className={styles.cardImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 6}
                    />
                  ) : (
                    <section className={styles.cardNoCover}>
                      <span>📝</span>
                    </section>
                  )}
                </section>

                <section className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{post.title}</h2>

                  <section className={styles.authorRow}>
                    <section className={styles.authorAvatar}>
                      <span>{post.author?.charAt(0) || 'A'}</span>
                    </section>
                    <span>
                      {post.author || (locale === 'zh' ? '匿名' : 'Anonymous')}
                    </span>
                  </section>

                  <section className={styles.postMeta}>
                    <time>
                      📅{' '}
                      {new Date(post.date).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>

                    <span>
                      👁️{' '}
                      {views[post.slug] !== undefined
                        ? `${views[post.slug]} 次`
                        : '加载中...'}
                    </span>

                    {post.readingTime && (
                      <span>
                        ⏱️{' '}
                        {locale === 'zh'
                          ? `${post.readingTime} 分钟`
                          : `${post.readingTime} min`}
                      </span>
                    )}
                  </section>

                  {post.description && (
                    <p className={styles.cardDesc}>{post.description}</p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <section className={styles.tagContainer}>
                      {post.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className={styles.tag}>
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 4 && (
                        <span className={styles.tagMore}>
                          +{post.tags.length - 4}
                        </span>
                      )}
                    </section>
                  )}
                </section>
              </article>
            </Link>
          ))}
        </section>

        {/* 无限滚动哨兵 */}
        <div
          ref={visibleCount < filteredPosts.length ? ref : null}
          className={styles.infiniteScrollTrigger}
        />
      </div>
    </section>
  );
}
