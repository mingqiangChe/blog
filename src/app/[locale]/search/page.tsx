'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { navData } from './tools';

interface Group {
  group: string;
}

// 定义组件 props 类型
interface CategorySelectorProps {
  groups: Group[];
  selectedGroup: string;
  onSelectGroup: (group: string) => void;
}
function CategorySelector({
  groups,
  selectedGroup,
  onSelectGroup,
}: CategorySelectorProps) {
  return (
    <select
      value={selectedGroup}
      onChange={(e) => onSelectGroup(e.target.value)}
      className={styles.select}
    >
      <option value="">全部分组</option>
      {groups.map((g) => (
        <option key={g.group} value={g.group}>
          {g.group}
        </option>
      ))}
    </select>
  );
}

export default function SearchNavPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

  const filteredData = useMemo(() => {
    const groupsToSearch = selectedGroup
      ? navData.filter((group) => group.group === selectedGroup)
      : navData;

    return groupsToSearch
      .map((group) => {
        const filteredItems = group.items.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.desc ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...group, items: filteredItems };
      })
      .filter((group) => group.items.length > 0);
  }, [searchTerm, selectedGroup]);

  return (
    <section className={styles.bg}>
      <section className={styles.layout}>
        {/* 左侧搜索栏 */}
        <aside className={styles.sidebar}>
          <section className={styles.sidebarGlass}>
            <h2 className={styles.sidebarTitle}>搜索工具</h2>
            <input
              type="text"
              placeholder="输入关键词搜索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <CategorySelector
              groups={navData}
              selectedGroup={selectedGroup}
              onSelectGroup={setSelectedGroup}
            />
          </section>
        </aside>
        {/* 右侧工具内容 */}
        <main className={styles.main}>
          {filteredData.length === 0 && (
            <p className={styles.noResult}>没有找到匹配的工具。</p>
          )}
          {filteredData.map((group) => (
            <section key={group.group} className={styles.section}>
              <h2 className={styles.groupTitle}>{group.group}</h2>
              <section className={styles.grid}>
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
                      width={40}
                      height={40}
                      className={styles.icon}
                    />
                    <section>
                      <section className={styles.title}>{item.title}</section>
                      <section className={styles.desc}>
                        {item.desc || '暂无描述'}
                      </section>
                    </section>
                  </a>
                ))}
              </section>
            </section>
          ))}
        </main>
      </section>
    </section>
  );
}
