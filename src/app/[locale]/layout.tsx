import i18nConfig from '../../../i18nConfig';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import { getAllPosts } from '@/lib/markdown';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import zhMessages from '../../../messages/zh.json';

const messagesMap = {
  en: enMessages,
  zh: zhMessages
} as const;

type Locale = keyof typeof messagesMap;

function isSupportedLocale(locale: string): locale is Locale {
  return Object.keys(messagesMap).includes(locale);
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  const safeLocale: Locale = isSupportedLocale(locale) ? locale : 'en'; // 'en' 为兜底语言
  const posts = getAllPosts(safeLocale);

  return (
    <html lang={safeLocale}>
      <body>
        <NextIntlClientProvider locale={safeLocale} messages={messagesMap[safeLocale]}>
          <div
            className="flex flex-col min-h-screen bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/DSC04463.jpg')",
            }}
          >
            <ProgressBar />
            <Header posts={posts} locale={safeLocale} />
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            <Footer locale={safeLocale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
