# 🎨 GUÍA DE PERSONALIZACIÓN - Tu Portfolio

Esta guía te muestra exactamente dónde cambiar cada elemento de tu portfolio.

---

## ✅ YA ACTUALIZADO AUTOMÁTICAMENTE

Los siguientes datos ya están listos en tu código:

✅ **Email**: ayoubatidi2019@gmail.com  
✅ **Teléfono**: +34 641 27 91 31  
✅ **LinkedIn**: https://www.linkedin.com/in/ayoub-atidi-belbaz-07b274312/  
✅ **GitHub**: https://github.com/Ayoxb1  
✅ **Social Links**: Clickeables y funcionales  

---

## 🎯 CÓMO PERSONALIZAR CADA SECCIÓN

### 1️⃣ CAMBIAR TU NOMBRE Y TÍTULO

**Archivo**: `src/components/Overlay.tsx`

Busca esto:
```typescript
<h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter">
  Ayoub Atidi
</h1>
<p className="text-xl md:text-2xl text-gray-300 font-light">
  Creative Developer & Full Stack Engineer
</p>
```

Reemplaza con tu nombre si lo deseas (aunque ya está tu nombre actual).

---

### 2️⃣ CAMBIAR PROYECTOS DESTACADOS

**Archivo**: `src/components/Projects.tsx`

Busca el array `projects`:

```typescript
const projects: Project[] = [
  {
    id: '1',
    title: 'Sistema de Gestión de Barbería',  // ← Título del proyecto
    description: 'SaaS profesional con...',   // ← Descripción
    tags: ['Java', 'JavaFX', 'SQL', 'CRUD'], // ← Tecnologías
    image: 'linear-gradient(135deg, from-blue-600 to-cyan-600)', // ← Color
    link: 'https://github.com/Ayoxb1',       // ← Link (GitHub)
  },
  // ... más proyectos
];
```

**Para agregar un nuevo proyecto**:
```typescript
{
  id: '5',
  title: 'Mi Nuevo Proyecto',
  description: 'Descripción detallada aquí',
  tags: ['React', 'Node.js'],
  image: 'linear-gradient(135deg, from-pink-500 to-purple-600)',
  link: 'https://github.com/Ayoxb1/mi-proyecto',
},
```

**Colores disponibles para proyectos**:
```
Azul-Cian: linear-gradient(135deg, from-blue-600 to-cyan-600)
Naranja-Rosa: linear-gradient(135deg, from-orange-500 to-pink-600)
Verde-Teal: linear-gradient(135deg, from-emerald-500 to-teal-600)
Púrpura-Índigo: linear-gradient(135deg, from-purple-600 to-indigo-600)
Rojo-Naranja: linear-gradient(135deg, from-red-500 to-orange-600)
Amarillo-Rosa: linear-gradient(135deg, from-yellow-500 to-pink-600)
```

---

### 3️⃣ CAMBIAR SECCIÓN DE HABILIDADES

**Archivo**: `src/components/Skills.tsx`

Busca el array `skillCategories`:

```typescript
const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
  },
  {
    title: 'Backend',
    skills: ['Java', 'Node.js', 'SQL', 'MongoDB', 'APIs REST'],
  },
  // ... más categorías
];
```

**Para cambiar una habilidad**:
```typescript
{
  title: 'Mobile',  // ← Nuevo título
  skills: ['React Native', 'Flutter', 'Kotlin'],  // ← Nuevas habilidades
},
```

---

### 4️⃣ CAMBIAR INFORMACIÓN DE CONTACTO

**Archivo**: `src/components/Contact.tsx`

Los contactos ya están actualizados automáticamente:

```typescript
const contacts = [
  {
    label: 'Email',
    value: 'ayoubatidi2019@gmail.com',
    href: 'mailto:ayoubatidi2019@gmail.com',
    icon: '✉️',
  },
  {
    label: 'Teléfono',
    value: '+34 641 27 91 31',
    href: 'tel:+34641279131',
    icon: '📱',
  },
  {
    label: 'LinkedIn',
    value: 'Ayoub Atidi Belbaz',
    href: 'https://www.linkedin.com/in/ayoub-atidi-belbaz-07b274312/',
    icon: '💼',
  },
  {
    label: 'GitHub',
    value: 'Ayoxb1',
    href: 'https://github.com/Ayoxb1',
    icon: '🔗',
  },
];
```

