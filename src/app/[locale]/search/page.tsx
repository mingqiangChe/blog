import type { Metadata } from 'next';

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
        icon: 'https://www.iyf.tv/assets/images/player_logo.png',
        title: '爱壹帆',
        url: 'https://www.iyf.tv/',
        desc: '观看影片',
      },
      {
        icon: 'https://www.iyf.tv/assets/images/player_logo.png',
        title: '爱壹帆1',
        url: 'https://www.iyf.tv/',
        desc: '观看影片',
      },
    ],
  },
  {
    group: '社交',
    items: [
      {
        icon: '/icons/twitter.svg',
        title: 'Twitter X',
        url: 'https://twitter.com',
        desc: "It's what's happening.",
      },
      // ...更多
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
                  <img
                    src={item.icon}
                    alt={item.title}
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
