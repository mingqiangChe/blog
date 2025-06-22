// ClientDateWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const ClientDate = dynamic(() => import('./ClientDate'), { ssr: false });

export default function ClientDateWrapper(props: { dateStr: string }) {
  return <ClientDate {...props} />;
}
