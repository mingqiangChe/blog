// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

/**
 * 定义支持的语言和默认语言
 * next-intl 使用该配置进行路由和语言切换管理
 */
export const routing = defineRouting({
  locales: ['en', 'zh'],       // 支持的语言列表
  defaultLocale: 'zh'          // 默认语言
});
