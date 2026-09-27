'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogEntry {
  id: string;
  time: string;
  subsystem: string;
  message: string;
  status: 'ok' | 'sync' | 'warn';
}

const INITIAL_LOGS: LogEntry[] = [
  { id: '1', time: '14:01:05', subsystem: 'SUPABASE_RLS', message: 'Tenant isolation verified. Zero leak vulnerability detected.', status: 'ok' },
  { id: '2', time: '14:01:12', subsystem: 'GIT_FLOW', message: 'Branch feature/batcave-tactical-os clean. Commits signed.', status: 'sync' },
  { id: '3', time: '14:01:18', subsystem: 'JAVAFX_POOL', message: 'HikariCP pool initialized: 12 idle connections ready.', status: 'ok' },
  { id: '4', time: '14:01:25', subsystem: 'MONGODB_AGG', message: 'Telemetry pipeline completed in 9ms across 4 shards.', status: 'ok' },
];

const STREAM_MESSAGES = [
  { subsystem: 'SUPABASE_RLS', message: 'Policies audited. Row-level read/write permissions active.', status: 'ok' as const },
  { subsystem: 'GIT_WORKFLOW', message: 'Syncing remote origin/main with local working tree.', status: 'sync' as const },
  { subsystem: 'POSTGRES_SQL', message: 'ACID transaction committed: rollback journal verified.', status: 'ok' as const },
  { subsystem: 'THREEJS_RENDER', message: 'WebGL2 context: 60 FPS locked, draw calls: 42, memory: nominal.', status: 'ok' as const },
  { subsystem: 'JVM_MONITOR', message: 'Garbage Collection pass completed: 0.4ms pause time.', status: 'ok' as const },
  { subsystem: 'REST_API_GW', message: 'Route /api/contact rate-limiting & encryption confirmed.', status: 'ok' as const },
  { subsystem: 'DOCKER_SWARM', message: 'Microservices health check: BarberSaaS, GymTrack alive.', status: 'ok' as const },
  { subsystem: 'AUTH_GUARDIAN', message: 'Zero unencrypted credentials in client bundles.', status: 'ok' as const },
  { subsystem: 'LENIS_TICKER', message: 'Smooth scroll delta normalized: kinetic friction 0.12.', status: 'sync' as const },
];

export default function SystemLiveLogs() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isOpen, setIsOpen] = useState(false); // Minimized by default for clean UX
  const [isPaused, setIsPaused] = useState(false);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomMsg = STREAM_MESSAGES[Math.floor(Math.random() * STREAM_MESSAGES.length)];

      const newEntry: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        time: timeStr,
        subsystem: randomMsg.subsystem,
        message: randomMsg.message,
        status: randomMsg.status,
      };

      setLogs((prev) => {
        const next = [...prev, newEntry];
        return next.length > 25 ? next.slice(next.length - 25) : next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (isOpen && logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs, isOpen]);

  const latestLog = logs[logs.length - 1];

  return (
    <div className="fixed bottom-20 md:bottom-24 left-4 z-40 font-mono select-none">
      {/* Minimized Pill */}
      {!isOpen ? (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-xl border border-white/20 text-white text-[11px] shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:border-white/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          title="Ver flujo de telemetría y logs de backend en vivo"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-zinc-400 group-hover:text-white font-bold tracking-wider text-[10px]">
            SYS_LOGS:
          </span>
          <span className="text-zinc-300 text-[10px] max-w-[160px] sm:max-w-[220px] truncate">
            [{latestLog?.subsystem}] {latestLog?.message}
          </span>
          <span className="text-zinc-500 group-hover:text-zinc-300 text-[9px] pl-1 border-l border-white/10">
            EXPANDIR ↗
          </span>
        </motion.button>
      ) : (
        /* Expanded Live Stream Console */
        <motion.div
          className="w-[90vw] sm:w-[420px] md:w-[480px] rounded-2xl bg-[#080808]/95 backdrop-blur-2xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/60 border-b border-white/10 text-[11px]">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold tracking-wider text-white">BATCOMPUTER // LIVE_SYSTEM_FEED</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-2 py-0.5 rounded text-[9px] border border-white/15 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                title={isPaused ? 'Reanudar flujo' : 'Pausar flujo'}
              >
                {isPaused ? '▶ PLAY' : '❚❚ PAUSE'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-5 h-5 flex items-center justify-center rounded text-zinc-400 hover:text-white hover:bg-white/10 text-xs transition-colors"
                title="Minimizar panel"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Subsystem status strip */}
          <div className="grid grid-cols-4 gap-1 px-3 py-1.5 bg-white/[0.02] border-b border-white/5 text-[9px] text-zinc-400 text-center">
            <span className="text-emerald-400">● SUPABASE: OK</span>
            <span className="text-cyan-400">● MONGODB: LIVE</span>
            <span className="text-amber-400">● JAVAFX: IDLE</span>
            <span className="text-white">● API: SECURE</span>
          </div>

          {/* Logs stream body */}
          <div
            ref={logsContainerRef}
            className="p-3 max-h-56 overflow-y-auto space-y-1.5 text-[10px] scrollbar-thin scrollbar-thumb-zinc-700 font-mono bg-black/40"
          >
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                <span className="text-zinc-600 flex-shrink-0">{log.time}</span>
                <span
                  className={`px-1 rounded text-[8px] tracking-wider uppercase font-bold flex-shrink-0 ${
                    log.status === 'ok'
                      ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/20'
                      : log.status === 'sync'
                      ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/20'
                      : 'text-amber-400 bg-amber-950/40 border border-amber-500/20'
                  }`}
                >
                  {log.subsystem}
                </span>
                <span className="text-zinc-300 break-words">{log.message}</span>
              </div>
            ))}
          </div>

          {/* Bottom control footer */}
          <div className="px-3 py-1.5 bg-black/80 border-t border-white/10 flex items-center justify-between text-[9px] text-zinc-500">
            <span>FLIGHT_RECORDER // STREAM_ID: #{logs.length}</span>
            <button
              onClick={() => setLogs([])}
              className="hover:text-zinc-300 underline underline-offset-2 transition-colors"
            >
              Limpiar buffer
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
