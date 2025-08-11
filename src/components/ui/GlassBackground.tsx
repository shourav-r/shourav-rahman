'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface GlassBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassBackground({ children, className = '' }: GlassBackgroundProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Only enable mouse move effect on desktop
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    
    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);
    
    return () => window.removeEventListener('resize', checkIfDesktop);
  }, []);

  // Mouse move effect for the glass morphism
  useEffect(() => {
    if (!ref.current || !isDesktop) return;

    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      // Use requestAnimationFrame for smoother performance
      animationFrameId = requestAnimationFrame(() => {
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 30; // 30px max movement
        const y = ((e.clientY - top) / height - 0.5) * 30; // 30px max movement
        
        ref.current!.style.setProperty('--mouse-x', `${x}px`);
        ref.current!.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDesktop]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl -top-1/4 -left-1/4"
          animate={{
            x: [0, 40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full bg-gradient-to-tr from-secondary/10 via-secondary/5 to-transparent blur-3xl -bottom-1/3 -right-1/3"
          animate={{
            x: [0, -40, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div 
          className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-accent/5 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      {/* Glass container */}
      <motion.div
        ref={ref}
        className={`relative bg-gradient-to-br from-background/20 to-background/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 ${className}`}
        style={{
          '--tw-backdrop-blur': '16px',
          '--tw-bg-opacity': '0.8',
          transform: 'translate3d(0, 0, 0)', // Enable GPU acceleration
          '--mouse-x': '0px',
          '--mouse-y': '0px',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        } as React.CSSProperties}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            } 
          },
        }}
      >
        {/* Glass reflection effect - only on desktop */}
        {isDesktop && (
          <div 
            className="before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-white/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:-z-10"
            style={{
              background: 'radial-gradient(600px at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255, 255, 255, 0.15), transparent 70%)',
            }}
          />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
