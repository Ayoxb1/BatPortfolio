'use client';

import { useEffect, useState } from 'react';

export default function Overlay() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.scrolly-container');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (container.scrollHeight - window.innerHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Calcular opacidad y posición de cada sección de texto
  const getOpacity = (sectionStart: number, sectionEnd: number) => {
    if (scrollProgress < sectionStart) return 0;
    if (scrollProgress > sectionEnd) return 0;
    if (scrollProgress < sectionStart + 0.1) {
      return (scrollProgress - sectionStart) / 0.1;
    }
    if (scrollProgress > sectionEnd - 0.1) {
      return (sectionEnd - scrollProgress) / 0.1;
    }
    return 1;
  };

  const getYOffset = (sectionStart: number) => {
    const relativeProgress = Math.max(0, Math.min(1, (scrollProgress - sectionStart) / 0.2));
    return -30 + relativeProgress * 30;
  };

  return (
    <div className="scrolly-container fixed inset-0 pointer-events-none z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 px-6 md:px-0">
      {/* Indicador de Scroll Global */}
      <div 
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-float transition-opacity duration-1000 ${
          showScrollIndicator ? 'opacity-80' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="text-[10px] md:text-xs text-orange-400 uppercase tracking-[0.2em] font-bold">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-2 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full animate-scroll-mouse" />
        </div>
      </div>

      {/* Sección 1: Nombre (0% - 30%) */}
      <div
        className="relative md:absolute text-center transition-opacity duration-300 flex flex-col items-center"
        style={{
          opacity: getOpacity(0, 0.3),
          transform: `translateY(${getYOffset(0)}px)`,
        }}
      >
        <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter">
          Ayoub Atidi
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light text-center mb-8 md:mb-12">
          Creative Developer & Full Stack Engineer
        </p>
      </div>

      {/* Sección 2: Tagline izquierda (30% - 60%) */}
      <div
        className="relative md:absolute md:left-16 text-center md:text-left max-w-xs transition-opacity duration-300 flex flex-col items-center md:items-start"
        style={{
          opacity: getOpacity(0.25, 0.55),
          transform: `translateY(${getYOffset(0.25)}px)`,
        }}
      >
        <p className="text-2xl md:text-3xl text-white font-light leading-tight">
          Construyo experiencias digitales que{' '}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            inspiran
          </span>
        </p>
      </div>

      {/* Sección 3: Mensaje derecha (60% - 90%) */}
      <div
        className="relative md:absolute md:right-16 text-center md:text-right max-w-xs transition-opacity duration-300 flex flex-col items-center md:items-end"
        style={{
          opacity: getOpacity(0.55, 0.85),
          transform: `translateY(${getYOffset(0.55)}px)`,
        }}
      >
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-6">
          Fusionando diseño y ingeniería para crear soluciones innovadoras
        </p>
        <a
          href="#proyectos"
          className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm text-white cursor-pointer hover:bg-white/20 transition-all pointer-events-auto"
        >
          Explorar mi trabajo
        </a>
      </div>
    </div>
  );
}
