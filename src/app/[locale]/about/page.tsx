import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我',
  description: '车明强个人信息',
};
import React from 'react';
import styles from './page.module.css';

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

const profileData = {
  name: '车明强',
  title: 'Front-End Developer · UI/UX Designer',
  location: '广州',
  email: 'thomaschefowshu@gmail.com',
  socialLinks: [
    { platform: '个人网站', url: 'https://thomasche.top/', icon: '🌐' },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/%E6%98%8E%E5%BC%BA-%E8%BD%A6-7817bb36b/',
      icon: '💼',
    },
    { platform: 'GitHub', url: 'https://github.com/mingqiangChe', icon: '🐱' },
    { platform: 'Twitter', url: 'https://x.com/thomascche', icon: '🐦' },
  ],
};

const education = [
  {
    school: '长春工业大学',
    degree: '工商管理',
    period: '2022.03 - 2024.07',
  },
  {
    school: '山东经贸职业学院',
    degree: '计算机应用技术',
    period: '2017.09 - 2020.06',
  },
];

const experiences: ExperienceItem[] = [
  {
    company: '山东程序智能科技有限公司（自研）',
    position: '前端开发工程师',
    period: '2024.06 - 2025.01',
    description: [
      '负责官网及子系统项目搭建与优化，使用Vue3和TypeScript。',
      '封装核心组件，提升代码复用性。',
      '优化路由懒加载和资源预加载，减少包体积。',
      '利用Vuex实现全局状态管理，优化加载体验。',
    ],
    technologies: ['Vue3', 'TypeScript', 'Vuex', 'Vite'],
  },
  {
    company: '上海微创软件股份有限公司深圳分公司 (外包腾讯)',
    position: '前端开发工程师',
    period: '2023.04 - 2024.05',
    description: [
      '管理和维护多技术栈项目，兼容JS、JQuery、Vue2。',
      '推动CI/CD流程自动化，提升代码质量。',
      '重构项目架构，迁移至Vue2/Vue3。',
      '使用Qiankun实现微前端架构。',
    ],
    technologies: ['Vue2', 'Vue3', 'JS', 'JQuery', 'Qiankun', 'CI/CD'],
  },
  {
    company: '城迈科技（南京）股份有限公司 （外包oppo）',
    position: '前端开发工程师',
    period: '2022.03 - 2023.04',
    description: [
      '参与oppo开放平台官网开发，整合多功能模块。',
      '实现应用推广和商业变现支持。',
      '维护多端适配和性能优化。',
    ],
    technologies: ['微前端', 'Qiankun', 'Vue', 'Webpack'],
  },
  {
    company: '深圳华启天成智能科技有限公司 （自研）',
    position: '前端开发工程师',
    period: '2021.05 - 2022.03',
    description: [
      '负责基于角色权限的商品数据分析与管理系统开发。',
      '实现实时数据可视化，支持多方协作。',
      '设计基于RBAC的权限管理系统。',
      '搭建RESTful API服务，集成JWT身份验证。',
      '完成项目容器化部署和运维。',
    ],
    technologies: ['Vue2', 'Node.js', 'Express', 'MySQL', 'Docker', 'Echarts'],
  },
];

const featuredProjects: ProjectItem[] = [
  {
    name: '鲁班工程学院系列官网及子系统',
    description:
      '山东鲁班工程职业学院的官方网站及多个子系统，包括图书馆网站、鲁班工匠城、接待后台和OA审批系统。项目采用Vue3和TypeScript开发，优化路由懒加载和资源预加载，提升性能。封装核心组件，支持后台快速配置，极大提升了开发效率和用户体验。',
    technologies: ['Vue3', 'TypeScript', 'Vuex', 'Vite', 'RuoYi', 'FlyFlow'],
    link: 'https://sdlb.cc/', // 你可以替换为项目实际地址
  },
  {
    name: 'oppo开放平台官网微前端项目',
    description:
      '基于Qiankun微前端框架，实现多技术栈（JS、JQuery、Vue2、Vue3）功能模块的独立开发和部署。推动CI/CD自动化流程，提升代码质量和团队协作效率。完成项目架构重构，提升系统灵活性和可维护性。',
    technologies: ['Qiankun', 'Vue2', 'Vue3', 'JQuery', 'JavaScript', 'CI/CD'],
    link: 'https://open.oppomobile.com/', // 替换为实际链接
  },
  {
    name: '华启天成智能科技商品数据分析系统',
    description:
      '基于角色权限的商品数据分析与管理系统，支持实时数据可视化和多方协作。设计并实现RBAC权限控制，保障系统安全。使用Node.js和Express搭建RESTful API，采用Docker容器化部署，确保系统稳定高效运行。',
    technologies: ['Vue2', 'Node.js', 'Express', 'MySQL', 'Echarts', 'Docker'],
    link: '', // 替换为实际链接
  },
];
interface Skill {
  name: string;
  level: 'often' | 'sometimes'; // 标记经常使用或偶尔使用
}

interface SkillCategory {
  category: string;
  level:
    | 'FE-related'
    | 'BE-related'
    | 'UI-related'
    | 'Code-related'
    | 'Designer-related';
  skills: Skill[];
}

