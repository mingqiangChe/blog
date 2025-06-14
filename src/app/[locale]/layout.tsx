// app/[locale]/layout.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />
      <main className="flex-grow">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
