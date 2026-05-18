# 🚀 GUÍA COMPLETA: Setup de tu Portfolio

Sigue estos pasos exactos para tener tu portfolio funcionando en 15 minutos.

---

## **PASO 1: Preparar el entorno (5 minutos)**

### 1.1 Verificar Node.js instalado

```bash
node --version
npm --version
```

Si no tienes Node.js, descarga desde [nodejs.org](https://nodejs.org/) (versión 18+)

### 1.2 Crear carpeta del proyecto

```bash
mkdir mi-portfolio && cd mi-portfolio
```

---

## **PASO 2: Crear proyecto Next.js (5 minutos)**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint
```

Responde así a las preguntas:
```
✔ Would you like to use TypeScript? › Yes
✔ Would you like to use ESLint? › Yes
✔ Would you like to use Tailwind CSS? › Yes
✔ Would you like your code inside a `src/` directory? › Yes
✔ Would you like to use App Router? › Yes
✔ Would you like to use Turbopack for next dev? › No
✔ Would you like to customize the import alias? › No
```

---

## **PASO 3: Copiar archivos (3 minutos)**

### 3.1 Copiar componentes

Crea las carpetas si no existen:
```bash
mkdir -p src/components
```

Copia estos archivos a `src/components/`:
- `ScrollyCanvas.tsx`
- `Overlay.tsx`
- `Projects.tsx`
- `Skills.tsx`
- `Contact.tsx`

### 3.2 Copiar configuraciones globales

```bash
# Copiar archivos de configuración al raíz del proyecto
cp package.json ./
cp tailwind.config.ts ./
cp tsconfig.json ./
cp next.config.js ./
cp postcss.config.js ./

# Copiar estilos y layout
cp globals.css src/app/
cp layout.tsx src/app/
cp page.tsx src/app/
```

---

## **PASO 4: Copiar frames de animación (2 minutos)**

### 4.1 Crear carpeta

```bash
mkdir -p public/sequence
```

### 4.2 Copiar los 120 frames

Tienes dos opciones:

**Opción A: Línea de comandos (si los frames están en Downloads)**
```bash
cp ~/Downloads/sequence/*.png public/sequence/
```

**Opción B: Manualmente**
1. Abre la carpeta `public/sequence/` en tu explorador
2. Copia los 120 archivos PNG (frame_0001.png ... frame_0120.png)

### 4.3 Verificar que están

```bash
ls public/sequence/ | wc -l
# Debe mostrar: 120 (o 121 incluyendo .DS_Store en Mac)
```

---

## **PASO 5: Instalar dependencias (3 minutos)**

```bash
npm install
```

Espera a que se instale todo (~2-3 minutos)

---

## **PASO 6: Probar en desarrollo (2 minutos)**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador

**Deberías ver:**
✅ Tu foto con la animación de scroll
✅ Texto que aparece y desaparece
✅ Grid de proyectos
✅ Sección de habilidades
✅ Formulario de contacto

---

## **PASO 7: Personalizar tu portfolio**

### 7.1 Cambiar nombre y título

Abre `src/components/Overlay.tsx` y busca:

```typescript
<h1 className="...">Ayoub Atidi</h1>
<p>Creative Developer & Full Stack Engineer</p>
```

Reemplaza con tu nombre y título.

### 7.2 Cambiar proyectos

Abre `src/components/Projects.tsx` y busca:

```typescript
const projects: Project[] = [
  {
    id: '1',
    title: 'Tu proyecto',
    description: 'Descripción...',
    tags: ['Tech 1', 'Tech 2'],
    // ...
  },
];
```

### 7.3 Cambiar habilidades

Abre `src/components/Skills.tsx` y busca:

```typescript
const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', ...],
  },
];
```

### 7.4 Cambiar contacto

Abre `src/components/Contact.tsx` y busca:

```typescript
const contacts = [
  {
    label: 'Email',
    value: 'tu@email.com',  // ← Cambiar aquí
    href: 'mailto:tu@email.com',
  },
];
```

---

## **PASO 8: Deploy (Opcional pero recomendado)**

### Opción A: Vercel (Más fácil - 2 minutos)

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Sigue las instrucciones. Tu portfolio estará en vivo en ~1 minuto.

### Opción B: Netlify (2 minutos)

1. Build el proyecto:
```bash
npm run build
```

2. Conecta la carpeta `.next` en [netlify.com](https://netlify.com)

---

## 🎯 Checklist Final

- [ ] Node.js instalado
- [ ] Proyecto Next.js creado
- [ ] Componentes copiados en `src/components/`
- [ ] Configuraciones copiadas
- [ ] 120 frames en `public/sequence/`
- [ ] `npm install` ejecutado
- [ ] `npm run dev` funciona sin errores
- [ ] Portfolio visible en localhost:3000
- [ ] Textos personalizados
- [ ] Proyectos actualizados
- [ ] Contacto actualizado (opcional: Deploy en Vercel)

---

## ❌ Problemas Comunes

### "Cannot find module ScrollyCanvas"
**Solución:** Verifica que los archivos .tsx están en `src/components/`

### "public/sequence not found"
**Solución:** Crea la carpeta `public/sequence/` y copia los frames

### "Canvas is blank"
**Solución:** Asegúrate de que los 120 frames están en `public/sequence/` con nombres como `frame_0001.png`

### "Port 3000 is already in use"
**Solución:** Usa otro puerto:
```bash
npm run dev -- -p 3001
```

### "Module not found: can't resolve 'next'"
**Solución:** Ejecuta `npm install` de nuevo

---

## 📚 Recursos Útiles

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/
- **Vercel Deploy**: https://vercel.com/docs

---

## 🎓 Tips Adicionales

1. **Cambiar colores**: Edita `tailwind.config.ts` - variables en la sección `colors`

2. **Agregar fuentes**: En `src/app/layout.tsx` puedes cambiar las Google Fonts

3. **Optimizar performance**: Los frames se precargan automáticamente

4. **Versión móvil**: Responsive por defecto, verifica en DevTools (F12 > Toggle Device)

5. **SEO**: Cambia el `metadata` en `src/app/layout.tsx`

---

## 🚀 ¡Listo!

Tu portfolio está listo. El próximo paso es personalizarlo 100% y deployarlo en Vercel para compartirlo con el mundo.

**¿Necesitas ayuda?** Revisa los errores en la consola del navegador (F12 > Console)

---

**Created with ❤️ for Ayoub Atidi**
