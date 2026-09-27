'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { EASE, DURATION } from '@/lib/gsap-config';
import { onSectionNavigate } from '@/lib/navigation-event';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setStatusMessage('¡Transmisión entregada con éxito! He recibido tus datos y te responderé en breve.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setStatus('idle');
          setStatusMessage('');
        }, 8000);
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Error en la transmisión. Puedes pulsar abajo para enviar por email directo.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Fallo temporal de conexión. Puedes usar el botón de abajo para enviar tu mensaje directamente por Gmail/Correo.');
    }
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
      code: 'FREQ-03',
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

  // Fluid presentation animation when navigated from Dock
  useEffect(() => {
    return onSectionNavigate('contacto', () => {
      setTimeout(() => {
        gsap.fromTo(
          '.contact-header',
          { y: 30, autoAlpha: 0.5 },
          { y: 0, autoAlpha: 1, duration: 0.85, ease: 'power3.out' }
        );

        gsap.fromTo(
          '.contact-node',
          { x: -30, autoAlpha: 0.35 },
          { x: 0, autoAlpha: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out' }
        );

        gsap.fromTo(
          '.contact-terminal',
          { y: 30, autoAlpha: 0.4, scale: 0.98 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.85, ease: 'power3.out' }
        );

        gsap.fromTo(
          '.tactical-social-btn',
          { y: 15, autoAlpha: 0.4 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' }
        );
      }, 300);
    });
  }, []);

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
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <a
                  href="https://github.com/Ayoxb1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactical-social-btn btn-batcave-ghost flex items-center justify-center gap-2.5 py-3 px-3 group hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.18)] transition-all text-xs font-mono"
                  title="Ver GitHub de Ayoub Atidi"
                >
                  <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/ayoub-atidi-belbaz-07b274312/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactical-social-btn btn-batcave-ghost flex items-center justify-center gap-2.5 py-3 px-3 group hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.18)] transition-all text-xs font-mono"
                  title="Ver LinkedIn de Ayoub Atidi"
                >
                  <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://www.instagram.com/__ayoxb__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactical-social-btn btn-batcave-ghost flex items-center justify-center gap-2.5 py-3 px-3 group hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.18)] transition-all text-xs font-mono"
                  title="Ver Instagram de Ayoub Atidi"
                >
                  <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>Instagram</span>
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

                {status === 'success' && (
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs font-mono flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-bold uppercase tracking-wider mb-1">✓ Transmisión Confirmada</div>
                      <div>{statusMessage}</div>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-mono flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      <span className="font-bold uppercase tracking-wider">{statusMessage}</span>
                    </div>
                    <a
                      href={`mailto:ayoubatidi2019@gmail.com?subject=${encodeURIComponent(`Contacto Portfolio: ${formData.name || 'Consulta'}`)}&body=${encodeURIComponent(`${formData.message}\n\n---\nDe: ${formData.name} (${formData.email})`)}`}
                      className="mt-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-white font-mono text-xs transition-colors"
                    >
                      <span>Abrir y enviar en tu cliente de correo (Gmail/Mail) ➔</span>
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-batcave cursor-pointer py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2 text-black">
                      <svg className="animate-spin w-4 h-4 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>TRANSMITIENDO A LA BANDEJA DE AYOUB ATIDI...</span>
                    </span>
                  ) : status === 'success' ? (
                    <span className="flex items-center justify-center gap-2 text-black">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>¡TRANSMISIÓN ENVIADA CON ÉXITO!</span>
                    </span>
                  ) : (
                    <span>ENVIAR TRANSMISIÓN ENCRIPTADA ➔</span>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <a
                    href="mailto:ayoubatidi2019@gmail.com?subject=Contacto%20desde%20BatPortfolio"
                    className="text-[11px] font-mono text-zinc-500 hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
                    title="Enviar mensaje directo vía tu cliente de correo favorito"
                  >
                    <span>❖ ¿Prefieres tu cliente de correo?</span>
                    <span className="underline underline-offset-4 text-zinc-400 hover:text-white">Redactar a ayoubatidi2019@gmail.com ➔</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Tactical Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
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
            <span>REMOTE // GLOBAL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
