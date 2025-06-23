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

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="mb-12">
      <h2 className={styles.sectionTitle}>Education</h2>
      <div className="space-y-6">
        {education.map((edu, i) => (
          <div key={i} className={styles.card}>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {edu.school}
                </h3>
                <p className="text-blue-200">{edu.degree}</p>
              </div>
              <span className={styles.period}>{edu.period}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
