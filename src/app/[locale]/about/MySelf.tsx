import React from 'react';
import styles from './page.module.css';
import {
  profileData,
  education,
  experiences,
  featuredProjects,
  skills,
} from './about';
export default function MySelf() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 pt-20 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* 个人信息 */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {profileData.name}
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-6">
            {profileData.title}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-blue-100 mb-6">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✉️</span>
              <span>{profileData.email}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {profileData.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full text-white hover:bg-white/30 text-sm transition-all flex items-center gap-2"
              >
                <span>{link.icon}</span>
                <span>{link.platform}</span>
              </a>
            ))}
          </div>
        </header>

        {/* 教育背景 */}
        <section className="mb-12">
          <h2 className={styles.sectionTitle}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} className={styles.card}>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
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
        </section>

        {/* 工作经验 */}
        <section className="mb-12">
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i} className={styles.card}>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {exp.company}
                    </h3>
                    <p className="text-blue-200">{exp.position}</p>
                  </div>
                  <span className={styles.period}>{exp.period}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="text-blue-100 flex gap-2">
                      <span className="text-blue-300 mt-1">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 项目 */}
        <section className="mb-12">
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className="space-y-8">
            {featuredProjects.map((proj, i) => (
              <div key={i} className={styles.card}>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {proj.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.technologies.map((tech, idx) => (
                    <span key={idx} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-blue-100 leading-relaxed mb-4">
                  {proj.description}
                </p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 transition"
                  >
                    🔗 查看项目详情
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 技能 */}
        <section className="mb-12">
          <h2 className={styles.sectionTitle}>Skills & Tools</h2>
          <div className={styles.card}>
            <div className="flex flex-wrap gap-4 text-sm mb-6 text-blue-300">
              <span>下划线指示器</span>
              <span className={styles.skillLevel}>经常使用</span>
              <span className="text-blue-400">偶尔使用</span>
            </div>

            {/* 分类展示 */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((category, idx) => (
                <div key={idx}>
                  <h4 className="text-blue-300 text-sm mb-3">
                    {category.category || category.level}
                  </h4>
                  <div className="flex flex-wrap gap-2">
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
