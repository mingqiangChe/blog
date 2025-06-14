//  移动端优化：可折叠目录
'use client';
import { useState } from 'react';
import TableOfContents from './TableOfContents';
import { HeadingItem } from '@/lib/extractHeadings';

interface MobileTableOfContentsProps {
  headings: HeadingItem[];
}

export default function MobileTableOfContents({
  headings,
}: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        <span className="font-medium text-gray-900 dark:text-white">
          📋 目录
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <TableOfContents headings={headings} />
        </div>
      )}
    </div>
  );
}
