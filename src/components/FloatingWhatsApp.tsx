import siteData from '@/content/site.json';
import WhatsAppButton from './WhatsAppButton';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function FloatingWhatsApp() {
  return (
    <WhatsAppButton
      phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
      message={siteData.whatsapp.defaultMessage}
      className="fixed bottom-24 sm:bottom-6 right-6 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-brand-secondary shadow-lg hover:shadow-brand-whatsapp/40 transition-all"
    >
      <span className="sr-only">Falar no WhatsApp</span>
      <WhatsAppIcon className="w-7 h-7" />
    </WhatsAppButton>
  );
}
