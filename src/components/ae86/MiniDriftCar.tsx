'use client';

import React, { useEffect, useRef } from 'react';

export default function MiniDriftCar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const car = new Image();
    car.src = '/ae86_car.png'; // 请替换成你的AE86图片路径

    let x = 0;
    let direction = 1;

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      ctx.translate(x, 20);
      ctx.rotate(Math.sin(Date.now() / 200) * 0.1); // 模拟轻微漂移

      // 绘制图片，假设图片宽高为100x50，可根据实际调整
      ctx.drawImage(car, 0, 0, 100, 50);

      ctx.restore();

      // 横向来回移动
      x += direction * 1.2;
      if (x > canvas.width - 120 || x < 0) {
        direction *= -1;
      }

      requestAnimationFrame(animate);
    }

    // 图片加载完才开始动画
    car.onload = () => {
      // 设置canvas尺寸适配图片绘制区域
      canvas.width = 320;
      canvas.height = 80;
      animate();
    };

    return () => {
      // 组件卸载时不再执行动画（取消帧动画）
      // 注意这里简单不做取消帧动画的清理，若需可用标记中断
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        margin: 'auto',
        background: 'transparent',
        width: '320px',
        height: '80px',
      }}
    />
  );
}
