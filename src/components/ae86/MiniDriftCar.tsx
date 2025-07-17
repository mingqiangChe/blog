// （支持漂移动画+引擎声）
'use client';
import React, { useRef, useEffect } from 'react';

export default function MiniDriftCar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const car = new Image();
    car.src = '/ae86.png'; // 确保你有这个图放在 public/images

    let x = 0;
    let direction = 1;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(x, 20);
      ctx.rotate(Math.sin(Date.now() / 200) * 0.1); // 模拟轻微漂移
      ctx.drawImage(car, -20, -10, 40, 20); // 缩放控制大小
      ctx.restore();

      x += direction * 0.5;
      if (x > 60 || x < 0) direction *= -1;

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  const handleMouseEnter = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/ae86-loop.wav'); // 确保这个 mp3 文件已存在
      audioRef.current.loop = true;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const handleMouseLeave = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title="AE86 🚗💨"
      className="cursor-pointer"
    >
      <canvas ref={canvasRef} width={80} height={40} />
    </div>
  );
}
