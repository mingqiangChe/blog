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

  // 保持 locale 状态与传入的 currentLocale 一致
  useEffect(() => {
    setLocale(
      locales.includes(currentLocale) ? (currentLocale as 'en' | 'zh') : 'en'
    );
  }, [currentLocale]);

  // 切换语言的逻辑
  const switchLanguage = async () => {
    const newLocale = locale === 'en' ? 'zh' : 'en';

    // 设置 cookie，存储用户选择的语言，有效期 30 天
    const days = 30;
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/;SameSite=Lax`;

    // 解析路径，替换语言段
    const segments = pathname.split('/');
    if (segments.length > 1 && locales.includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale); // 如果路径没有语言段则插入
    }
    const newPath = segments.join('/');

    // 发送 HEAD 请求判断目标路径是否存在，防止跳转 404
    try {
      const res = await fetch(newPath, { method: 'HEAD' });
      if (res.ok) {
        router.push(newPath);
      } else {
        // 若不存在，跳转该语言首页
        router.push(`/${newLocale}`);
      }
    } catch (err) {
      console.error('语言切换时检测页面失败:', err);
      router.push(`/${newLocale}`);
    }

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

      <label className="lang-switch" aria-label="切换语言">
        <input
          type="checkbox"
          checked={locale === 'zh'}
          onChange={switchLanguage}
          aria-checked={locale === 'zh'}
        />
        <span className="lang-slider" />
        <span className="lang-label zh">中</span>
        <span className="lang-label en">EN</span>
      </label>
    </>
  );
}
