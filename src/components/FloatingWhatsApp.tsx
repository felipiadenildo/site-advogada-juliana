import siteData from '@/content/site.json';
import WhatsAppButton from './WhatsAppButton';

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-7 h-7"
      aria-hidden="true"
    >
      <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3ZM12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.2-.4-4.5-1.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {
  return (
    <WhatsAppButton
      phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
      message={siteData.whatsapp.defaultMessage}
      className="fixed bottom-24 sm:bottom-6 right-6 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/40 transition-all"
    >
      <span className="sr-only">Falar no WhatsApp</span>
      <WhatsAppIcon />
    </WhatsAppButton>
  );
}
