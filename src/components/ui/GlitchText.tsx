'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

export default function GlitchText({ text, className = '', as = 'span' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const Component = motion[as] as any;

  return (
    <Component
      className={`relative inline-block select-none cursor-default ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {/* Base text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layer 1 (Cyan offset) */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-cyan-400 opacity-80 pointer-events-none z-0 mix-blend-screen"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [-2, 2, -1, 3, 0],
              y: [1, -1, 2, -2, 0],
              clipPath: [
                'inset(20% 0 30% 0)',
                'inset(60% 0 10% 0)',
                'inset(40% 0 50% 0)',
                'inset(10% 0 70% 0)',
                'inset(0 0 0 0)',
              ],
            }}
            transition={{
              duration: 0.25,
              repeat: Infinity,
              ease: 'linear',
            }}
            aria-hidden="true"
          >
            {text}
          </motion.span>

          {/* Glitch layer 2 (Red/Orange offset) */}
          <motion.span
            className="absolute top-0 left-0 text-red-500 opacity-80 pointer-events-none z-0 mix-blend-screen"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [2, -2, 3, -1, 0],
              y: [-1, 2, -2, 1, 0],
              clipPath: [
                'inset(50% 0 20% 0)',
                'inset(15% 0 65% 0)',
                'inset(70% 0 15% 0)',
                'inset(30% 0 45% 0)',
                'inset(0 0 0 0)',
              ],
            }}
            transition={{
              duration: 0.22,
              repeat: Infinity,
              ease: 'linear',
            }}
            aria-hidden="true"
          >
            {text}
          </motion.span>
        </>
      )}
    </Component>
  );
}
