'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RadarScannerProps {
  className?: string;
  label?: string;
}

export default function RadarScanner({ className = '', label = 'RADAR_SCAN // ACTIVE' }: RadarScannerProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden rounded-2xl md:rounded-3xl z-20 ${className}`}>
      {/* Sweeping laser scanner line */}
      <motion.div
        className="w-full h-24 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent relative border-b border-cyan-400/40 shadow-[0_4px_20px_rgba(34,211,238,0.25)]"
        initial={{ y: '-100%' }}
        animate={{ y: ['-100%', '500%'] }}
        transition={{
          repeat: Infinity,
          repeatDelay: 3.5,
          duration: 2.8,
          ease: 'easeInOut',
        }}
      >
        {/* Subtle glowing blip at corner */}
        <div className="absolute right-4 bottom-1 flex items-center gap-1.5 text-[8px] font-mono text-cyan-400/80 uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-cyan-400/30">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>{label}</span>
        </div>
      </motion.div>

      {/* Static HUD target reticles */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/40" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400/40" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400/40" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400/40" />
    </div>
  );
}
