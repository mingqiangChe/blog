//定义类型
export interface media {
  id: string;
  title: string;
  href: string;
  type: string;
  cover: string;
  year: number;
  desc: string;
  rating: Number;
  tags: string[];
}

export const items: media[] = [
  {
    id: '1',
    title: '非自然死亡',
    href: 'unnaturalDeath',
    type: '电视剧',
    cover:
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/p2554348811.webp',
    year: 2015,
    desc: '《非自然死亡》（日语：アンナチュラル，英语：Unnatural）是日本 TBS 电视台于 2018 年 1 月 12 日至 3 月 16 日在“周五连续剧”时段播出的法医题材电视剧，由石原里美主演[3]，野木亚纪子担任编剧[3]。',
    rating: 6.6,
    tags: ['TV', '悬疑'],
  },
  {
    id: '2',
    title: '七界传说',
    href: 'qijiechuanshuo',
    type: '书籍',
    cover:
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/t6_book_aiqiyi_2298665391711535259.jpg',
    year: 2009,
    desc: '本书讲述一个被上苍诅咒天生残缺一魂一魄的少年陆云，无意中随父入住西蜀归隐寻医，得遇一怪人传授十年修真法诀，后得到六千年前，百世先祖所留之神兵补全残魂和天地无极功法，并进入六院中的易园修炼，从而进入一个神奇的世界。随着陆云修为的加深，也渐渐了解到了所谓的七界传说，并从修真界，逐一进入其余六界，展开了一段神奇诡异，别开生面的旅行。正应了流传千古的预言：玉符现，天地乱，虚无出，七界哭。逆天子，万灭徒，相逢日，七界无。',
    rating: 7.8,
    tags: ['小说'],
  },
  {
    id: '3',
    title: '浪客剑心',
    href: 'rurouniKenshin',
    type: '电影',
    cover:
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%B5%AA%E5%AE%A2%E5%8A%8D%E5%BF%83_%E6%9C%80%E7%B5%82%E7%AB%A0.jpg',
    year: 2009,
    desc: '《浪客剑心》（日文：るろうに剣心），2012年日本电影，为佐藤健主演，根据日本漫画家和月伸宏的同名日本漫画《浪客剑心 -明治剑客浪漫谭-》改编而成的日本电影。2012年8月25日在日本上映[2]。',
    rating: 7.8,
    tags: ['电影'],
  },
  {
    id: '4',
    title: '我与地坛',
    href: 'woyuditan',
    type: '书籍',
    cover:
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/%E6%88%91%E4%B8%8E%E5%9C%B0%E5%9D%9B.jpeg',
    year: 2011,
    desc: '《我与地坛》由中国当代著名作家史铁生著。是史铁生文学作品中，充满哲思又极为人性化的代表作之一。其前第一段和第二段被纳入人民教育出版社的高一教材中。前两部分注重讲地坛和他与母亲的后悔，对于中学生来说，这是一篇令人反思的优秀文章。',
    rating: 9.3,
    tags: ['散文'],
  },
  {
    id: '5',
    title: '愿你的青春 不负梦想',
    href: 'youthDream',
    type: '书籍',
    cover:
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/51fymVoXUWL._SY342_.jpg',
    year: 2017,
    desc: '有人爱 有事做 有所期待',
    rating: 8.3,
    tags: ['青春', '梦想'],
  },
  {
    id: '6',
    title: '古巴比伦最富有的人',
    href: 'theRichestManInAncientBabylon',
    type: '书籍',
    cover:
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/%E5%8F%A4%E5%B7%B4%E6%AF%94%E4%BC%A6%E6%9C%80%E5%AF%8C%E6%9C%89.jpeg',
    year: 2025,
    desc: '古巴比伦最富有的人',
    rating: 8.3,
    tags: ['经济'],
  },
  {
    id: '7',
    title: '短线交易秘诀',
    href: 'shortTermTradingTips',
    type: '书籍',
    cover:
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/51-0hwwWqzL.jpg',
    year: 2025,
    desc: '短线交易秘诀',
    rating: 8.3,
    tags: ['经济'],
  },
  {
    id: '8',
    title: '稳赚',
    href: 'steadyProfit',
    type: '书籍',
    cover:
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/s33870313.jpg',
    year: 2021,
    desc: '如何轻松、科学、持续地获得被动收入',
    rating: 6.1,
    tags: ['经济'],
  },

  {
    id: '9',
    title: '股市长赢之道',
    href: 'howToWinInTheStockMarket',
    type: '书籍',
    cover:
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/s35044492.jpg',
    year: 2024,
    desc: '巴菲特70年超额回报的智慧',
    rating: 7.4,
    tags: ['经济'],
  },
  {
    id: '10',
    title: '我如何从股市赚了200万',
    href: 'howIMade2millionFromTheStockMarket',
    type: '书籍',
    cover:
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/s4572415200%E5%AE%8C.jpg',
    year: 2011,
    desc: '在第18个月，他赚到了200万美元。',
    rating: 7.7,
    tags: ['经济'],
  },
  {
    id: '11',
    title: '股市长线法宝',
    href: 'longTermStockMarketStrategy',
    type: '书籍',
    cover:
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/s28101848%E8%82%A1%E5%B8%82%E5%9C%BA%E5%85%88%E5%8F%91%E5%8C%85.jpg',
    year: 2015,
    desc: '金融危机将对金融市场及未来的股票收益率',
    rating: 7.7,
    tags: ['经济'],
  },
  {
    id: '12',
    title: '交易心理分析',
    href: 'tradingPsychologyAnalysis',
    type: '书籍',
    cover:
      'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/s6298109jiaoyixinli.jpg',
    year: 2011,
    desc: ' 掌控交易不是靠预测市场，而是建立“赢家心态”：自信、纪律和一致性思维。',
    rating: 7.8,
    tags: ['经济'],
  },
];
