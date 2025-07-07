'use client';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface HeadingItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>({});

  // 监听滚动激活目录项
  useEffect(() => {
    const headingElements = headings
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    let currentActiveId = '';

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleHeadings.length > 0) {
          const topHeadingId = visibleHeadings[0].target.id;
          if (topHeadingId !== currentActiveId) {
            currentActiveId = topHeadingId;
            setActiveId(topHeadingId);
          }
        }
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0.1,
      }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }
  };

  // 构建分组结构
  const buildHierarchy = () => {
    const result: any[] = [];
    const stack: any[] = [];

    headings.forEach((heading) => {
      const newItem = { ...heading, children: [] };

      while (
        stack.length > 0 &&
        heading.level <= stack[stack.length - 1].level
      ) {
        stack.pop();
      }

      if (stack.length === 0) {
        result.push(newItem);
        stack.push(newItem);
      } else {
        stack[stack.length - 1].children.push(newItem);
        stack.push(newItem);
      }
    });

    return result;
  };

  const toggleCollapse = (id: string) => {
    setCollapsedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderHeadings = (items: HeadingItem[], level = 0) => {
    return items.map((item) => {
      const hasChildren = (item as any).children?.length > 0;
      const isCollapsed = collapsedMap[item.id];
      const paddingClass =
        level === 0
          ? ''
          : level === 1
          ? 'pl-4'
          : level === 2
          ? 'pl-8'
          : 'pl-12';

      return (
        <li key={item.id}>
          <div
            className={`flex items-center gap-1 group cursor-pointer ${paddingClass}`}
          >
            {hasChildren ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCollapse(item.id);
                }}
                className="text-sm text-gray-400 hover:text-blue-500 transition"
                title={isCollapsed ? '展开' : '折叠'}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </span>
            ) : (
              <span className="w-4 h-4" />
            )}

            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(item.id);
              }}
              title={item.title}
              className={`block text-sm overflow-hidden whitespace-nowrap text-ellipsis
                ${
                  activeId === item.id
                    ? 'text-blue-400 font-medium'
                    : 'text-white hover:text-blue-400'
                }`}
            >
              {item.title}
            </a>
          </div>

          {/* 渲染子项 */}
          {hasChildren && !isCollapsed && (
            <ul className="mt-1 space-y-1">
              {renderHeadings((item as any).children, level + 1)}
            </ul>
          )}
        </li>
      );
    });
  };

  const structured = buildHierarchy();

  if (headings.length === 0) return null;

  return (
    <nav className="">
      <section className="border-l-2 border-gray-200 pl-4">
        <h1 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          目录
        </h1>
        <ul className="space-y-1">{renderHeadings(structured)}</ul>
      </section>
    </nav>
  );
}
