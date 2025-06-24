'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const locales = ['en', 'zh'];

  const validLocale: string = useMemo(() => {
    if (!currentLocale || typeof currentLocale !== 'string') {
      return 'en';
    }
    if (locales.includes(currentLocale)) {
      return currentLocale;
    }
    return 'en';
  }, [currentLocale, locales]);

  const localeNames = {
    en: 'English',
    zh: '中文',
  };

  const switchLanguage = (newLocale: string) => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <section className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500
          px-4 py-2 font-semibold text-white shadow-[0_0_15px_rgba(139,92,246,0.7)] hover:shadow-[0_0_25px_rgba(139,92,246,0.9)]
          transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-xl select-none">🌐</span>
        <span className="select-none">
          {localeNames[validLocale as keyof typeof localeNames] || validLocale}
        </span>
        <svg
          className={`w-5 h-5 text-white transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* 遮罩层，点击关闭 */}
          <section
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* 下拉菜单 */}
          <section
            className="absolute right-0 mt-2 w-36 rounded-lg bg-black/60 backdrop-blur-md border border-purple-700 shadow-lg z-20
              ring-1 ring-purple-500 ring-opacity-30 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-switcher"
          >
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLanguage(locale)}
                disabled={locale === validLocale}
                className={`w-full px-4 py-2 text-left text-sm font-medium rounded-md transition-colors
                  ${
                    locale === validLocale
                      ? 'bg-purple-700 text-white cursor-default shadow-[0_0_10px_rgba(139,92,246,0.8)]'
                      : 'text-purple-300 hover:bg-purple-600 hover:text-white'
                  }`}
                role="menuitem"
              >
                {localeNames[locale as keyof typeof localeNames]}
              </button>
            ))}
          </section>
        </>
      )}
    </section>
  );
}
