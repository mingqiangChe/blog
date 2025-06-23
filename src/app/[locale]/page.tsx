// src/app/[locale]/page.tsx
import HomeServer from '@/components/HomeServer';

export default function Page({ params }: { params: { locale: string } }) {
  return <HomeServer locale={params.locale} />;
}
