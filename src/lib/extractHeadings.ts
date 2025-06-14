// 提取标题的工具函数
export interface HeadingItem {
  id: string;
  title: string;
  level: number;
}

export function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  const usedIds = new Set<string>();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    let id = generateId(title);

    // 如果id为空或重复，生成唯一id
    if (!id || usedIds.has(id)) {
      id = generateUniqueId(id || 'heading', usedIds);
    }

    usedIds.add(id);
    headings.push({ id, title, level });
  }

  return headings;
}

// 生成id，传入的是字符串标题
function generateId(title: string): string {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 去除非字母数字、空格、短横线
    .trim()
    .replace(/\s+/g, '-'); // 空格替换为短横线
}

function generateUniqueId(baseId: string, usedIds: Set<string>): string {
  let uniqueId = baseId;
  let counter = 1;
  while (usedIds.has(uniqueId)) {
    uniqueId = `${baseId}-${counter}`;
    counter++;
  }
  return uniqueId;
}
