'use client';

import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import mediumZoom from 'medium-zoom';
import CodeBlock from './CodeBlock';

// 生成 id 用于标题锚点
const generateId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');

const Heading = (Tag: keyof HTMLElementTagNameMap) => (props: any) => {
  const { children, ...rest } = props;
  const text = Array.isArray(children)
    ? children.join('')
    : String(children ?? '');
  const id = generateId(text);
  return React.createElement(Tag, { id, ...rest }, children);
};

interface ClientMarkdownRendererProps {
  content: string;
}

export default function ClientMarkdownRenderer({
  content,
}: ClientMarkdownRendererProps) {
  useEffect(() => {
    mediumZoom('img', { background: 'rgba(0,0,0,0.8)' });
  }, []);

  const components = {
    code: CodeBlock,
    h1: Heading('h1'),
    h2: Heading('h2'),
    h3: Heading('h3'),
    h4: Heading('h4'),
    h5: Heading('h5'),
    h6: Heading('h6'),
    img: ({ src, alt, ...props }: any) => {
      const imageSrc =
        typeof src === 'string'
          ? src
          : 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/default.jpg';

      return (
        <img
          src={imageSrc}
          alt={alt || '图片'}
          loading="lazy"
          className="rounded-lg shadow-md mx-auto max-w-full h-auto cursor-zoom-in"
          {...props}
        />
      );
    },
    table: (props: any) => (
      <div
        className="
      overflow-x-auto my-4 rounded-lg shadow-sm border
      border-gray-200 dark:border-gray-700
      "
      >
        <table
          {...props}
          className="
        w-full table-auto border-collapse text-left
        dark:bg-gray-900
      "
        />
      </div>
    ),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
