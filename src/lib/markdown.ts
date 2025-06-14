//Markdown处理工具
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
  tags?: string[]; // 添加标签支持
  author?: string; // 可选：作者信息
  readingTime?: number; // 可选：阅读时间
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

// 计算阅读时间的辅助函数
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // 平均阅读速度（中文按字符计算）
  const words = content.split(/\s+/).length;
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const totalWords = words + chineseChars * 0.5; // 中文字符按0.5个词计算
  return Math.ceil(totalWords / wordsPerMinute);
}

// 处理标签数据的辅助函数
function processTags(tagsData: any): string[] {
  if (!tagsData) return [];

  if (Array.isArray(tagsData)) {
    return tagsData
      .map((tag) => String(tag).trim())
      .filter((tag) => tag.length > 0);
  } else if (typeof tagsData === 'string') {
    // 支持逗号分隔的标签字符串
    return tagsData
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  }

  return [];
}

export function getAllPosts(locale: string): BlogPost[] {
  console.log('🔍 getAllPosts 调用开始');
  console.log('📍 当前工作目录:', process.cwd());
  console.log('📂 博客目录路径:', postsDirectory);
  console.log('🌐 请求的语言:', locale);

  const localeDir = path.join(postsDirectory, locale);
  console.log('📁 语言目录路径:', localeDir);

  // 检查目录是否存在
  if (!fs.existsSync(localeDir)) {
    console.log('❌ 目录不存在:', localeDir);
    console.log('📋 尝试列出父目录内容:');
    try {
      const parentDir = fs.readdirSync(postsDirectory);
      console.log('📋 父目录内容:', parentDir);
    } catch (error) {
      console.log('❌ 无法读取父目录:', error);
    }
    return [];
  }

  console.log('✅ 目录存在，开始读取文件');

  try {
    const fileNames = fs.readdirSync(localeDir);
    console.log('📄 找到的所有文件:', fileNames);

    const mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));
    console.log('📝 Markdown 文件:', mdFiles);

    if (mdFiles.length === 0) {
      console.log('⚠️ 没有找到 .md 文件');
      return [];
    }

    const allPostsData = mdFiles
      .map((fileName) => {
        console.log(`📖 正在处理文件: ${fileName}`);

        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(localeDir, fileName);

        console.log(`📍 文件完整路径: ${fullPath}`);

        try {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          console.log(`📄 文件内容长度: ${fileContents.length} 字符`);

          const matterResult = matter(fileContents);
          console.log(`📋 Front matter 数据:`, matterResult.data);
          console.log(`📝 内容长度: ${matterResult.content.length} 字符`);

          // 处理标签数据
          const tags = processTags(matterResult.data.tags);
          console.log(`🏷️ 处理后的标签:`, tags);

          // 计算阅读时间
          const readingTime = calculateReadingTime(matterResult.content);
          console.log(`⏱️ 计算的阅读时间: ${readingTime} 分钟`);

          // 检查必需字段
          if (!matterResult.data.title) {
            console.log(`⚠️ 警告: ${fileName} 缺少 title 字段`);
          }
          if (!matterResult.data.date) {
            console.log(`⚠️ 警告: ${fileName} 缺少 date 字段`);
          }

          const post = {
            slug,
            locale,
            title: matterResult.data.title || `未命名文章 (${slug})`,
            date: matterResult.data.date || '2025-01-01',
            description: matterResult.data.description || '',
            content: matterResult.content,
            tags,
            author: matterResult.data.author || '',
            readingTime,
          } as BlogPost;

          console.log(`✅ 成功处理文章:`, {
            title: post.title,
            slug: post.slug,
            tags: post.tags,
            author: post.author,
            readingTime: post.readingTime,
          });

          return post;
        } catch (fileError) {
          console.log(`❌ 读取文件失败 ${fileName}:`, fileError);
          return null;
        }
      })
      .filter((post) => post !== null) as BlogPost[];

    console.log(`📊 总共处理了 ${allPostsData.length} 篇文章`);

    // 输出所有文章的摘要信息
    console.log('📋 所有文章摘要:');
    allPostsData.forEach((post, index) => {
      console.log(
        `${index + 1}. ${post.title} (${post.tags?.length || 0} 个标签)`
      );
    });

    // 按日期排序
    const sortedPosts = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
    console.log('📅 文章按日期排序完成');

    return sortedPosts;
  } catch (error) {
    console.log('❌ 读取目录失败:', error);
    return [];
  }
}

