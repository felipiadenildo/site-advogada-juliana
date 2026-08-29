import Link from 'next/link';
import siteData from '@/content/site.json';

function formatPhone(phoneNumber: string) {
  return phoneNumber.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 px-6 md:px-12 py-12 border-t border-slate-800">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
        <div>
          <p className="text-white font-semibold mb-2">{siteData.firmName}</p>
          <p>{siteData.oabNumber}</p>
          <p>{siteData.serviceArea}</p>
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
          </ul>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-8 mt-8 border-t border-slate-800 text-xs text-slate-500">
        &copy; {currentYear} {siteData.firmName}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
