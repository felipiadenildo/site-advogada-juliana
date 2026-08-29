import { Phone, Mail } from 'lucide-react';
import siteData from '@/content/site.json';
import contactData from '@/content/contact.json';
import WhatsAppIcon from './icons/WhatsAppIcon';

function formatPhone(phoneNumber: string) {
  return phoneNumber.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
}

export default function Contact() {
  return (
    <section
      id="contato"
      className="bg-gradient-to-br from-brand-primary to-brand-secondary py-20 px-6 md:px-12 text-center"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {contactData.heading}
        </h2>
        <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto whitespace-pre-line">
          {contactData.subtext}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {siteData.whatsapp.numbers.map((number) => {
            const waHref = `https://wa.me/${number.phoneNumber}?text=${encodeURIComponent(siteData.whatsapp.defaultMessage)}`;
            return (
              <div
                key={number.phoneNumber}
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/10 py-8 px-4"
              >
                <span className="text-white font-semibold">
                  {number.region}
                </span>
                <span className="text-white/70 text-sm">
                  {formatPhone(number.phoneNumber)}
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Chamar no WhatsApp — ${number.region}`}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-brand-secondary transition-colors"
                  >
                    <WhatsAppIcon className="w-6 h-6" />
                  </a>
                  <a
                    href={`tel:+${number.phoneNumber}`}
                    aria-label={`Ligar — ${number.region}`}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <Phone className="w-6 h-6" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}

          {siteData.emails.map((email) => (
            <a
              key={email.address}
              href={`mailto:${email.address}`}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/20 transition-colors py-8 px-4"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white">
                <Mail className="w-6 h-6" aria-hidden="true" />
              </span>
              <span className="text-white font-semibold">E-mail</span>
              <span className="text-white/70 text-sm break-all">
                {email.address}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
