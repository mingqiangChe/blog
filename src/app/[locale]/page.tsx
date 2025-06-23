import HomeServer from '@/components/HomeServer';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <HomeServer locale={locale} />;
}
