'use client';
import { useEffect, useRef } from 'react';
import carImage from '/ae86.png';

export default function AE86BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animationFrameId: number;

    const car = new Image();
    car.src = '/ae86.png';

    const carWidth = 160;
    const carHeight = 120;
    let x = canvas.width;
    const speed = 2;
    let wheelAngle = 0; // 轮子角度

    // 拖影记录
    const trail: { x: number; y: number; alpha: number }[] = [];

    // 星点背景粒子
    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
    }));

    let roadOffset = 0;

    // === 背景剪影 ===
    function drawBackgroundScene() {
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.6);
      ctx.lineTo(canvas.width * 0.2, canvas.height * 0.45);
      ctx.lineTo(canvas.width * 0.4, canvas.height * 0.55);
      ctx.lineTo(canvas.width * 0.6, canvas.height * 0.4);
      ctx.lineTo(canvas.width * 0.8, canvas.height * 0.5);
      ctx.lineTo(canvas.width, canvas.height * 0.4);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      // 城市建筑剪影
      // 城市建筑剪影（跟随 roadOffset 滚动）
      const buildingBaseY = canvas.height * 0.7;
      const buildingWidth = 30;
      ctx.fillStyle = '#000000';
      for (
        let i = -(roadOffset % (buildingWidth + 10));
        i < canvas.width;
        i += buildingWidth + 10
      ) {
        const height = Math.random() * 60 + 40;
        ctx.fillRect(i, buildingBaseY - height, buildingWidth, height);
      }
    }

    function drawStars() {
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.x -= star.speed;
        if (star.x < 0) {
          star.x = canvas.width;
          star.y = Math.random() * canvas.height;
        }
      });
    }

    function drawRoadLines(offset: number) {
      const dashLength = 60;
      const gap = 40;
      const centerY = canvas.height / 2;

      // 中间虚线
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 4;
      for (
        let startX = (offset % (dashLength + gap)) - (dashLength + gap);
        startX < canvas.width;
        startX += dashLength + gap
      ) {
        ctx.beginPath();
        ctx.moveTo(startX, centerY);
        ctx.lineTo(startX + dashLength, centerY);
        ctx.stroke();
      }

      // 左右车道边界
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 3;
      const leftX = canvas.width / 2 - 120;
      const rightX = canvas.width / 2 + 120;

      ctx.beginPath();
      ctx.moveTo(leftX, 0);
      ctx.lineTo(leftX, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(rightX, 0);
      ctx.lineTo(rightX, canvas.height);
      ctx.stroke();
    }

    // === 绘制旋转轮子 ===
    function drawRotatingWheel(x: number, y: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(wheelAngle);
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;

      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * 10, Math.sin(angle) * 10);
        ctx.stroke();
      }
      ctx.restore();
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#121214';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawBackgroundScene();
      drawStars();
      drawRoadLines(roadOffset);
      roadOffset += 3;

      const carY = canvas.height - carHeight - 20 + Math.sin(x / 20) * 2;
      trail.push({ x, y: carY, alpha: 0.4 });
      if (trail.length > 15) trail.shift();

      for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        ctx.globalAlpha = t.alpha * ((i + 1) / trail.length);
        ctx.drawImage(car, t.x, t.y, carWidth, carHeight);
      }
      ctx.globalAlpha = 1;

      // 画车体
      ctx.drawImage(car, x, carY, carWidth, carHeight);

      // 画旋转轮子（模拟轮胎旋转）
      const frontWheelX = x + 38;
      const rearWheelX = x + 120;
      const wheelY = carY + carHeight - 50;

      drawRotatingWheel(frontWheelX, wheelY);
      drawRotatingWheel(rearWheelX, wheelY);

      // 移动和轮子角度更新
      x -= speed;
      wheelAngle += 0.2;
      if (x + carWidth < 0) x = canvas.width;

      animationFrameId = requestAnimationFrame(render);
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (x > canvas.width) x = canvas.width;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    car.onload = () => render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ backgroundColor: '#121214' }}
    />
  );
}
