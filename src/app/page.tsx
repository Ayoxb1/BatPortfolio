'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SmoothScroller from '@/components/SmoothScroller';
import Preloader from '@/components/Preloader';
import HeroScene from '@/components/HeroScene';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import ScrollyCanvas from '@/components/ScrollyCanvas';
import About from '@/components/About';
import Contact from '@/components/Contact';
import CookieBanner from '@/components/CookieBanner';

// Dynamic import for the dock — avoids SSR issues with Framer Motion's useMotionValue
const MagneticDock = dynamic(
  () => import('@/components/ui/magnetic-dock'),
  { ssr: false }
);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScroller>
      {/* Preloader — blocks scroll and shows counter */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Dock — appears after preloader completes */}
      <MagneticDock visible={isLoaded} />

      <main className="bg-[#000000]">
        {/* 1. Secuencia de Vídeo de la Batcomputadora (al principio) */}
        <ScrollyCanvas frameCount={90} />

        {/* 2. Hero con la Bola 3D revelándose tras el vídeo */}
        <HeroScene animateIn={isLoaded} />

        {/* 3. Proyectos — Pinned scroll storytelling con Mini Previews */}
        <ProjectsShowcase />

        {/* 4. About — bio + skills + stats */}
        <About />

        {/* 5. Contact — form + links */}
        <Contact />

        {/* Tactical Cookie & Copyright Banner */}
        <CookieBanner />
      </main>
    </SmoothScroller>
  );
}
