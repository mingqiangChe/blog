interface MasonrySkeletonProps {
  count?: number; // 砖块数量，默认9
  className?: string; // 外层容器额外样式
  columnClassName?: string; // 列容器样式
  itemClassName?: string; // 单个砖块样式
}

export default function MasonrySkeleton({
  count = 9,
  className = '',
  columnClassName = 'space-y-6',
  itemClassName = '',
}: MasonrySkeletonProps) {
  // 生成3列，每列砖块数量平均分配
  const columns: React.JSX.Element[][] = [[], [], []];
  for (let i = 0; i < count; i++) {
    columns[i % 3].push(
      <div
        key={i}
        className={`bg-slate-700 rounded-lg animate-pulse shadow-sm ${itemClassName}`}
        style={{ height: `${100 + (i % 3) * 20}px` }} // 不同高度模拟瀑布流错落感
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`flex gap-6 ${className}`}
      role="status"
      aria-label="内容加载中"
    >
      {columns.map((col, idx) => (
        <div key={idx} className={columnClassName} style={{ flex: 1 }}>
          {col}
        </div>
      ))}
    </div>
  );
}
