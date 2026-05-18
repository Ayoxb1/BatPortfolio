'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollyCanvasProps {
  frameCount: number;
}

export default function ScrollyCanvas({ frameCount }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Precargar imágenes
  useEffect(() => {
    const loadImages = async () => {
      const images: HTMLImageElement[] = [];
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/sequence/frame_${String(i).padStart(4, '0')}.png`;
        images.push(img);
      }
      imagesRef.current = images;
    };

    loadImages();
  }, [frameCount]);

  // Scroll linked animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    canvas.width = 720;
    canvas.height = 1280;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      
      const frameIndex = Math.floor(scrollProgress * (frameCount - 1));
      setCurrentFrame(frameIndex);

      const img = imagesRef.current[frameIndex];
      if (img && img.complete) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial draw

    return () => window.removeEventListener('scroll', handleScroll);
  }, [frameCount]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500vh] bg-black"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="relative w-full max-w-md aspect-[9/16]">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
          {/* Overlay gradient para suavidad */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/10" />
        </div>
      </div>
    </div>
  );
}
