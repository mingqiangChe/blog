import {
  profileData,
  education,
  experiences,
  featuredProjects,
  skills,
} from './about';
import React from 'react';
import dynamic from 'next/dynamic';
const SkeletonScreen = dynamic(() => import('./components/SkeletonScreen'), {
  loading: () => <p>正在加载...</p>, // 可选：加载时的占位内容
});
const SkillsSection = dynamic(() => import('./components/SkillsSection'), {
  loading: () => <p>正在加载...</p>, // 可选：加载时的占位内容
});
const ProjectsSection = dynamic(() => import('./components/ProjectsSection'), {
  loading: () => <p>正在加载...</p>, // 可选：加载时的占位内容
});
const EducationSection = dynamic(
  () => import('./components/EducationSection'),
  {
    loading: () => <p>正在加载...</p>, // 可选：加载时的占位内容
  }
);
const ExperienceSection = dynamic(
  () => import('./components/ExperienceSection'),
  {
    loading: () => <p>正在加载...</p>, // 可选：加载时的占位内容
  }
);
export default function MySelf() {
  // console.log('当前语言:', locale);

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 pt-20 overflow-x-hidden">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* 个人信息 */}
        <SkeletonScreen profileData={profileData} />

        {/* 教育背景 */}
        <EducationSection education={education} />
        {/* 技能部分 */}
        <SkillsSection skills={skills} />
        {/* 工作经验 */}
        <ExperienceSection experiences={experiences} />

        {/* 项目部分 */}
        <ProjectsSection
          featuredProjects={featuredProjects.map((item) => ({
            title: item.name,
            description: item.description,
            technologies: item.technologies,
            link: item.link ?? '',
          }))}
        />
      </section>
    </section>
  );
}
