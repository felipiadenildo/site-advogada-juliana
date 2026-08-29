import WhatsAppButton from './WhatsAppButton';
import WhatsAppIcon from './icons/WhatsAppIcon';
import siteData from '@/content/site.json';
import heroData from '@/content/hero.json';

export default function Hero() {
  return (
    <section className="relative bg-brand-secondary text-white py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center min-h-[80vh] overflow-hidden">
      {/* Camada de fundo com parallax (bg-fixed). Padrão CSS por enquanto —
          trocar por foto real do escritório quando o cliente fornecer (backgroundImage abaixo). */}
      <div
        className="absolute inset-0 bg-fixed z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 to-brand-secondary z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-white/70 font-medium tracking-wider uppercase text-sm mb-4 tracking-widest">
          {siteData.firmName}
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          {heroData.headline}{' '}
          <span className="border-b-4 border-brand-primary-light pb-1">
            {heroData.headlineHighlight}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
          {heroData.subtext}
        </p>

        <WhatsAppButton
          phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
          message={heroData.whatsappMessage}
          className="inline-flex items-center justify-center gap-3 bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-brand-whatsapp/30 transform hover:-translate-y-1 w-full sm:w-auto"
        >
          <WhatsAppIcon className="w-6 h-6" />
          {siteData.ctaLabel}
        </WhatsAppButton>
      </div>
    </section>
  );
}
