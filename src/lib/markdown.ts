// lib/markdown.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description?: string;
  content: string;
  locale: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPosts(locale: string): BlogPost[] {
  const localeDir = path.join(postsDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDir);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(localeDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        locale,
        title: matterResult.data.title,
        date: matterResult.data.date,
        description: matterResult.data.description,
        content: matterResult.content,
      } as BlogPost;
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(
  slug: string,
  locale: string
): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, locale, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
      slug,
      locale,
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
      content: contentHtml,
    };
  } catch (error) {
    return null;
  }
}
