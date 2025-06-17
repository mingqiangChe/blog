// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

/**
 * 动态导入语言消息的映射表
 * key 为语言代码，value 为返回对应 JSON 模块的函数
 * 这里使用动态导入，支持按需加载，减少初始包体积
 */
const messagesMap = {
  en: () => import('../messages/en.json'),
  zh: () => import('../messages/zh.json'),
  // 如果需要支持更多语言，在这里添加对应映射即可
} as const;

/**
 * 从 messagesMap 的 key 自动推断 Locale 类型
 */
type Locale = keyof typeof messagesMap;

/**
 * 类型保护函数，判断传入的字符串是否为支持的 Locale
 * @param locale 字符串类型的语言代码
 * @returns 断言 locale 是 Locale 类型
 */
function isSupportedLocale(locale: string): locale is Locale {
  return Object.keys(messagesMap).includes(locale);
}

/**
 * next-intl 请求配置导出
 * 负责根据请求的 locale 加载对应的语言消息
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // 获取请求的语言代码，可能为 undefined
  let locale = await requestLocale;

  // 如果请求的语言无效或不支持，回退到默认语言
  if (!locale || !isSupportedLocale(locale)) {
    locale = routing.defaultLocale;
  }

  // 根据 locale 获取对应的加载函数，找不到时回退默认语言
  // 这里使用类型断言，确保类型安全
  const loadMessages = messagesMap[locale as Locale] || messagesMap[routing.defaultLocale];

  try {
    // 动态导入语言消息模块
    const messagesModule = await loadMessages();

    return {
      locale,
      // next-intl 期望 messages 是模块默认导出的对象
      messages: messagesModule.default
    };
  } catch (error) {
    // 动态导入失败时打印错误日志，并回退到默认语言消息
    console.error(`Failed to load messages for locale "${locale}":`, error);

    const defaultMessagesModule = await messagesMap[routing.defaultLocale]();

    return {
      locale: routing.defaultLocale,
      messages: defaultMessagesModule.default
    };
  }
});
