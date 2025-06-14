import type { Metadata } from 'next';
import MilestoneTimeline from './MilestoneTimeline';

export const metadata: Metadata = {
  title: '里程碑',
  description: '我的里程碑',
};

export default function Page() {
  return <MilestoneTimeline />;
}
