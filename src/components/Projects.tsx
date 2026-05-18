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
    title: 'BarberSaaS — Gestión de Barbería',
    description: 'SaaS profesional con dashboard completo, gestión de reservas, historial de clientes y analytics en tiempo real. Arquitectura CRUD con base de datos relacional.',
    tags: ['Java', 'JavaFX', 'SQL', 'SaaS', 'CRUD'],
    image: 'linear-gradient(135deg, #1d4ed8, #06b6d4)',
    link: 'https://barber-saas-pi.vercel.app',
  },
  {
    id: '2',
    title: 'GymTrack — App de Gimnasio',
    description: 'Aplicación para seguimiento de entrenamientos, gestión de rutinas personalizadas y control de progreso. Interfaz moderna con experiencia de usuario optimizada.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    image: 'linear-gradient(135deg, #ea580c, #dc2626)',
    link: 'https://centro-deportivo-pedro-jv-illa.vercel.app',
  },
  {
    id: '3',
    title: 'BowlWeb — Tienda de Fruta Online',
    description: 'E-commerce de productos frescos con diseño responsivo, animaciones scroll avanzadas, catálogo de productos y formularios de contacto integrados.',
    tags: ['React', 'Tailwind', 'Framer Motion', 'E-commerce'],
    image: 'linear-gradient(135deg, #16a34a, #84cc16)',
    link: 'https://bowl-food-web.vercel.app/',
  },
  {
    id: '4',
    title: 'Aventura Gráfica — Juego Web',
    description: 'Juego de aventura gráfica interactivo desarrollado para navegador. Narrativa ramificada, gestión de estados del juego y diseño visual inmersivo.',
    tags: ['JavaScript', 'Canvas', 'Game Dev', 'HTML5'],
    image: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
    link: 'https://github.com/Ayoxb1',
  },
  {
    id: '5',
    title: 'Proyectos DAM — Java & JavaFX',
    description: 'Colección de aplicaciones de escritorio desarrolladas en el ciclo DAM: gestión de inventarios, sistema de empleados y CRUD con JavaFX y conexión a base de datos.',
    tags: ['Java', 'JavaFX', 'FXML', 'JDBC', 'SQL'],
    image: 'linear-gradient(135deg, #b45309, #92400e)',
    link: 'https://github.com/Ayoxb1',
  },
  {
    id: '6',
    title: 'Ramadan Deen — App Fullstack',
    description: 'Aplicación fullstack para seguimiento de prácticas, gestión de comunidad y recursos educativos. Stack moderno con base de datos y autenticación.',
    tags: ['Full Stack', 'Node.js', 'MongoDB', 'React'],
    image: 'linear-gradient(135deg, #0d9488, #059669)',
    link: 'https://ramadan-deen.vercel.app',
  },
];

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="proyectos" className="relative w-full bg-black py-20 md:py-32 px-4 md:px-8">
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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl cursor-pointer block"
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
            <div className="relative h-auto md:h-96 p-6 md:p-8 flex flex-col justify-between min-h-[320px] overflow-hidden">
              {/* Top section */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:group-hover:translate-x-1 transition-transform duration-300">
                  {project.title}
                </h3>
                <p
                  className="text-gray-200 text-sm md:text-base leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    transitionDelay: hoveredId === project.id ? '100ms' : '0ms',
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div
                className="flex flex-wrap gap-2 mt-6 md:mt-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
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
              <div className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center md:group-hover:bg-white/20 md:group-hover:translate-x-1 md:group-hover:-translate-y-1 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white md:group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <div className="max-w-6xl mx-auto mt-16 text-center">
        <a 
          href="https://github.com/Ayoxb1"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Ver todos los proyectos
        </a>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20" />
    </section>
  );
}
