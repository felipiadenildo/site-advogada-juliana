import { Star } from 'lucide-react';
import siteData from '@/content/site.json';

// ADR-0004: exibimos só a nota agregada do Google, sem depoimentos individuais.
export default function GoogleRating() {
  const { value, reviewCount, profileUrl } = siteData.googleRating;

  return (
    <section className="py-16 px-6 md:px-12 bg-white border-y border-gray-100">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-3">
        <div className="flex items-center gap-1" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={
                index < Math.round(value)
                  ? 'w-6 h-6 fill-amber-400 text-amber-400'
                  : 'w-6 h-6 text-gray-300'
              }
            />
          ))}
        </div>
        <p className="text-gray-700">
          <span className="font-bold text-blue-900">{value.toFixed(1)}</span> no
          Google
          {reviewCount > 0 && ` · ${reviewCount} avaliações`}
        </p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-green-700 font-semibold hover:text-green-800 transition-colors underline underline-offset-2"
        >
          Ver perfil no Google
        </a>
      </div>
    </section>
  );
}
