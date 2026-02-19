
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const GamingConsoleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M40,88c0-22,18-40,40-40h96c22,0,40,18,40,40v80c0,22-18,40-40,40H80c-22,0-40-18-40-40Z" />
        <path d="M40,128H216" />
        <circle cx="168" cy="112" r="8" fill="currentColor" strokeWidth="2" />
        <circle cx="192" cy="144" r="8" fill="currentColor" strokeWidth="2" />
    </svg>
);


const CrossIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

const TriangleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 22h20L12 2z"></path>
  </svg>
);

const SquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
  </svg>
);

const doodles = [
  { Icon: CrossIcon, className: "top-[15%] left-[10%] w-8 h-8 opacity-30", animationDelay: "0s" },
  { Icon: CircleIcon, className: "top-[25%] right-[12%] w-12 h-12 opacity-20", animationDelay: "1s" },
  { Icon: TriangleIcon, className: "bottom-[20%] left-[20%] w-10 h-10 opacity-25", animationDelay: "2s" },
  { Icon: SquareIcon, className: "bottom-[30%] right-[18%] w-6 h-6 opacity-35", animationDelay: "3s" },
  { Icon: CrossIcon, className: "top-[50%] left-[30%] w-6 h-6 opacity-20", animationDelay: "4s" },
  { Icon: CircleIcon, className: "top-[60%] right-[35%] w-8 h-8 opacity-30", animationDelay: "5s" },
  { Icon: TriangleIcon, className: "bottom-[10%] right-[10%] w-14 h-14 opacity-15", animationDelay: "0.5s" },
  { Icon: SquareIcon, className: "top-[10%] right-[30%] w-10 h-10 opacity-20", animationDelay: "1.5s" },
  { Icon: CrossIcon, className: "bottom-[45%] left-[5%] w-10 h-10 opacity-25", animationDelay: "2.5s" },
  { Icon: CircleIcon, className: "top-[5%] left-[40%] w-7 h-7 opacity-30", animationDelay: "3.5s" },
  { Icon: TriangleIcon, className: "top-[80%] right-[25%] w-9 h-9 opacity-20", animationDelay: "4.5s" },
  { Icon: SquareIcon, className: "top-[5%] right-[5%] w-12 h-12 opacity-15", animationDelay: "5.5s" },
];


export default function InteractiveBackgroundElement() {
  const [style, setStyle] = useState({});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const rotateX = (clientY / innerHeight - 0.5) * -30;
        const rotateY = (clientX / innerWidth - 0.5) * 30;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
            transition: 'transform 0.1s ease-out'
        });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={style}
      className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none"
    >
      <GamingConsoleIcon
        className={cn(
          'w-[300px] h-[300px] text-primary opacity-20 transition-all duration-300',
          '[--neon-glow-color:hsl(var(--primary))]',
          'drop-shadow-[0_0_8px_var(--neon-glow-color)]',
          'dark:drop-shadow-[0_0_12px_var(--neon-glow-color)]'
        )}
      />
      {doodles.map((doodle, index) => {
        const { Icon, className, animationDelay } = doodle;
        return (
            <Icon 
                key={index}
                className={cn(
                    'absolute text-accent animated-gamepad',
                    '[--neon-glow-color:hsl(var(--accent))]',
                    'drop-shadow-[0_0_4px_var(--neon-glow-color)]',
                    className
                )}
                style={{ animationDelay }}
            />
        )
      })}
    </div>
  );
}
