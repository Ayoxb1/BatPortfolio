'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

interface ScrollyCanvasProps {
  frameCount?: number;
}

export default function ScrollyCanvas({ frameCount = 90 }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(1);
  const [loadedPercent, setLoadedPercent] = useState(0);
  // Default to Video Autoplay Mode (muted)
  const [useVideoMode, setUseVideoMode] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Autoplay video on mount (muted, loop, playsinline)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      videoRef.current.play().catch(() => {
        // Autoplay fallback if blocked
        setIsVideoPlaying(false);
      });
    }
  }, [useVideoMode]);

  // Preload optimized WebP images progressively in case user switches to GSAP scrub mode
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/sequence/frame_${paddedIndex}.webp`;

      img.onload = () => {
        loaded++;
        setLoadedPercent(Math.round((loaded / frameCount) * 100));
        if (i === 1 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, 1920, 1080);
          }
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [frameCount]);

  // Draw frame helper with crisp rendering
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setCurrentFrameDisplay(index + 1);
    }
  }, []);

  // GSAP ScrollTrigger for Scroll Scrubbing (only active in GSAP mode)
  useGSAP(
    () => {
      const canvas = canvasRef.current;
      if (!canvas || useVideoMode) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1920;
      canvas.height = 1080;

      if (imagesRef.current[0] && imagesRef.current[0].complete) {
        drawFrame(0);
      }

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          if (!useVideoMode) {
            const frameIndex = Math.min(
              Math.floor(self.progress * (frameCount - 1)),
              frameCount - 1
            );
            drawFrame(frameIndex);
          }
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: containerRef, dependencies: [frameCount, useVideoMode, drawFrame] }
  );

  // Toggle Video Mode vs GSAP Canvas Mode
  const toggleMode = () => {
    if (!useVideoMode) {
      setUseVideoMode(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.volume = 0;
          videoRef.current.currentTime = (currentFrameDisplay / frameCount) * (videoRef.current.duration || 4);
          videoRef.current.play().catch(() => {});
          setIsVideoPlaying(true);
        }
      }, 100);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
      setUseVideoMode(false);
      setTimeout(() => {
        drawFrame(currentFrameDisplay - 1);
      }, 100);
    }
  };

  // Toggle Play/Pause for the Video
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const scrollToHero = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo('#inicio', { duration: 1.2 });
    } else {
      document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="secuencia"
      ref={containerRef}
      className={`relative w-full bg-black select-none border-b border-white/10 ${
        useVideoMode 
          ? 'min-h-screen py-10 sm:py-16 md:py-20 flex flex-col items-center justify-center' 
          : 'relative'
      }`}
      style={{ height: useVideoMode ? 'auto' : '300vh' }}
    >
      {/* Viewport container */}
      <div className={`${useVideoMode ? 'w-full' : 'sticky top-0 h-screen'} w-full flex flex-col items-center justify-center overflow-hidden bg-black px-3 sm:px-6 md:px-8`}>
        
        {/* Outer Console Container */}
        <div className="relative w-full max-w-5xl flex flex-col items-center z-10">
          
          {/* Top Batcomputer HUD Bar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 py-2 px-3 sm:py-2.5 sm:px-4 mb-3 rounded-xl border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md text-[11px] font-mono text-zinc-300">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              {/* Batman Batwing Icon */}
              <div className="w-6 h-6 rounded bg-white/10 border border-white/20 flex items-center justify-center p-0.5 flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-bold tracking-wider text-white truncate">AYOUB ATIDI</span>
              <span className="text-zinc-500 hidden md:inline">// BATCAVE WORKSTATION FEED</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Play/Pause Button for Video Mode */}
              {useVideoMode && (
                <button
                  onClick={togglePlayPause}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-mono tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                  title={isVideoPlaying ? 'Pausar vídeo' : 'Reanudar vídeo'}
                >
                  <span>{isVideoPlaying ? '⏸ PAUSAR' : '▶ REPRODUCIR'}</span>
                </button>
              )}

              {/* Mode Toggle Button */}
              <button
                onClick={toggleMode}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/20 text-zinc-300 hover:text-white text-[10px] font-mono tracking-wider uppercase transition-colors flex items-center gap-1 cursor-pointer"
                title="Cambiar entre reproducción de vídeo y scroll GSAP"
              >
                {useVideoMode ? (
                  <span>⤓ MODO SCROLL GSAP</span>
                ) : (
                  <span>▶ MODO VÍDEO</span>
                )}
              </button>

              {useVideoMode ? (
                <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-zinc-300 text-[10px] hidden sm:inline">
                  VÍDEO 1080p // SIN AUDIO
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-zinc-300 text-[10px]">
                  FRAME: {String(currentFrameDisplay).padStart(2, '0')} / {frameCount}
                </span>
              )}

              <span className="text-red-500 font-bold flex items-center gap-1 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                REC
              </span>
            </div>
          </div>

          {/* Centered Responsive 16:9 Screen */}
          <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.95)] bg-[#050505]">
            
            {/* Native Video Mode (Autoplay, Loop, Muted, Playsinline) */}
            {useVideoMode ? (
              <video
                ref={videoRef}
                src="/hero-video.mp4"
                autoPlay
                playsInline
                loop
                muted
                preload="auto"
                className="w-full h-full object-cover block"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />
            ) : (
              /* GSAP Canvas Mode */
              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover will-change-transform block"
              />
            )}

            {/* Subtle Monitor Scanlines */}
            <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />

            {/* Tactical Corner Brackets */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-white pointer-events-none" />
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-white pointer-events-none" />
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-white pointer-events-none" />
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-white pointer-events-none" />

            {/* Soft Edge Vignette */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]" />

            {/* Live Autoplay Badge */}
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/75 border border-white/20 text-[9px] sm:text-[10px] font-mono text-zinc-300 backdrop-blur-sm pointer-events-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>TRANSMISIÓN EN VIVO // SILENCIADO</span>
            </div>

            {/* Buffer indicator for GSAP canvas mode */}
            {!useVideoMode && loadedPercent < 100 && (
              <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded bg-black/80 border border-white/20 text-[10px] font-mono text-zinc-400 backdrop-blur-sm pointer-events-none">
                BUFFER: {loadedPercent}%
              </div>
            )}
          </div>

          {/* Bottom Telemetry & Navigation Guide */}
          <div className="w-full mt-3 flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-400 px-1 sm:px-2 gap-2">
            <button 
              onClick={scrollToHero}
              className="flex items-center gap-1.5 text-white hover:text-zinc-300 transition-colors cursor-pointer group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-semibold tracking-wide">
                DESPLAZA HACIA ABAJO PARA REVELAR LA BOLA 3D Y EL PERFIL
              </span>
              <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
            </button>

            <span className="hidden sm:inline text-zinc-500">
              {useVideoMode ? 'VÍDEO MP4 1080p // REPRODUCCIÓN AUTOMÁTICA' : 'FEED LIVE: 1920x1080 // 60-120 FPS GSAP'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
