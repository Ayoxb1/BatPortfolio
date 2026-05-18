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
    <div className="scrolly-container fixed inset-0 pointer-events-none z-10 flex items-center justify-center">
      {/* Sección 1: Nombre (0% - 30%) */}
      <div
        className="absolute text-center transition-opacity duration-300"
        style={{
          opacity: getOpacity(0, 0.3),
          transform: `translateY(${getYOffset(0)}px)`,
        }}
      >
        <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter">
          Ayoub Atidi
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light">
          Creative Developer & Full Stack Engineer
        </p>
      </div>

      {/* Sección 2: Tagline izquierda (30% - 60%) */}
      <div
        className="absolute left-8 md:left-16 text-left max-w-xs transition-opacity duration-300"
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
        className="absolute right-8 md:right-16 text-right max-w-xs transition-opacity duration-300"
        style={{
          opacity: getOpacity(0.55, 0.85),
          transform: `translateY(${getYOffset(0.55)}px)`,
        }}
      >
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-6">
          Fusionando diseño y ingeniería para crear soluciones innovadoras
        </p>
        <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm text-white cursor-pointer hover:bg-white/20 transition-all">
          Explorar mi trabajo
        </div>
      </div>
    </div>
  );
}
