'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { EASE, DURATION } from '@/lib/gsap-config';
import { onSectionNavigate } from '@/lib/navigation-event';

const skillCategories = [
  {
    code: 'MOD-01',
    title: 'Frontend & Interfaces Tácticas',
    skills: ['React 18/19', 'Next.js 14 App Router', 'TypeScript', 'Tailwind CSS', 'GSAP & Three.js', 'Framer Motion'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    code: 'MOD-02',
    title: 'Núcleo Backend & Persistencia',
    skills: ['Java Enterprise', 'Node.js & Express', 'SQL / PostgreSQL / MySQL', 'MongoDB', 'Arquitectura REST', 'Seguridad & JWT'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008V18m-3-.008h.008v.008H15V18" />
      </svg>
    ),
  },
  {
    code: 'MOD-03',
    title: 'Multiplataforma & Escritorio',
    skills: ['JavaFX & FXML', 'Android Studio & Kotlin', 'Controladores JDBC', 'Gestión de Procesos', 'Patrón MVC / Clean'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    code: 'MOD-04',
    title: 'Despliegue, Cloud & Automatización',
    skills: ['Git & GitHub Flow', 'Docker & Contenedores', 'Vercel Serverless', 'n8n Workflow Automation', 'CI/CD Pipelines'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

const stats = [
  { value: 7, suffix: '+', label: 'Sistemas Desplegados', desc: 'SaaS, Web y Apps DAM' },
  { value: 3, suffix: '+', label: 'Webs en Producción', desc: 'Alto Tráfico & Activas' },
  { value: 100, suffix: '%', label: 'Técnico Superior DAM', desc: 'Especialista en Multiplataforma' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.about-header', {
        y: 50,
        autoAlpha: 0,
        duration: DURATION.slow,
        ease: EASE,
        scrollTrigger: {
          trigger: '.about-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      ScrollTrigger.batch('.skill-card', {
        onEnter: (elements) => {
          gsap.from(elements, {
            y: 40,
            autoAlpha: 0,
            duration: DURATION.base,
            ease: EASE,
            stagger: 0.12,
          });
        },
        start: 'top 85%',
        once: true,
      });

      const statElements = gsap.utils.toArray<HTMLElement>('.stat-number');
      statElements.forEach((el) => {
        const target = parseInt(el.dataset.value || '0', 10);
        const obj = { value: 0 };

        gsap.to(obj, {
          value: target,
          duration: DURATION.slow * 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.value).toString();
          },
        });
      });
    },
    { scope: sectionRef }
  );

  // Fluid presentation animation when navigated from Dock
  useEffect(() => {
    return onSectionNavigate('sobre-mi', () => {
      setTimeout(() => {
        gsap.fromTo(
          '.about-header',
          { y: 30, autoAlpha: 0.5 },
          { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' }
        );

        gsap.fromTo(
          '.skill-card',
          { y: 25, autoAlpha: 0.35, scale: 0.97 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.75, stagger: 0.05, ease: 'power3.out' }
        );

        const statElements = gsap.utils.toArray<HTMLElement>('.stat-number');
        statElements.forEach((el) => {
          const target = parseInt(el.dataset.value || '0', 10);
          const obj = { value: 0 };
          gsap.to(obj, {
            value: target,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.value).toString();
            },
          });
        });
      }, 300);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre-mi"
      className="relative w-full py-28 md:py-36 px-4 md:px-8 overflow-hidden batcave-grid bg-black"
    >
      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* Section Header — Monochrome */}
        <div className="about-header mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-zinc-300 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            DOSSIER TÉCNICO // EXPEDIENTE PROFESIONAL
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 glow-text-subtle">
            Sobre Mí & Arsenal
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-zinc-300 text-base md:text-lg leading-relaxed">
            <div className="lg:col-span-7 space-y-4">
              <p>
                Soy <span className="text-white font-semibold">Ayoub Atidi</span>, desarrollador Full Stack titulado como <strong className="text-white">Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)</strong>.
              </p>
              <p className="text-zinc-400">
                Diseño y construyo soluciones tecnológicas integrales: desde arquitecturas SaaS multi-tenant y motores de escritorio con JavaFX hasta interfaces web modernas de alto impacto visual y rendimiento cinemático.
              </p>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl border border-white/10 bg-[#0c0c0c] font-mono text-xs text-zinc-300 space-y-2">
              <div className="text-zinc-500 uppercase tracking-widest border-b border-white/10 pb-2">
                // TELEMETRÍA DE PERFIL
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">ESPECIALIDAD:</span>
                <span className="text-white">Full Stack & Multiplataforma</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">NIVEL EDUCATIVO:</span>
                <span className="text-white font-bold">Técnico Superior DAM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">ESTADO:</span>
                <span className="text-emerald-400">DISPONIBLE // ACTIVO</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">STACK CENTRAL:</span>
                <span className="text-white">Java, Next.js, TS, SQL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Skills Grid — Monochrome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {skillCategories.map((category) => (
            <div
              key={category.code}
              className="skill-card tactical-border rounded-2xl p-6 md:p-8 hover:border-white/30 transition-all duration-300 glow-hover group bg-[#0a0a0a]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">{category.code}</span>
                    <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-mono text-zinc-300 group-hover:border-white/20 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Telemetry Stats Bar — Monochrome */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="tactical-border rounded-2xl p-6 text-center bg-[#0a0a0a]"
            >
              <p className="text-5xl md:text-6xl font-black text-white mb-2 glow-text-subtle font-mono">
                <span className="stat-number" data-value={stat.value}>
                  0
                </span>
                {stat.suffix}
              </p>
              <p className="text-white font-bold text-sm tracking-wide mb-1">{stat.label}</p>
              <p className="text-zinc-500 text-xs font-mono">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
