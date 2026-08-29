import { Phone, Mail } from 'lucide-react';
import siteData from '@/content/site.json';
import contactData from '@/content/contact.json';
import WhatsAppIcon from './icons/WhatsAppIcon';

function formatPhone(phoneNumber: string) {
  return phoneNumber.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
}

export default function Contact() {
  const primaryNumber = siteData.whatsapp.numbers[0].phoneNumber;
  const whatsappHref = `https://wa.me/${primaryNumber}?text=${encodeURIComponent(siteData.whatsapp.defaultMessage)}`;

  const cards = [
    {
      key: 'whatsapp',
      href: whatsappHref,
      icon: <WhatsAppIcon className="w-6 h-6" />,
      label: 'WhatsApp',
      value: formatPhone(primaryNumber),
    },
    ...siteData.whatsapp.numbers.map((number) => ({
      key: `tel-${number.phoneNumber}`,
      href: `tel:+${number.phoneNumber}`,
      icon: <Phone className="w-6 h-6" aria-hidden="true" />,
      label: `Ligar — ${number.region}`,
      value: formatPhone(number.phoneNumber),
    })),
    ...siteData.emails.map((email) => ({
      key: `email-${email.address}`,
      href: `mailto:${email.address}`,
      icon: <Mail className="w-6 h-6" aria-hidden="true" />,
      label: `E-mail (${email.label})`,
      value: email.address,
    })),
  ];

  return (
    <section
      id="contato"
      className="bg-brand-secondary py-20 px-6 md:px-12 text-center"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {contactData.heading}
        </h2>
        <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
          {contactData.subtext}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cards.map((card) => (
            <a
              key={card.key}
              href={card.href}
              target={card.key === 'whatsapp' ? '_blank' : undefined}
              rel={card.key === 'whatsapp' ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors py-8 px-4"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-whatsapp text-brand-secondary">
                {card.icon}
              </span>
              <span className="text-white font-semibold">{card.label}</span>
              <span className="text-white/60 text-sm break-all">
                {card.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
