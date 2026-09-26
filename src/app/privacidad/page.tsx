import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Ayoub Atidi',
  description: 'Política de privacidad y protección de datos personales de acuerdo con el RGPD y la LOPD-GDD.',
};

export default function PrivacidadPage() {
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
            PROTECCIÓN DE DATOS // RGPD & LOPD-GDD
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 glow-text-subtle">
            Política de Privacidad
          </h1>
          <p className="text-sm font-mono text-zinc-400">
            Reglamento (UE) 2016/679 (RGPD) y Ley Orgánica 3/2018 (LOPD-GDD)
          </p>
        </div>

        {/* Content */}
        <div className="tactical-border rounded-2xl p-6 md:p-10 space-y-8 bg-[#0a0a0a] text-sm md:text-base leading-relaxed border border-white/10">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span>01 //</span> Responsable del Tratamiento
            </h2>
            <p>
              El responsable del tratamiento de los datos personales recabados a través de este sitio web es <strong>Ayoub Atidi Belbaz</strong>, con dirección de contacto en <a href="mailto:ayoubatidi2019@gmail.com" className="text-white underline">ayoubatidi2019@gmail.com</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span>02 //</span> Finalidad del Tratamiento de Datos
            </h2>
            <p>
              Los datos personales solicitados a través del formulario de contacto (nombre, dirección de correo electrónico y contenido del mensaje) se recopilan con las siguientes finalidades exclusivas:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 pl-2">
              <li>Responder a solicitudes de información, propuestas laborales, técnicas o comerciales enviadas por el usuario.</li>
              <li>Mantener una vía de comunicación directa para colaboraciones de software y consultoría.</li>
            </ul>
            <p className="text-xs text-zinc-400">
              En ningún caso se utilizarán tus datos personales para enviar publicidad no deseada (spam), ni serán vendidos, cedidos ni compartidos con empresas terceras para fines comerciales.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span>03 //</span> Base Legal y Consentimiento
            </h2>
            <p>
              La base legal para el tratamiento de tus datos es el <strong>consentimiento expreso</strong> del interesado, otorgado al cumplimentar y enviar voluntariamente el formulario de contacto.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span>04 //</span> Conservación de los Datos
            </h2>
            <p>
              Los datos se conservarán únicamente durante el tiempo necesario para responder a la consulta planteada o mientras dure la relación profesional derivada de dicha comunicación, procediéndose posteriormente a su supresión segura.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span>05 //</span> Ejercicio de Derechos (ARCO+)
            </h2>
            <p>
              Cualquier usuario puede ejercer en cualquier momento sus derechos de <strong>acceso, rectificación, supresión, limitación del tratamiento, oposición y portabilidad</strong> de sus datos personales enviando un correo electrónico a:
            </p>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.04] font-mono text-sm text-white">
              ayoubatidi2019@gmail.com (Asunto: &quot;Protección de Datos - Ejercicio de Derechos&quot;)
            </div>
            <p className="text-xs text-zinc-500">
              Asimismo, si consideras que el tratamiento no se ajusta a la normativa vigente, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD - www.aepd.es).
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500 pt-4 border-t border-white/10 gap-4">
          <div className="flex gap-4 text-zinc-400">
            <Link href="/aviso-legal" className="hover:text-white">Aviso Legal & Propiedad</Link>
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
