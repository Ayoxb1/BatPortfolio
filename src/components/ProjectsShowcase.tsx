'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { EASE, DURATION } from '@/lib/gsap-config';
import Image from 'next/image';
import { onSectionNavigate } from '@/lib/navigation-event';

interface Project {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link: string;
  previewImage: string;
  stats?: string;
}

const projects: Project[] = [
  { 
    id: '01', 
    code: 'SYS-BARBER',
    title: 'BarberSaaS', 
    subtitle: 'Plataforma SaaS de Gestión Integral', 
    description: 'Sistema empresarial completo con arquitectura multi-sucursal, control de reservas en tiempo real, gestión de inventario, analítica financiera y portal de fidelización.', 
    tags: ['Java', 'JavaFX', 'SQL / PostgreSQL', 'SaaS Architecture', 'REST APIs'], 
    link: 'https://barber-saas-pi.vercel.app',
    previewImage: '/previews/barber.webp',
    stats: 'Fullstack SaaS // Multi-Tenant'
  },
  { 
    id: '02', 
    code: 'SYS-GYMTRACK',
    title: 'GymTrack', 
    subtitle: 'Sistema de Telemetría y Entrenamiento', 
    description: 'Aplicación deportiva de alto rendimiento para tracking biométrico, planificación de rutinas adaptativas, control de sobrecarga progresiva y métricas avanzadas.', 
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Analytics'], 
    link: 'https://centro-deportivo-pedro-jv-illa.vercel.app',
    previewImage: '/previews/gymtrack.webp',
    stats: 'Telemetry // HealthTech'
  },
  { 
    id: '03', 
    code: 'SYS-BOWLWEB',
    title: 'BowlWeb', 
    subtitle: 'E-Commerce de Nueva Generación', 
    description: 'Tienda digital de productos frescos con experiencia de compra inmersiva, microinteracciones fluidas, carrito persistente y checkout optimizado.', 
    tags: ['React', 'Tailwind', 'Framer Motion', 'E-Commerce UX'], 
    link: 'https://bowl-food-web.vercel.app/',
    previewImage: '/previews/bowlweb.webp',
    stats: 'Interactive Commerce // Ultra Fast'
  },
  { 
    id: '04', 
    code: 'SYS-ADVENTURE',
    title: 'Aventura Gráfica', 
    subtitle: 'Motor Interactivo Web & Game Dev', 
    description: 'Videojuego web narrativo con árbol de decisiones ramificado, renderizado dinámico en Canvas 2D, máquinas de estados finitos y ambientación sonora.', 
    tags: ['JavaScript ES6+', 'HTML5 Canvas', 'Game Loop', 'State Machine'], 
    link: 'https://github.com/Ayoxb1',
    previewImage: '/previews/adventure.webp',
    stats: 'Game Engine // 60 FPS Canvas'
  },
  { 
    id: '05', 
    code: 'SYS-DAM-SUITE',
    title: 'Proyectos DAM', 
    subtitle: 'Suite de Software Multiplataforma', 
    description: 'Arsenales de escritorio empresariales: gestores de inventarios con transacciones SQL atómicas, software de gestión de personal, seguridad de accesos y controladores JDBC.', 
    tags: ['Java Core', 'JavaFX', 'JDBC', 'MySQL / SQLite', 'Clean Architecture'], 
    link: 'https://github.com/Ayoxb1',
    previewImage: '/previews/dam.webp',
    stats: 'Enterprise Suite // ACID Compliant'
  },
  { 
    id: '06', 
    code: 'SYS-RAMADAN',
    title: 'Ramadan Deen', 
    subtitle: 'Plataforma Fullstack de Recursos Comunitarios', 
    description: 'Aplicación integral con sincronización en la nube, calendarios dinámicos calculados por geolocalización, biblioteca de recursos y autenticación segura.', 
    tags: ['Node.js', 'MongoDB', 'React', 'Geolocation API'], 
    link: 'https://ramadan-deen.vercel.app',
    previewImage: '/previews/ramadan.webp',
    stats: 'Cloud Platform // Real-Time DB'
  },
  { 
    id: '07', 
    code: 'SYS-EDITORIAL',
    title: 'Imaan Belbaz x Drake', 
    subtitle: 'Plataforma de Marca & High-Fashion', 
    description: 'Showcase interactivo de moda con diseño editorial contemporáneo, tipografía cinemática y navegación de catálogo inspirada en revistas de alta costura.', 
    tags: ['Next.js', 'Tailwind CSS', 'Editorial Design', 'Brand Identity'], 
    link: 'https://imaan-belbaz-x-drake.vercel.app/',
    previewImage: '/previews/imaan.webp',
    stats: 'Editorial UX // Awwwards Style'
  },
];

