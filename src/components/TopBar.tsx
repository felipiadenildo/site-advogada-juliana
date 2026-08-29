import { Phone, Mail } from 'lucide-react';
import siteData from '@/content/site.json';
import SocialLinks from './icons/SocialLinks';

function formatPhone(phoneNumber: string) {
  return phoneNumber.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
}

export default function TopBar() {
  return (
    <div className="bg-neutral-50 text-gray-600 border-b border-gray-100 px-6 md:px-12 py-2 text-xs">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6">
          {siteData.whatsapp.numbers.map((number) => (
            <a
              key={number.phoneNumber}
              href={`tel:+${number.phoneNumber}`}
              className="flex items-center gap-1.5 hover:text-brand-primary transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>
                <span className="hidden sm:inline">{number.region}: </span>
                {formatPhone(number.phoneNumber)}
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-3">
          <SocialLinks className="flex items-center gap-3" />
          <a
            href={`mailto:${siteData.emails[0].address}`}
            aria-label="E-mail"
            className="hover:text-brand-primary transition-colors"
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
