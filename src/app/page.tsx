import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 font-sans">
      <Hero />
      <Services />
      <About />
    </main>
  );
}
