import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '里程碑',
  description: '我的里程碑',
};

import MilestoneTimelineServer from './components/MilestoneTimelineServer';

export default function Page() {
  return <MilestoneTimelineServer />;
}
