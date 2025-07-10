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
    // 启用图片放大，仅针对原生 <img>
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
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}
