// components/BlogContributionCalendar.tsx
import React from 'react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description?: string;
  content: string;
  locale: string;
  tags?: string[];
  author?: string;
  readingTime?: number;
}

interface BlogContributionCalendarProps {
  posts: BlogPost[];
  year: number;
}

function getDailyCounts(posts: BlogPost[]) {
  const counts: { [key: string]: number } = {};
  posts.forEach((post) => {
    const day = post.date.slice(0, 10); // 'YYYY-MM-DD'
    counts[day] = (counts[day] || 0) + 1;
  });
  return counts;
}

function getCalendarData(year: number, dailyCounts: { [key: string]: number }) {
  const start = new Date(`${year}-01-01`);
  const end = new Date(`${year}-12-31`);
  const days: { date: string; count: number }[] = [];
  let date = new Date(start);

  // 找到年份第一天是周几，调整到周日开始
  const firstDay = new Date(start);
  while (firstDay.getDay() !== 0) {
    firstDay.setDate(firstDay.getDate() - 1);
  }
  date = new Date(firstDay);

  // 生成整年的日期数据
  while (date <= end || days.length % 7 !== 0) {
    const ymd = date.toISOString().slice(0, 10);
    const isInYear = date.getFullYear() === year;
    days.push({
      date: ymd,
      count: isInYear ? dailyCounts[ymd] || 0 : 0,
    });
    date.setDate(date.getDate() + 1);
  }

  // 按周分组
  const weeks: { date: string; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
}

function getColor(count: number): string {
  if (count === 0) return '#161b22';
  if (count === 1) return '#0e4429';
  if (count === 2) return '#006d32';
  if (count === 3) return '#26a641';
  return '#39d353';
}

function getMonthLabels(year: number) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months;
}

export default function BlogContributionCalendar({
  posts,
  year,
}: BlogContributionCalendarProps) {
  const dailyCounts = getDailyCounts(posts);
  const weeks = getCalendarData(year, dailyCounts);
  const totalContributions = Object.values(dailyCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  const monthLabels = getMonthLabels(year);

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      {/* 标题和统计 */}
      <div className="text-white mb-4">
        <span className="text-sm">
          {totalContributions} contributions in {year}
        </span>
      </div>

      {/* 日历主体 */}
      <div className="relative">
        {/* 月份标签 */}
        <div className="flex text-xs text-gray-400 mb-2 ml-10">
          {monthLabels.map((month, index) => (
            <div
              key={month}
              className="flex-1 text-left"
              style={{ minWidth: '43px' }}
            >
              {index % 2 === 0 ? month : ''}
            </div>
          ))}
        </div>

        <div className="flex">
          {/* 星期标签 */}
          <div className="flex flex-col text-xs text-gray-400 mr-2">
            <div style={{ height: '12px' }}></div>
            <div style={{ height: '12px', lineHeight: '12px' }}>Mon</div>
            <div style={{ height: '12px' }}></div>
            <div style={{ height: '12px', lineHeight: '12px' }}>Wed</div>
            <div style={{ height: '12px' }}></div>
            <div style={{ height: '12px', lineHeight: '12px' }}>Fri</div>
            <div style={{ height: '12px' }}></div>
          </div>

          {/* 日历格子 */}
          <div className="flex">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    title={`${day.count} contributions on ${day.date}`}
                    className="w-3 h-3 m-0.5 rounded-sm cursor-pointer hover:outline hover:outline-1 hover:outline-white"
                    style={{
                      backgroundColor: getColor(day.count),
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 图例 */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-gray-400">
          Learn how we count contributions
        </div>
        <div className="flex items-center text-xs text-gray-400">
          <span className="mr-2">Less</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: getColor(level) }}
              />
            ))}
          </div>
          <span className="ml-2">More</span>
        </div>
      </div>
    </div>
  );
}
