import Image from 'next/image';
import WhatsAppButton from './WhatsAppButton';
import WhatsAppIcon from './icons/WhatsAppIcon';
import siteData from '@/content/site.json';
import heroData from '@/content/hero.json';

export default function Hero() {
  return (
    <section className="relative text-brand-secondary py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center min-h-[80vh] overflow-hidden">
      <Image
        src="/images/hero-background.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center] z-0"
      />
      {/* Scrim claro para manter o texto legível sobre a foto, revelando mais
          da imagem do lado com mais espaço vazio (direita). */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40 z-0" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          {heroData.headline}{' '}
          <span className="text-brand-primary">
            {heroData.headlineHighlight}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-2xl leading-relaxed">
          {heroData.subtextBefore}
          <strong className="text-brand-primary">
            {heroData.subtextHighlight}
          </strong>
          {heroData.subtextAfter}
        </p>

        <p className="text-lg md:text-xl font-semibold text-brand-secondary mb-8 max-w-2xl leading-relaxed">
          {heroData.ctaLead}
        </p>

        <WhatsAppButton
          phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
          message={heroData.whatsappMessage}
          className="inline-flex items-center justify-center gap-3 bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-brand-secondary font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-brand-whatsapp/30 transform hover:-translate-y-1 w-full sm:w-auto"
        >
          <WhatsAppIcon className="w-6 h-6" />
          {siteData.ctaLabel}
        </WhatsAppButton>
      </div>
    </section>
  );
}
