# Ayoub Atidi - Portfolio Moderno

Portfolio premium con scroll-linked animation construido con Next.js 14, TypeScript, Tailwind CSS y Canvas HTML5.

## 🚀 Features

✅ **Scroll-Linked Animation** - Animación sincronizada con scroll usando Canvas HTML5  
✅ **Glassmorphism Design** - Interfaz moderna con efectos de vidrio esmerilado  
✅ **Responsive** - Completamente adaptado a móvil, tablet y desktop  
✅ **Performance** - Preload de imágenes, canvas rendering, optimizaciones  
✅ **TypeScript** - Código tipado y seguro  
✅ **Tailwind CSS** - Estilos personalizados y coherentes  

## 📋 Estructura del Proyecto

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Estilos globales
│   └── components/
│       ├── ScrollyCanvas.tsx   # Componente scroll-linked
│       ├── Overlay.tsx         # Texto parallax
│       ├── Projects.tsx        # Grid de proyectos
│       ├── Skills.tsx          # Sección de habilidades
│       └── Contact.tsx         # Formulario y contacto
├── public/
│   └── sequence/               # Frames de la animación (120 PNGs)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

## 🛠️ Requisitos

- **Node.js** 18.x o superior
- **npm** o **yarn**
- Los **120 frames** en la carpeta `public/sequence/`

## 📦 Instalación

### 1. Crear proyecto Next.js

```bash
npx create-next-app@latest ayoub-portfolio --typescript --tailwind
cd ayoub-portfolio
```

### 2. Copiar archivos

Reemplaza los archivos del proyecto con los generados:

```bash
# Copiar componentes
cp ScrollyCanvas.tsx src/components/
cp Overlay.tsx src/components/
cp Projects.tsx src/components/
cp Skills.tsx src/components/
cp Contact.tsx src/components/

# Copiar configuraciones
cp next.config.js ./
cp tailwind.config.ts ./
cp tsconfig.json ./
cp globals.css src/app/
cp layout.tsx src/app/
cp page.tsx src/app/
```

### 3. Copiar frames de animación

```bash
# Crear carpeta public/sequence
mkdir -p public/sequence

# Copiar los 120 frames (frame_0001.png ... frame_0120.png)
cp sequence/*.png public/sequence/
```

### 4. Instalar dependencias

```bash
npm install
```

## 🚀 Ejecutar

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### Producción

```bash
npm run build
npm start
```

## 🎨 Personalización

### Cambiar textos del Overlay

Edita `src/components/Overlay.tsx`:

```typescript
<h1 className="...">Tu Nombre</h1>
<p>Tu Título</p>
```

### Cambiar proyectos

Edita `src/components/Projects.tsx`:

```typescript
const projects: Project[] = [
  {
    id: '1',
    title: 'Mi Proyecto',
    description: 'Descripción...',
    tags: ['React', 'Tailwind'],
    // ...
  },
];
```

### Cambiar colores

Edita `tailwind.config.ts` y `globals.css`:

```css
--color-primary-orange: #f97316;
--color-secondary-blue: #0ea5e9;
```

### Cambiar fuentes

Edita `src/app/layout.tsx`:

```typescript
// Cambiar Google Fonts
<link href="..." rel="stylesheet" />
```

## 🔧 Configuración Canvas

En `src/components/ScrollyCanvas.tsx`:

```typescript
interface ScrollyCanvasProps {
  frameCount: number;  // Cambiar según número de frames
}

// En page.tsx
<ScrollyCanvas frameCount={120} />
```

## 📱 Responsive Design

- **Mobile**: Stack vertical, tipografía adaptada
- **Tablet**: 2 columnas en grid de proyectos
- **Desktop**: Layout completo con 2 columnas

## ⚡ Performance Tips

1. **Preload de imágenes**: El componente precarga todos los frames
2. **Canvas rendering**: Usa Canvas en lugar de `<video>` para mejor performance
3. **Lazy loading**: Los componentes se cargan bajo demanda
4. **CSS puro**: Minimiza JavaScript en animations

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Conecta la carpeta .next en Netlify
```

### Otros

Asegúrate de que `public/sequence/` está incluido en la build.

## 📝 Notas

- Los 120 frames están en formato PNG (compatibilidad máxima)
- El canvas se redibuja en cada scroll para smooth animation
- La resolución es 720x1280 (vertical)
- El proyecto usa Tailwind CSS con configuración personalizada

## 🎯 Próximos pasos

1. ✅ Instalar dependencias
2. ✅ Copiar frames a `public/sequence/`
3. ✅ Personalizar textos y proyectos
4. ✅ Conectar formulario con servicio de email (Resend, SendGrid)
5. ✅ Deploy en Vercel

## 📞 Contacto

- Email: ayoubatidi2019@gmail.com
- Teléfono: +34 641 27 91 31
- Ubicación: Molina de Segura, Murcia

---

**Build con ❤️ usando Next.js, TypeScript y Tailwind CSS**
