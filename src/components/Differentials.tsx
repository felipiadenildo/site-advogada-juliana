import {
  Scale,
  ShieldCheck,
  SearchCheck,
  HeartHandshake,
  MapPinned,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import differentialsList from '@/content/differentials.json';

const ICONS: Record<string, LucideIcon> = {
  scale: Scale,
  'shield-check': ShieldCheck,
  'search-check': SearchCheck,
  'heart-handshake': HeartHandshake,
  'map-pinned': MapPinned,
};

export default function Differentials() {
  return (
    <section
      id="diferenciais"
      className="bg-gradient-to-b from-white via-brand-primary/30 to-white py-16 px-6 md:px-12"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {differentialsList.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div
              key={item.id}
              className="flex flex-col items-center text-center gap-3"
            >
              {Icon && (
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary shadow-lg shadow-brand-primary/30">
                  <Icon
                    className="w-6 h-6 text-white"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                </span>
              )}
              <span className="text-sm font-medium text-brand-secondary">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
