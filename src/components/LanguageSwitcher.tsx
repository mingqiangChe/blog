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
      <style>{`
        .lang-switch {
          position: relative;
          width: 3em;
          height: 1.5em;
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
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, hsl(260, 100%, 60%), hsl(300, 100%, 60%));
          transition: 0.3s;
          border-radius: 9999px;
          box-shadow: 0 0 4px hsla(260, 100%, 60%, 0.4);
        }
        .lang-slider::before {
          position: absolute;
          content: "";
          height: 1.1em;
          width: 1.1em;
          left: 0.2em;
          bottom: 0.2em;
          background-color: white;
          border-radius: 50%;
          transition: 0.3s;
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
        }
        input:checked + .lang-slider::before {
          transform: translateX(1.5em);
        }
        .lang-label {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.65rem;
          font-weight: bold;
          color: white;
          padding: 0 0.3em;
          pointer-events: none;
          user-select: none;
        }
        .lang-label.zh {
          left: 0.2em;
        }
        .lang-label.en {
          right: 0.2em;
        }
      `}</style>

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
