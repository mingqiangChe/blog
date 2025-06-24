// c创建支持语法高亮的代码块组件
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode; // 改为可选
  node?: any;
  [key: string]: any;
}

export default function CodeBlock({
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');

  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      style={oneDark}
      showLineNumbers
      PreTag="section"
      {...props}
    >
      {String(children || '').replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
