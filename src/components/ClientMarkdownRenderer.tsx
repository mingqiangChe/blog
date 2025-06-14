// components/ClientMarkdownRenderer.tsx
'use client';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

export default function ClientMarkdownRenderer({
  content,
}: {
  content: string;
}) {
  return (
    <ReactMarkdown components={{ code: CodeBlock }}>{content}</ReactMarkdown>
  );
}
