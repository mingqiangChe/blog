'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; // 新增
import Image from 'next/image';
import CodeBlock from './CodeBlock';

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

export default function ClientMarkdownRenderer({
  content,
}: {
  content: string;
}) {
  const components = {
    code: CodeBlock,
    h1: Heading('h1'),
    h2: Heading('h2'),
    h3: Heading('h3'),
    h4: Heading('h4'),
    h5: Heading('h5'),
    h6: Heading('h6'),
    img: ({ src, alt, ...props }: any) => {
      const { width, height, ...restProps } = props;
      const imageSrc =
        typeof src === 'string'
          ? src
          : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';
      const safeWidth = Number(width) || 800;
      const safeHeight = Number(height) || 600;

      return React.createElement(Image, {
        src: imageSrc,
        alt: alt || '图片',
        width: safeWidth,
        height: safeHeight,
        className: 'rounded-lg shadow-md mx-auto max-w-full h-auto',
        loading: 'lazy',
        ...restProps,
      });
    },
  };

  return (
    <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
      {content}
    </ReactMarkdown>
  );
}
