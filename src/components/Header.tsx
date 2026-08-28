import Link from 'next/link';
import siteData from '@/content/site.json';

export default function Header() {
  return (
    <header className="bg-slate-900 text-white px-6 md:px-12 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-wide">
          {siteData.firmName}
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden sm:flex items-center gap-6"
        >
          {siteData.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
