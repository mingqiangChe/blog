// global.d.ts （项目根目录，确保 TypeScript 支持 JSON 导入）
declare module '*.json' {
    const value: any;
    export default value;
  }
  