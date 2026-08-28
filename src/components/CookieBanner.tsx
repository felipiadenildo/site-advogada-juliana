'use client';

import { useState } from 'react';

export default function CookieBanner() {
  // Inicialização preguiçosa (Lazy Initial State): Lê o localStorage direto no boot do componente
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const consent = localStorage.getItem('lgpd_cookie_consent');
    return !consent;
  });

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
      }}
      className="bg-slate-900 text-slate-300 p-6 border-t border-slate-700 shadow-2xl"
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
            localStorage.setItem('lgpd_cookie_consent', 'true');
            setIsVisible(false);
          }}
          className="whitespace-nowrap bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-md shadow-lg transition-colors"
        >
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
}
