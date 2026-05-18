'use client';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    },
    {
      title: 'Backend',
      skills: ['Java', 'Node.js', 'SQL', 'MongoDB', 'APIs REST'],
    },
    {
      title: 'Desktop',
      skills: ['JavaFX', 'FXML', 'Diseño de interfaces', 'CRUD', 'Bases de datos'],
    },
    {
      title: 'Herramientas',
      skills: ['Git/GitHub', 'n8n', 'Canva', 'Office 365', 'Google Workspace'],
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-900 py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            Habilidades
          </h2>
          <p className="text-lg text-gray-400">
            Stack tecnológico y competencias profesionales que aplico en cada proyecto
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600/0 to-blue-600/0 group-hover:from-orange-600/20 group-hover:to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />

              <h3 className="text-2xl font-bold text-white mb-6">{category.title}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
                    <span className="group-hover:translate-x-1 transition-transform">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
              4+
            </p>
            <p className="text-gray-400">Proyectos completados</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600 mb-2">
              2
            </p>
            <p className="text-gray-400">Webs profesionales</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600 mb-2">
              1º DAM
            </p>
            <p className="text-gray-400">Estudiante de Desarrollo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
