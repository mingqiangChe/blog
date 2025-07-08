import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import SkeletonPlaceholder from '@/components/SkeletonBlogList';
const PhotoGalleryClient = dynamic(
  () => import('./components/PhotoGalleryClient'),
  {
    loading: () => <SkeletonPlaceholder />,
  }
);
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
