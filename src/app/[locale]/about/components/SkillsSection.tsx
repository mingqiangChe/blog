'use client';
import React from 'react';
import styles from './../page.module.css';

interface Skill {
  name: string;
  level: string;
}

interface SkillCategory {
  category: string;
  level: string;
  skills: Skill[];
}

interface SkillsSectionProps {
  skills: SkillCategory[];
}
import { useTranslations, useLocale } from 'next-intl';
export default function SkillsSection({ skills }: SkillsSectionProps) {
  const t = useTranslations('about');
  return (
    <section className="mb-12">
      <h1 className={styles.sectionTitle}> {t('toolsandskills')}</h1>
      <section className={styles.card}>
        <section className="flex flex-wrap gap-4 text-sm mb-6 text-blue-300">
          <span>下划线指示器</span>
          <span className={styles.skillLevel}>经常使用</span>
          <span className="text-blue-400">偶尔使用</span>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, idx) => (
            <section key={idx}>
              <h4 className="text-blue-300 text-sm mb-3">
                {category.category || category.level}
              </h4>
              <section className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className={`${styles.skillTag} ${
                      skill.level === 'often' ? styles.skillLevel : ''
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </section>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
}
