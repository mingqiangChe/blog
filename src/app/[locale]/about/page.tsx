import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我',
  description: '车明强个人信息',
};
import MySelf from './MySelf';
export default function Page() {
  return <MySelf></MySelf>;
}
