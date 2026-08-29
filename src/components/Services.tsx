import servicesList from '@/content/services.json';
import siteData from '@/content/site.json';
import WhatsAppButton from './WhatsAppButton';

export default function Services() {
  return (
    <section id="servicos" className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
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
              className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-slate-50"
            >
              <h3 className="text-xl font-bold text-blue-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <WhatsAppButton
                phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
                message={service.whatsappMessage}
                className="text-green-600 font-semibold hover:text-green-800 transition-colors"
              >
                Saber mais &rarr;
              </WhatsAppButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
