'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FiX, FiSearch } from 'react-icons/fi';
import type { BlogPost } from '@/lib/markdown';
import Image from 'next/image';

// 防抖hook，延迟触发搜索
function useDebounce(value: string, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// 关键词高亮组件
function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  if (!highlight) return <>{text}</>;
  const regex = new RegExp(
    `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi'
  );
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-300 text-black">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

interface BlogSearchModalProps {
  posts: BlogPost[];
  onClose: () => void;
}

export default function BlogSearchModal({
  posts = [],
  onClose,
}: BlogSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLElementTagNameMap['section']>(null);

  // 聚焦输入框
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 点击外部关闭弹窗
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // 防抖后的查询词
  const debouncedQuery = useDebounce(query, 300);

  // 搜索结果过滤
  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        (post.description && post.description.toLowerCase().includes(q)) ||
        (post.content && post.content.toLowerCase().includes(q)) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(q)))
    );
  }, [debouncedQuery, posts]);

  return (
    <section className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-0 overflow-auto">
      <section
        ref={modalRef}
        className="
          w-full max-w-2xl mt-8 sm:mt-24 mx-auto rounded-2xl 
          bg-slate-900/90 backdrop-blur-lg shadow-2xl p-6 relative border border-slate-700 
          max-h-[90vh] flex flex-col overflow-x-hidden
        "
        style={{ minHeight: '300px' }}
      >
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl"
          onClick={onClose}
          aria-label="关闭"
          type="button"
        >
          <FiX />
        </button>

        <section className="flex items-center mb-6 px-2">
          <FiSearch className="text-slate-400 w-6 h-6 mr-2 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入关键词搜索文章…"
            className="flex-1 bg-transparent outline-none text-white placeholder-slate-400 text-lg"
            style={{ minWidth: 0 }}
            autoComplete="off"
            spellCheck={false}
            type="search"
          />
        </section>

        <section
          className="
            flex-1 overflow-y-auto overflow-x-hidden space-y-3 pb-2
            scrollbar-thin
            scrollbar-thumb-rounded-full
            scrollbar-thumb-cyan-400/70
            scrollbar-track-transparent
            hover:scrollbar-thumb-cyan-300/90
            transition-all
          "
        >
          {results.length === 0 && (
            <section className="text-slate-400 text-center py-10 select-none">
              没有找到相关内容
            </section>
          )}
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={onClose}
              className="
                block rounded-2xl overflow-hidden bg-slate-800/80 backdrop-blur-xl shadow-xl border border-slate-700/60 
                transition hover:scale-105 hover:shadow-2xl flex flex-col p-4
              "
            >
              <section className="relative h-36 w-full overflow-hidden rounded-lg mb-3 flex-shrink-0">
                <Image
                  src={post.cover || '/default-cover.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover w-full h-full max-w-full"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </section>
              <section className="font-bold text-white text-lg mb-1 line-clamp-2">
                <HighlightedText
                  text={post.title}
                  highlight={debouncedQuery.trim()}
                />
              </section>
              <section className="text-xs text-slate-400 mb-1 flex flex-wrap gap-2">
                {post.tags && (
                  <span>
                    Tags:{' '}
                    {post.tags.map((tag, i) => (
                      <span key={i} className="inline-block mr-1">
                        <HighlightedText
                          text={tag}
                          highlight={debouncedQuery.trim()}
                        />
                      </span>
                    ))}
                  </span>
                )}
                <span>{new Date(post.date).toLocaleDateString()}</span>
                {post.readingTime && <span>· {post.readingTime} 分钟</span>}
              </section>
              <section className="text-slate-300 text-sm line-clamp-3">
                <HighlightedText
                  text={post.description || ''}
                  highlight={debouncedQuery.trim()}
                />
              </section>
            </Link>
          ))}
        </section>
      </section>
    </section>
  );
}
