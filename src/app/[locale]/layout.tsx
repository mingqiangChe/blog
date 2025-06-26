import i18nConfig from '../../../i18nConfig';
import { notFound } from 'next/navigation';
// import Header from '@/components/Header';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import { getAllPosts } from '@/lib/markdown';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import zhMessages from '../../../messages/zh.json';
import dynamic from 'next/dynamic';
// 懒加载 只适合客户端渲染组件
const Header = dynamic(() => import('@/components/Header'), {
  loading: () => <p>正在加载...</p>, // 可选：加载时的占位内容
});
const messagesMap = {
  en: enMessages,
  zh: zhMessages,
} as const;

type Locale = keyof typeof messagesMap;

function isSupportedLocale(locale: string): locale is Locale {
  return Object.keys(messagesMap).includes(locale);
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // ✅ 避免同步访问 params
  const { locale } = await Promise.resolve(props.params);

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  const safeLocale = isSupportedLocale(locale) ? locale : 'en';
  const posts = await Promise.resolve(getAllPosts(safeLocale));
  return (
    <NextIntlClientProvider
      locale={safeLocale}
      messages={messagesMap[safeLocale]}
    >
      <main className="flex flex-col min-h-screen bg-cover bg-center">
        <ProgressBar />
        <Header posts={posts} locale={safeLocale} />
        <ClientLayoutWrapper>{props.children}</ClientLayoutWrapper>
        <Footer locale={safeLocale} />
      </main>
    </NextIntlClientProvider>
  );
}
