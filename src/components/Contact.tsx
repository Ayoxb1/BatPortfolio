'use client';

import { useState } from 'react';

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
                  { name: 'GitHub', icon: '⚙️', href: 'https://github.com/Ayoxb1' },
                  { name: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/in/ayoub-atidi-belbaz-07b274312/' },
                  { name: 'Twitter', icon: '𝕏', href: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-xl transition-all duration-300 hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Mensaje
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all resize-none"
                  placeholder="Tu mensaje..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                {submitted ? '¡Mensaje enviado!' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Ayoub Atidi. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </section>
  );
}
