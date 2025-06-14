// c创建支持语法高亮的代码块组件
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';
interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function CodeBlock({
  inline,
  className,
  children,
}: ReactMarkdownProps['components']['code']) {
  const match = /language-(\w+)/.exec(className || '');

  if (inline) {
    return <code className={className}>{children}</code>;
  }

  return match ? (
    <SyntaxHighlighter language={match[1]} style={oneDark} showLineNumbers>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className}>{children}</code>
  );
}
