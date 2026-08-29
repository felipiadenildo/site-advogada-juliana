import { Phone } from 'lucide-react';
import siteData from '@/content/site.json';

// lucide-react não inclui ícones de marca (política deles); usamos SVGs simples por plataforma.
const SOCIAL_ICONS: Record<string, React.ComponentType> = {
  instagram: function InstagramIcon() {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="w-3.5 h-3.5"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  },
  facebook: function FacebookIcon() {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3.5 h-3.5"
        aria-hidden="true"
      >
        <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.5-1.5H16.5V4.3c-.3-.04-1.2-.12-2.2-.12-2.2 0-3.8 1.34-3.8 3.8V10.5H8v3h2.5V21h3Z" />
      </svg>
    );
  },
  tiktok: function TikTokIcon() {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3.5 h-3.5"
        aria-hidden="true"
      >
        <path d="M12.75 2h2.4a5.6 5.6 0 0 0 4.5 4.5v2.4a7.9 7.9 0 0 1-4.5-1.4v7.2a5.85 5.85 0 1 1-5.85-5.85c.2 0 .4.01.6.04v2.46a3.4 3.4 0 1 0 2.85 3.35V2Z" />
      </svg>
    );
  },
  kwai: function KwaiIcon() {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="w-3.5 h-3.5"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="6" />
        <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" stroke="none" />
      </svg>
    );
  },
};

export default function TopBar() {
  const primaryNumber = siteData.whatsapp.numbers[0].phoneNumber;

  return (
    <div className="bg-slate-950 text-slate-300 px-6 md:px-12 py-2 text-xs">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <a
          href={`tel:+${primaryNumber}`}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">
            {primaryNumber.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')}
          </span>
        </a>

        <div className="flex items-center gap-4">
          {siteData.social.map((item) => {
            const Icon = SOCIAL_ICONS[item.platform];
            if (!Icon) return null;
            return (
              <a
                key={item.platform}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.platform}
                className="hover:text-white transition-colors"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
