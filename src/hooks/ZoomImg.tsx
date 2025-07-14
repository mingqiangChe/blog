import { useEffect } from 'react';
import mediumZoom, { Zoom } from 'medium-zoom';

export function useMediumZoom(selector: string) {
  useEffect(() => {
    let zoom: Zoom | null = null;
    let observer: MutationObserver | null = null;

    const bindZoomToImage = (img: HTMLImageElement) => {
      if (!img || img.getAttribute('data-zoom-bound')) return;

      img.setAttribute('data-zoom-bound', 'true'); // 避免重复绑定

      mediumZoom(img, {
        background: 'rgba(0,0,0,0.85)',
        margin: 24,
        scrollOffset: 40,
      });
    };

    const tryBindImages = () => {
      const images = document.querySelectorAll<HTMLImageElement>(selector);
      images.forEach((img) => {
        if (img.complete) {
          bindZoomToImage(img);
        } else {
          img.onload = () => bindZoomToImage(img);
          img.onerror = () => {}; // 防止失败卡住
        }
      });
    };

    tryBindImages();

    const root = document.getElementById('markdown-root');
    if (root) {
      observer = new MutationObserver(() => {
        tryBindImages();
      });

      observer.observe(root, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer?.disconnect();
      // mediumZoom 没有全局 detach，绑定的是具体 DOM 节点，无法统一解绑
    };
  }, [selector]);
}
