import { Scale, ShieldCheck, SearchCheck, HeartHandshake } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import differentialsList from '@/content/differentials.json';

const ICONS: Record<string, LucideIcon> = {
  scale: Scale,
  'shield-check': ShieldCheck,
  'search-check': SearchCheck,
  'heart-handshake': HeartHandshake,
};

export default function Differentials() {
  return (
    <section id="diferenciais" className="bg-blue-950 py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {differentialsList.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div
              key={item.id}
              className="flex flex-col items-center text-center gap-3"
            >
              {Icon && (
                <Icon
                  className="w-7 h-7 text-blue-300"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
              )}
              <span className="text-sm font-medium text-blue-100">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
