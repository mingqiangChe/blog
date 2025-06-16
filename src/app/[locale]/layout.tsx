import Header from '@/components/Header';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import { getAllPosts } from '@/lib/markdown';
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
  const posts = getAllPosts(locale);
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/DSC04463.jpg')",
      }}
    >
      {/* 监听进度条 */}
      <ProgressBar></ProgressBar>
      <Header posts={posts} locale={locale} />
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      <Footer locale={locale} />
    </div>
  );
}
