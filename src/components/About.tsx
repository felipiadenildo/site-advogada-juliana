import Image from 'next/image';
import aboutData from '@/content/about.json';
import siteData from '@/content/site.json';
import WhatsAppButton from './WhatsAppButton';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function About() {
  return (
    <section
      id="sobre"
      className="py-20 px-6 md:px-12 bg-brand-primary/6 border-t border-brand-primary/10"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-inner">
          <Image
            src={aboutData.photoSrc}
            alt={aboutData.photoAlt}
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
            {aboutData.heading}
          </h2>
          <p className="text-gray-600 text-lg mb-4">{aboutData.bio}</p>
          <ul className="space-y-3 mb-8">
            {aboutData.credentials.map((credential) => (
              <li key={credential} className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                {credential}
              </li>
            ))}
          </ul>
          <WhatsAppButton
            phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
            message="Olá! Vim pela seção 'Sobre' do site e gostaria de falar com a Dra. Juliana."
            className="inline-flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-brand-secondary font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Mande uma mensagem ou marque uma consulta
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
