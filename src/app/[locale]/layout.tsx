import Header from '@/components/Header';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
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
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/self/DSC04463.jpg')" }}
    >
      {/* 监听进度条 */}
      <ProgressBar></ProgressBar>
      <Header locale={locale} />
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      <Footer locale={locale} />
    </div>
  );
}
