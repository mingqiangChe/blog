import { NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from '../i18nConfig';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const BAD_BOT_PATTERNS = [/curl/i, /wget/i]; // 只拦截这类恶意工具
const rateLimiter = new RateLimiterMemory({
  points: 20,
  duration: 60,
});

export async function middleware(request: any) {
  const userAgent = request.headers.get('user-agent') || '';
  const pathname = request.nextUrl.pathname;

  // ❗只拦截恶意 bot，不拦截正常搜索引擎
  if (BAD_BOT_PATTERNS.some((pattern) => pattern.test(userAgent))) {
    if (!pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff2?)$/)) {
      return new NextResponse('Blocked bad bot', { status: 403 });
    }
  }

  // 📦 API 速率限制
  if (pathname.startsWith('/api')) {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || 'unknown';

    try {
      await rateLimiter.consume(ip);
    } catch {
      return new NextResponse('Too many requests', { status: 429 });
    }
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