const skills: SkillCategory[] = [
  {
    category: 'Languages',
    level: 'FE-related',
    skills: [
      { name: 'HTML', level: 'often' },
      { name: 'CSS/SCSS', level: 'often' },
      { name: 'TypeScript', level: 'often' },
      { name: 'JavaScript', level: 'often' },
    ],
  },
  {
    category: '',
    level: 'BE-related',
    skills: [{ name: 'SQL', level: 'sometimes' }],
  },
  {
    category: 'Technologies',
    level: 'UI-related',
    skills: [
      { name: 'Tailwind CSS', level: 'often' },
      { name: 'Element UI', level: 'often' },
      { name: 'uni UI', level: 'often' },
    ],
  },
  {
    category: '',
    level: 'FE-related',
    skills: [
      { name: 'React', level: 'sometimes' },
      { name: 'Next.js', level: 'sometimes' },
      { name: 'Vue3', level: 'often' },
    ],
  },
  {
    category: '',
    level: 'BE-related',
    skills: [
      { name: 'Express', level: 'sometimes' },
      { name: 'MongoDB', level: 'sometimes' },
    ],
  },
  {
    category: 'Tools & Softwares',
    level: 'Code-related',
    skills: [
      { name: 'VS Code', level: 'often' },
      { name: 'Cursor', level: 'often' },
      { name: 'Git', level: 'often' },
      { name: 'apifox', level: 'often' },
    ],
  },
  {
    category: '',
    level: 'Designer-related',
    skills: [
      { name: 'Figma', level: 'often' },
      { name: '蓝湖', level: 'often' },
    ],
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 个人信息头部 */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            {profileData.name}
          </h1>
          <p className="text-xl text-blue-100 mb-6">{profileData.title}</p>

          <div className="flex items-center justify-center gap-6 text-blue-100 mb-8">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✉️</span>
              <span>{profileData.email}</span>
            </div>
          </div>

          {/* 社交链接 */}
          <div className="flex justify-center gap-4">
            {profileData.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
              >
                <span>{link.icon}</span>
                <span className="text-sm">{link.platform}</span>
              </a>
            ))}
          </div>
        </header>

        {/* 教育背景 */}
        <section className="mb-12">
          <h2 className={styles.sectionTitle}>Education</h2>
          {education.map((edu, index) => (
            <div key={edu.school + index} className={styles.card}>
              <div className="flex justify-between items-start mb-2">
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
            {experiences.map((exp, index) => (
              <div key={exp.company + index} className={styles.card}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {exp.company}
                    </h3>
                    <p className="text-blue-200">{exp.position}</p>
                  </div>
                  <span className={styles.period}>{exp.period}</span>
                </div>

                {/* 技术标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={tech + techIndex} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 工作描述 */}
                <ul className="space-y-2">
                  {exp.description.map((desc, descIndex) => (
                    <li
                      key={desc + descIndex}
                      className="text-blue-100 flex items-start gap-2"
                    >
                      <span className="text-blue-300 mt-1">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 特色项目 */}
        <section className="mb-12">
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className="space-y-8">
            {featuredProjects.map((project, idx) => (
              <div key={project.name + idx} className={styles.card}>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {project.name}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={tech + index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-blue-100 leading-relaxed mb-4">
                  {project.description}
                </p>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 transition-colors"
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
            <div className="flex gap-6 text-sm mb-6">
              <span className="text-blue-300">下划线指示器</span>
              <span className={styles.skillLevel}>经常使用</span>
              <span className="text-blue-400">偶尔使用</span>
            </div>

            {/* Languages */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Languages
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-blue-300 text-sm mb-3">FE-related</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .find((s) => s.category === 'Languages')
                      ?.skills.map((skill, index) => (
                        <span
                          key={skill.name + index}
                          className={`${styles.skillTag} ${
                            skill.level === 'often' ? styles.skillLevel : ''
                          }`}
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-blue-300 text-sm mb-3">BE-related</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .find(
                        (s) => s.level === 'BE-related' && s.category === ''
                      )
                      ?.skills.slice(0, 2)
                      .map((skill, index) => (
                        <span
                          key={skill.name + index}
                          className={`${styles.skillTag} ${
                            skill.level === 'often' ? styles.skillLevel : ''
                          }`}
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Technologies
              </h3>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h4 className="text-blue-300 text-sm mb-3">UI-related</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .find((s) => s.level === 'UI-related')
                      ?.skills.map((skill, index) => (
                        <span
                          key={skill.name + index}
                          className={`${styles.skillTag} ${
                            skill.level === 'often' ? styles.skillLevel : ''
                          }`}
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-blue-300 text-sm mb-3">FE-related</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .find(
                        (s) => s.level === 'FE-related' && s.category === ''
                      )
                      ?.skills.map((skill, index) => (
                        <span
                          key={skill.name + index}
                          className={`${styles.skillTag} ${
                            skill.level === 'often' ? styles.skillLevel : ''
                          }`}
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-blue-300 text-sm mb-3">BE-related</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter(
                        (s) => s.level === 'BE-related' && s.category === ''
                      )
                      .slice(1)
                      .map((group) =>
                        group.skills.map((skill, index) => (
                          <span
                            key={skill.name + index}
                            className={styles.skillTag}
                          >
                            {skill.name}
                          </span>
                        ))
                      )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tools & Softwares */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Tools & Softwares
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-blue-300 text-sm mb-3">Code-related</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .find((s) => s.level === 'Code-related')
                      ?.skills.map((skill, index) => (
                        <span
                          key={skill.name + index}
                          className={`${styles.skillTag} ${
                            skill.level === 'often' ? styles.skillLevel : ''
                          }`}
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-blue-300 text-sm mb-3">
                    Designer-related
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .find((s) => s.level === 'Designer-related')
                      ?.skills.map((skill, index) => (
                        <span
                          key={skill.name + index}
                          className={`${styles.skillTag} ${
                            skill.level == 'often' ? styles.skillLevel : ''
                          }`}
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
