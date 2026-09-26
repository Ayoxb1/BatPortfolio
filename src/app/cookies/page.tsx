import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | Ayoub Atidi',
  description: 'Información sobre el uso de cookies técnicas y almacenamiento local en el portfolio de Ayoub Atidi.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans px-4 py-16 md:py-24 batcave-grid select-text">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-xs tracking-wider uppercase mb-8 transition-colors"
        >
          ← Volver al Terminal Principal
        </Link>

        {/* Header */}
        <div className="tactical-border rounded-2xl p-6 md:p-10 mb-8 border border-white/15 bg-[#0a0a0a]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-zinc-300 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            TELEMETRÍA // POLÍTICA DE COOKIES & ALMACENAMIENTO
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 glow-text-subtle">
            Política de Cookies
          </h1>
          <p className="text-sm font-mono text-zinc-400">
            Transparencia técnica sobre cookies y almacenamiento en el navegador
          </p>
        </div>

        {/* Content */}
        <div className="tactical-border rounded-2xl p-6 md:p-10 space-y-8 bg-[#0a0a0a] text-sm md:text-base leading-relaxed border border-white/10">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span>01 //</span> ¿Qué son las Cookies?
            </h2>
            <p>
              Una cookie es un pequeño archivo de texto que un sitio web almacena en el navegador del usuario para recordar información sobre su visita, facilitar la navegación, recordar preferencias visuales y garantizar el correcto funcionamiento técnico de las animaciones e interfaces.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span>02 //</span> Cookies y Almacenamiento Utilizados en Este Sitio
            </h2>
            <p>
              Este portfolio web prioriza la privacidad del usuario. <strong>No utilizamos cookies de seguimiento publicitario de terceros, ni perfilado comercial.</strong>
            </p>
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <h3 className="font-bold text-white text-sm font-mono mb-1">
                  1. Cookies Técnicas y de Sesión (Estrictamente Necesarias)
                </h3>
                <p className="text-xs text-zinc-400 leading-normal">
                  Permiten el funcionamiento del framework Next.js, la carga asíncrona de recursos, la renderización fluida del scroll (Lenis y GSAP) y la navegación interna.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <h3 className="font-bold text-white text-sm font-mono mb-1">
                  2. Almacenamiento Local (localStorage)
                </h3>
                <p className="text-xs text-zinc-400 leading-normal">
                  Se emplea la clave técnica <code>batcave_legal_consent</code> para registrar si el usuario ha visualizado y aceptado el aviso de cookies y propiedad intelectual, evitando mostrar el aviso en futuras visitas.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span>03 //</span> Cómo Configurar o Desactivar Cookies en tu Navegador
            </h2>
            <p>
              Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador que utilices:
            </p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-2 font-mono text-xs">
              <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
              <li><strong>Mozilla Firefox:</strong> Opciones &gt; Privacidad y Seguridad &gt; Cookies y datos del sitio.</li>
              <li><strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.</li>
              <li><strong>Microsoft Edge:</strong> Configuración &gt; Permisos del sitio &gt; Cookies y datos de sitios.</li>
            </ul>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500 pt-4 border-t border-white/10 gap-4">
          <div className="flex gap-4 text-zinc-400">
            <Link href="/aviso-legal" className="hover:text-white">Aviso Legal & Propiedad</Link>
            <span>·</span>
            <Link href="/privacidad" className="hover:text-white">Política de Privacidad</Link>
          </div>
          <div>
            © {new Date().getFullYear()} Ayoub Atidi. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}
