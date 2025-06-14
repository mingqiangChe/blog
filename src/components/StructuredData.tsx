// 结构化数据支持
// 为不同语言添加JSON-LD结构化数据：
interface StructuredDataProps {
  locale: string;
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'zh' ? 'Cheche博客' : 'Cheche Blog',
    url: `https://your-domain.com/${locale}`,
    description:
      locale === 'zh'
        ? '车明强的个人博客，分享前端技术文章和编程经验'
        : 'Personal blog sharing frontend articles and programming experiences',
    author: {
      '@type': 'Person',
      name: '车明强',
      url: `https://your-domain.com/${locale}/about`,
    },
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
