'use client';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import Image from 'next/image';

// 生成稳定 id 的函数（与 extractHeadings 保持一致）
const generateId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function ClientMarkdownRenderer({
  content,
}: {
  content: string;
}) {
  const Heading =
    (Tag: keyof JSX.IntrinsicElements) =>
    ({ children, ...props }: any) => {
      const text = Array.isArray(children)
        ? children.join('')
        : String(children);
      const id = generateId(text);
      return (
        <Tag id={id} {...props}>
          {children}
        </Tag>
      );
    };

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
      return (
        <Image
          src={imageSrc}
          alt={alt || '图片'}
          width={safeWidth}
          height={safeHeight}
          className="rounded-lg shadow-md mx-auto max-w-full h-auto"
          loading="lazy"
          {...restProps}
        />
      );
    },
  };

  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
}
