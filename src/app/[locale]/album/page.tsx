import type { Metadata } from 'next';
import PhotoGalleryClient from './components/PhotoGalleryClient';

export const metadata: Metadata = {
  title: '摄影作品',
  description: '车明强摄影作品',
};

export default function Page() {
  return (
    <main>
      <PhotoGalleryClient />
    </main>
  );
}
