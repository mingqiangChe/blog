import type { Metadata } from 'next';
import Image from 'next/image';
export const metadata: Metadata = {
  title: '工具列表',
  description: '便捷工具',
};
import React from 'react';
import styles from './page.module.css';
import { navData } from './tools';


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
