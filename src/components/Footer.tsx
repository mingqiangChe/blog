interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerText = {
    zh: {
      copyright: `© ${currentYear} Cheche博客. 保留所有权利.`,
      builtWith: '备案号：鲁ICP备2024107635号-1版权所有 © 2024',
      contact: '联系我',
    },
    en: {
      copyright: `© ${currentYear} Cheche Blog. All rights reserved.`,
      builtWith:
        'Record number: Lu ICP No. 2024107635-1Copyright © two thousand and twenty-four',
      contact: 'Contact Me',
    },
  };

  const content =
    footerText[locale as keyof typeof footerText] || footerText.en;

  return (
    <footer className="bg-[var(--ae86-black)] text-[var(--ae86-white)] py-8 border-t border-[var(--ae86-red)] shadow-[0_0_15px_var(--ae86-glow-light)] font-[RacingSans]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="flex flex-col md:flex-row justify-between items-center">
          <section className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm tracking-wide text-[var(--ae86-white)] drop-shadow-[0_0_4px_var(--ae86-red)]">
              {content.copyright}
            </p>
            <p className="text-xs mt-1 text-[var(--ae86-glow)]">
              {content.builtWith}
            </p>
          </section>

          <section className="flex space-x-6">
            <a
              href={`/${locale}/about`}
              className="text-sm text-[var(--ae86-red)] hover:text-[var(--ae86-white)] hover:underline transition-all duration-300 drop-shadow-[0_0_3px_var(--ae86-red)]"
            >
              {content.contact}
            </a>
            <a
              href="https://github.com/mingqiangChe?tab=repositories"
              className="text-sm text-[var(--ae86-red)] hover:text-[var(--ae86-white)] hover:underline transition-all duration-300 drop-shadow-[0_0_3px_var(--ae86-red)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </section>
        </section>
      </section>
    </footer>
  );
}
