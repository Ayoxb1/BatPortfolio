import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal y Propiedad Intelectual | Ayoub Atidi',
  description: 'Términos de uso, propiedad intelectual, prohibición de copia y derechos de autor del portfolio de Ayoub Atidi.',
};

export default function AvisoLegalPage() {
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
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            PROTECCIÓN DE DERECHOS // COPYRIGHT EXCLUSIVO
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 glow-text-subtle">
            Aviso Legal y Propiedad Intelectual
          </h1>
          <p className="text-sm font-mono text-zinc-400">
            Última actualización: {new Date().getFullYear()} · Titular: Ayoub Atidi Belbaz
          </p>
        </div>

        {/* Content */}
        <div className="tactical-border rounded-2xl p-6 md:p-10 space-y-8 bg-[#0a0a0a] text-sm md:text-base leading-relaxed border border-white/10">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span>01 //</span> Identificación del Titular
            </h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del titular de este sitio web:
            </p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-2 font-mono text-xs">
              <li><strong>Titular:</strong> Ayoub Atidi Belbaz</li>
              <li><strong>Condición:</strong> Desarrollador Full Stack & Técnico Superior DAM</li>
              <li><strong>Email de contacto oficial:</strong> ayoubatidi2019@gmail.com</li>
              <li><strong>Sitio Web:</strong> Portfolio Personal (https://ayoub-atidi.vercel.app o dominio asociado)</li>
            </ul>
          </section>

          {/* Section 2 — Strict Copyright */}
          <section className="space-y-3 p-5 rounded-xl border border-white/15 bg-white/[0.03]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span>02 //</span> Reserva Estricta de Derechos y Propiedad Intelectual
            </h2>
            <p className="font-semibold text-white">
              Todos los derechos de propiedad intelectual e industrial sobre este sitio web y sus contenidos están expresamente reservados a favor de Ayoub Atidi.
            </p>
            <p>
              Queda <strong>totalmente prohibida</strong> la reproducción total o parcial, duplicación, copia, distribución, comunicación pública, ingeniería inversa, transformación, puesta a disposición, scraping automatizado o utilización de cualquier elemento de este sitio web, incluyendo de forma enunciativa pero no limitativa:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-300 pl-2">
              <li>El <strong>código fuente</strong>, arquitectura de software, estilos CSS, componentes y animaciones GSAP/Three.js/Framer Motion.</li>
              <li>El <strong>diseño gráfico, interfaz de usuario (UI), experiencia de usuario (UX)</strong> y estética temática original (Batcave/Wayne Enterprises).</li>
              <li>Los <strong>fotogramas, vídeos, imágenes, logotipos</strong> y composiciones multimedia.</li>
              <li>La descripción, estructura y presentación de los <strong>proyectos expuestos</strong>.</li>
            </ul>
          </section>

          {/* Section 3 — Authorization Requirement */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span>03 //</span> Requisito Obligatorio de Autorización Previa y Atribución
            </h2>
            <p>
              Cualquier uso de este sitio web, sus proyectos o su material con fines comerciales, profesionales, educativos, de difusión o inspiración directa requiere <strong>obligatoriamente el consentimiento previo, expreso y por escrito de Ayoub Atidi</strong>.
            </p>
            <p>
              En caso de que se conceda dicha autorización formal, será indispensable:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-zinc-400 pl-2">
              <li>Mencionar de forma visible y clara la autoría original a nombre de <strong>Ayoub Atidi</strong>.</li>
              <li>Incluir un enlace directo a este portfolio web o a su perfil oficial de GitHub (<strong>github.com/Ayoxb1</strong>).</li>
              <li>No alterar, ocultar ni suprimir los avisos de copyright y marcas identificativas.</li>
            </ol>
            <p className="text-xs font-mono text-zinc-400 bg-black/60 p-3 rounded-lg border border-white/10">
              * El uso no autorizado de estos materiales facultará al titular para ejercer las acciones civiles y penales correspondientes de acuerdo con la legislación española e internacional sobre propiedad intelectual (Real Decreto Legislativo 1/1996 y convenios internacionales).
            </p>
          </section>

          {/* Section 4 — Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span>04 //</span> Enlaces a Terceros y Responsabilidad
            </h2>
            <p>
              Este sitio web puede contener enlaces a plataformas de terceros (GitHub, LinkedIn, Vercel, proyectos en producción). Ayoub Atidi no asume responsabilidad alguna por los contenidos, políticas de privacidad o prácticas de sitios web externos gestionados por terceros.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500 pt-4 border-t border-white/10 gap-4">
          <div className="flex gap-4 text-zinc-400">
            <Link href="/privacidad" className="hover:text-white">Política de Privacidad</Link>
            <span>·</span>
            <Link href="/cookies" className="hover:text-white">Política de Cookies</Link>
          </div>
          <div>
            © {new Date().getFullYear()} Ayoub Atidi. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}
