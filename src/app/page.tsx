import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 font-sans">
      <Hero />
      {/* Os próximos componentes (Cards, Sobre, FAQ) entrarão aqui embaixo */}
    </main>
  );
}
