import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';
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
          <p>{siteData.oabNumber}</p>
          <p className="mb-4">{siteData.serviceArea}</p>
          <div className="flex items-center gap-4">
            <SocialLinks />
            <a
              href={`mailto:${siteData.email}`}
              aria-label="E-mail"
              className="hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
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
          <ul className="space-y-1.5">
            <li>{siteData.email}</li>
            {siteData.whatsapp.numbers.map((number) => (
              <li key={number.phoneNumber}>
                {number.region}: {formatPhone(number.phoneNumber)}
              </li>
            ))}
            <li className="pt-1">{siteData.businessHours}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-8 mt-8 border-t border-white/10 text-xs text-white/40">
        &copy; {currentYear} {siteData.firmName}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