export async function getPostBySlug(
  slug: string,
  locale: string
): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, locale, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // 不在这里转换为HTML，保持Markdown格式
    const post = {
      slug,
      locale,
      title: matterResult.data.title || `未命名文章 (${slug})`,
      date: matterResult.data.date || '2025-01-01',
      description: matterResult.data.description || '',
      content: matterResult.content, // 保持Markdown格式
      tags: processTags(matterResult.data.tags),
      author: matterResult.data.author || '',
      readingTime: calculateReadingTime(matterResult.content),
    };

    return post;
  } catch (error) {
    console.log('❌ getPostBySlug 处理失败:', error);
    return null;
  }
}

// 根据标签获取文章的辅助函数
export function getPostsByTag(tag: string, locale: string): BlogPost[] {
  console.log(`🏷️ 根据标签获取文章: ${tag} (${locale})`);

  const allPosts = getAllPosts(locale);
  const taggedPosts = allPosts.filter((post) =>
    post.tags?.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );

  console.log(`📊 找到 ${taggedPosts.length} 篇带有标签 "${tag}" 的文章`);
  return taggedPosts;
}

// 获取所有标签的辅助函数
export function getAllTags(locale: string): { tag: string; count: number }[] {
  console.log(`🏷️ 获取所有标签 (${locale})`);

  const allPosts = getAllPosts(locale);
  const tagCount: { [key: string]: number } = {};

  allPosts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });

  const sortedTags = Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  console.log(`📊 找到 ${sortedTags.length} 个不同的标签`);
  return sortedTags;
}

// 添加一个辅助函数来检查目录结构
export function debugDirectoryStructure(): void {
  console.log('🔍 调试目录结构');
  console.log('📍 当前工作目录:', process.cwd());

  const contentDir = path.join(process.cwd(), 'src/content');
  console.log('📂 src/content 目录:', contentDir);

  if (fs.existsSync(contentDir)) {
    console.log('✅ src/content 目录存在');
    const contentFiles = fs.readdirSync(contentDir);
    console.log('📋 src/content 目录内容:', contentFiles);

    const blogDir = path.join(contentDir, 'blog');
    if (fs.existsSync(blogDir)) {
      console.log('✅ blog 目录存在');
      const blogFiles = fs.readdirSync(blogDir);
      console.log('📋 blog 目录内容:', blogFiles);

      // 检查每个语言目录
      blogFiles.forEach((item) => {
        const itemPath = path.join(blogDir, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
          console.log(`📁 语言目录 ${item}:`);
          const langFiles = fs.readdirSync(itemPath);
          console.log(`📋 ${item} 目录内容:`, langFiles);

          // 检查每个文件的基本信息
          langFiles.forEach((file) => {
            if (file.endsWith('.md')) {
              const filePath = path.join(itemPath, file);
              try {
                const content = fs.readFileSync(filePath, 'utf8');
                const matterResult = matter(content);
                console.log(
                  `📄 ${file}: 标题="${
                    matterResult.data.title
                  }", 标签=${JSON.stringify(matterResult.data.tags)}`
                );
              } catch (error) {
                console.log(`❌ 无法读取 ${file}:`, error.message);
              }
            }
          });
        }
      });
    } else {
      console.log('❌ blog 目录不存在');
    }
  } else {
    console.log('❌ src/content 目录不存在');
  }
}
