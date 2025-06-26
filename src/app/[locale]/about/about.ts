export interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Skill {
  name: string;
  level: 'often' | 'sometimes';
}

export interface SkillCategory {
  category: string;
  level:
    | 'FE-related'
    | 'BE-related'
    | 'UI-related'
    | 'Code-related'
    | 'Designer-related';
  skills: Skill[];
}

export const profileData = {
  name: '车明强',
  title: '全栈开发工程师',
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

export const education = [
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

export const experiences: ExperienceItem[] = [
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

export const featuredProjects: ProjectItem[] = [
  {
    name: '鲁班工程学院系列官网及子系统',
    description:
      '山东鲁班工程职业学院的官方网站及多个子系统，包括图书馆网站、鲁班工匠城、接待后台和OA审批系统。',
    technologies: ['Vue3', 'TypeScript', 'Vuex', 'Vite', 'RuoYi', 'FlyFlow'],
    link: 'https://sdlb.cc/',
  },
  {
    name: 'oppo开放平台官网微前端项目',
    description:
      '基于Qiankun微前端框架，实现多技术栈（JS、JQuery、Vue2、Vue3）功能模块的独立开发和部署。',
    technologies: ['Qiankun', 'Vue2', 'Vue3', 'JQuery', 'JavaScript', 'CI/CD'],
    link: 'https://open.oppomobile.com/',
  },
  {
    name: '华启天成智能科技商品数据分析系统',
    description:
      '基于角色权限的商品数据分析与管理系统，支持实时数据可视化和多方协作。',
    technologies: ['Vue2', 'Node.js', 'Express', 'MySQL', 'Echarts', 'Docker'],
    link: '',
  },
];

export const skills: SkillCategory[] = [
  {
    category: '语言',
    level: 'FE-related',
    skills: [
      { name: 'HTML', level: 'often' },
      { name: 'CSS/SCSS', level: 'often' },
      { name: 'TypeScript', level: 'often' },
      { name: 'JavaScript', level: 'often' },
    ],
  },
  {
    category: '存储',
    level: 'BE-related',
    skills: [{ name: 'SQL', level: 'sometimes' }],
  },
  {
    category: 'ui 样式',
    level: 'UI-related',
    skills: [
      { name: 'Tailwind CSS', level: 'often' },
      { name: 'Element UI', level: 'often' },
      { name: 'uni UI', level: 'often' },
    ],
  },
  {
    category: '技术栈',
    level: 'FE-related',
    skills: [
      { name: 'React', level: 'sometimes' },
      { name: 'Next.js', level: 'sometimes' },
      { name: 'Vue3', level: 'often' },
      { name: 'Node', level: 'sometimes' },
      { name: '微信小程序', level: 'often' },
    ],
  },
  {
    category: '服务',
    level: 'BE-related',
    skills: [
      { name: 'Express', level: 'sometimes' },
      { name: 'MongoDB', level: 'sometimes' },
    ],
  },
  {
    category: '开发工具',
    level: 'Code-related',
    skills: [
      { name: 'VS Code', level: 'often' },
      { name: 'Cursor', level: 'often' },
      { name: 'Git', level: 'often' },
      { name: 'apifox', level: 'often' },
      { name: 'Uni', level: 'often' },
    ],
  },
  {
    category: '设计图',
    level: 'Designer-related',
    skills: [
      { name: 'Figma', level: 'often' },
      { name: '蓝湖', level: 'often' },
    ],
  },
];
