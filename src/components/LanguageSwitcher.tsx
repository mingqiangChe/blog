'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const locales = ['en', 'zh'];
const localeNames = { en: 'English', zh: '中文' };

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<'en' | 'zh'>(
    locales.includes(currentLocale) ? (currentLocale as 'en' | 'zh') : 'en'
  );

  useEffect(() => {
    setLocale(
      locales.includes(currentLocale) ? (currentLocale as 'en' | 'zh') : 'en'
    );
  }, [currentLocale]);

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en';
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setLocale(newLocale);
  };

  return (
    <>
      <style>
        {`
        .lang-switch {
          position: relative;
          width: 5em;
          height: 3em;
          display: inline-block;
        }
        .lang-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .lang-slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0;
          right: 0; bottom: 0;
          background: linear-gradient(45deg, hsl(260, 100%, 50%), hsl(300, 100%, 50%));
          transition: 0.4s;
          border-radius: 34px;
          box-shadow: 0 0 10px hsla(260, 100%, 60%, 0.6);
        }
        .lang-slider::before {
          position: absolute;
          content: "";
          height: 2.2em;
          width: 2.2em;
          left: 0.4em;
          bottom: 0.4em;
          background-color: white;
          border-radius: 50%;
          transition: 0.4s;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
        }
        input:checked + .lang-slider::before {
          transform: translateX(2em);
        }
        .lang-label {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.75rem;
          font-weight: bold;
          color: white;
          padding: 0 0.5em;
          pointer-events: none;
          user-select: none;
        }
        .lang-label.zh {
          left: 0.4em;
        }
        .lang-label.en {
          right: 0.4em;
        }
      `}
      </style>

      <label className="lang-switch">
        <input
          type="checkbox"
          checked={locale === 'zh'}
          onChange={switchLanguage}
          aria-label="切换语言"
        />
        <span className="lang-slider" />
        <span className="lang-label zh">中</span>
        <span className="lang-label en">EN</span>
      </label>
    </>
  );
}
