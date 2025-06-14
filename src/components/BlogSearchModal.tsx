'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FiX, FiSearch } from 'react-icons/fi';
import type { BlogPost } from '@/lib/markdown';
import Image from 'next/image';

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
  console.log('传入的文章列表 posts:', posts);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);
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

  const results = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.trim().toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        (post.description && post.description.toLowerCase().includes(q)) ||
        (post.content && post.content.toLowerCase().includes(q)) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(q)))
    );
  }, [query, posts]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="w-full max-w-2xl mt-8 sm:mt-24 mx-auto rounded-2xl bg-slate-900/90 backdrop-blur-lg shadow-2xl p-6 relative border border-slate-700 max-h-[90vh] flex flex-col"
        style={{ minHeight: '300px' }}
      >
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl"
          onClick={onClose}
          aria-label="关闭"
        >
          <FiX />
        </button>

        <div className="flex items-center mb-6 px-2">
          <FiSearch className="text-slate-400 w-6 h-6 mr-2" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              console.log('当前搜索关键词:', e.target.value);
            }}
            placeholder="输入关键词搜索文章…"
            className="flex-1 bg-transparent outline-none text-white placeholder-slate-400 text-lg"
            style={{ minWidth: 0 }}
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pb-2">
          {results.length === 0 && (
            <div className="text-slate-400 text-center py-10">
              没有找到相关内容
            </div>
          )}
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={onClose}
              className="block rounded-2xl overflow-hidden bg-slate-800/80 backdrop-blur-xl shadow-xl border border-slate-700/60 transition hover:scale-105 hover:shadow-2xl flex flex-col p-4"
            >
              <div className="relative h-36 w-full overflow-hidden rounded-lg mb-3">
                <Image
                  src={post.cover || '/default-cover.jpg'}
                  alt={post.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="font-bold text-white text-lg mb-1 line-clamp-2">
                {post.title}
              </div>
              <div className="text-xs text-slate-400 mb-1 flex flex-wrap gap-2">
                {post.tags && <span>Tags: {post.tags.join(', ')}</span>}
                <span>{new Date(post.date).toLocaleDateString()}</span>
                {post.readingTime && <span>· {post.readingTime} 分钟</span>}
              </div>
              <div className="text-slate-300 text-sm line-clamp-3">
                {post.description}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
