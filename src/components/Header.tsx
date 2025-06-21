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
  const [bgAlpha, setBgAlpha] = useState(0);

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
      key: 'media',
      href: `/${locale}/media`,
      label: locale === 'zh' ? '书影剧' : 'media',
    },
    {
      key: 'album',
      href: `/${locale}/album`,
      label: locale === 'zh' ? '摄影' : 'Album',
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

  const locales = ['zh', 'en'];

  function stripLocale(path: string) {
    for (const loc of locales) {
      if (path.startsWith(`/${loc}/`) || path === `/${loc}`) {
        return path.replace(`/${loc}`, '') || '/';
      }
    }
    return path;
  }

  const normalizedPathname = stripLocale(pathname);
  const isActiveRoute = (href: string) => {
    const normalizedHref = stripLocale(href);
    return (
      normalizedPathname === normalizedHref ||
      normalizedPathname.startsWith(normalizedHref + '/')
    );
  };

  useEffect(() => {
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

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full h-16 z-50 backdrop-blur-md border-b border-blue-600 transition-colors duration-300"
        style={{ backgroundColor: `rgba(10, 14, 30, ${0.6 + 0.4 * bgAlpha})` }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent select-none"
          >
            {locale === 'zh' ? '车车' : 'Thomas Che Blog'}
          </Link>

          {/* PC端导航 */}
          <div className="hidden md:flex space-x-10">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`relative px-3 py-2 font-semibold text-white transition-all rounded-md cursor-pointer select-none
                  ${
                    isActiveRoute(item.href)
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(14,165,233,0.7)]'
                      : 'hover:text-cyan-400 hover:shadow-[0_0_8px_rgba(14,165,233,0.5)]'
                  }
                `}
              >
                {item.label}
                {isActiveRoute(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 rounded-full animate-pulse" />
                )}
              </Link>
            ))}
          </div>

          {/* 右侧操作区 */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher currentLocale={locale} />

            <button
              onClick={() => setShowSearch(true)}
              aria-label="搜索"
              className="p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <FiSearch className="w-6 h-6 text-white" />
            </button>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="打开主菜单"
              className="md:hidden p-2 rounded-md text-white hover:bg-blue-700 transition-colors"
            >
              {!isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
        </nav>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-16 left-0 right-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900/95 backdrop-blur-xl border-t border-blue-700/50 shadow-lg rounded-b-3xl p-4 space-y-3 z-40">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-5 py-3 rounded-xl text-lg font-semibold transition-colors cursor-pointer select-none
                  ${
                    isActiveRoute(item.href)
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.7)]'
                      : 'text-gray-300 hover:text-white hover:bg-blue-800/60 hover:shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* 搜索弹窗 */}
      {showSearch && (
        <BlogSearchModal posts={posts} onClose={() => setShowSearch(false)} />
      )}
    </>
  );
}
