// src/app/[locale]/about/page.tsx
import { Metadata } from 'next';
import MySelf from './MySelf';

export const metadata: Metadata = {
  title: '我',
  description: '车明强个人信息',
};

export default function Page() {
  return <MySelf />;
}
