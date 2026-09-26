'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { EASE_WIPE } from '@/lib/gsap-config';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  useGSAP(() => {
    document.body.style.overflow = 'hidden';

    const counterObj = { value: 0 };

    gsap.set(wipeRef.current, { yPercent: 100 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        gsap.set(containerRef.current, { display: 'none' });
        onComplete();
      },
    });

    tl.to(counterObj, {
      value: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCounter(Math.round(counterObj.value));
      },
    })
      .to(wipeRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: EASE_WIPE,
      }, '+=0.1')
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: EASE_WIPE,
      }, '+=0.2');

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden batcave-grid bg-black"
    >
      <div className="relative z-20 flex flex-col items-center px-4">
        
        {/* Top telemetry tag */}
        <div className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-zinc-300 font-mono text-[11px] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          WAYNE_ENTERPRISES // BATCOMPUTER_OS
        </div>

        {/* Massive Tactical Counter — Crisp White */}
        <div className="text-[8rem] md:text-[13rem] font-black tracking-tighter text-white leading-none glow-text font-mono select-none">
          {counter}%
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-zinc-900 rounded-full mt-4 overflow-hidden border border-white/10">
          <div 
            className="h-full bg-white transition-all duration-75"
            style={{ width: `${counter}%` }}
          />
        </div>

        {/* Loading status text requested by user */}
        <div className="mt-6 flex flex-col items-center text-center max-w-xl px-4">
          <p className="text-xs sm:text-sm md:text-base font-mono text-zinc-200 font-semibold tracking-wider leading-relaxed">
            Bajando A la Batcueva para Observar el Portfolio de Ayoub Atidi Belbaz
          </p>
          <div className="text-[10px] font-mono text-zinc-500 tracking-[0.25em] uppercase mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-ping" />
            <span>ACCESO AUTORIZADO // BATCOMPUTER TÁCTICO</span>
          </div>
        </div>
      </div>

      {/* Matte black stealth wipe panel */}
      <div
        ref={wipeRef}
        className="absolute inset-0 will-change-transform z-30 bg-[#0f0f0f] border-t border-white/20"
      />
    </div>
  );
}
