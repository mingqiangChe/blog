// c创建支持语法高亮的代码块组件
// components/CodeBlock.tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function CodeBlock({
  node,
  inline,
  className = '',
  children,
  ...props
}: CodeBlockProps) {
  const hasLang = /language-(\w+)/.exec(className || '');

  return hasLang ? (
    <SyntaxHighlighter
      style={oneDark}
      language={hasLang[1]}
      PreTag="div"
      className="rounded-md"
      showLineNumbers={true}
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
