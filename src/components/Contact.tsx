'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { EASE, DURATION } from '@/lib/gsap-config';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contacts = [
    {
      code: 'FREQ-01',
      label: 'Email Oficial',
      value: 'ayoubatidi2019@gmail.com',
      href: 'mailto:ayoubatidi2019@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      code: 'FREQ-02',
      label: 'Línea Telefónica',
      value: '+34 641 27 91 31',
      href: 'tel:+34641279131',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
    },
    {
      code: 'FREQ-03',
      label: 'LinkedIn Profesional',
      value: 'Ayoub Atidi Belbaz',
      href: 'https://www.linkedin.com/in/ayoub-atidi-belbaz-07b274312/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      code: 'FREQ-04',
      label: 'Repositorio GitHub',
      value: 'github.com/Ayoxb1',
      href: 'https://github.com/Ayoxb1',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
  ];

  useGSAP(
    () => {
      gsap.from('.contact-header', {
        y: 50,
        autoAlpha: 0,
        duration: DURATION.slow,
        ease: EASE,
        scrollTrigger: {
          trigger: '.contact-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      ScrollTrigger.batch('.contact-node', {
        onEnter: (elements) =>
          gsap.from(elements, {
            y: 35,
            autoAlpha: 0,
            duration: DURATION.base,
            ease: EASE,
            stagger: 0.1,
          }),
        start: 'top 88%',
        once: true,
      });

      gsap.from('.contact-terminal', {
        y: 45,
        autoAlpha: 0,
        duration: DURATION.base,
        ease: EASE,
        scrollTrigger: {
          trigger: '.contact-terminal',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative w-full py-28 md:py-36 px-4 md:px-8 border-t border-white/10 batcave-grid bg-black overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="contact-header text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-zinc-300 text-xs font-mono tracking-widest uppercase mb-4">
            <svg viewBox="0 0 100 60" className="w-3.5 h-auto text-white" fill="currentColor">
              <path d="M50 8 C48 14 44 19 38 18 C32 17 26 14 20 18 C14 22 10 32 6 36 C10 35 15 36 18 39 C15 42 12 47 10 52 C18 48 27 46 34 50 C36 44 41 38 50 42 C59 38 64 44 66 50 C73 46 82 48 90 52 C88 47 85 42 82 39 C85 36 90 35 94 36 C90 32 86 22 80 18 C74 14 68 17 62 18 C56 19 52 14 50 8 Z" />
            </svg>
            CANAL SEGURO // TRANSMISIÓN ENCRIPTADA
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 glow-text-subtle">
            Iniciar Transmisión
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto font-mono text-sm">
            Disponible para contrataciones, desarrollo de sistemas críticos y colaboraciones de alto calibre.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Direct Communication Nodes */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-4 flex items-center gap-2">
              <span>❖</span> LÍNEAS DE ENLACE DIRECTO
            </div>

            {contacts.map((contact) => (
              <a
                key={contact.code}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact-node tactical-border rounded-xl p-4 flex items-center justify-between group hover:border-white/30 transition-all duration-300 glow-hover bg-[#0a0a0a]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                    {contact.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">{contact.label}</div>
                    <div className="text-sm font-semibold text-white truncate group-hover:text-zinc-200 transition-colors font-mono">
                      {contact.value}
                    </div>
                  </div>
                </div>

                <svg className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            ))}

            {/* Social Nodes */}
            <div className="pt-4">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
                REDES & PERFILES TÁCTICOS
              </div>
              <div className="flex gap-2.5">
                <a href="https://github.com/Ayoxb1" target="_blank" rel="noopener noreferrer" 
                   className="btn-batcave-ghost flex-1 justify-center py-3">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/ayoub-atidi-belbaz-07b274312/" target="_blank" rel="noopener noreferrer" 
                   className="btn-batcave-ghost flex-1 justify-center py-3">
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/__ayoxb__" target="_blank" rel="noopener noreferrer" 
                   className="btn-batcave-ghost flex-1 justify-center py-3">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Encrypted Form Terminal */}
          <div className="lg:col-span-7 contact-terminal">
            <div className="tactical-border rounded-2xl p-6 md:p-8 bg-[#0a0a0a]">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  TERMINAL // COMMS_ENCRYPTION_v2
                </span>
                <span className="text-zinc-500">CANAL SEGURO</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    IDENTIFICADOR // NOMBRE COMPLETO
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full font-mono text-sm"
                    placeholder="Introduce tu nombre o entidad..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    CANAL DE RESPUESTA // CORREO ELECTRÓNICO
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full font-mono text-sm"
                    placeholder="tu.correo@empresa.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    CONTENIDO DEL MENSAJE // BRIEF DEL PROYECTO
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full font-mono text-sm resize-none"
                    placeholder="Describe el sistema, vacante o colaboración requerida..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-batcave cursor-pointer py-4"
                >
                  {submitted ? (
                    <span className="flex items-center justify-center gap-2 text-black">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      ¡TRANSMISIÓN ENVIADA CON ÉXITO!
                    </span>
                  ) : (
                    <span>ENVIAR TRANSMISIÓN ENCRIPTADA ➔</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Tactical Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 60" className="w-3 h-auto text-zinc-400" fill="currentColor">
              <path d="M50 8 C48 14 44 19 38 18 C32 17 26 14 20 18 C14 22 10 32 6 36 C10 35 15 36 18 39 C15 42 12 47 10 52 C18 48 27 46 34 50 C36 44 41 38 50 42 C59 38 64 44 66 50 C73 46 82 48 90 52 C88 47 85 42 82 39 C85 36 90 35 94 36 C90 32 86 22 80 18 C74 14 68 17 62 18 C56 19 52 14 50 8 Z" />
            </svg>
            <span>© {new Date().getFullYear()} Ayoub Atidi · Wayne Tech Architecture. Todos los derechos reservados.</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-zinc-400">
            <Link href="/aviso-legal" className="hover:text-white transition-colors">
              Aviso Legal & Propiedad
            </Link>
            <span>·</span>
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <span>·</span>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>

          <div className="flex items-center gap-4 text-zinc-500">
            <span>B-OS // 4.2</span>
            <span>DAM TITULADO</span>
            <span>MADRID, ES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
