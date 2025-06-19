'use client';
import React, { useEffect, useRef } from 'react';

export default function InkClouds() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadKlouds() {
      if (!canvasRef.current) return;

      // 动态导入 klouds 库（确保只在客户端执行）
      const klouds = await import('klouds');

      if (!isMounted) return;

      instanceRef.current = klouds.create({
        selector: canvasRef.current,
        speed: 0.3,
        layerCount: 4,
        cloudColor1: [30, 50, 60],
        cloudColor2: [220, 230, 240],
        backgroundColor: [255, 255, 255],
      });
    }

    loadKlouds();

    return () => {
      isMounted = false;
      instanceRef.current?.stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.15, mixBlendMode: 'multiply' }}
    />
  );
}
