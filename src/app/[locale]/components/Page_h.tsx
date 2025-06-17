'use client';
import { useTranslations } from 'next-intl';

export default function Page_h() {
  const t = useTranslations('PageIndex');
  return (
    <div>
      <div className="flex items-center justify-center mt-4 text-3xl font-bold">
        {t('pageheader')}
      </div>
      <div className="flex items-center justify-center font-bold">
        {t('motto')}
      </div>
    </div>
  );
}
