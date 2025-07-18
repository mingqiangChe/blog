'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { FiSearch } from 'react-icons/fi';
import BlogSearchModal from './BlogSearchModal';
import type { BlogPost } from '@/lib/markdown';
import { useRouter } from 'next/navigation';
import useMounted from '@/hooks/useMounted';
interface HeaderProps {
  locale: string;
  posts: BlogPost[];
}

export default function Header({ locale, posts }: HeaderProps) {
  const pathname = usePathname();
  const mounted = useMounted();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [bgAlpha, setBgAlpha] = useState(0);

  const navigationItems = [
    { key: 'blog', href: `/${locale}/blog`, label: '引擎日志' },
    { key: 'search', href: `/${locale}/search`, label: '赛车工具' },
    { key: 'media', href: `/${locale}/media`, label: '影像馆' },
    { key: 'album', href: `/${locale}/album`, label: '车库相册' },
    { key: 'milestone', href: `/${locale}/milestone`, label: '生涯里程' },
    { key: 'about', href: `/${locale}/about`, label: '车主档案' },
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
    if (!mounted) return false;
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
  const router = useRouter();
  // 资源空闲加载
  useEffect(() => {
    const getPath = (key: 'media' | 'album') => {
      if (locale === 'en') {
        return `/en/${key}`;
      }
      return `/${key}`;
    };

    const prefetchPages = () => {
      router.prefetch(getPath('media'));
      router.prefetch(getPath('album'));
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(prefetchPages);
    } else {
      setTimeout(prefetchPages, 2000);
    }
  }, [router, locale]);

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full h-16 z-50 shadow-md transition-colors duration-300"
        style={{
          background: `linear-gradient(to bottom, #ffffff 70%, #000000 100%)`,
          borderBottom: '3px solid #000000',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="
    text-2xl font-extrabold
    text-black
    tracking-wide
    drop-shadow-[0_0_4px_rgba(0,0,0,0.6)]
    hover:text-[#0ff]
    hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]
    select-none
    transition-all duration-300 ease-in-out
  "
          >
            {/* {locale === 'zh' ? '车' : 'Thomas'} */}
            Thomas Che
          </Link>

          {/* PC端导航 */}
          <section className="hidden md:flex space-x-8 font-racing text-sm tracking-widest">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`relative px-3 py-2 transition-all duration-300 ease-in-out rounded-md cursor-pointer select-none nav-hover-effect
        ${
          isActiveRoute(item.href)
            ? 'text-red-600 font-bold'
            : 'text-gray-800 hover:text-yellow-500'
        }
      `}
              >
                {item.label}
              </Link>
            ))}
          </section>

          {/* 右侧操作区 */}
          <section className="flex items-center space-x-4">
            <LanguageSwitcher currentLocale={locale} />
            <button
              onClick={() => setShowSearch(true)}
              aria-label="搜索"
              className="
    p-2 rounded-full 
    bg-black/80 
    hover:bg-black/95 
    transition-colors
    border border-gray-800
    shadow-[0_0_8px_rgba(0,0,0,0.8)]
  "
            >
              <FiSearch
                className="
      w-4 h-4 
      text-gray-300 
      drop-shadow-[0_0_6px_rgba(50,50,50,0.9)]
      hover:text-cyan-400
      transition-colors
    "
              />
            </button>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="打开主菜单"
              className="md:hidden p-2 rounded-md text-black hover:bg-gray-200 transition-colors"
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
          </section>
        </nav>

        {/* 移动端菜单 */}
        {isMenuOpen && (
<section
  className="
    md:hidden fixed top-16 left-0 right-0
    bg-black/85 backdrop-blur-sm
    border-t-4 border-double border-yellow-400
    shadow-[0_0_15px_rgba(255,230,0,0.8)]
    rounded-b-xl p-5 space-y-4 z-40
  "
>
  {navigationItems.map((item) => (
    <Link
      key={item.key}
      href={item.href}
      onClick={() => setIsMenuOpen(false)}
      className={`
        block px-6 py-3 rounded-lg font-racing tracking-wider text-center text-base
        transition-transform duration-300 ease-in-out
        ${
          isActiveRoute(item.href)
            ? `bg-red-700 text-white 
               shadow-[0_0_15px_rgba(255,0,0,0.8)] 
               scale-105 rotate-[2deg]`
            : `text-gray-300 hover:text-white hover:bg-red-600/70 hover:scale-105 hover:rotate-[1deg]`
        }
      `}
    >
      {item.label}
    </Link>
  ))}
</section>

        )}
      </header>

      {/* 搜索弹窗 */}
      {showSearch && (
        <BlogSearchModal posts={posts} onClose={() => setShowSearch(false)} />
      )}
    </>
  );
}
