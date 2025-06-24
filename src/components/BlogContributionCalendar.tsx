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
    <section className="bg-gray-900 p-3 sm:p-6 rounded-lg overflow-x-auto">
      {/* 标题和统计 */}
      <section className="text-white mb-4 text-sm">
        {totalContributions} contributions in {year}
      </section>

      {/* 日历主体 */}
      <section className="relative min-w-[500px] sm:min-w-0">
        {/* 月份标签 */}
        <section className="flex text-xs sm:text-sm text-gray-400 mb-2 ml-10">
          {monthLabels.map((month, index) => (
            <section
              key={month}
              className="flex-1 text-left"
              style={{ minWidth: '43px' }}
            >
              {index % 2 === 0 ? month : ''}
            </section>
          ))}
        </section>

        <section className="flex">
          {/* 星期标签 */}
          <section className="flex flex-col text-xs sm:text-sm text-gray-400 mr-2">
            <section style={{ height: '12px' }}></section>
            <section style={{ height: '12px', lineHeight: '12px' }}>
              Mon
            </section>
            <section style={{ height: '12px' }}></section>
            <section style={{ height: '12px', lineHeight: '12px' }}>
              Wed
            </section>
            <section style={{ height: '12px' }}></section>
            <section style={{ height: '12px', lineHeight: '12px' }}>
              Fri
            </section>
            <section style={{ height: '12px' }}></section>
          </section>

          {/* 日历格子 */}
          <section className="flex">
            {weeks.map((week, weekIndex) => (
              <section key={weekIndex} className="flex flex-col">
                {week.map((day, dayIndex) => (
                  <section
                    key={`${weekIndex}-${dayIndex}`}
                    title={`${day.count} contributions on ${day.date}`}
                    className="
                      w-3 h-3 m-0.5
                      sm:w-4 sm:h-4 sm:m-0.5
                      rounded-sm cursor-pointer
                      hover:outline hover:outline-1 hover:outline-white
                    "
                    style={{
                      backgroundColor: getColor(day.count),
                    }}
                  />
                ))}
              </section>
            ))}
          </section>
        </section>
      </section>

      {/* 图例 */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-2">
        <section className="text-xs text-gray-400">
          Learn how we count contributions
        </section>
        <section className="flex items-center text-xs text-gray-400">
          <span className="mr-2">Less</span>
          <section className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <section
                key={level}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: getColor(level) }}
              />
            ))}
          </section>
          <span className="ml-2">More</span>
        </section>
      </section>
    </section>
  );
}
