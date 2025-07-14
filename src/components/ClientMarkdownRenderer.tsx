'use client';

import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import mediumZoom from 'medium-zoom';
import CodeBlock from './CodeBlock';
import { defaultSchema } from 'hast-util-sanitize';
import { useMediumZoom } from '@/hooks/ZoomImg';

const mySchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'video', 'source', 'span'],
  attributes: {
    ...defaultSchema.attributes,
    video: [
      'src',
      'controls',
      'width',
      'height',
      'muted',
      'autoPlay',
      'playsInline',
      'preload',
      'className',
      'style',
    ],
    source: ['src', 'type'],
    span: ['style'], // ✅ 允许 span 使用 style 属性
  },
};

const generateId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');

const Heading =
  (Tag: keyof HTMLElementTagNameMap, className = '') =>
  (props: any) => {
    const { children, ...rest } = props;
    const text = Array.isArray(children)
      ? children.join('')
      : String(children ?? '');
    const id = generateId(text);

    // 给标题添加对应的className，支持传入自定义样式
    return React.createElement(Tag, { id, className, ...rest }, children);
  };

interface ClientMarkdownRendererProps {
  content: string;
}

export default function ClientMarkdownRenderer({
  content,
}: ClientMarkdownRendererProps) {
  useMediumZoom('.medium-zoom-image', [content]);

  const components = {
    code: CodeBlock,
    h1: Heading('h1', 'text-5xl font-extrabold text-white mt-6 mb-4'),
    h2: Heading('h2', 'text-4xl font-extrabold text-white mt-6 mb-3'),
    h3: Heading('h3', 'text-3xl font-bold text-white mt-5 mb-2'),
    h4: Heading('h4', 'text-2xl font-semibold text-white mt-4 mb-2'),
    h5: Heading('h5', 'text-xl font-semibold text-white mt-3 mb-1'),
    h6: Heading('h6', 'text-lg font-semibold text-white mt-2 mb-1'),

    img: ({ src, alt, className = '', ...props }: any) => {
      const imageSrc =
        typeof src === 'string'
          ? src
          : 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/default.jpg';

      return (
        <img
          src={imageSrc}
          alt={alt || '图片'}
          loading="lazy"
          className={`medium-zoom-image rounded-lg shadow-md mx-auto max-w-full h-auto cursor-zoom-in ${className}`}
          {...props}
        />
      );
    },
    video: ({ children, ...props }: any) => {
      return (
        <video
          controls
          muted
          playsInline
          style={{ maxWidth: '100%' }}
          {...props}
        >
          {children}
          您的浏览器不支持视频播放。
        </video>
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
    <div
      id="markdown-root"
      className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 prose prose-cyan dark:prose-invert"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, mySchema]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
