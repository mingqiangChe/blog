'use client';

import { useEffect } from 'react';

export default function GlobalProtector() {
  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => e.preventDefault();
    const disableDrag = (e: DragEvent) => e.preventDefault();

    document.addEventListener('contextmenu', disableContextMenu);
    document.addEventListener('dragstart', disableDrag);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('dragstart', disableDrag);
    };
  }, []);

  return null;
}
