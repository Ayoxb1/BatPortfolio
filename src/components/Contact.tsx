'use client';

import { useState } from 'react';
import Script from 'next/script';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío
    console.log(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contacts = [
    {
      label: 'Email',
      value: 'ayoubatidi2019@gmail.com',
      href: 'mailto:ayoubatidi2019@gmail.com',
      icon: '✉️',
    },
    {
      label: 'Teléfono',
      value: '+34 641 27 91 31',
      href: 'tel:+34641279131',
      icon: '📱',
    },
    {
      label: 'LinkedIn',
      value: 'Ayoub Atidi Belbaz',
      href: 'https://www.linkedin.com/in/ayoub-atidi-belbaz-07b274312/',
      icon: '💼',
    },
    {
      label: 'GitHub',
      value: 'Ayoxb1',
      href: 'https://github.com/Ayoxb1',
      icon: '🔗',
    },
  ];

  return (
    <section className="w-full bg-black py-20 md:py-32 px-4 md:px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            ¿Hablamos?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Estoy disponible para proyectos, colaboraciones o simplemente una conversación sobre tecnología
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-8">Contacto directo</h3>
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                className="group block p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{contact.icon}</span>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{contact.label}</p>
                    <p className="text-lg text-white font-semibold group-hover:text-orange-400 transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-4">Sígueme en:</p>
              <div className="flex gap-4">
                {[
                  { name: 'GitHub', href: 'https://github.com/Ayoxb1', svg: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg> },
                  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ayoub-atidi-belbaz-07b274312/', svg: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { name: 'Instagram', href: 'https://www.instagram.com/__ayoxb__', svg: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
                  { name: 'TikTok', href: 'https://www.tiktok.com/@.ayoxb', svg: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg> },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    {social.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* LinkedIn Badge */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-4">Mi perfil profesional:</p>
              <div
                className="badge-base LI-profile-badge"
                data-locale="es_ES"
                data-size="medium"
                data-theme="dark"
                data-type="VERTICAL"
                data-vanity="ayoub-atidi-belbaz-07b274312"
                data-version="v1"
              >
                <a
                  className="badge-base__link LI-simple-link"
                  href="https://es.linkedin.com/in/ayoub-atidi-belbaz-07b274312?trk=profile-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ayoub Atidi Belbaz
                </a>
              </div>
              <Script
                src="https://platform.linkedin.com/badges/js/profile.js"
                strategy="lazyOnload"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              {/* Name */}
              <div className="w-full">
                <label className="block text-sm font-medium text-white mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full min-h-[44px] px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              {/* Email */}
              <div className="w-full">
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full min-h-[44px] px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              {/* Message */}
              <div className="w-full">
                <label className="block text-sm font-medium text-white mb-2">
                  Mensaje
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full min-h-[44px] px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all resize-none"
                  placeholder="Tu mensaje..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full min-h-[44px] min-w-[44px] flex items-center justify-center py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                {submitted ? '¡Mensaje enviado!' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-5 mb-4">
            <a
              href="https://www.instagram.com/__ayoxb__"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors duration-300 hover:scale-110 inline-block"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a
              href="https://www.tiktok.com/@.ayoxb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors duration-300 hover:scale-110 inline-block"
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 Ayoub Atidi. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </section>
  );
}
