'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerGSAPPlugins, applyGSAPDefaults } from '@/lib/gsap-config';

// Register once at module level (client only)
registerGSAPPlugins();
applyGSAPDefaults();

interface SmoothScrollerProps {
  children: React.ReactNode;
}

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false, // Native touch on mobile for better UX
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ticker (replaces requestAnimationFrame)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0); // Prevent GSAP from compensating for lag

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update);

    // Expose lenis globally for dock navigation (lenis.scrollTo)
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
