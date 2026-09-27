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
  const counterObjRef = useRef({ value: 0 });
  const [counter, setCounter] = useState(0);
  const [stageText, setStageText] = useState('CALIBRANDO SENSORES...');

  useGSAP(
    () => {
      document.body.style.overflow = 'hidden';
      gsap.set(wipeRef.current, { yPercent: 100 });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
          onComplete();
        },
      });

      // 1. Ultra-fast, responsive descent counter: 0% to 100% in 1.25s
      tl.to(counterObjRef.current, {
        value: 100,
        duration: 1.25,
        ease: 'power2.out',
        onUpdate: () => {
          const val = Math.round(counterObjRef.current.value);
          setCounter(val);
          if (val < 35) {
            setStageText('INICIALIZANDO PROPULSIÓN // ENLACE SEGURO');
          } else if (val < 75) {
            setStageText('DESCENDIENDO A SECTOR TÁCTICO // -240M');
          } else if (val < 99) {
            setStageText('SINCRONIZANDO BATCOMPUTER...');
          } else {
            setStageText('ACCESO CONCEDIDO // ENTRADA INMEDIATA');
          }
        },
      })
        // 2. Cinematic matte black stealth wipe
        .to(
          wipeRef.current,
          {
            yPercent: 0,
            duration: 0.45,
            ease: EASE_WIPE,
          },
          '+=0.08'
        )
        // 3. Reveal site instantaneously
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.45,
            ease: EASE_WIPE,
          },
          '+=0.05'
        );
    },
    { scope: containerRef, dependencies: [onComplete] }
  );

  const skipIntro = () => {
    document.body.style.overflow = '';
    if (containerRef.current) {
      containerRef.current.style.display = 'none';
    }
    onComplete();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between overflow-hidden bg-black select-none"
    >
      {/* 1. Tactical Grid & Descent Warp Vector Lines (Zero Weight, Pure CSS/SVG) */}
      <div className="absolute inset-0 batcave-grid opacity-30 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black pointer-events-none z-10" />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none z-10" />

      {/* Cyber Descent Light Shafts */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[100px] animate-pulse" />
        <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute h-full w-[300px] border-x border-white/[0.05]" />
      </div>

      {/* 2. Tactical Corner HUD Reticles */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-white/50 pointer-events-none z-20" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-white/50 pointer-events-none z-20" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-white/50 pointer-events-none z-20" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-white/50 pointer-events-none z-20" />

      {/* 3. Top Telemetry Header */}
      <div className="relative z-20 w-full flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-zinc-300 font-mono text-[10px] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          BATCAVE_PROTOCOL // DESCENSO_RÁPIDO
        </div>

        {/* Skip Intro Button */}
        <button
          onClick={skipIntro}
          className="px-3 py-1 rounded-full border border-white/20 hover:border-white/50 bg-black/60 hover:bg-white/10 backdrop-blur-md text-zinc-400 hover:text-white font-mono text-[10px] tracking-wider transition-all cursor-pointer"
          title="Saltar intro e ingresar directamente"
        >
          ENTRAR DIRECTO ➔
        </button>
      </div>

      {/* 4. Center Tactical Descent Counter & Visual Speed */}
      <div className="relative z-20 flex flex-col items-center px-4 my-auto">
        {/* Speed Altitude Metric */}
        <div className="flex items-center gap-2 mb-3 text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
          <span className="text-white font-bold">ALTITUD TÁCTICA:</span>
          <span className="text-emerald-400 font-mono">-{Math.round(counter * 2.4)}M</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-300 font-mono">VEL: 120 FPS</span>
        </div>

        {/* High-Impact Digital Counter */}
        <div className="text-[7rem] sm:text-[9rem] md:text-[12rem] font-black tracking-tighter text-white leading-none glow-text font-mono select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          {counter}%
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-48 sm:w-72 h-1.5 bg-zinc-900/90 rounded-full mt-3 overflow-hidden border border-white/20 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.25)]">
          <div
            className="h-full bg-white transition-all duration-75 shadow-[0_0_12px_rgba(255,255,255,0.9)]"
            style={{ width: `${counter}%` }}
          />
        </div>

        {/* Live Step Status */}
        <div className="mt-4 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 font-mono text-[10px] text-zinc-300 tracking-wider uppercase">
          {stageText}
        </div>
      </div>

      {/* 5. Bottom Requested Loading Text */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl px-4 pb-8">
        <p className="text-xs sm:text-sm md:text-base font-mono text-zinc-200 font-semibold tracking-wider leading-relaxed drop-shadow-md">
          Bajando A la Batcueva para Observar el Portfolio de Ayoub Atidi Belbaz
        </p>
        <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 tracking-[0.25em] uppercase mt-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-ping" />
          <span>ACCESO AUTORIZADO // BATCOMPUTER TÁCTICO</span>
        </div>
      </div>

      {/* 6. Matte black stealth wipe panel for seamless reveal */}
      <div
        ref={wipeRef}
        className="absolute inset-0 pointer-events-none will-change-transform z-30 bg-[#0a0a0a] border-t border-white/30"
      />
    </div>
  );
}
