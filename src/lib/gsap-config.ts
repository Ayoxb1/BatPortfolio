import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

/* ─── Motion Design System ─── Stealth Monochrome (Pitch Black & Titanium White) ─── */

/** Single ease for the entire site */
export const EASE = 'power3.inOut';

/** Exception: only for the preloader wipe */
export const EASE_WIPE = 'power4.inOut';

/** Duration tokens */
export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 1.1,
} as const;

/** Brand accent — Stealth Titanium White */
export const ACCENT = '#ffffff';
export const ACCENT_MUTED = '#a1a1aa';
export const ACCENT_DARK = '#27272a';

/** Register all GSAP plugins once */
export function registerGSAPPlugins() {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
  }
}

/** Apply global GSAP defaults */
export function applyGSAPDefaults() {
  gsap.defaults({
    ease: EASE,
    duration: DURATION.base,
  });
}
