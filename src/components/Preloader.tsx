'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { EASE_WIPE } from '@/lib/gsap-config';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const isCompletedRef = useRef(false);

  // Finish preloader transition smoothly with GSAP
  const finishIntro = useCallback(() => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;

    document.body.style.overflow = '';
    if (containerRef.current) {
      containerRef.current.style.pointerEvents = 'none';
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        onComplete();
      },
    });

    tl.to(wipeRef.current, {
      yPercent: 0,
      duration: 0.7,
      ease: EASE_WIPE,
    })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: EASE_WIPE,
      }, '+=0.1');
  }, [onComplete]);

  // Video playback & mobile-compatible autoplay handling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.set(wipeRef.current, { yPercent: 100 });

    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      vid.defaultMuted = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback in case browser policy restricts playback
        });
      }
    }

    // Safety fallback: guaranteed reveal after 11 seconds (video is 10s)
    const safetyTimer = setTimeout(() => {
      finishIntro();
    }, 11000);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, [finishIntro]);

  // Track video playback time to synchronize percentage counter smoothly
  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    const progress = Math.min(100, Math.floor((vid.currentTime / vid.duration) * 100));
    setCounter(progress);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between overflow-hidden bg-black select-none"
    >
      {/* 1. Ultra-Smooth 60fps Native Video (Batcave / Batayoub intro) */}
      <video
        ref={videoRef}
        src="/bat-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={finishIntro}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* 2. Tactical Vignette & Scanlines Overlays */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90 pointer-events-none z-10" />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none z-10" />

      {/* 3. Tactical Corner HUD Reticles */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-white/40 pointer-events-none z-20" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-white/40 pointer-events-none z-20" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-white/40 pointer-events-none z-20" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-white/40 pointer-events-none z-20" />

      {/* 4. Top Telemetry Header */}
      <div className="relative z-20 w-full flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-zinc-300 font-mono text-[10px] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          BATCAVE_PROTOCOL // CINEMATIC_ENTRY
        </div>

        {/* Skip Intro Button */}
        <button
          onClick={finishIntro}
          className="px-3 py-1 rounded-full border border-white/20 hover:border-white/50 bg-black/60 hover:bg-white/10 backdrop-blur-md text-zinc-400 hover:text-white font-mono text-[10px] tracking-wider transition-all cursor-pointer"
          title="Saltar secuencia e ingresar directamente"
        >
          OMITIR INTRO ➔
        </button>
      </div>

      {/* 5. Center Tactical Counter & Visual Glow */}
      <div className="relative z-20 flex flex-col items-center px-4 my-auto">
        <div className="text-[7rem] sm:text-[9rem] md:text-[12rem] font-black tracking-tighter text-white leading-none glow-text font-mono select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          {counter}%
        </div>

        {/* Progress bar */}
        <div className="w-48 sm:w-64 h-1 bg-zinc-900/80 rounded-full mt-3 overflow-hidden border border-white/20 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          <div 
            className="h-full bg-white transition-all duration-75 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ width: `${counter}%` }}
          />
        </div>
      </div>

      {/* 6. Bottom Requested Loading Text */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl px-4 pb-8">
        <p className="text-xs sm:text-sm md:text-base font-mono text-zinc-200 font-semibold tracking-wider leading-relaxed drop-shadow-md">
          Bajando A la Batcueva para Observar el Portfolio de Ayoub Atidi Belbaz
        </p>
        <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 tracking-[0.25em] uppercase mt-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-ping" />
          <span>ACCESO AUTORIZADO // BATCOMPUTER TÁCTICO</span>
        </div>
      </div>

      {/* 7. Matte black stealth wipe panel for seamless reveal */}
      <div
        ref={wipeRef}
        className="absolute inset-0 pointer-events-none will-change-transform z-30 bg-[#0a0a0a] border-t border-white/30"
      />
    </div>
  );
}
