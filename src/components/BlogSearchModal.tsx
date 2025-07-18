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

// 关键词高亮组件，霓虹蓝高亮
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
          <mark
            key={i}
            className="text-cyan-400 font-semibold drop-shadow-[0_0_4px_rgba(0,255,255,0.8)] bg-transparent"
          >
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

  const debouncedQuery = useDebounce(query, 300);

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
    <section
      className="
        fixed inset-0 z-[9999] flex items-start justify-center 
        bg-gradient-to-b from-black/90 via-[#0a0a0a]/80 to-black/90 
        backdrop-blur-sm p-4 sm:p-0 overflow-auto
      "
    >
      <section
        ref={modalRef}
        className="
          w-full max-w-2xl mt-8 sm:mt-24 mx-auto rounded-3xl
          bg-[#11131a]/95 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.7)] 
          border border-cyan-500/70
          max-h-[90vh] flex flex-col overflow-x-hidden
          relative
        "
        style={{ minHeight: '300px' }}
      >
        <button
          className="
    absolute top-1 right-5 
    text-cyan-400 hover:text-cyan-200 
    text-3xl drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]
    transition
  "
          onClick={onClose}
          aria-label="关闭"
          type="button"
          title="关闭"
        >
          <FiX />
        </button>

        {/* 搜索框区域 - 修改图标颜色和阴影，适配白色背景 */}
        <section
          className="
            flex items-center mb-6 px-4 py-2
            bg-[#0f1620] border border-cyan-600 rounded-xl
            shadow-[inset_0_0_12px_rgba(0,255,255,0.7)]
          "
        >
          <FiSearch
            className="
              text-[#003344] w-6 h-6 mr-3 flex-shrink-0
              drop-shadow-[0_0_8px_rgba(0,51,68,0.9)]
              transition-colors
              hover:text-[#005577]
              cursor-pointer
            "
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入关键词搜索文章…"
            className="
              flex-1 bg-transparent outline-none text-cyan-300 placeholder-cyan-500
              text-lg font-mono tracking-wide caret-cyan-400
              transition-colors
              focus:placeholder-cyan-300
              selection:bg-cyan-500 selection:text-black
            "
            style={{ minWidth: 0 }}
            autoComplete="off"
            spellCheck={false}
            type="text"
          />
        </section>

        {/* 搜索结果区域 */}
        <section
          className="
            flex-1 overflow-y-auto overflow-x-hidden space-y-4 pb-4 px-4
            scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent
            hover:scrollbar-thumb-cyan-400 transition-all
          "
        >
          {results.length === 0 && (
            <section
              className="
                text-cyan-500 text-center py-14 select-none font-mono text-lg
                drop-shadow-[0_0_4px_rgba(0,255,255,0.6)]
              "
            >
              没有找到相关内容
            </section>
          )}

          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={onClose}
          className="
  rounded-2xl overflow-hidden bg-[#121829]/90
  border border-cyan-600/70 shadow-[0_0_15px_rgba(0,255,255,0.3)]
  transition-transform hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]
  flex flex-col p-4 cursor-pointer select-none
  active:scale-[0.97]
"

            >
              <section className="relative h-36 w-full overflow-hidden rounded-lg mb-4 flex-shrink-0 shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                <Image
                  src={post.cover || '/default-cover.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover w-full h-full max-w-full brightness-90 hover:brightness-110 transition"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </section>

              <section
                className="
                  font-extrabold text-cyan-300 text-xl mb-1 line-clamp-2
                  drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]
                  font-mono
                "
              >
                <HighlightedText
                  text={post.title}
                  highlight={debouncedQuery.trim()}
                />
              </section>

              <section
                className="
                  text-xs text-cyan-400 mb-2 flex flex-wrap gap-3
                  font-mono
                "
              >
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

              <section
                className="
                  text-cyan-200 text-sm line-clamp-3 font-mono
                  drop-shadow-[0_0_3px_rgba(0,255,255,0.6)]
                "
              >
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
