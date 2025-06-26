'use client';
import React from 'react';
import styles from './../page.module.css';

interface Education {
  school: string;
  degree: string;
  period: string;
}

interface EducationSectionProps {
  education: Education[];
}
import { useTranslations, useLocale } from 'next-intl';
export default function EducationSection({ education }: EducationSectionProps) {
  const t = useTranslations('about');
  return (
    <section className="mb-12">
      <h1 className={styles.sectionTitle}>{t('education')}</h1>
      <section className="space-y-6">
        {education.map((edu, i) => (
          <section key={i} className={styles.card}>
            <section className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
              <section>
                <h2 className="text-xl font-semibold text-white">
                  {edu.school}
                </h2>
                <p className="text-blue-200">{edu.degree}</p>
              </section>
              <span className={styles.period}>{edu.period}</span>
            </section>
          </section>
        ))}
      </section>
    </section>
  );
}
