import { useEffect } from 'react';
import mediumZoom from 'medium-zoom';

export function useMediumZoom(selector: string, deps: any[] = []) {
  useEffect(() => {
    let zoomInstance: ReturnType<typeof mediumZoom> | null = null;

    const raf = requestAnimationFrame(() => {
      zoomInstance = mediumZoom(selector, {
        background: 'rgba(0,0,0,0.8)',
        margin: 24,
        scrollOffset: 40,
      });
    });

    // ✅ useEffect 必须返回一个清理函数
    return () => {
      cancelAnimationFrame(raf);
      if (zoomInstance) {
        zoomInstance.detach();
      } else {
        // 万一 raf 还没执行完，也尝试 detach（保证彻底解绑）
        mediumZoom(selector)?.detach();
      }
    };
  }, deps);
}