export default function ProjectsShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2600',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            projects.length - 1,
            Math.floor(progress * projects.length)
          );
          setActiveIndex(index);
        }
      }
    });

    const cards = gsap.utils.toArray('.project-card');
    const title = '.section-header';

    tl.to(title, {
      yPercent: -35,
      autoAlpha: 0.35,
      ease: 'none',
      duration: 0.15
    });

    cards.forEach((card: any, i) => {
      if (i === 0) {
        tl.to(card, { autoAlpha: 1, scale: 1, y: 0, duration: 0.15 }, 0);
      } else {
        tl.fromTo(
          card,
          { autoAlpha: 0, scale: 0.92, y: 40 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.25, ease: 'power2.out' },
          i * 0.4
        );
      }

      if (i < cards.length - 1) {
        tl.to(
          card,
          { autoAlpha: 0, scale: 0.92, y: -40, duration: 0.25, ease: 'power2.in' },
          (i + 1) * 0.4 - 0.1
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, { scope: containerRef });

  // Fluid presentation animation when navigated from Dock
  useEffect(() => {
    return onSectionNavigate('proyectos', () => {
      setTimeout(() => {
        gsap.fromTo(
          '.section-header',
          { y: -20, autoAlpha: 0.4 },
          { y: 0, autoAlpha: 1, duration: 0.85, ease: 'power3.out' }
        );

        gsap.fromTo(
          '.project-card',
          { scale: 0.94, autoAlpha: 0.4 },
          { scale: 1, autoAlpha: 1, duration: 0.85, ease: 'power3.out' }
        );

        gsap.fromTo(
          '.github-showcase-badge',
          { scale: 0.8, autoAlpha: 0.5 },
          { scale: 1, autoAlpha: 1, duration: 0.75, ease: 'back.out(2)' }
        );
      }, 300);
    });
  }, []);

  const activeProject = projects[activeIndex];

  return (
    <section 
      id="proyectos" 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center batcave-grid bg-black"
    >
      {/* Floating Glowing GitHub Badge in Projects Section */}
      <a
        href="https://github.com/Ayoxb1"
        target="_blank"
        rel="noopener noreferrer"
        className="github-showcase-badge absolute top-5 right-4 sm:top-8 sm:right-8 md:top-10 md:right-12 z-30 flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-zinc-900/85 backdrop-blur-xl border border-white/25 hover:border-white/60 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.45)] transition-all duration-300 hover:scale-105 cursor-pointer group"
        title="Abrir perfil de GitHub de Ayoub Atidi"
      >
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute -inset-1 rounded-full bg-white/40 opacity-75" />
          <svg className="relative w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-white">GITHUB</span>
          <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 group-hover:text-zinc-200">@Ayoxb1 ➔</span>
        </div>
      </a>

      {/* Batcave Tactical Header */}
      <div className="section-header absolute top-6 md:top-10 z-20 flex flex-col items-center text-center px-4 will-change-transform">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-zinc-300 text-[11px] font-mono tracking-widest uppercase mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          WAYNE_DATABASE // SECURE_ARCHIVE
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight glow-text-subtle">
          Arsenales & Proyectos
        </h2>
      </div>

      {/* Main Centered Projects Stage */}
      <div className="relative w-full max-w-5xl mx-auto h-full flex items-center justify-center px-4 md:px-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="project-card absolute w-full max-w-5xl px-2 md:px-0 flex items-center justify-center will-change-transform"
          >
            {/* Holographic Batcomputer Terminal Panel with Website Mini Preview */}
            <div className="tactical-border w-full rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_0_80px_rgba(0,0,0,0.95)] border border-white/15 bg-[#0a0a0a]/95 relative overflow-hidden">
              
              {/* Scanline overlay inside card */}
              <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />

              {/* Watermark ID in background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[18rem] font-black text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter">
                {project.id}
              </div>

              {/* Card Terminal Header */}
              <div className="relative z-10 flex items-center justify-between pb-3 mb-5 border-b border-white/10 text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-2 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  {project.code}
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-zinc-300 text-[10px] tracking-widest uppercase">
                    PROYECTO TITULADO DAM
                  </span>
                </div>
              </div>

              {/* Split Content: Left Details, Right Mini Web Preview Mockup */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
                
                {/* Left Column: Information & Actions */}
                <div className="lg:col-span-6 flex flex-col text-left">
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-white tracking-tight mb-1 glow-text-subtle">
                    {project.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs md:text-sm font-medium text-zinc-400 mb-2 md:mb-3 tracking-wide font-mono">
                    // {project.subtitle}
                  </p>

                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed mb-3 md:mb-4 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                    {project.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1 md:gap-1.5 mb-3 md:mb-5">
                    {project.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 bg-white/5 border border-white/15 rounded text-[10px] md:text-[11px] font-mono text-zinc-300 tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Primary CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-batcave group text-xs md:text-sm py-2 px-4 shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer"
                    >
                      <span>Acceder a la Web</span>
                      <svg className="w-3.5 h-3.5 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>

                    <a 
                      href={project.link.includes('github.com') ? project.link : 'https://github.com/Ayoxb1'}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-batcave-ghost group text-xs md:text-sm py-2 px-3.5 flex items-center gap-2 hover:border-white/40 hover:bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.08)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all cursor-pointer"
                      title="Ver repositorio y código fuente en GitHub"
                    >
                      <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>Código GitHub</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Interactive Browser Window Mini Preview */}
                <div className="lg:col-span-6 mt-2 lg:mt-0">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative rounded-xl overflow-hidden border border-white/20 bg-[#060606] shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-white/50 hover:shadow-[0_0_50px_rgba(255,255,255,0.12)] cursor-pointer"
                  >
                    {/* Browser Mockup Header Bar */}
                    <div className="w-full flex items-center justify-between px-3 py-2 bg-[#111111] border-b border-white/10 text-[10px] font-mono text-zinc-400">
                      {/* Window Controls */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-red-500 transition-colors" />
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-yellow-500 transition-colors" />
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-green-500 transition-colors" />
                      </div>

                      {/* Mockup Address Bar */}
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-black/60 border border-white/10 text-zinc-400 text-[10px] max-w-[200px] sm:max-w-xs truncate">
                        <span className="text-zinc-500">🔒</span>
                        <span className="truncate">{project.link.replace('https://', '')}</span>
                      </div>

                      {/* Live Badge */}
                      <div className="flex items-center gap-1 text-[9px] text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span>LIVE</span>
                      </div>
                    </div>

                    {/* Screenshot Preview Image with Zoom & Scanline overlay */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                      <Image
                        src={project.previewImage}
                        alt={`Preview de ${project.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Hover Glass Flare & Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                      
                      {/* Corner Target Reticles */}
                      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/60 pointer-events-none" />
                      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/60 pointer-events-none" />
                      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/60 pointer-events-none" />
                      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/60 pointer-events-none" />

                      {/* Hover Badge */}
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 border border-white/30 text-white text-[10px] font-mono tracking-wider backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                        <span>ABRIR EN VIVO</span>
                        <span>↗</span>
                      </div>
                    </div>
                  </a>
                </div>

              </div>

              {/* Bottom Telemetry Note */}
              <div className="relative z-10 mt-5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>{project.stats || 'WAYNE_SEC // ARQUITECTURA VERIFICADA'}</span>
                <span className="text-zinc-600">SECTOR {project.id} DE 07 // CLICK EN LA PREVIEW PARA ABRIR</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Tactical Indicators (Right Side) */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2.5">
        {projects.map((p, index) => (
          <div
            key={p.id}
            className={`w-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'h-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' 
                : 'h-1.5 bg-white/20'
            }`}
            title={`Proyecto ${p.id}: ${p.title}`}
          />
        ))}
      </div>
    </section>
  );
}
