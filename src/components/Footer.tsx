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
    <footer className="bg-brand-secondary text-white/60 px-6 md:px-12 py-12 border-t border-white/10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
        <div>
          <Image
            src="/images/logo-horizontal-light.svg"
            alt={siteData.firmName}
            width={200}
            height={60}
            className="h-[88px] w-auto mb-4"
          />
          <p className="mb-4">{siteData.oabNumber}</p>
          <SocialLinks />
        </div>

        <div>
          <p className="text-white font-semibold mb-2">Links Úteis</p>
          <ul className="space-y-1.5">
            {siteData.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/politica-de-privacidade"
                className="hover:text-white transition-colors"
              >
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-2">Contato</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${siteData.emails[0].address}`}
                className="hover:text-white transition-colors"
              >
                {siteData.emails[0].address}
              </a>
            </li>
            {siteData.whatsapp.numbers.map((number) => (
              <li key={number.phoneNumber} className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:+${number.phoneNumber}`}
                  className="hover:text-white transition-colors"
                >
                  {number.region}: {formatPhone(number.phoneNumber)}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>Atendimento em todo o Brasil</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{siteData.businessHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-8 mt-8 border-t border-white/10 text-xs text-white/60">
        &copy; {currentYear} {siteData.firmName}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
