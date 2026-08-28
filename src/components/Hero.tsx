import WhatsAppButton from './WhatsAppButton';

export default function Hero() {
  return (
    <section className="relative bg-slate-900 text-white py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-slate-900 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-blue-300 font-semibold tracking-wider uppercase text-sm mb-4 tracking-widest">
          Juliana Rangel Advocacia
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          Especialistas em{' '}
          <span className="text-blue-400">Benefícios do INSS</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
          Não deixe a burocracia impedir o seu direito. Garantimos a sua
          aposentadoria ou benefício com ética, agilidade e excelência jurídica.
        </p>

        {/* Usando o nosso novo componente dinâmico */}
        <WhatsAppButton
          phoneNumber="5511999999999"
          message="Olá! Vim pela seção principal do site e gostaria de falar com um advogado."
          className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1 w-full sm:w-auto"
        >
          Quero falar com um advogado
        </WhatsAppButton>
      </div>
    </section>
  );
}
