import { useEffect } from 'react';
import mediumZoom, { Zoom } from 'medium-zoom';

export function useMediumZoom(selector: string, deps: any[] = []) {
  useEffect(() => {
    let zoomInstance: Zoom | null = null;
    let canceled = false;

    const applyZoom = async () => {
      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>(selector)
      );
      if (!images.length) return;

      // 等待所有图片加载完成
      await Promise.all(
        images.map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) return resolve(true);
              img.onload = img.onerror = () => resolve(true);
            })
        )
      );

      if (canceled) return;

      // 清理旧的 zoom 实例（防止多次绑定）
      if (zoomInstance) {
        zoomInstance.detach();
      }

      zoomInstance = mediumZoom(images, {
        background: 'rgba(0,0,0,0.8)',
        margin: 24,
        scrollOffset: 40,
      });
    };

    applyZoom();

    return () => {
      canceled = true;
      zoomInstance?.detach();
    };
  }, deps);
}
