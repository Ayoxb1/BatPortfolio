'use client';

import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Sistema de Gestión de Barbería',
    description: 'SaaS profesional completo con dashboard, gestión de reservas, historial de clientes y analytics en tiempo real. Desarrollado con arquitectura CRUD y bases de datos relacionales.',
    tags: ['Java', 'JavaFX', 'SQL', 'CRUD'],
    image: 'linear-gradient(135deg, from-blue-600 to-cyan-600)',
    link: 'https://barber-saas-pi.vercel.app',
  },
  {
    id: '2',
    title: 'Webs Profesionales de Marketing',
    description: 'Dos sitios web profesionales con diseño responsivo, animaciones scroll avanzadas, formularios de contacto integrados y enfoque en conversión y experiencia de usuario.',
    tags: ['React', 'Tailwind', 'Framer Motion', 'Landing Pages'],
    image: 'linear-gradient(135deg, from-orange-500 to-pink-600)',
    link: 'https://bowl-food-web.vercel.app',
  },
  {
    id: '3',
    title: 'Proyecto Ramadan Deen',
    description: 'Aplicación fullstack para seguimiento de prácticas islámicas, gestión de comunidad y recursos educativos. Stack moderno con base de datos y autenticación.',
    tags: ['Full Stack', 'Node.js', 'MongoDB', 'React'],
    image: 'linear-gradient(135deg, from-emerald-500 to-teal-600)',
    link: 'https://ramadan-deen.vercel.app',
  },
  {
    id: '4',
    title: 'Automatización con n8n',
    description: 'Workflows inteligentes para automatización de procesos empresariales, integración de APIs, procesamiento de datos y optimización de tareas repetitivas.',
    tags: ['n8n', 'Automation', 'APIs', 'Workflows'],
    image: 'linear-gradient(135deg, from-purple-600 to-indigo-600)',
    link: 'https://github.com/Ayoxb1',
  },
];

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-black py-20 md:py-32 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
          Proyectos Destacados
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl">
          Una selección de mis trabajos más recientes que demuestran mi capacidad en desarrollo full stack,
          diseño de interfaces y automatización de procesos.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-2xl cursor-pointer"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Background */}
            <div
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{ background: project.image }}
            />

            {/* Overlay glassmorphism */}
            <div
              className="absolute inset-0 backdrop-blur-sm bg-black/40 group-hover:bg-black/30 transition-all duration-500"
            />

            {/* Border gradient */}
            <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-500" />

            {/* Content */}
            <div className="relative h-80 md:h-96 p-8 flex flex-col justify-between overflow-hidden">
              {/* Top section */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {project.title}
                </h3>
                <p
                  className="text-gray-200 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    transitionDelay: hoveredId === project.id ? '100ms' : '0ms',
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div
                className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  transitionDelay: hoveredId === project.id ? '150ms' : '0ms',
                }}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow icon */}
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="max-w-6xl mx-auto mt-16 text-center">
        <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95">
          Ver todos los proyectos
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20" />
    </section>
  );
}
