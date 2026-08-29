'use client';

import siteData from '@/content/site.json';
import WhatsAppButton from './WhatsAppButton';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useCookieConsent } from '@/lib/useCookieConsent';

export default function FloatingWhatsApp() {
  // Enquanto o CookieBanner está visível (sem consentimento ainda), sobe o
  // botão para não sobrepor o banner; assim que ele some, o botão volta a
  // ficar rente ao rodapé em vez de deixar um vão vazio no lugar do banner.
  const hasConsent = useCookieConsent(false);

  return (
    <WhatsAppButton
      phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
      message={siteData.whatsapp.defaultMessage}
      className={`fixed ${hasConsent ? 'bottom-6' : 'bottom-24 sm:bottom-6'} right-6 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-brand-secondary shadow-lg hover:shadow-brand-whatsapp/40 transition-all`}
    >
      <span className="sr-only">Falar no WhatsApp</span>
      <WhatsAppIcon className="w-7 h-7" />
    </WhatsAppButton>
  );
}
