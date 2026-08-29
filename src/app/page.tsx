import Hero from '@/components/Hero';
import Differentials from '@/components/Differentials';
import Services from '@/components/Services';
import About from '@/components/About';
import Faq from '@/components/Faq';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 font-sans">
      <Hero />
      <Differentials />
      <Services />
      <About />
      <Faq />
    </main>
  );
}
