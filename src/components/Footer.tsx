import Link from 'next/link';
import siteData from '@/content/site.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 px-6 md:px-12 py-10 border-t border-slate-800">
      <div className="max-w-5xl mx-auto flex flex-col gap-4 text-sm">
        <div>
          <p className="text-white font-semibold">{siteData.firmName}</p>
          <p>{siteData.oabNumber}</p>
          <p>{siteData.address}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-800">
          <p>{siteData.email}</p>
          <Link
            href="/politica-de-privacidade"
            className="hover:text-white transition-colors underline underline-offset-2"
          >
            Política de Privacidade
          </Link>
        </div>

        <p className="text-xs text-slate-500">
          &copy; {currentYear} {siteData.firmName}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
