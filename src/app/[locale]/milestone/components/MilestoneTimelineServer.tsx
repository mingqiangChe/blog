import { getAllPosts } from '@/lib/markdown';
import MilestoneTimelineClient from './MilestoneTimelineClient';

export default function MilestoneTimelineServer() {
  const posts = getAllPosts('zh').filter((post) => post.isMilestone !== false);
  return <MilestoneTimelineClient initialPosts={posts} />;
}
