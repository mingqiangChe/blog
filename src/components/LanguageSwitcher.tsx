// components/LanguageSwitcher.tsx
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

  // 使用本地化的语言名称显示
  const languageNames = useMemo(() => {
    return new Intl.DisplayNames([currentLocale], {
      type: 'language',
    });
  }, [currentLocale]);

  const getLanguageName = (locale: string) => {
    try {
      return languageNames.of(locale) || locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  // 备用的静态语言名称
  const localeNames = {
    en: 'English',
    zh: '中文',
  };

  const switchLanguage = (newLocale: string) => {
    // 设置Cookie保存用户偏好
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // 更新URL
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false); // 切换后关闭下拉菜单
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
      >
        <span className="text-xl">🌐</span>
        <span className="text-sm font-medium">
          {localeNames[currentLocale as keyof typeof localeNames]}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
          {/* 点击外部区域关闭下拉菜单 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-50 dark:bg-gray-800 dark:border-gray-600">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLanguage(locale)}
                className={`
                  block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors first:rounded-t-md last:rounded-b-md
                  ${
                    locale === currentLocale
                      ? 'bg-blue-50 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                `}
                disabled={locale === currentLocale}
              >
                {localeNames[locale as keyof typeof localeNames]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
