import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import siteData from '@/content/site.json';
import SocialLinks from './icons/SocialLinks';

function formatPhone(phoneNumber: string) {
  return phoneNumber.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-600 px-6 md:px-12 py-12 border-t border-gray-200">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
        <div>
          <Image
            src="/images/logo-horizontal-dark.svg"
            alt={siteData.firmName}
            width={320}
            height={98}
            className="h-[88px] w-auto mb-4"
          />
          <p className="mb-2">
            Direito Previdenciário com compromisso e responsabilidade.
          </p>
          <p className="mb-4">{siteData.oabNumber}</p>
          <SocialLinks className="flex items-center gap-4 text-gray-500" />
        </div>

        <div>
          <p className="text-brand-secondary font-semibold mb-2">Links Úteis</p>
          <ul className="space-y-1.5">
            {siteData.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:text-brand-primary transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/politica-de-privacidade"
                className="hover:text-brand-primary transition-colors"
              >
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-brand-secondary font-semibold mb-2">Contato</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Mail
                className="w-4 h-4 mt-0.5 shrink-0 text-brand-primary"
                aria-hidden="true"
              />
              <a
                href={`mailto:${siteData.emails[0].address}`}
                className="hover:text-brand-primary transition-colors"
              >
                {siteData.emails[0].address}
              </a>
            </li>
            {siteData.whatsapp.numbers.map((number) => (
              <li key={number.phoneNumber} className="flex items-start gap-2">
                <Phone
                  className="w-4 h-4 mt-0.5 shrink-0 text-brand-primary"
                  aria-hidden="true"
                />
                <a
                  href={`tel:+${number.phoneNumber}`}
                  className="hover:text-brand-primary transition-colors"
                >
                  {number.region}: {formatPhone(number.phoneNumber)}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <MapPin
                className="w-4 h-4 mt-0.5 shrink-0 text-brand-primary"
                aria-hidden="true"
              />
              <span>Atendimento em todo o Brasil</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock
                className="w-4 h-4 mt-0.5 shrink-0 text-brand-primary"
                aria-hidden="true"
              />
              <span className="whitespace-pre-line">
                {siteData.businessHours}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-8 mt-8 border-t border-gray-200 text-xs text-gray-500">
        &copy; {currentYear} {siteData.firmName}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
