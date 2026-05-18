// DETALLES DE PROYECTOS DE AYOUB - Personalización Projects.tsx

// Reemplaza el array 'projects' en Projects.tsx con esto:

const projects: Project[] = [
  {
    id: '1',
    title: 'Sistema de Gestión de Barbería',
    description: 'SaaS profesional con dashboard completo para reservas, gestión de clientes, historial de servicios y analytics en tiempo real. Desarrollado con arquitectura CRUD y bases de datos.',
    tags: ['Java', 'JavaFX', 'SQL', 'CRUD'],
    image: 'linear-gradient(135deg, from-blue-600 to-cyan-600)',
    link: 'https://barber-saas-pi.vercel.app',
  },
  {
    id: '2',
    title: 'Webs Profesionales & Marketing Digital',
    description: 'Dos sitios web profesionales con diseño responsivo, animaciones scroll avanzadas y formularios de contacto integrados. Enfoque en conversión y experiencia de usuario.',
    tags: ['React', 'Tailwind', 'Framer Motion', 'Landing Pages'],
    image: 'linear-gradient(135deg, from-orange-500 to-pink-600)',
    link: 'https://github.com/Ayoxb1',
  },
  {
    id: '3',
    title: 'Proyecto Ramadan Deen',
    description: 'Aplicación personal fullstack para seguimiento de prácticas islámicas, gestión de comunidad y recursos educativos. Stack moderno con base de datos relacional.',
    tags: ['Full Stack', 'Node.js', 'MongoDB', 'React'],
    image: 'linear-gradient(135deg, from-emerald-500 to-teal-600)',
    link: 'https://github.com/Ayoxb1',
  },
  {
    id: '4',
    title: 'Automatización con n8n',
    description: 'Workflows inteligentes para automatización de procesos, integración de APIs, procesamiento de datos y optimización de tareas repetitivas en empresas.',
    tags: ['n8n', 'Automation', 'APIs', 'Workflows'],
    image: 'linear-gradient(135deg, from-purple-600 to-indigo-600)',
    link: 'https://github.com/Ayoxb1',
  },
];

// INFORMACIÓN ADICIONAL PARA PERSONALIZACIÓN:

// Tu perfil profesional:
const profile = {
  nombre: 'Ayoub Atidi Belbaz',
  rol: 'Estudiante de Desarrollo de Aplicaciones Multiplataforma (DAM)',
  subtitulo: 'Creative Developer & Full Stack Engineer',
  ubicacion: 'Molina de Segura, Murcia',
  email: 'ayoubatidi2019@gmail.com',
  telefono: '+34 641 27 91 31 / 631 102 597',
  linkedin: 'www.linkedin.com/in/ayoub-atidi-belbaz-07b274312',
  github: 'https://github.com/Ayoxb1',
};

// Tus habilidades específicas:
const skills = {
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'JavaScript'],
  backend: ['Java', 'Node.js', 'SQL', 'MongoDB', 'APIs REST', 'JDBC'],
  desktop: ['JavaFX', 'FXML', 'Diseño de interfaces', 'CRUD', 'Bases de datos'],
  herramientas: ['Git/GitHub', 'n8n', 'Canva', 'Office 365', 'Google Workspace', 'IntelliJ', 'VS Code'],
};

// Tu experiencia reciente:
const experience = [
  {
    empresa: 'ALCURNIA (ALGUAZAS)',
    puesto: 'Apoyo en Producción y Logística',
    periodo: 'Julio-Agosto 2025',
  },
  {
    empresa: 'DIGITAL CREATIVOS MURCIA',
    puesto: 'Diseño y Gestión de Contenido Digital',
    periodo: 'Junio-Julio 2024',
  },
  {
    empresa: 'ADA PROTECT (MURCIA)',
    puesto: 'Auxiliar Administrativo',
    periodo: 'Agosto-Septiembre 2025',
  },
  {
    empresa: 'LA BOCA TE LÍA (MOLINA DE SEGURA)',
    puesto: 'Cocinero',
    periodo: 'Septiembre 2025',
  },
];

// Tu formación:
const education = {
  primaria: {
    titulo: 'Desarrollo de Aplicaciones Multiplataforma (DAM)',
    institucion: 'IES Alfonso X El Sabio',
    periodo: '2025-2027',
    estado: 'En curso',
  },
  secundaria: {
    titulo: 'Bachillerato Ciencias de la Salud',
    institucion: 'IES Francisco de Goya',
    periodo: '2023-2025',
    notaMedia: 9.0,
    distinciones: ['Matrícula de Honor en Biología', 'Matrícula de Honor en Fundamentos'],
  },
};

// Tus idiomas:
const languages = {
  español: 'Nativo',
  ingles: 'B2',
  arabe: 'Nativo',
};

// Competencias personales clave:
const personalSkills = [
  'Liderazgo de equipos multidisciplinarios',
  'Comunicación efectiva (técnica y no técnica)',
  'Pensamiento crítico y resolución creativa',
  'Adaptabilidad y aprendizaje autónomo',
  'Gestión eficiente del tiempo y multitarea',
  'Inteligencia emocional y empatía',
  'Trabajo bajo presión',
];

export {
  projects,
  profile,
  skills,
  experience,
  education,
  languages,
  personalSkills,
};
