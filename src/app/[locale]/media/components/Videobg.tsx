'use client';
import React from 'react';

interface VideoBackgroundProps {
  videoSrc: string;           // 视频地址（相对路径或绝对URL）
  opacity?: number;           // 背景透明度，默认0.3
  className?: string;         // 额外自定义样式
}

/**
 * 视频背景组件，支持自动循环播放，静音，且带白色毛玻璃效果叠加
 */
export default function VideoBackground({
  videoSrc,
  opacity = 0.3,
  className = '',
}: VideoBackgroundProps) {
  return (
    <div className={`fixed inset-0 overflow-hidden z-0 ${className}`}>
      {/* 视频元素 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto max-w-none max-h-none -translate-x-1/2 -translate-y-1/2 object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        你的浏览器不支持 video 标签。
      </video>

      {/* 毛玻璃遮罩层 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-white/40 backdrop-blur-md"
        style={{ opacity }}
      />
    </div>
  );
}
