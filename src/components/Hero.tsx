import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-slate-900 text-white py-20 px-6 md:px-12 flex flex-col items-center justify-center text-center min-h-[75vh]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          [Headline] Especialistas em Benefícios do INSS
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          [Sub-headline] Texto provisório aguardando briefing. Nossa missão é
          garantir o seu direito previdenciário com ética e agilidade.
        </p>
        <Link
          href="#contato"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg"
        >
          [CTA] Quero falar com um advogado
        </Link>
      </div>
    </section>
  );
}
