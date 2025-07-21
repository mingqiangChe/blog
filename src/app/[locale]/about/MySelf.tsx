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
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 技能雷达图数据示例
const skills = [
  { label: 'React', value: 70 },
  { label: 'TypeScript', value: 80 },
  { label: 'Vue3', value: 100 },
  { label: 'Tailwind', value: 90 },
  { label: 'Vite', value: 85 },
];

export default function MySelf() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative min-h-screen bg-black text-white font-racing flex flex-col items-center justify-center px-4 pt-24 overflow-hidden">
      {/* 背景部分 */}
      <AE86BackgroundCanvas />
      <div className="absolute inset-0 bg-[url('/hud-grid.png')] bg-repeat opacity-5 mix-blend-screen pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/60 to-black/80 z-0" />

      {/* HUD 主面板 */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl w-full bg-black/60 border border-white/10 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.05)] px-6 py-8 backdrop-blur-sm"
      >
        <h1 className="text-2xl md:text-3xl font-bold tracking-widest mb-6 border-b border-white/10 pb-2 uppercase select-none">
          🏁 DRIVER PROFILE / 驾驶员档案
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 text-sm md:text-base leading-relaxed tracking-wide">
          {[
            { label: '代号 / Handle', value: 'Thomasche / 车明强' },
            { label: '职业 / Role', value: '前端开发 / Frontend Engineer' },
            {
              label: '主武器 / Stack',
              value: 'Vue3 / React / Next.js / TypeScript',
            },
            { label: '副武器 / Tools', value: 'Vite / Tailwind / 部署' },
            { label: '联系 / Email', value: 'thomaschefowshu@gmail.com' },
            { label: '风格 / Style', value: '极简 · 机械质感 · 高效动态交互' },
            {
              label: '爱好 / Interests',
              value: '摄影 · 旅游 · 机车骑行 · 建站开发',
            },
            {
              label: '模式 / Mode',
              value: '长线思考 · 工程优化 · 持续自我迭代',
            },
          ].map((item, i) => (
            <HUDItem
              key={item.label}
              label={item.label}
              value={item.value}
              delay={i * 0.15}
            />
          ))}
        </div>

        {/* 扩展资料开关按钮 */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-8 px-4 py-2 border border-white/20 rounded-md font-mono tracking-wide text-xs uppercase hover:bg-white/10 transition select-none"
          aria-expanded={expanded}
          aria-controls="extra-hud"
        >
          {expanded ? '收起 扩展资料 ▲' : '展开 扩展资料 ▼'}
        </button>

        {/* 扩展资料面板 动画展开 */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              id="extra-hud"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-6 border-t border-white/10 pt-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
                <HUDItem
                  label="驾驶经验 / Experience"
                  value="5年机车与汽车兼修，技术与自由并存"
                />
                <HUDItem
                  label="驾驶模式 / Driving Mode"
                  value="机动灵活 · 稳健高效 · 持续迭代"
                />
                <HUDItem
                  label="最爱赛道 / Favorite Track"
                  value="筑波赛道与无界公路 · AE86精神永续"
                />
                <HUDItem label="座右铭 / Motto" value="永远年轻 永远热泪盈眶" />
              </div>

              {/* 技能雷达图 */}
              <div className="mt-8  flex justify-center">
                <RadarChart skills={skills} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 底部标识 */}
        <div className="mt-10 pt-4 text-xs text-white/40 border-t border-white/10 tracking-wider text-center select-none">
          AE86 SYSTEM ONLINE - PROFILE SYNCED ✔︎
        </div>
      </motion.section>
    </section>
  );
}

// HUD 参数项，带依次浮现动画
function HUDItem({
  label,
  value,
  delay = 0,
}: {
  label: string;
  value: string;
  delay?: number;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-xs text-gray-400 tracking-wider uppercase select-text">
        {label}
      </span>
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: 'easeOut' }}
        className="text-white font-mono text-base select-text"
      >
        {value}
      </motion.span>
    </div>
  );
}

// 简单机械风黑白雷达图

function RadarChart({
  skills,
}: {
  skills: { label: string; value: number }[];
}) {
  const size = 300;
  const center = size / 2;
  const levels = 5;
  const maxValue = 100;
  const angleSlice = (2 * Math.PI) / skills.length;
  const radiusFactor = 0.5; // ✅ 控制图形缩小为 75%，为文字留空间
  const maxRadius = center * radiusFactor;

  // 多层网格
  const polygons = [];
  for (let level = levels; level > 0; level--) {
    const radius = (maxRadius / levels) * level;
    const points = skills
      .map((_, i) => {
        const angle = i * angleSlice - Math.PI / 2;
        return `${center + radius * Math.cos(angle)},${
          center + radius * Math.sin(angle)
        }`;
      })
      .join(' ');
    polygons.push(points);
  }

  // 技能值多边形
  const skillPoints = skills
    .map((skill, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const r = (skill.value / maxValue) * maxRadius;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    })
    .join(' ');

  // 文字标签距离中心的距离
  const labelDistance = center * 0.6;
  const fontSize = 12;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="select-none stroke-white/40"
    >
      {/* 背景多边形层 */}
      {polygons.map((points, i) => (
        <polygon
          key={i}
          points={points}
          stroke="white"
          strokeWidth={1}
          fill="none"
          opacity={0.15 + i * 0.1}
        />
      ))}

      {/* 轴线 */}
      {skills.map((_, i) => {
        const angle = i * angleSlice - Math.PI / 2;
        const x = center + maxRadius * Math.cos(angle);
        const y = center + maxRadius * Math.sin(angle);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="white"
            strokeWidth={1}
            opacity={0.2}
          />
        );
      })}

      {/* 技能图形 */}
      <motion.polygon
        points={skillPoints}
        fill="white"
        opacity={0.2}
        stroke="white"
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* 标签文字 */}
      {skills.map((skill, i) => {
        const angle = i * angleSlice - Math.PI / 2;
        const labelX = center + labelDistance * Math.cos(angle);
        const labelY = center + labelDistance * Math.sin(angle);
        const isRightSide = labelX > center;

        return (
          <text
            key={i}
            x={labelX}
            y={labelY}
            fill="white"
            fontSize={fontSize}
            textAnchor={isRightSide ? 'start' : 'end'}
            dominantBaseline="middle"
            stroke="black"
            strokeWidth={0.3}
            opacity={0.9}
          >
            {skill.label}
          </text>
        );
      })}
    </svg>
  );
}

// AE86漂移背景Canvas组件（线稿+漂移效果）

function AE86BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animationId: number;

    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      const driftX = Math.sin(Date.now() / 1000) * 15;

      const centerX = canvas.width / 2 - 70;
      const centerY = canvas.height / 2 + 60;

      ctx.beginPath();
      ctx.moveTo(centerX + driftX, centerY - 40);
      ctx.lineTo(centerX + 140 + driftX, centerY - 40);
      ctx.lineTo(centerX + 140 + driftX, centerY + 40);
      ctx.lineTo(centerX + driftX, centerY + 40);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX + 30 + driftX, centerY + 45, 18, 0, 2 * Math.PI);
      ctx.arc(centerX + 110 + driftX, centerY + 45, 18, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX + 30 + driftX, centerY - 40);
      ctx.lineTo(centerX + 80 + driftX, centerY);
      ctx.lineTo(centerX + 130 + driftX, centerY - 20);
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
}
