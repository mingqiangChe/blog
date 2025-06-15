'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import CodeBlock from './CodeBlock';

// 生成稳定 id 的函数
const generateId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');

type HeadingProps = {
  children?: React.ReactNode;
  [key: string]: any;
};

// Heading 组件工厂，不使用 JSX，改用 React.createElement
const Heading = (Tag: keyof HTMLElementTagNameMap) => (props: HeadingProps) => {
  const { children, ...rest } = props;
  const text = Array.isArray(children)
    ? children.join('')
    : String(children ?? '');
  const id = generateId(text);
  return React.createElement(Tag, { id, ...rest }, children);
};

type ClientMarkdownRendererProps = {
  content: string;
};

export default function ClientMarkdownRenderer({
  content,
}: ClientMarkdownRendererProps) {
  // 自定义 ReactMarkdown 渲染组件映射，img 也用 React.createElement 包装
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

      // 注意：next/image 组件仍然是 React 组件，这里用 React.createElement 调用
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

  return React.createElement(ReactMarkdown, { components }, content);
}
