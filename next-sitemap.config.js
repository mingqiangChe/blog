/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://thomasche.top',
  generateRobotsTxt: true,
  outDir: './public',
  additionalPaths: async (config) => [
    { loc: '/' },
    { loc: '/blog' },
    { loc: '/search' },
    { loc: '/media' },
    { loc: '/album' },
    { loc: '/milestone' },
    { loc: '/about' },
  ],
};
