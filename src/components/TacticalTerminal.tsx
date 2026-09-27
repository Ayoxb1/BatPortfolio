'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
  time: string;
}

export default function TacticalTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'sys.init',
      time: '14:00',
      output: (
        <div className="space-y-1 text-zinc-300">
          <div className="text-emerald-400 font-bold">
            BATCOMPUTER OS v4.2 [SECURITY ARCHITECTURE READY]
          </div>
          <div className="text-zinc-400 text-xs">
            Escribe <span className="text-amber-400 font-bold">help</span> para listar los comandos tácticos o ejecuta <span className="text-cyan-400 font-bold">run barbersaas</span> o <span className="text-purple-400 font-bold">execute imaan_brand</span>.
          </div>
        </div>
      ),
    },
  ]);
  const [matrixActive, setMatrixActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut (Ctrl+K or ~ or Alt+T) to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === 'k') || (e.altKey && e.key.toLowerCase() === 't') || e.key === '`') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim();
    const lower = cleanCmd.toLowerCase();
    const now = new Date().toTimeString().split(' ')[0];

    if (!cleanCmd) return;

    let resultNode: React.ReactNode = null;

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'exit' || lower === 'quit') {
      setIsOpen(false);
      setInputVal('');
      return;
    } else if (lower === 'help') {
      resultNode = (
        <div className="space-y-1.5 text-xs">
          <div className="text-amber-400 font-bold">COMANDOS TÁCTICOS DISPONIBLES:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-zinc-300">
            <div><span className="text-emerald-400 font-bold">projects</span> / <span className="text-emerald-400 font-bold">ls</span> : Listar todos los arsenales</div>
            <div><span className="text-cyan-400 font-bold">run barbersaas</span> : Desplegar arquitectura BarberSaaS</div>
            <div><span className="text-purple-400 font-bold">execute imaan_brand</span> : Desclasificar dossier High-Fashion</div>
            <div><span className="text-cyan-400 font-bold">run gymtrack</span> : Telemetría biométrica de GymTrack</div>
            <div><span className="text-amber-400 font-bold">skills</span> : Arsenal de tecnologías backend & frontend</div>
            <div><span className="text-zinc-200 font-bold">whoami</span> / <span className="text-zinc-200 font-bold">bio</span> : Perfil de Ayoub Atidi Belbaz</div>
            <div><span className="text-emerald-400 font-bold">matrix</span> : Activar lluvia digital de código</div>
            <div><span className="text-zinc-400 font-bold">clear</span> / <span className="text-zinc-400 font-bold">exit</span> : Limpiar terminal o cerrar</div>
          </div>
        </div>
      );
    } else if (lower === 'projects' || lower === 'ls') {
      resultNode = (
        <div className="space-y-1 text-xs">
          <div className="text-zinc-400 font-bold mb-1">ARSENALES REGISTRADOS EN WAYNE TECH:</div>
          <div className="space-y-1 text-zinc-300">
            <div>[01] <span className="text-cyan-400 font-bold">BarberSaaS</span> // Java, JavaFX, SQL, SaaS Multi-Tenant</div>
            <div>[02] <span className="text-emerald-400 font-bold">GymTrack</span> // Next.js, TypeScript, Telemetría Biometría</div>
            <div>[03] <span className="text-lime-400 font-bold">BowlWeb</span> // React, Tailwind, Framer Motion E-Commerce</div>
            <div>[04] <span className="text-violet-400 font-bold">Aventura Gráfica</span> // Canvas 2D, Finite State Machine Game</div>
            <div>[05] <span className="text-amber-400 font-bold">Proyectos DAM</span> // Java Core, JDBC, MySQL, Transacciones ACID</div>
            <div>[06] <span className="text-teal-400 font-bold">Ramadan Deen</span> // Node.js, MongoDB, Geolocation API</div>
            <div>[07] <span className="text-purple-400 font-bold">Imaan Belbaz x Drake</span> // Next.js, Editorial High-Fashion</div>
          </div>
        </div>
      );
    } else if (lower.includes('barber')) {
      resultNode = (
        <div className="space-y-2 p-2.5 rounded bg-cyan-950/20 border border-cyan-500/30 text-xs">
          <div className="flex items-center justify-between text-cyan-400 font-bold">
            <span>[EASTER EGG] DESPLIEGUE MULTI-TENANT // BARBERSAAS</span>
            <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded">STATUS: PRODUCTION READY</span>
          </div>
          <p className="text-zinc-300">
            Arquitectura multi-sucursal con aislamiento de datos por tenant, control concurrente de reservas y sincronización atómica con base de datos SQL.
          </p>
          <div className="text-zinc-400 text-[11px] font-mono">
            <div>• Database: PostgreSQL 16 + Connection Pool HikariCP</div>
            <div>• Frontend: Next.js App Router + Real-time Booking Engine</div>
            <div>• Desktop Module: JavaFX Enterprise Management Client</div>
          </div>
          <a
            href="https://barber-saas-pi.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-cyan-300 hover:text-white underline underline-offset-2 text-[11px]"
          >
            Abrir BarberSaaS en vivo ➔
          </a>
        </div>
      );
    } else if (lower.includes('imaan')) {
      resultNode = (
        <div className="space-y-2 p-2.5 rounded bg-purple-950/20 border border-purple-500/30 text-xs">
          <div className="flex items-center justify-between text-purple-400 font-bold">
            <span>[EASTER EGG] DOSSIER DESCLASIFICADO // IMAAN BELBAZ X DRAKE</span>
            <span className="text-[10px] bg-purple-500/20 px-2 py-0.5 rounded">HIGH-FASHION ARCHIVE</span>
          </div>
          <p className="text-zinc-300">
            Línea editorial de streetwear de alta gama: siluetas oversize en algodón pesado 450 GSM, teñido reactivo en frío, prints cerámicos y bordados dorados.
          </p>
          <div className="text-zinc-400 text-[11px]">
            <div>• E-Commerce Architecture: Next.js App Router con catálogo editorial y diseño premium</div>
            <div>• Estética: Luxury Noir minimalista, tipografía cinemática brutalista</div>
          </div>
          <a
            href="https://imaan-belbaz-x-drake.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-purple-300 hover:text-white underline underline-offset-2 text-[11px]"
          >
            Abrir Plataforma de Moda en vivo ➔
          </a>
        </div>
      );
    } else if (lower.includes('gymtrack')) {
      resultNode = (
        <div className="space-y-1.5 p-2 rounded bg-emerald-950/20 border border-emerald-500/30 text-xs">
          <div className="text-emerald-400 font-bold">[TELEMETRÍA DEPORTIVA] // GYMTRACK CORE</div>
          <p className="text-zinc-300">
            Algoritmos adaptativos para control de volumen, cálculo dinámico de RPE (Rating of Perceived Exertion) y visualización de progreso con latencia sub-50ms.
          </p>
          <a
            href="https://centro-deportivo-pedro-jv-illa.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-300 hover:text-white underline text-[11px]"
          >
            Ver GymTrack en vivo ➔
          </a>
        </div>
      );
    } else if (lower === 'skills' || lower === 'stack') {
      resultNode = (
        <div className="space-y-1 text-xs">
          <div className="text-zinc-300 font-bold">ARSENAL TÉCNICO DE AYOUB ATIDI:</div>
          <div className="text-zinc-400 space-y-0.5">
            <div><span className="text-emerald-400 font-bold">Frontend:</span> Next.js 14, React 18, TypeScript, Tailwind CSS, Three.js, GSAP</div>
            <div><span className="text-cyan-400 font-bold">Backend:</span> Java Core, JavaFX, Node.js, Express, REST APIs, GraphQL</div>
            <div><span className="text-amber-400 font-bold">Databases:</span> PostgreSQL, MySQL, MongoDB, Supabase, JDBC Pools</div>
            <div><span className="text-purple-400 font-bold">Arquitectura:</span> Clean Code, SOLID, MVC, ACID, Microservicios, Git</div>
          </div>
        </div>
      );
    } else if (lower === 'whoami' || lower === 'bio') {
      resultNode = (
        <div className="space-y-1 text-xs text-zinc-300">
          <div><span className="text-white font-bold">Desarrollador:</span> Ayoub Atidi Belbaz</div>
          <div><span className="text-white font-bold">Especialidad:</span> Full Stack Developer & Técnico Superior DAM</div>
          <div><span className="text-white font-bold">Enfoque:</span> Arquitectura robusta, experiencias web cinemáticas y software multiplataforma.</div>
        </div>
      );
    } else if (lower === 'matrix') {
      setMatrixActive((prev) => !prev);
      resultNode = (
        <div className="text-emerald-400 font-mono text-xs">
          {matrixActive ? 'Modo Matrix desactivado.' : '¡Modo Matrix táctico activado! [Lluvia de datos iniciada]'}
        </div>
      );
    } else {
      resultNode = (
        <div className="text-xs text-red-400">
          Comando desconocido: &quot;{cleanCmd}&quot;. Escribe <span className="text-amber-400 font-bold">help</span> para ver los comandos válidos.
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cleanCmd,
        time: now,
        output: resultNode,
      },
    ]);
    setInputVal('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <>
      {/* Floating Tactical Terminal Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-4 sm:top-8 sm:right-36 md:top-10 md:right-44 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/85 backdrop-blur-xl border border-white/20 hover:border-emerald-400/60 text-white shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 cursor-pointer font-mono text-[11px]"
        title="Abrir consola interactiva de la Batcomputadora (Ctrl+K o ~)"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-emerald-400 font-bold">&gt;_</span>
        <span className="hidden sm:inline text-zinc-300">TERMINAL CLI</span>
      </button>

      {/* Interactive Modal Terminal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              className="w-full max-w-2xl bg-[#09090b]/95 border border-white/20 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden font-mono flex flex-col max-h-[85vh] relative"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
            >
              {/* Scanline overlay */}
              <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10 select-none">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs text-zinc-400 pl-2 border-l border-white/10">
                    ayoub@batcomputer:~ (zsh)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-[10px] text-zinc-500">
                    SHORTCUT: [Ctrl+K]
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:text-white hover:bg-white/10 text-xs transition-colors"
                    title="Cerrar terminal"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Terminal History Output */}
              <div
                ref={scrollRef}
                className="p-4 overflow-y-auto space-y-3 flex-1 text-xs max-h-[50vh] scrollbar-thin scrollbar-thumb-zinc-700"
              >
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="text-emerald-400 font-bold">ayoub@batcomputer:~$</span>
                      <span className="text-white font-bold">{item.command}</span>
                      <span className="text-[10px] text-zinc-600 ml-auto">{item.time}</span>
                    </div>
                    <div className="pl-3 border-l-2 border-white/10">{item.output}</div>
                  </div>
                ))}

                {matrixActive && (
                  <div className="text-emerald-500 text-[10px] space-y-0.5 opacity-70">
                    <div>01000001 01011001 01001111 01010101 01000010 // AYOUB_ATIDI</div>
                    <div>01000010 01000001 01010100 01000011 01000001 01010110 01000101</div>
                    <div>TRANSMITTING VIA ENCRYPTED SOCKET // LATENCY: 0.24ms // SSL_PINNING: OK</div>
                  </div>
                )}
              </div>

              {/* Quick Easter Egg Action Pills */}
              <div className="px-4 py-2 bg-white/[0.02] border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[10px] select-none">
                <span className="text-zinc-500 mr-1">RÁPIDOS:</span>
                <button
                  onClick={() => executeCommand('run barbersaas')}
                  className="px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/50 transition-colors"
                >
                  run barbersaas
                </button>
                <button
                  onClick={() => executeCommand('execute imaan_brand')}
                  className="px-2 py-0.5 rounded bg-purple-950/40 border border-purple-500/30 text-purple-300 hover:bg-purple-900/50 transition-colors"
                >
                  execute imaan_brand
                </button>
                <button
                  onClick={() => executeCommand('run gymtrack')}
                  className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50 transition-colors"
                >
                  run gymtrack
                </button>
                <button
                  onClick={() => executeCommand('projects')}
                  className="px-2 py-0.5 rounded bg-zinc-800 border border-white/10 text-zinc-300 hover:bg-zinc-700 transition-colors"
                >
                  projects
                </button>
                <button
                  onClick={() => executeCommand('help')}
                  className="px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300 hover:bg-amber-900/50 transition-colors"
                >
                  help
                </button>
              </div>

              {/* Terminal Input Line */}
              <form
                onSubmit={handleFormSubmit}
                className="p-3 bg-black/80 border-t border-white/10 flex items-center gap-2"
              >
                <span className="text-emerald-400 font-bold text-xs pl-1">
                  root@batcomputer:~#
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Escribe un comando táctico (ej. help, run barbersaas, projects)..."
                  className="flex-1 bg-transparent text-white text-xs font-mono focus:outline-none placeholder:text-zinc-600"
                />
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  EJECUTAR ➔
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
