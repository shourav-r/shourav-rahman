'use client';

import { useEffect, useRef } from 'react';
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

  // Mouse move effect for the glass morphism
  useEffect(() => {
    if (!ref.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 20; // 20px max movement
      const y = ((e.clientY - top) / height - 0.5) * 20; // 20px max movement
      
      ref.current.style.setProperty('--mouse-x', `${x}px`);
      ref.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-primary/10 blur-3xl -top-1/4 -left-1/4"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-secondary/10 blur-3xl -bottom-1/4 -right-1/4"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Glass container */}
      <motion.div
        ref={ref}
        className={`relative bg-background/30 backdrop-blur-lg border border-border/20 rounded-2xl p-6 md:p-8 overflow-hidden ${className}`}
        style={{
          transform: 'translate3d(0, 0, 0)', // Enable GPU acceleration
          '--mouse-x': '0px',
          '--mouse-y': '0px',
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
        {/* Glass reflection effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(600px at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255, 255, 255, 0.1), transparent 70%)',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
