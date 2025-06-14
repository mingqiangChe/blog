import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

// 在这里添加 async 关键字
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // 使用 await 获取 params
  const { locale } = await params;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 监听进度条 */}
      <ProgressBar></ProgressBar>
      <Header locale={locale} />
      <main className="flex-grow">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
