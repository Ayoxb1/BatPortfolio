'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('batcave_legal_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('batcave_legal_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Aviso Legal y de Cookies"
      className="fixed bottom-20 md:bottom-24 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-[60] animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="tactical-border rounded-2xl p-5 bg-[#0a0a0a]/95 border border-white/15 shadow-2xl backdrop-blur-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-[11px] font-mono text-zinc-300">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            SEGURIDAD // COPYRIGHT & COOKIES
          </span>
          <span className="text-zinc-500 text-[10px]">B-OS v4.2</span>
        </div>

        {/* Message */}
        <p className="text-xs text-zinc-300 leading-relaxed mb-3">
          Este sitio web utiliza cookies técnicas para su funcionamiento y está protegido por <strong className="text-white">derechos de autor y propiedad intelectual exclusiva de Ayoub Atidi</strong>. Queda terminantemente prohibida la copia, clonación, distribución o explotación de este diseño y código sin autorización previa por escrito y mención expresa.
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-mono text-zinc-400 mb-4">
          <Link href="/aviso-legal" className="hover:text-white underline">
            Aviso Legal & Propiedad
          </Link>
          <span>·</span>
          <Link href="/privacidad" className="hover:text-white underline">
            Privacidad
          </Link>
          <span>·</span>
          <Link href="/cookies" className="hover:text-white underline">
            Cookies
          </Link>
        </div>

        {/* Button */}
        <button
          onClick={handleAccept}
          className="w-full btn-batcave py-2.5 text-xs font-mono tracking-wider cursor-pointer"
        >
          ACEPTAR Y CONTINUAR ➔
        </button>
      </div>
    </aside>
  );
}
