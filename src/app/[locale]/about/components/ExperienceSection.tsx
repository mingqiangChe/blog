import React from 'react';
import styles from './../page.module.css';

interface Experience {
  company: string;
  position: string;
  period: string;
  technologies: string[];
  description: string[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  return (
    <section className="mb-12">
      <h2 className={styles.sectionTitle}>Experience</h2>
      <section className="space-y-6">
        {experiences.map((exp, i) => (
          <section key={i} className={styles.card}>
            <section className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
              <section>
                <h3 className="text-xl font-semibold text-white">
                  {exp.company}
                </h3>
                <p className="text-blue-200">{exp.position}</p>
              </section>
              <span className={styles.period}>{exp.period}</span>
            </section>

            <section className="flex flex-wrap gap-2 mb-4">
              {exp.technologies.map((tech, idx) => (
                <span key={idx} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </section>

            <ul className="space-y-2">
              {exp.description.map((desc, idx) => (
                <li key={idx} className="text-blue-100 flex gap-2">
                  <span className="text-blue-300 mt-1">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </section>
  );
}
