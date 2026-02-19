
'use client';

import { useRef, useEffect, useCallback } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback((ctx: CanvasRenderingContext2D, frameCount: number, particles: any[]) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    particles.forEach(p => {
      ctx.fillStyle = `hsla(142.1, 76.2%, 36.3%, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > ctx.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > ctx.canvas.height) p.vy *= -1;
    });

    for(let i = 0; i < particles.length; i++) {
        for(let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);

            if(distance < 100) {
                ctx.strokeStyle = `hsla(180, 100%, 40%, ${0.5 - distance/100})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }


  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let frameCount = 0;
    let animationFrameId: number;

    const particles: any[] = [];
    const particleCount = 50;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.5 + 1,
          alpha: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const render = () => {
      frameCount++;
      draw(context, frameCount, particles);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-30" />;
};

export default ParticleBackground;
