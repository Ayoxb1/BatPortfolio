'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, MotionValue } from 'framer-motion';

interface MagneticDockProps {
  visible?: boolean;
}

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const VideoCamIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" />
  </svg>
);

const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
  </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const NAV_ITEMS = [
  { id: 'secuencia', label: 'Vídeo en Vivo', icon: VideoCamIcon },
  { id: 'inicio', label: 'Núcleo 3D', icon: HomeIcon },
  { id: 'proyectos', label: 'Proyectos', icon: FolderIcon },
  { id: 'sobre-mi', label: 'Sobre Mí', icon: UserIcon },
  { id: 'contacto', label: 'Contacto', icon: MailIcon },
];

interface DockItemProps {
  item: typeof NAV_ITEMS[0];
  mouseX: MotionValue<number>;
  activeSection: string;
  onClick: (id: string) => void;
  isMobile: boolean;
}

function DockItem({ item, mouseX, activeSection, onClick, isMobile }: DockItemProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    if (isMobile) return 0;
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleRaw = useTransform(distance, [-120, 0, 120], [1, 1.35, 1]);
  const scale = useSpring(scaleRaw, { stiffness: 350, damping: 25 });

  const isActive = activeSection === item.id;
  const Icon = item.icon;

  return (
    <motion.div
      style={{ scale: isMobile ? 1 : scale }}
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="absolute -top-9 px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md text-[10px] font-mono tracking-wider text-zinc-200 border border-white/15 whitespace-nowrap shadow-lg pointer-events-none"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={ref}
        onClick={() => onClick(item.id)}
        aria-label={item.label}
        aria-current={isActive ? 'page' : undefined}
        className={`w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer ${
          isActive
            ? 'bg-white/20 text-white border border-white/25 shadow-[0_2px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]'
            : 'text-zinc-400 hover:text-white hover:bg-white/[0.08]'
        }`}
      >
        <Icon className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:scale-110" />
      </button>

      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.7)]"
        />
      )}
    </motion.div>
  );
}

export function MagneticDock({ visible = true }: MagneticDockProps) {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );
    
    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`, { duration: 1.2 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-4 md:bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
          <motion.nav
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 25 }}
            role="navigation"
            aria-label="Navegación principal"
            className="pointer-events-auto bg-black/25 backdrop-blur-2xl backdrop-saturate-150 border border-white/[0.14] rounded-2xl md:rounded-3xl p-1.5 md:p-2 flex items-center justify-center gap-1.5 md:gap-2.5 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.7),0_0_20px_1px_rgba(255,255,255,0.04),inset_0_1px_1px_0_rgba(255,255,255,0.18)]"
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
          >
            {NAV_ITEMS.map((item) => (
              <DockItem
                key={item.id}
                item={item}
                mouseX={mouseX}
                activeSection={activeSection}
                onClick={handleClick}
                isMobile={isMobile}
              />
            ))}
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MagneticDock;

