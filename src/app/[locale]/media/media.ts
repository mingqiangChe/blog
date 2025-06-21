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
    desc: '特案类烧脑犯罪剧',
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
    desc: '作者：心梦无痕',
    rating: 7.8,
    tags: ['小说', '仙侠'],
  },
];
