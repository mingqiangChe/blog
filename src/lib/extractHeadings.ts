// 提取标题的工具函数
export interface HeadingItem {
  id: string;
  title: string;
  level: number;
}

export function extractHeadings(markdown: string): HeadingItem[] {
  if (typeof markdown !== 'string') return [];
  const lines = markdown.split('\n');
  const headings: HeadingItem[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.*)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '');
      headings.push({ id, title: text, level });
    }
  }

  return headings;
}