Si quieres cambiar algo, solo edita el valor.

---

### 5️⃣ CAMBIAR COLORES PRINCIPALES

**Archivo**: `tailwind.config.ts`

```typescript
colors: {
  primary: {
    50: '#fff7ed',      // Más claro
    500: '#f97316',     // ← Color naranja principal
    600: '#ea580c',     // Más oscuro
  },
}
```

**Para cambiar el naranja a otro color**:
```typescript
500: '#3b82f6',  // Azul
500: '#10b981',  // Verde
500: '#8b5cf6',  // Púrpura
500: '#ec4899',  // Rosa
```

---

### 6️⃣ CAMBIAR FUENTES (Google Fonts)

**Archivo**: `src/app/layout.tsx`

Actualmente usa:
- **Display**: Space Grotesk (moderna y geométrica)
- **Body**: Space Grotesk (mismo)

Para cambiar a otra fuente:

```typescript
{/* Nueva fuente desde Google Fonts */}
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap"
  rel="stylesheet"
/>
```

Luego edita `tailwind.config.ts`:
```typescript
fontFamily: {
  sans: ['Poppins', 'system-ui', 'sans-serif'],
}
```

**Fuentes recomendadas para portfolio**:
- Poppins (moderna)
- Montserrat (profesional)
- Sora (minimalista)
- Inter (clean)

---

### 7️⃣ CAMBIAR TEXTOS DEL OVERLAY (Parallax)

**Archivo**: `src/components/Overlay.tsx`

**Sección 1** (Nombre):
```typescript
<h1>Ayoub Atidi</h1>
<p>Creative Developer & Full Stack Engineer</p>
```

**Sección 2** (Izquierda):
```typescript
<p className="text-2xl md:text-3xl text-white font-light leading-tight">
  Construyo experiencias digitales que{' '}
  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
    inspiran
  </span>
</p>
```

**Sección 3** (Derecha):
```typescript
<p className="text-xl md:text-2xl text-gray-300 font-light mb-6">
  Fusionando diseño y ingeniería para crear soluciones innovadoras
</p>
<div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm text-white cursor-pointer hover:bg-white/20 transition-all">
  Explorar mi trabajo
</div>
```

---

### 8️⃣ CAMBIAR META TAGS (SEO)

**Archivo**: `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Ayoub Atidi | Creative Developer & Full Stack Engineer',
  description: 'Portfolio moderno con scroll-linked animation y proyectos destacados',
};
```

Cambia el título y descripción para mejorar SEO.

---

### 9️⃣ CAMBIAR FOOTER/COPYRIGHT

**Archivo**: `src/components/Contact.tsx`

Busca:
```typescript
<p className="text-gray-500 text-sm">
  © 2025 Ayoub Atidi. Todos los derechos reservados.
</p>
```

---

### 🔟 CAMBIAR EL CONTENIDO DE "¿HABLAMOS?"

**Archivo**: `src/components/Contact.tsx`

```typescript
<h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
  ¿Hablamos?
</h2>
<p className="text-lg text-gray-400 max-w-2xl mx-auto">
  Estoy disponible para proyectos, colaboraciones o simplemente una conversación sobre tecnología
</p>
```

---

## 🎨 PALETAS DE COLORES RECOMENDADAS

### Opción 1: Naranja/Azul (ACTUAL)
```css
--primary: #f97316    (Naranja)
--secondary: #0ea5e9  (Azul)
--dark: #0a0a0a       (Negro)
```

### Opción 2: Púrpura/Rosa
```css
--primary: #a855f7    (Púrpura)
--secondary: #ec4899  (Rosa)
--dark: #0f172a       (Negro azulado)
```

### Opción 3: Verde/Cian
```css
--primary: #10b981    (Verde)
--secondary: #06b6d4  (Cian)
--dark: #0a1117       (Negro verdoso)
```

### Opción 4: Rojo/Naranja
```css
--primary: #ef4444    (Rojo)
--secondary: #f97316  (Naranja)
--dark: #1a1a1a       (Negro)
```

---

## 📐 RESPONSIVE BREAKPOINTS

Tu portfolio está responsivo por defecto:

```typescript
// Mobile (default)
<h1 className="text-6xl md:text-7xl">
  // En mobile: text-6xl
  // En tablet+ (md): text-7xl
</h1>
```

