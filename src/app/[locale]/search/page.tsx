import type { Metadata } from 'next';
import Image from 'next/image';
export const metadata: Metadata = {
  title: '工具列表',
  description: '便捷工具',
};
import React from 'react';
import styles from './page.module.css';

type NavItem = {
  icon: string; // 图标URL或本地SVG
  title: string;
  url: string;
  desc?: string;
};

type NavGroup = {
  group: string;
  items: NavItem[];
};

const navData: NavGroup[] = [
  {
    group: '常用',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/786768.jpg',
        title: 'x',
        url: 'https://x.com/home',
        desc: '世界',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/uyttuyt.jpeg',
        title: 'telegram',
        url: 'https://web.telegram.org/k/',
        desc: '世界',
      },

      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/765575g.png',
        title: 'youtube',
        url: 'https://www.youtube.com/',
        desc: '观看影片',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/5644654654.png',
        title: 'perplexity',
        url: 'https://www.perplexity.ai/',
        desc: '韩国ai pro一年',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/5644654654.png',
        title: 'ins',
        url: 'https://www.instagram.com/eallion',
        desc: 'ins',
      },
    ],
  },

  {
    group: 'ai',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/5644654654.png',
        title: 'perplexity',
        url: 'https://www.perplexity.ai/',
        desc: '韩国ai pro一年',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/765576557576.jpeg',
        title: 'claude',
        url: 'https://claude.ai/new',
        desc: '代码方面ai',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/65765765765.jpeg',
        title: 'chatgpt',
        url: 'https://chatgpt.com/',
        desc: 'chatgpt',
      },
    ],
  },
  {
    group: '开发',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/5464654564.png',
        title: 'github',
        url: 'https://github.com/',
        desc: 'github',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/756775g.jpeg',
        title: 'nextjs',
        url: 'https://nextjs.org/',
        desc: 'nextjs react',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/765757756ffgh.png',
        title: '阿里云',
        url: 'https://home.console.aliyun.com/home/dashboard/ProductAndService',
        desc: '服务器',
      },
    ],
  },
  {
    group: '观看影片',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E4%B8%8B%E8%BD%BD.png',
        title: 'bilibili',
        url: 'https://www.bilibili.com/',
        desc: '观看影片',
      },
      {
        icon: 'https://www.iyf.tv/assets/images/player_logo.png',
        title: '爱壹帆',
        url: 'https://www.iyf.tv/',
        desc: '观看影片',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/765575g.png',
        title: 'youtube',
        url: 'https://www.youtube.com/',
        desc: '观看影片',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/765575g.png',
        title: 'vidhub',
        url: 'https://vidhub.me/',
        desc: '在线观看视频库',
      },
    ],
  },
  {
    group: '金融',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/576575dsse.png',
        title: '币安',
        url: 'https://www.binance.com/zh-CN/my/dashboard',
        desc: '比特币',
      },
    ],
  },
  {
    group: '设计',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/565765.png',
        title: 'figma',
        url: 'https://www.figma.com/',
        desc: '软件原型设计',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/56456633gg.jpeg',
        title: '蓝湖',
        url: 'https://lanhuapp.com/',
        desc: '软件原型设计',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/56456633gg.jpeg',
        title: '站酷',
        url: 'https://www.zcool.com.cn/',
        desc: '图片素材',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/56456633gg.jpeg',
        title: '熊猫压缩',
        url: 'https://tinypng.com/',
        desc: '图片压缩',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/56456633gg.jpeg',
        title: '颜色识别',
        url: 'https://color.eallion.com/',
        desc: '认识颜色',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/56456633gg.jpeg',
        title: '紫薇学习',
        url: 'https://iztro.com/',
        desc: '紫薇学习',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/56456633gg.jpeg',
        title: '全网热点',
        url: 'https://hot.eallion.com/#/',
        desc: '全网热点',
      },
    ],
  },

  {
    group: '摄影机器',
    items: [
      {
        icon: 'https://www.nikon-asia.com/media/logo/websites/17/Symbol_100x100mm.jpg',
        title: 'Nikon Asia',
        url: 'https://www.nikon-asia.com',
        desc: '尼康亚洲官网',
      },
      {
        icon: 'https://instax.com/common2/img/common/footer_logo_01.svg',
        title: '富士',
        url: 'https://instax.com',
        desc: '富士拍立得全球官网',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/gjj776.png',
        title: '索尼',
        url: 'https://alphauniverse.com',
        desc: '索尼官网',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E4%B8%8B%E8%BD%BD.jpeg',
        title: '佳能',
        url: 'https://www.canon.com.cn/',
        desc: '佳能官网',
      },
    ],
  },
];

export default function SearchNavPage() {
  return (
    <div className={`${styles.bg}`}>
      <div className={styles.container}>
        {navData.map((group) => (
          <section key={group.group} className={styles.section}>
            <h2 className={styles.groupTitle}>{group.group}</h2>
            <div className={styles.grid}>
              {group.items.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  className={styles.card}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={32}
                    height={32}
                    className={styles.icon}
                  />
                  <div>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.desc}>{item.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
