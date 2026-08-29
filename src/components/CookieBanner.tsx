'use client';

import {
  useCookieConsent,
  CONSENT_KEY,
  CONSENT_EVENT,
} from '@/lib/useCookieConsent';

export default function CookieBanner() {
  const consent = useCookieConsent(true);

  if (consent) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
      }}
      className="bg-brand-secondary text-white/70 p-6 border-t border-white/10 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
        <p className="text-sm text-center sm:text-left">
          Utilizamos cookies e tecnologias semelhantes para melhorar a sua
          experiência e rastrear conversões para fins de marketing. Ao continuar
          navegando, você concorda com a nossa política em conformidade com a
          LGPD.
        </p>
        <button
          onClick={() => {
            localStorage.setItem(CONSENT_KEY, 'true');
            // Avisa o GtmConsentGate (e este próprio componente) para reagir sem recarregar a página.
            window.dispatchEvent(new Event(CONSENT_EVENT));
          }}
          className="whitespace-nowrap bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-brand-secondary font-semibold py-2 px-6 rounded-md shadow-lg transition-colors"
        >
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
}