**Breakpoints Tailwind**:
- `sm`: 640px
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (desktop grande)

---

## 🔗 AGREGAR ENLACES A PROYECTOS

Actualmente todos los proyectos apuntan a `https://github.com/Ayoxb1`

Para cambiar a links específicos:

```typescript
{
  id: '1',
  title: 'Sistema de Gestión de Barbería',
  description: '...',
  tags: ['Java', 'JavaFX'],
  image: '...',
  link: 'https://github.com/Ayoxb1/nombre-del-proyecto', // ← Cambiar aquí
},
```

---

## 📱 TESTING RESPONSIVO

Abre DevTools (F12) y:

1. Click en "Toggle device toolbar" (Ctrl+Shift+M)
2. Selecciona:
   - iPhone 12 (390x844) - Mobile
   - iPad (768x1024) - Tablet
   - Desktop (1920x1080) - Desktop

Tu portfolio debe verse perfecto en todos.

---

## 🚀 DESPUÉS DE CAMBIAR ALGO

1. Guarda el archivo (Ctrl+S)
2. Verifica que `npm run dev` sigue ejecutándose
3. Recarga el navegador (F5 o Cmd+R)
4. Los cambios aparecerán al instante

---

## 💡 TIPS DE DISEÑO

### Cambiar transparencia (opacity)
```typescript
// Más transparente
<div className="bg-white/5">   {/* 5% opacidad */}
<div className="bg-white/10">  {/* 10% opacidad */}
<div className="bg-white/20">  {/* 20% opacidad */}
<div className="bg-white/50">  {/* 50% opacidad */}
```

### Cambiar velocidad de transiciones
```typescript
// Más rápido
<div className="transition-all duration-100">

// Más lento
<div className="transition-all duration-700">

// Velocidades: 100, 200, 300, 500, 700, 1000
```

### Cambiar sombras
```typescript
<div className="shadow-sm">      {/* Sombra pequeña */}
<div className="shadow-md">      {/* Sombra media */}
<div className="shadow-lg">      {/* Sombra grande */}
<div className="shadow-2xl">     {/* Sombra gigante */}
```

---

## 🔧 AGREGAR NUEVAS SECCIONES

Para agregar una nueva sección (ej: Blog, Testimonios):

1. Crea nuevo archivo `src/components/Blog.tsx`
2. Diseña con React + Tailwind
3. Importa en `src/app/page.tsx`
4. Añade debajo de `<Contact />`

```typescript
import Blog from '@/components/Blog';

export default function Home() {
  return (
    <main className="bg-black">
      <ScrollyCanvas />
      <Overlay />
      <Projects />
      <Skills />
      <Blog />  {/* ← Nuevo */}
      <Contact />
    </main>
  );
}
```

---

## 🎯 CHECKLIST DE PERSONALIZACIÓN

- [ ] Nombre y título (Overlay)
- [ ] Proyectos (descriptions y links)
- [ ] Habilidades (skills por categoría)
- [ ] Contacto (email, teléfono, LinkedIn, GitHub)
- [ ] Meta tags SEO (title y description)
- [ ] Colores (si deseas cambiar)
- [ ] Fuentes (si deseas cambiar)
- [ ] Footer (copyright year)

---

## 📞 PREGUNTAS FRECUENTES

**P: ¿Cómo cambio el número de columnas en Projects?**  
R: Edita `Projects.tsx` línea: `grid grid-cols-1 md:grid-cols-2 gap-6`  
Cambia `md:grid-cols-2` a `md:grid-cols-3` para 3 columnas.

**P: ¿Cómo agrego más proyectos?**  
R: Añade un nuevo objeto al array `projects` en `Projects.tsx`

**P: ¿Cómo cambio el tiempo de animación del scroll?**  
R: En `ScrollyCanvas.tsx`, edita los valores de `useEffect`

**P: ¿Dónde cambio el email del formulario?**  
R: En `Contact.tsx`, línea del input `type="email"`

---

## 🎉 ¡LISTO!

Tu portfolio está completamente personalizable. Cualquier elemento que veas en el navegador puede cambiar editando los archivos .tsx

**Recuerda**: 
- Guarda cambios (Ctrl+S)
- Recarga navegador (F5)
- Los cambios aparecen al instante en desarrollo

¿Necesitas ayuda con algo específico?

---

**Created for Ayoub Atidi 🚀**
