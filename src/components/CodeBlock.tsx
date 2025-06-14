// c创建支持语法高亮的代码块组件
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rangeParser from 'parse-numeric-range';

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
  const hasMeta = node?.data?.meta;

  const applyHighlights = (applyHighlights: number) => {
    if (hasMeta) {
      const RE = /{([\d,-]+)}/;
      const metadata = node.data.meta?.replace(/\s/g, '');
      const strlineNumbers = RE?.test(metadata) ? RE?.exec(metadata)?.[1] : '0';
      const highlightLines = rangeParser(strlineNumbers || '0');
      const highlight = highlightLines;
      const data = highlight.includes(applyHighlights) ? 'highlight' : null;
      return { data };
    } else {
      return {};
    }
  };

  return hasLang ? (
    <SyntaxHighlighter
      style={oneDark}
      language={hasLang[1]}
      PreTag="div"
      className="codeStyle"
      showLineNumbers={true}
      wrapLines={hasMeta}
      useInlineStyles={true}
      lineProps={applyHighlights}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
