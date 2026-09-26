'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { EASE, DURATION } from '@/lib/gsap-config';

interface HeroSceneProps {
  animateIn?: boolean;
}

export default function HeroScene({ animateIn = false }: HeroSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const threeGroupRef = useRef<THREE.Group | null>(null);

  // Easter egg states
  const [batSignalActive, setBatSignalActive] = useState(true); // Active by default as in the concept render
  const [spherePositionIndex, setSpherePositionIndex] = useState(0); // 0: Centro, 1: Derecha, 2: Izquierda, 3: Órbita Libre
  const [batParallax, setBatParallax] = useState({ x: 0, y: 0, tilt: 0 });

  // Listen to Bat-Signal toggle events from the Dock Batman icon
  useEffect(() => {
    const handleToggle = () => {
      setBatSignalActive((prev) => !prev);
    };
    window.addEventListener('toggle-bat-signal', handleToggle);
    return () => window.removeEventListener('toggle-bat-signal', handleToggle);
  }, []);

  // Parallax & Wing Banking for the central Gliding Bat
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      setBatParallax({
        x: normX * 30,
        y: normY * 18,
        tilt: normX * 7, // Subtle banking tilt
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const positions = [
    { name: 'CENTRO', x: 0, y: 0, z: 0 },
    { name: 'DERECHA', x: 1.8, y: 0.4, z: -0.5 },
    { name: 'IZQUIERDA', x: -1.8, y: -0.3, z: -0.5 },
    { name: 'SUPERIOR', x: 0, y: 1.2, z: -0.8 },
  ];

  // Function to move the black sphere to different positions
  const cycleSpherePosition = () => {
    const nextIndex = (spherePositionIndex + 1) % positions.length;
    setSpherePositionIndex(nextIndex);
    const target = positions[nextIndex];
    if (threeGroupRef.current) {
      gsap.to(threeGroupRef.current.position, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 1.4,
        ease: 'power3.out',
      });
      gsap.to(threeGroupRef.current.rotation, {
        y: threeGroupRef.current.rotation.y + Math.PI,
        duration: 1.4,
        ease: 'power3.out',
      });
    }
  };

  // Three.js 3D Stealth Core — Matte Black & Titanium Wireframe
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      100
    );
    camera.position.z = 4.2;

    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

    const group = new THREE.Group();
    threeGroupRef.current = group;
    group.scale.set(0, 0, 0);
    scene.add(group);

    // 1. Inner Stealth Titanium Core (Deep Graphite)
    const coreGeo = new THREE.IcosahedronGeometry(1.2, isMobile ? 0 : 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x121212,
      roughness: 0.12,
      metalness: 0.95,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 2. Outer Monochromatic Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.36, isMobile ? 0 : 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireMesh);

    // 3. Orbital Tactical Ring 1
    const ringGeo1 = new THREE.TorusGeometry(1.7, 0.015, 8, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
      wireframe: true,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    group.add(ringMesh1);

    // 4. Orbital Tactical Ring 2
    const ringGeo2 = new THREE.TorusGeometry(1.9, 0.01, 8, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.14,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    group.add(ringMesh2);

    // 5. Floating Dust Particles (White/Silver)
    const particleCount = isMobile ? 50 : 120;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3.0);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x555555, 1.6);
    dirLight2.position.set(-4, -3, 2);
    scene.add(dirLight2);

    // Mouse tracking for parallax & dynamic 3D gliding
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let spinVelocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Interactive click on canvas spins the sphere
    const handleCanvasClick = () => {
      spinVelocity = 0.08;
    };
    window.addEventListener('click', handleCanvasClick);

    // Resize
    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Spin decay
      if (spinVelocity > 0) {
        spinVelocity *= 0.95;
      }

      coreMesh.rotation.y += 0.004 + spinVelocity;
      coreMesh.rotation.x += 0.002 + spinVelocity * 0.5;

      wireMesh.rotation.y -= 0.003 + spinVelocity;
      wireMesh.rotation.z += 0.002;

      ringMesh1.rotation.z += 0.005 + spinVelocity * 0.8;
      ringMesh2.rotation.x += 0.004 + spinVelocity * 0.8;

      particles.rotation.y += 0.0008;

      // Parallax rotation & subtle positional drift
      group.rotation.y = targetX * 0.35;
      group.rotation.x = -targetY * 0.25;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleCanvasClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  // GSAP Entrance & Scroll Movement
  useGSAP(
    () => {
      if (!animateIn) return;

      const tl = gsap.timeline();

      tl.fromTo(
        '.hud-header',
        { autoAlpha: 0, y: -20 },
        { autoAlpha: 1, y: 0, duration: DURATION.base, ease: EASE },
        0
      );

      tl.fromTo(
        '.hero-badge',
        { autoAlpha: 0, scale: 0.8 },
        { autoAlpha: 1, scale: 1, duration: DURATION.base, ease: EASE },
        0.2
      );

      tl.fromTo(
        '.hero-title-part',
        { autoAlpha: 0, y: 50, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: DURATION.slow, ease: EASE, stagger: 0.12 },
        0.3
      );

      tl.fromTo(
        '.hero-desc',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: DURATION.base, ease: EASE },
        0.6
      );

      tl.fromTo(
        '.hero-actions',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: DURATION.base, ease: EASE },
        0.8
      );

      tl.fromTo(
        '.scroll-indicator',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: DURATION.base, ease: EASE },
        1.0
      );

      // Revelation of the 3D Sphere right after the video sequence
      if (threeGroupRef.current && sectionRef.current) {
        gsap.fromTo(
          threeGroupRef.current.scale,
          { x: 0, y: 0, z: 0 },
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 1.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Scroll-driven sphere movement: As the user scrolls through the section, the sphere glides into the upper right corner
      if (threeGroupRef.current && sectionRef.current) {
        gsap.to(threeGroupRef.current.position, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
          x: 2.0,
          y: 0.8,
          z: -1.2,
          ease: 'power1.inOut',
        });
      }
    },
    { dependencies: [animateIn], scope: sectionRef }
  );

  const scrollTo = (id: string) => {
    const lenis = (window as any).lenis;
    if (lenis) lenis.scrollTo(id, { duration: 1.2 });
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen overflow-hidden flex flex-col justify-between items-center batcave-grid px-4 pt-6 pb-12 select-none bg-black"
    >

      {/* Bat-Signal Volumetric Sky Beam & Projection (Easter Egg) */}
      {batSignalActive && (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden transition-opacity duration-1000">
          {/* Volumetric Diagonal Light Beam reaching from the searchlight */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.22)_0%,_rgba(255,255,255,0.06)_40%,_transparent_70%)] animate-pulse" />
          
          {/* Glowing Bat Insignia projected into the virtual Gotham sky */}
          <div className="relative flex flex-col items-center justify-center animate-bounce">
            <div className="w-56 h-56 md:w-80 md:h-80 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-[0_0_140px_rgba(255,255,255,0.35)]">
              {/* Batman Bat Silhouette */}
              <svg 
                viewBox="0 0 100 60" 
                className="w-36 md:w-52 h-auto text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.95)]" 
                fill="currentColor"
              >
                <path d="M50 8 C48 14 44 19 38 18 C32 17 26 14 20 18 C14 22 10 32 6 36 C10 35 15 36 18 39 C15 42 12 47 10 52 C18 48 27 46 34 50 C36 44 41 38 50 42 C59 38 64 44 66 50 C73 46 82 48 90 52 C88 47 85 42 82 39 C85 36 90 35 94 36 C90 32 86 22 80 18 C74 14 68 17 62 18 C56 19 52 14 50 8 Z" />
              </svg>
            </div>
            
            <div className="mt-4 px-4 py-1.5 rounded-full bg-black/90 border border-white/30 text-white font-mono text-xs tracking-wider shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>ALERTA GOTHAM: BAT-SEÑAL ACTIVADA // BRUCE WAYNE ESTÁ EN CAMINO</span>
            </div>
          </div>
        </div>
      )}

      {/* Murciélago realista con alas desplegadas planeando en la zona central sobre la cuadrícula geométrica */}
      <div
        className="absolute top-[32%] sm:top-[34%] left-1/2 z-10 pointer-events-none w-[320px] sm:w-[480px] md:w-[640px] lg:w-[780px] max-w-full transition-transform duration-300 ease-out select-none"
        style={{
          transform: `translate(calc(-50% + ${batParallax.x}px), calc(-50% + ${batParallax.y}px)) rotate(${batParallax.tilt}deg)`,
        }}
      >
        <div className="relative w-full aspect-[16/9] animate-bat-glide">
          <img
            src="/bat_gliding_real.webp"
            alt="Murciélago con alas desplegadas planeando sobre el fondo de cuadrícula geométrica oscura"
            className="w-full h-full object-contain mix-blend-screen opacity-90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
            draggable={false}
          />
        </div>
      </div>

      {/* Bat-Señal Volumétrica Proyectada en el Cielo Nocturno (Esquina Superior Derecha) */}
      <div className="hidden lg:flex flex-col items-end absolute top-20 right-8 z-30 pointer-events-auto">
        <div
          onClick={() => setBatSignalActive(!batSignalActive)}
          className="group cursor-pointer rounded-xl border border-white/20 bg-[#0a0a0c]/85 backdrop-blur-xl p-2.5 transition-all duration-300 hover:border-white/40 shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
          title="Alternar Bat-Señal Volumétrica"
        >
          <div className="relative w-52 xl:w-60 h-30 xl:h-34 rounded-lg overflow-hidden border border-white/15 bg-zinc-950">
            <img
              src="/batsignal_projector.webp"
              alt="Bat-Señal Proyector Volumétrico"
              className={`w-full h-full object-cover transition-all duration-500 ${
                batSignalActive ? 'brightness-110 contrast-125 saturate-110' : 'brightness-45 grayscale'
              }`}
            />
            {batSignalActive && (
              <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-transparent pointer-events-none animate-pulse" />
            )}
          </div>
          <div className="mt-2.5 flex items-center justify-between px-1">
            <span
              className={`text-[10px] xl:text-[11px] font-mono tracking-widest font-bold flex items-center gap-2 ${
                batSignalActive ? 'text-white' : 'text-zinc-500'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  batSignalActive
                    ? 'bg-white shadow-[0_0_8px_white] animate-ping'
                    : 'bg-zinc-700'
                }`}
              />
              {batSignalActive ? '[BAT-SEÑAL: ACTIVA]' : '[BAT-SEÑAL: STANDBY]'}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
              {batSignalActive ? 'ONLINE' : 'STANDBY'}
            </span>
          </div>
        </div>
      </div>

      {/* Scanline CRT overlay */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none z-10" />

      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Batcave Corner Guides */}
      <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/20 pointer-events-none" />

      {/* Technical Batcave Coordinates */}
      <div className="absolute top-6 left-12 text-zinc-600 text-[10px] font-mono pointer-events-none hidden md:block">
        + LOC: 40.4168° N, 3.7038° W // SECTOR: GOTHAM_DAM
      </div>
      <div className="absolute top-6 right-12 text-zinc-600 text-[10px] font-mono pointer-events-none hidden md:block text-right">
        SYS_VER: 4.2.0 // STEALTH ACTIVE +
      </div>
      <div className="absolute bottom-6 left-6 text-zinc-700 text-[10px] font-mono pointer-events-none hidden md:block">
        WAYNE_TECH // PROTOCOL_DAM
      </div>
      <div className="absolute bottom-6 right-6 text-zinc-700 text-[10px] font-mono pointer-events-none hidden md:block text-right">
        STATUS: ENCRYPTED // ONLINE
      </div>

      {/* Top Batcomputer HUD Bar — Stealth Monochrome with Batman Easter Egg */}
      <div className="hud-header relative z-20 w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-[#0c0c0c]/80 backdrop-blur-md text-[11px] font-mono text-zinc-300">
        <div className="flex items-center gap-2.5">
          {/* Stylized Batman Batwing Logo */}
          <div className="w-6 h-6 rounded bg-white/10 border border-white/20 flex items-center justify-center p-0.5">
            <svg viewBox="0 0 100 60" className="w-5 h-auto text-white" fill="currentColor">
              <path d="M50 8 C48 14 44 19 38 18 C32 17 26 14 20 18 C14 22 10 32 6 36 C10 35 15 36 18 39 C15 42 12 47 10 52 C18 48 27 46 34 50 C36 44 41 38 50 42 C59 38 64 44 66 50 C73 46 82 48 90 52 C88 47 85 42 82 39 C85 36 90 35 94 36 C90 32 86 22 80 18 C74 14 68 17 62 18 C56 19 52 14 50 8 Z" />
            </svg>
          </div>
          <span className="font-bold tracking-wider text-white">WAYNE ENTERPRISES</span>
          <span className="text-zinc-500 hidden sm:inline">// APPLIED SCIENCES</span>
        </div>

        {/* Interactive Controls: Move Sphere & Bat-Signal Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mover la Bola 3D */}
          <button
            onClick={cycleSpherePosition}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/20 text-white text-[10px] font-mono tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Mover la bola 3D a otra posición"
          >
            <span>⟲ MOVER BOLA:</span>
            <span className="text-zinc-400 font-bold">{positions[spherePositionIndex].name}</span>
          </button>

          {/* Bat-Signal Toggle Button */}
          <button
            onClick={() => setBatSignalActive(!batSignalActive)}
            className={`px-2.5 py-1 rounded border text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              batSignalActive
                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.6)] font-bold'
                : 'bg-white/5 hover:bg-white/15 border-white/20 text-zinc-300'
            }`}
            title="Activar/Desactivar la Bat-Señal"
          >
            <span>🦇</span>
            <span>{batSignalActive ? 'BAT-SEÑAL: ACTIVA' : 'BAT-SEÑAL'}</span>
          </button>

          <span className="text-xs px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white font-medium hidden sm:inline">
            TÉCNICO DAM TITULADO
          </span>
        </div>
      </div>

      {/* Three.js 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Main Hero Content */}
      <div ref={textRef} className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto my-auto py-8">
        
        {/* Tactical Badge with Batwing Icon */}
        <div className="hero-badge mb-6">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-zinc-300 text-xs font-mono tracking-widest uppercase shadow-sm">
            <svg viewBox="0 0 100 60" className="w-3.5 h-auto text-white" fill="currentColor">
              <path d="M50 8 C48 14 44 19 38 18 C32 17 26 14 20 18 C14 22 10 32 6 36 C10 35 15 36 18 39 C15 42 12 47 10 52 C18 48 27 46 34 50 C36 44 41 38 50 42 C59 38 64 44 66 50 C73 46 82 48 90 52 C88 47 85 42 82 39 C85 36 90 35 94 36 C90 32 86 22 80 18 C74 14 68 17 62 18 C56 19 52 14 50 8 Z" />
            </svg>
            SOFTWARE ARCHITECT & FULL STACK
          </span>
        </div>

        {/* Hero Name with Crisp White Typography */}
        <h1 className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 mb-4">
          <span className="hero-title-part inline-block text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] text-white glow-text">
            Ayoub
          </span>
          <span className="hero-title-part inline-block text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] text-zinc-300 glow-text">
            Atidi
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="hero-desc text-lg md:text-2xl text-zinc-400 font-mono tracking-wide max-w-2xl mb-8">
          Técnico Superior en Desarrollo de Aplicaciones Multiplataforma
        </p>

        {/* Actions Buttons */}
        <div className="hero-actions flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={() => scrollTo('#proyectos')}
            className="btn-batcave group cursor-pointer"
          >
            <span>Explorar Proyectos</span>
            <svg className="w-4 h-4 text-black group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          <button 
            onClick={() => scrollTo('#contacto')}
            className="btn-batcave-ghost cursor-pointer"
          >
            <span>Canal Seguro // Contacto</span>
          </button>
        </div>
      </div>

      {/* Tactical Bottom Scroll Indicator */}
      <div className="scroll-indicator relative z-20 flex flex-col items-center gap-2 cursor-pointer" onClick={() => scrollTo('#secuencia')}>
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-zinc-500">
          INICIAR SECUENCIA SCROLL
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  );
}
