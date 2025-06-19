'use client';
import React, { useEffect, useRef } from 'react';

export default function InkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; radius: number; alpha: number; speedY: number }[] = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 20 + Math.random() * 30,
        alpha: 0.05 + Math.random() * 0.1,
        speedY: 0.1 + Math.random() * 0.3,
      });
    }

    function draw() {
      // 这里用非空断言告诉 TS ctx 一定存在
      ctx!.clearRect(0, 0, width, height);

      particles.forEach(p => {
        const gradient = ctx!.createRadialGradient(p.x, p.y, p.radius * 0.2, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(0,0,0,${p.alpha})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fill();

        p.y -= p.speedY;
        if (p.y + p.radius < 0) {
          p.y = height + p.radius;
          p.x = Math.random() * width;
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply', opacity: 0.15 }}
    />
  );
}
