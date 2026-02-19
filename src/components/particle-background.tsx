
'use client';

import { useRef, useEffect, useCallback, memo } from 'react';

const ParticleBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCountRef = useRef(0);
  const lastFrameTime = useRef(0);

  const draw = useCallback((ctx: CanvasRenderingContext2D, particles: any[]) => {
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

    // Optimize: Only draw connections for nearby particles
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
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    let animationFrameId: number;
    const particles: any[] = [];
    // Reduced particle count from 50 to 30 for better performance
    const particleCount = 30;
    let isVisible = true;

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

    // Throttle render to 30 FPS for better performance
    const render = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = window.requestAnimationFrame(render);
        return;
      }

      const elapsed = currentTime - lastFrameTime.current;
      // Target 30 FPS (33ms per frame) instead of 60 FPS
      if (elapsed > 33) {
        frameCountRef.current++;
        draw(context, particles);
        lastFrameTime.current = currentTime;
      }
      animationFrameId = window.requestAnimationFrame(render);
    };

    // Pause animation when tab is not visible
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    render(0);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-30" />;
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
