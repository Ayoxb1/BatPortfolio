# BatPortfolio // Ayoub Atidi Belbaz

Portfolio web de alto rendimiento y arquitectura moderna para **Ayoub Atidi Belbaz** (Desarrollador Full Stack & Técnico Superior DAM).

Construido con **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Three.js**, **GSAP ScrollTrigger**, **Lenis Smooth Scroll** y **Framer Motion**.

---

## ⚡ Características Principales

* 🎮 **Dock Flotante Estilo macOS / iOS:** Barra magnética esmerilada con efecto de vidrio translúcido, centrado automático, física de muelles y navegación fluida entre sectores.
* ⌨️ **Terminal Táctica Interactiva & Easter Eggs (CLI):** Consola ejecutable en tiempo real con comandos como `run barbersaas`, `execute imaan_brand`, `run gymtrack`, `skills`, `projects` y `matrix` (activable con shortcut `Ctrl+K` o botón en pantalla).
* 🖥️ **Ventana de Escritorio Clásica (Suite DAM - Java / JavaFX / JDBC):** Entorno simulado de sistema operativo de escritorio con menú clásico, TableView del equipo unipersonal (100% código propio de Ayoub Atidi) y consola de ejecución de consultas SQL directa.
* 📡 **Logs de Telemetría en Vivo (Batcomputer OS):** Flujo de diagnósticos de backend en tiempo real (Supabase RLS, pipelines MongoDB, pools HikariCP y transacciones ACID).
* ⚡ **Microinteracciones de Radar & Glitch:** Escáner láser estilo radar sobre tarjetas de telemetría y aberración cromática cinemática en títulos tácticos.
* 🌐 **Núcleo 3D Interactivo (Three.js):** Escena WebGL con icosaedro geométrico, partículas cuánticas, respuesta al cursor, giro cinético y transición a la esquina en scroll.
* 📹 **Estación de Monitoreo en Vivo (ScrollyCanvas):** Secuencia de vídeo interactiva de la Batcomputadora con controles de reproducción/pausa y fallback optimizado en WebP.
* 📂 **Arsenales & Proyectos (Scroll Storytelling):** 7 proyectos destacados con mini previews web, botón de acceso en vivo y botón de código fuente en GitHub.
* 👤 **Dossier Técnico & Métricas (About):** Habilidades fullstack (Frontend, Backend, Bases de Datos, DevOps), contadores numéricos fluidos y arquitectura de sistemas.
* ✉️ **Terminal de Transmisión Encriptada (Contacto):** Formulario de contacto funcional multi-capa conectado a entrega directa en `ayoubatidi2019@gmail.com`.
* 🔒 **Cumplimiento Legal & Privacidad:** Páginas de Aviso Legal, Política de Privacidad y Cookies sin exposición de datos personales sensibles.

---

## 🛠️ Stack Tecnológico

* **Framework:** Next.js 14.2 (React 18 / App Router)
* **Lenguaje:** TypeScript 5
* **Estilos:** Tailwind CSS 3.4 con diseño táctico monocromático y variables CSS
* **3D / Gráficos:** Three.js
* **Animaciones:** GSAP 3.12 (ScrollTrigger, useGSAP)
* **Smooth Scroll:** Lenis
* **Física & UI:** Framer Motion 12
* **Despliegue:** Vercel

---

## 📁 Estructura del Código

```
MiPortfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/route.ts  # Endpoint de envío de mensajes
│   │   ├── aviso-legal/          # Aviso legal y propiedad intelectual
│   │   ├── cookies/              # Política de cookies
│   │   ├── privacidad/           # Política de privacidad
│   │   ├── layout.tsx            # Root layout con metadata y fuentes
│   │   ├── page.tsx              # Página principal
│   │   └── globals.css           # Estilos tácticos globales
│   ├── components/
│   │   ├── ui/
│   │   │   └── magnetic-dock.tsx # Dock inferior flotante magnético
│   │   ├── About.tsx             # Dossier técnico, skills y métricas
│   │   ├── Contact.tsx           # Formulario funcional y redes tácticas
│   │   ├── CookieBanner.tsx      # Banner de copyright y cookies
│   │   ├── HeroScene.tsx         # Escena 3D Three.js con núcleo interactivo
│   │   ├── Preloader.tsx         # Preloader cinematográfico
│   │   ├── ProjectsShowcase.tsx  # Proyectos con mini preview y pinned scroll
│   │   ├── ScrollyCanvas.tsx     # Reproductor interactivo de la Batcomputadora
│   │   └── SmoothScroller.tsx    # Integración Lenis + GSAP ticker
│   └── lib/
│       ├── gsap-config.ts        # Constantes de animación y curvas de aceleración
│       └── navigation-event.ts   # Bus de eventos para transiciones del Dock
├── public/
│   ├── hero-bg.mp4               # Vídeo de alta resolución
│   ├── projects/                 # Capturas web de los proyectos
│   └── sequence/                 # Frames optimizados WebP
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 🚀 Instalación y Desarrollo Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Ayoxb1/BatPortfolio.git
   cd BatPortfolio
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   npm run start
   ```

---

## ✉️ Canales de Contacto

* **Email:** [ayoubatidi2019@gmail.com](mailto:ayoubatidi2019@gmail.com)
* **GitHub:** [https://github.com/Ayoxb1](https://github.com/Ayoxb1)
* **LinkedIn:** [Ayoub Atidi Belbaz](https://www.linkedin.com/in/ayoub-atidi-belbaz-07b274312/)

---

© 2026 Ayoub Atidi Belbaz · Wayne Tech Architecture. Todos los derechos reservados.
