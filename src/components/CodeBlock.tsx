import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
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
  const code = String(children || '').replace(/\n$/, '');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return match ? (
    <div className="relative group">
      <SyntaxHighlighter
        language={match[1]}
        style={oneDark}
        showLineNumbers
        PreTag="section"
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1rem',
          fontSize: '0.875rem',
        }}
        {...props}
      >
        {code}
      </SyntaxHighlighter>

      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-all"
      >
        {copied ? '已复制' : '复制'}
      </button>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
