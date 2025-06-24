import { getAllPosts } from '@/lib/markdown';
import dynamic from 'next/dynamic';
// 懒加载 只适合客户端渲染组件
const MilestoneTimelineClient = dynamic(
  () => import('./MilestoneTimelineClient'),
  {
    loading: () => <p>正在加载...</p>, // 可选：加载时的占位内容
  }
);

export default function MilestoneTimelineServer() {
  const posts = getAllPosts('zh').filter((post) => post.isMilestone !== false);
  return <MilestoneTimelineClient initialPosts={posts} />;
}
