'use client';
import React, { useState, useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  opacity?: number;
  posterSrc?: string;
}

export default function VideoBackground({
  videoSrc,
  opacity = 0.3,
  posterSrc,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setCanPlay(true);
    video.addEventListener('canplaythrough', onCanPlay);

    return () => {
      video.removeEventListener('canplaythrough', onCanPlay);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="fixed top-0 left-0 w-full h-full object-cover z-0"
      style={{
        opacity: canPlay ? opacity : 0,
        transition: 'opacity 0.5s ease',
      }}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      poster={posterSrc}
    >
      <source src={videoSrc} type="video/mp4" />
      你的浏览器不支持视频播放。
    </video>
  );
}
