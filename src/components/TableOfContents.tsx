// 目录导航组件
'use client';
import { useEffect, useState } from 'react';

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
    if (!id) return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="">
      <section className="border-l-2 border-gray-200 pl-4">
        <h1 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          目录
        </h1>
        <ul className="space-y-2">
          {headings.map(({ id, title, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(id);
                }}
                title={title} // hover 显示完整 title
                className={`
    block w-full text-left text-sm transition-colors duration-200
    overflow-hidden whitespace-nowrap text-ellipsis
    ${level === 1 ? 'font-semibold' : ''}
    ${level === 2 ? 'pl-4' : ''}
    ${level === 3 ? 'pl-8' : ''}
    ${level >= 4 ? 'pl-12' : ''}
    text-white
    ${activeId === id ? 'text-blue-400 font-medium' : 'hover:text-blue-400'}
  `}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
}
