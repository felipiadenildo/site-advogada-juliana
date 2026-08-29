import servicesList from '@/content/services.json';
import siteData from '@/content/site.json';
import WhatsAppButton from './WhatsAppButton';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function Services() {
  return (
    <section id="servicos" className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Especialidades do Escritório
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Atuamos com foco total no Direito Previdenciário para garantir o
            benefício que você merece.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <article
              key={service.id}
              className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-neutral-50"
            >
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <WhatsAppButton
                phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
                message={service.whatsappMessage}
                className="inline-flex items-center gap-1.5 text-brand-whatsapp-dark font-semibold hover:text-brand-secondary transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Saber mais
              </WhatsAppButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
