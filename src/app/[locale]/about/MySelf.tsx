// import {
//   profileData,
//   education,
//   experiences,
//   featuredProjects,
//   skills,
// } from './about';
// import React from 'react';
// import dynamic from 'next/dynamic';
// import SkeletonPlaceholder from '@/components/SkeletonBlogList';
// const SkeletonScreen = dynamic(() => import('./components/SkeletonScreen'), {
//   loading: () => <SkeletonPlaceholder />,
// });
// const SkillsSection = dynamic(() => import('./components/SkillsSection'), {
//   loading: () => <SkeletonPlaceholder />,
// });
// const ProjectsSection = dynamic(() => import('./components/ProjectsSection'), {
//   loading: () => <SkeletonPlaceholder />,
// });
// const EducationSection = dynamic(
//   () => import('./components/EducationSection'),
//   {
//     loading: () => <SkeletonPlaceholder />,
//   }
// );
// const ExperienceSection = dynamic(
//   () => import('./components/ExperienceSection'),
//   {
//     loading: () => <SkeletonPlaceholder />,
//   }
// );
// export default function MySelf() {
//   // console.log('当前语言:', locale);

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 pt-20 overflow-x-hidden">
//       <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
//         {/* 个人信息 */}
//         <SkeletonScreen profileData={profileData} />

//         {/* 教育背景 */}
//         <EducationSection education={education} />
//         {/* 技能部分 */}
//         <SkillsSection skills={skills} />
//         {/* 工作经验 */}
//         <ExperienceSection experiences={experiences} />

//         {/* 项目部分 */}
//         <ProjectsSection
//           featuredProjects={featuredProjects.map((item) => ({
//             title: item.name,
//             description: item.description,
//             technologies: item.technologies,
//             link: item.link ?? '',
//           }))}
//         />
//       </section>
//     </section>
//   );
// }
'use client';
import Image from 'next/image';

export default function MySelf() {
  return (
    <section className="bg-white min-h-screen flex flex-col justify-center items-center px-4 pt-20 relative overflow-hidden">
      {/* 中间图像：固定尺寸，始终居中 */}
      <section className="relative w-99 h-99 mb-12">
        <Image
          src="https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%91%84%E5%BD%B1%E7%94%B7%E7%94%9F.png"
          alt="photographer & coder"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* 简介区 */}
      <section className="max-w-xl text-center text-gray-600 text-base md:text-lg leading-relaxed tracking-wide z-10">
        我是一位热爱编程与摄影的创造者，用代码构建逻辑世界，也热衷用镜头记录生活的光影瞬间。
      </section>
    </section>
  );
}
