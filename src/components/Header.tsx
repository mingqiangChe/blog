'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { FiSearch } from 'react-icons/fi';
import BlogSearchModal from './BlogSearchModal';
import type { BlogPost } from '@/lib/markdown';

interface HeaderProps {
  locale: string;
  posts: BlogPost[];
}

export default function Header({ locale, posts }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navigationItems = [
    {
      key: 'blog',
      href: `/${locale}/blog`,
      label: locale === 'zh' ? '博客' : 'Blog',
    },
    {
      key: 'search',
      href: `/${locale}/search`,
      label: locale === 'zh' ? '工具' : 'Search',
    },
    {
      key: 'milestone',
      href: `/${locale}/milestone`,
      label: locale === 'zh' ? '里程碑' : 'Milestone',
    },
    {
      key: 'about',
      href: `/${locale}/about`,
      label: locale === 'zh' ? '关于我' : 'About',
    },
  ];

  const isActiveRoute = (href: string) => pathname.startsWith(href);

  const [mounted, setMounted] = useState(false);
  const [bgAlpha, setBgAlpha] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 60;
      const alpha = Math.min(scrollY / maxScroll, 1);
      setBgAlpha(alpha);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!showSearch) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowSearch(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showSearch]);

  if (!mounted) return null;

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full h-16 text-white transition-colors duration-300 z-50"
        style={{ backgroundColor: `rgba(32, 41, 58, ${bgAlpha})` }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href={`/${locale}`}
              className="flex items-center space-x-2 text-xl font-bold text-white"
            >
              <span>{locale === 'zh' ? '车车' : 'Thomas Che Blog'}</span>
            </Link>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-white ${
                      isActiveRoute(item.href) ? 'border-b-2 border-white' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher currentLocale={locale} />
              <button
                className="p-2 rounded-full hover:bg-slate-700 transition"
                onClick={() => setShowSearch(true)}
                aria-label="搜索"
              >
                <FiSearch className="w-6 h-6" />
              </button>
              <button
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">打开主菜单</span>
                {!isMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                {navigationItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActiveRoute(item.href)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-900 hover:bg-gray-100'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
      {showSearch && (
        <BlogSearchModal posts={posts} onClose={() => setShowSearch(false)} />
      )}
    </>
  );
}
