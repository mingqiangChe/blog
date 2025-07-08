import { getAllPosts } from '@/lib/markdown';
import dynamic from 'next/dynamic';
import SkeletonPlaceholder from '@/components/SkeletonBlogList';
// 懒加载 只适合客户端渲染组件
const MilestoneTimelineClient = dynamic(
  () => import('./MilestoneTimelineClient'),
  {
    loading: () => <SkeletonPlaceholder />,
  }
);

export default function MilestoneTimelineServer() {
  const posts = getAllPosts('zh').filter((post) => post.isMilestone !== false);
  return <MilestoneTimelineClient initialPosts={posts} />;
}
