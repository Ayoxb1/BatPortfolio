import ScrollyCanvas from '@/components/ScrollyCanvas';
import Overlay from '@/components/Overlay';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="bg-black">
      <ScrollyCanvas frameCount={120} />
      <Overlay />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
