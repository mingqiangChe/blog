// 提取标题的工具函数
export interface HeadingItem {
  id: string;
  title: string;
  level: number;
}

export function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  const usedIds = new Set<string>(); // 跟踪已使用的id
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    let id = generateId(title);

    // 如果id为空或已存在，生成唯一id
    if (!id || usedIds.has(id)) {
      id = generateUniqueId(title, usedIds, headings.length);
    }

    usedIds.add(id);
    headings.push({ id, title, level });
  }

  return headings;
}

function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, ''); // 移除开头和结尾的短横线
}

function generateUniqueId(
  title: string,
  usedIds: Set<string>,
  index: number
): string {
  let baseId = generateId(title);

  // 如果基础id为空，使用默认格式
  if (!baseId) {
    baseId = `heading-${index + 1}`;
  }

  // 如果id已存在，添加数字后缀
  let counter = 1;
  let uniqueId = baseId;

  while (usedIds.has(uniqueId)) {
    uniqueId = `${baseId}-${counter}`;
    counter++;
  }

  return uniqueId;
}
