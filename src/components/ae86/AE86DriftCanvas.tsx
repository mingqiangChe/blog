'use client';
import { useRef, useEffect } from 'react';

export default function AE86DriftCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const width = (canvas.width = 800);
    const height = (canvas.height = 200);

    let x = -100;
    let angle = 0;

    function drawCar(ctx: CanvasRenderingContext2D, x: number, angle: number) {
      ctx.save();
      ctx.translate(x, 120);
      ctx.rotate(angle);

      // 🚗 车身
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-40, -20, 80, 40);

      // 🚗 黑色底边（AE86 黑边）
      ctx.fillStyle = '#111111';
      ctx.fillRect(-40, 10, 80, 10);

      // 🚘 车窗
      ctx.fillStyle = '#333333';
      ctx.fillRect(-30, -15, 20, 20);
      ctx.fillRect(0, -15, 25, 20);

      // 🛞 轮胎
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(-25, 25, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(25, 25, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const driftAngle = Math.sin(x / 50) * 0.1;

      drawCar(ctx, x, driftAngle);

      x += 2.8;
      if (x > width + 100) x = -100;

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 opacity-60 pointer-events-none"
      style={{ maxWidth: '100%' }}
    />
  );
}
