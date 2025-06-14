interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerText = {
    zh: {
      copyright: `© ${currentYear} Cheche博客. 保留所有权利.`,
      builtWith: '基于 Next.js 构建',
      contact: '联系我',
    },
    en: {
      copyright: `© ${currentYear} Cheche Blog. All rights reserved.`,
      builtWith: 'Built with Next.js',
      contact: 'Contact Me',
    },
  };

  const content =
    footerText[locale as keyof typeof footerText] || footerText.en;

  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">{content.copyright}</p>
            <p className="text-xs text-gray-400 mt-1">{content.builtWith}</p>
          </div>

          <div className="flex space-x-6">
            <a
              href={`/${locale}/about`}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {content.contact}
            </a>
            <a
              href="https://github.com"
              className="text-sm text-gray-300 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
