import {
  profileData,
  education,
  experiences,
  featuredProjects,
  skills,
} from './about';

import React from 'react';
import SkeletonScreen from './components/SkeletonScreen';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';

export default function MySelf() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 pt-20 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
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
      </div>
    </div>
  );
}
