import { Phone } from 'lucide-react';
import siteData from '@/content/site.json';

function formatPhone(phoneNumber: string) {
  return phoneNumber.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
}

export default function TopBar() {
  return (
    <div className="bg-brand-secondary text-white/70 px-6 md:px-12 py-2 text-xs">
      <div className="max-w-5xl mx-auto flex items-center gap-6">
        {siteData.whatsapp.numbers.map((number) => (
          <a
            key={number.phoneNumber}
            href={`tel:+${number.phoneNumber}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>
              <span className="hidden sm:inline">
                {number.region.replace(' (sede)', '')}:{' '}
              </span>
              {formatPhone(number.phoneNumber)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
