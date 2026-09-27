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

  // Sphere position state
  const [spherePositionIndex, setSpherePositionIndex] = useState(0); // 0: Centro, 1: Derecha, 2: Izquierda, 3: Órbita Libre

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

      {/* Top Batcomputer HUD Bar — Clean Stealth Technical */}
      <div className="hud-header relative z-20 w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-[#0c0c0c]/80 backdrop-blur-md text-[11px] font-mono text-zinc-300">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>
          <span className="font-bold tracking-wider text-white">WAYNE ENTERPRISES</span>
          <span className="text-zinc-500 hidden sm:inline">// APPLIED SCIENCES</span>
        </div>

        {/* Interactive Controls: Move Sphere & Title */}
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

          <span className="text-xs px-2.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-medium hidden sm:inline">
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
        
        {/* Tactical Status Badge */}
        <div className="hero-badge mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-zinc-300 text-xs font-mono tracking-widest uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
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
