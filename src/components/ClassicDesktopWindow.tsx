'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ClassicDesktopWindowProps {
  onClose: () => void;
}

export default function ClassicDesktopWindow({ onClose }: ClassicDesktopWindowProps) {
  const [activeTab, setActiveTab] = useState<'employees' | 'sql' | 'pool'>('employees');
  const [sqlQuery, setSqlQuery] = useState(
    'SELECT dev_id, desarrollador, rol, combustible_mental, estado_seguridad\nFROM equipo_unipersonal_ayoub\nWHERE autor_del_codigo = true AND ganas_de_picar = \'INFINITAS\'\nORDER BY dev_id ASC;'
  );
  const [sqlExecuted, setSqlExecuted] = useState(false);
  const [queryExecutionTime, setQueryExecutionTime] = useState<number | null>(null);

  const handleExecuteSql = () => {
    setSqlExecuted(false);
    setTimeout(() => {
      setSqlExecuted(true);
      setQueryExecutionTime(Number((Math.random() * 2 + 0.8).toFixed(2)));
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        className="w-full max-w-4xl bg-[#1c1d21] border-2 border-[#3c3f41] rounded-t-lg shadow-[0_15px_50px_rgba(0,0,0,0.95)] overflow-hidden font-mono text-zinc-300 flex flex-col max-h-[90vh]"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Classic Window Titlebar */}
        <div className="bg-gradient-to-r from-[#2b2d30] via-[#313338] to-[#2b2d30] px-3 py-2 border-b border-[#3c3f41] flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-bold text-sm">☕</span>
            <span className="text-xs text-zinc-200 font-bold tracking-wide">
              JavaFX Desktop Suite // Gestor Empresarial Multi-Terminal v2.4
            </span>
            <span className="hidden sm:inline text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-emerald-400 border border-emerald-500/30">
              ● JVM: ONLINE
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onClose}
              className="w-6 h-5 flex items-center justify-center bg-[#3c3f41] hover:bg-[#4c5052] text-zinc-300 text-xs rounded transition-colors"
              title="Minimizar"
            >
              _
            </button>
            <button
              className="w-6 h-5 flex items-center justify-center bg-[#3c3f41] hover:bg-[#4c5052] text-zinc-300 text-xs rounded transition-colors"
              title="Maximizar"
            >
              □
            </button>
            <button
              onClick={onClose}
              className="w-6 h-5 flex items-center justify-center bg-red-700/80 hover:bg-red-600 text-white text-xs font-bold rounded transition-colors"
              title="Cerrar ventana"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Classic Menu Bar */}
        <div className="bg-[#24252a] px-3 py-1.5 border-b border-[#323438] flex items-center gap-4 text-xs select-none">
          <span className="hover:bg-[#323438] px-1.5 py-0.5 rounded cursor-pointer text-zinc-300">Archivo</span>
          <span className="hover:bg-[#323438] px-1.5 py-0.5 rounded cursor-pointer text-zinc-300">Editar</span>
          <span className="hover:bg-[#323438] px-1.5 py-0.5 rounded cursor-pointer text-zinc-300">Conexión JDBC</span>
          <span className="hover:bg-[#323438] px-1.5 py-0.5 rounded cursor-pointer text-zinc-300">Transacciones</span>
          <span className="hover:bg-[#323438] px-1.5 py-0.5 rounded cursor-pointer text-zinc-300">Herramientas</span>
          <span className="hover:bg-[#323438] px-1.5 py-0.5 rounded cursor-pointer text-zinc-400 hidden sm:inline">Ayuda</span>
        </div>

        {/* Classic Desktop Toolbar */}
        <div className="bg-[#2b2d30] px-3 py-1.5 border-b border-[#3c3f41] flex flex-wrap items-center gap-2 text-xs select-none">
          <button
            onClick={() => setActiveTab('employees')}
            className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
              activeTab === 'employees'
                ? 'bg-[#3c3f41] text-white font-bold border border-white/20'
                : 'bg-black/30 hover:bg-[#323438] text-zinc-400'
            }`}
          >
            <span>📋</span>
            <span>Equipo (Solo Dev) (TableView)</span>
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'bg-[#3c3f41] text-white font-bold border border-white/20'
                : 'bg-black/30 hover:bg-[#323438] text-zinc-400'
            }`}
          >
            <span>⚡</span>
            <span>Consola SQL / JDBC</span>
          </button>
          <button
            onClick={() => setActiveTab('pool')}
            className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
              activeTab === 'pool'
                ? 'bg-[#3c3f41] text-white font-bold border border-white/20'
                : 'bg-black/30 hover:bg-[#323438] text-zinc-400'
            }`}
          >
            <span>🔌</span>
            <span>Pool HikariCP</span>
          </button>

          <div className="ml-auto hidden md:flex items-center gap-2 text-[11px] text-zinc-400">
            <span>DRIVER:</span>
            <span className="text-zinc-200 bg-black/40 px-2 py-0.5 rounded border border-white/10">
              org.postgresql.Driver
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 bg-[#1e1f22] overflow-y-auto flex-1">
          {activeTab === 'employees' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>VISTA DE TABLA: org.ayoub.dam.model.SoloDeveloper (100% Autoría Propia)</span>
                <span className="text-emerald-400">5 ROLES POR AYOUB ATIDI // FULLSTACK SOLO ARCHITECT</span>
              </div>

              {/* Data Table */}
              <div className="border border-[#3c3f41] rounded overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#2b2d30] text-zinc-200 border-b border-[#3c3f41]">
                      <th className="p-2 border-r border-[#3c3f41]">ID</th>
                      <th className="p-2 border-r border-[#3c3f41]">Desarrollador</th>
                      <th className="p-2 border-r border-[#3c3f41]">Rol / Especialidad</th>
                      <th className="p-2 border-r border-[#3c3f41]">Combustible / Salario Simbólico</th>
                      <th className="p-2">Nivel Seguridad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#2d3034] hover:bg-[#2e3136] transition-colors">
                      <td className="p-2 border-r border-[#2d3034] text-zinc-400">DEV-01</td>
                      <td className="p-2 border-r border-[#2d3034] text-white font-medium">Ayoub Atidi Belbaz</td>
                      <td className="p-2 border-r border-[#2d3034]">Lead Architecture & Java Core</td>
                      <td className="p-2 border-r border-[#2d3034] text-amber-300 font-mono">☕ 14 Cafés espresso / día</td>
                      <td className="p-2"><span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px]">NIVEL 5 (ROOT)</span></td>
                    </tr>
                    <tr className="border-b border-[#2d3034] hover:bg-[#2e3136] transition-colors">
                      <td className="p-2 border-r border-[#2d3034] text-zinc-400">DEV-02</td>
                      <td className="p-2 border-r border-[#2d3034] text-white font-medium">Ayoub Atidi Belbaz</td>
                      <td className="p-2 border-r border-[#2d3034]">Backend & Transacciones JDBC</td>
                      <td className="p-2 border-r border-[#2d3034] text-amber-300 font-mono">🍕 Pizza recalentada a las 4:00 AM</td>
                      <td className="p-2"><span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 text-[10px]">NIVEL 5 (SUDO)</span></td>
                    </tr>
                    <tr className="border-b border-[#2d3034] hover:bg-[#2e3136] transition-colors">
                      <td className="p-2 border-r border-[#2d3034] text-zinc-400">DEV-03</td>
                      <td className="p-2 border-r border-[#2d3034] text-white font-medium">Ayoub Atidi Belbaz</td>
                      <td className="p-2 border-r border-[#2d3034]">Frontend & UI/UX Craftsman</td>
                      <td className="p-2 border-r border-[#2d3034] text-amber-300 font-mono">🎧 Álbum de Drake en bucle 24/7</td>
                      <td className="p-2"><span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 text-[10px]">NIVEL 5 (CREATOR)</span></td>
                    </tr>
                    <tr className="border-b border-[#2d3034] hover:bg-[#2e3136] transition-colors">
                      <td className="p-2 border-r border-[#2d3034] text-zinc-400">DEV-04</td>
                      <td className="p-2 border-r border-[#2d3034] text-white font-medium">Ayoub Atidi Belbaz</td>
                      <td className="p-2 border-r border-[#2d3034]">DBA, DevOps & Cloud Deployer</td>
                      <td className="p-2 border-r border-[#2d3034] text-emerald-300 font-mono">⚡ Dopamina al compilar a la 1ª</td>
                      <td className="p-2"><span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px]">NIVEL 5 (SYSADMIN)</span></td>
                    </tr>
                    <tr className="border-b border-[#2d3034] hover:bg-[#2e3136] transition-colors">
                      <td className="p-2 border-r border-[#2d3034] text-zinc-400">DEV-05</td>
                      <td className="p-2 border-r border-[#2d3034] text-white font-medium">Ayoub Atidi Belbaz</td>
                      <td className="p-2 border-r border-[#2d3034]">El que arregla los bugs a deshoras</td>
                      <td className="p-2 border-r border-[#2d3034] text-emerald-300 font-mono">🛡️ 0 warnings tras el build</td>
                      <td className="p-2"><span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px]">NIVEL 5 (SOLO HERO)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'sql' && (
            <div className="space-y-3">
              <div className="text-xs text-zinc-400 flex items-center justify-between">
                <span>EDITOR DE CONSULTAS SQL DIRECTO:</span>
                <span className="text-zinc-500">DIALECT: PostgreSQL 16</span>
              </div>

              <textarea
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="w-full h-28 bg-[#141517] border border-[#3c3f41] rounded p-2.5 text-xs text-amber-200/90 font-mono focus:outline-none focus:border-amber-400/50"
              />

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExecuteSql}
                  className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <span>▶</span>
                  <span>Ejecutar Query (F5)</span>
                </button>
                {queryExecutionTime && (
                  <span className="text-xs text-emerald-400 font-mono">
                    ✓ Consulta completada en {queryExecutionTime} ms
                  </span>
                )}
              </div>

              {sqlExecuted && (
                <div className="p-3 bg-[#141517] border border-emerald-500/30 rounded text-xs space-y-1">
                  <div className="text-emerald-400 font-bold">ResultSet [5 columnas, 5 roles devueltos]:</div>
                  <div className="text-zinc-400 text-[11px]">
                    100% de autoría certificada: Todo el backend, SQL, JavaFX y JDBC fue programado íntegramente por Ayoub Atidi.
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pool' && (
            <div className="space-y-3">
              <div className="text-xs text-zinc-400">ESTADO DEL POOL DE CONEXIONES HIKARICP:</div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-3 bg-[#141517] border border-[#3c3f41] rounded">
                  <div className="text-[10px] text-zinc-500">CONEXIONES ACTIVAS</div>
                  <div className="text-xl font-bold text-emerald-400">8 / 20</div>
                </div>
                <div className="p-3 bg-[#141517] border border-[#3c3f41] rounded">
                  <div className="text-[10px] text-zinc-500">CONEXIONES IDLE</div>
                  <div className="text-xl font-bold text-cyan-400">12</div>
                </div>
                <div className="p-3 bg-[#141517] border border-[#3c3f41] rounded">
                  <div className="text-[10px] text-zinc-500">TIEMPO ESPERA</div>
                  <div className="text-xl font-bold text-amber-400">0.8 ms</div>
                </div>
                <div className="p-3 bg-[#141517] border border-[#3c3f41] rounded">
                  <div className="text-[10px] text-zinc-500">ISOLATION LEVEL</div>
                  <div className="text-xs font-bold text-white mt-1">READ_COMMITTED</div>
                </div>
              </div>

              <div className="p-3 bg-[#141517] border border-[#3c3f41] rounded text-[11px] text-zinc-400 space-y-1">
                <div>URL JDBC: <code>jdbc:postgresql://dam-cluster.internal:5432/enterprise_db</code></div>
                <div>Driver Class: <code>org.postgresql.Driver (v42.6.0)</code></div>
                <div>Pool Name: <code>WayneTech-HikariCP-Prod-1</code></div>
              </div>
            </div>
          )}
        </div>

        {/* Classic Window Status Bar */}
        <div className="bg-[#24252a] px-3 py-1.5 border-t border-[#3c3f41] flex flex-wrap items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span>READY</span>
            <span className="text-zinc-600">|</span>
            <span>MEM: 124MB / 512MB JVM</span>
            <span className="text-zinc-600">|</span>
            <span>ENCODING: UTF-8</span>
          </div>

          <div className="flex items-center gap-3 mt-1 sm:mt-0">
            <a
              href="https://github.com/Ayoxb1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2"
            >
              Ver Repo GitHub DAM ➔
            </a>
            <button
              onClick={onClose}
              className="px-2 py-0.5 bg-[#3c3f41] hover:bg-[#4c5052] rounded text-white text-[10px]"
            >
              Cerrar Vista
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
