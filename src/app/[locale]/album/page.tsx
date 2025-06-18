import type { Metadata } from 'next';
import PhotoGalleryClient from './components/PhotoGalleryClient';

export const metadata:Metadata = {
  title: '摄影作品',
  description: '车明强摄影作品',
};

export default function Page() {
  return (
    <main>
      {/* 主页只负责引入客户端组件 */}
      <PhotoGalleryClient />
    </main>
  );
}
