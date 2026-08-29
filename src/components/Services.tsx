import {
  Baby,
  Stethoscope,
  Bandage,
  HandHeart,
  Calendar,
  Accessibility,
  Lock,
  Users,
  FileSearch,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import servicesList from '@/content/services.json';
import siteData from '@/content/site.json';
import WhatsAppButton from './WhatsAppButton';
import WhatsAppIcon from './icons/WhatsAppIcon';

const ICONS: Record<string, LucideIcon> = {
  baby: Baby,
  stethoscope: Stethoscope,
  bandage: Bandage,
  'hand-heart': HandHeart,
  calendar: Calendar,
  accessibility: Accessibility,
  lock: Lock,
  users: Users,
  'file-search': FileSearch,
};

export default function Services() {
  return (
    <section id="servicos" className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Benefícios e Serviços que Oferecemos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Atuamos com foco total no Direito Previdenciário para garantir o
            benefício que você merece.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {servicesList.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <article
                key={service.id}
                className="flex flex-col h-full p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-neutral-50"
              >
                {Icon && (
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 shadow-lg shadow-brand-primary/20 mb-4">
                    <Icon
                      className="w-6 h-6 text-brand-primary"
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                  </span>
                )}
                <h3 className="text-xl font-bold text-brand-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <WhatsAppButton
                  phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
                  message={service.whatsappMessage}
                  className="mt-auto inline-flex items-center gap-1.5 text-brand-primary font-semibold hover:text-brand-secondary transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-brand-whatsapp-dark" />
                  Saber mais
                </WhatsAppButton>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center bg-neutral-50 border border-gray-100 rounded-2xl py-10 px-6">
          <p className="text-brand-secondary text-lg font-semibold mb-1">
            Não encontrou o seu benefício aqui?
          </p>
          <p className="text-gray-600 mb-6">
            Todo caso é diferente. Fale com a gente para tirar sua dúvida.
          </p>
          <WhatsAppButton
            phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
            message="Olá! Não encontrei meu caso entre os benefícios listados no site e gostaria de tirar uma dúvida."
            className="inline-flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-brand-secondary font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Fale com a nossa equipe
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
