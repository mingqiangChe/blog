'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Props {
  url: string;
}

export default function ZoomableCanvas({ url }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  // 计算初始缩放比例，让图片完全适应容器
  const calcInitialScaleAndOffset = () => {
    if (!containerRef.current || !imgRef.current) return;
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    const iw = imgRef.current.width;
    const ih = imgRef.current.height;

    const containerRatio = cw / ch;
    const imageRatio = iw / ih;

    let newScale = 1;
    if (imageRatio > containerRatio) {
      newScale = cw / iw;
    } else {
      newScale = ch / ih;
    }

    const offsetX = (cw - iw * newScale) / 2;
    const offsetY = (ch - ih * newScale) / 2;

    setScale(newScale);
    setOffset({ x: offsetX, y: offsetY });
  };

  // 画布绘制函数
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imgRef.current;
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const container = containerRef.current;
    if (!container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;

    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.scale(dpr, dpr);

    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    ctx.drawImage(img, 0, 0, imgSize.width, imgSize.height);
  };

  // 图片加载
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => {
      imgRef.current = img;
      setImgSize({ width: img.width, height: img.height });
    };
  }, [url]);

  // 图片尺寸变化后计算初始缩放
  useEffect(() => {
    if (imgSize.width && imgSize.height) {
      calcInitialScaleAndOffset();
    }
  }, [imgSize]);

  // 状态变化重绘
  useEffect(() => {
    draw();
  }, [scale, offset, imgSize]);

  // 窗口大小变化时，重新计算初始缩放及偏移
  useEffect(() => {
    const onResize = () => {
      if (imgSize.width && imgSize.height) {
        calcInitialScaleAndOffset();
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [imgSize]);

  // 滚轮缩放（保持鼠标为缩放中心）
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - offset.x;
    const mouseY = e.clientY - rect.top - offset.y;

    const delta = -e.deltaY * 0.001;
    let newScale = scale + delta;
    newScale = Math.min(Math.max(newScale, 0.2), 5);

    const dx = (mouseX / scale) * (newScale - scale);
    const dy = (mouseY / scale) * (newScale - scale);

    setOffset((prev) => ({ x: prev.x - dx, y: prev.y - dy }));
    setScale(newScale);
  };

  // 拖拽事件
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    e.preventDefault();
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };
  const endDragging = () => {
    dragging.current = false;
  };

  return (
    <section
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        touchAction: 'none',
        cursor: dragging.current ? 'grabbing' : 'grab',
        userSelect: 'none',
        backgroundColor: '#000',
        overflow: 'hidden',
        position: 'relative',
      }}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={endDragging}
      onMouseLeave={endDragging}
      // 移动设备支持触摸缩放和平移的基础，可扩展
      // onTouchStart, onTouchMove, onTouchEnd 可以后续添加
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          margin: 'auto',
          maxWidth: '100%',
          maxHeight: '100%',
          userSelect: 'none',
          touchAction: 'none',
          backgroundColor: '#000',
        }}
      />
    </section>
  );
}
