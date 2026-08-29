import Link from 'next/link';
import siteData from '@/content/site.json';
import WhatsAppButton from '@/components/WhatsAppButton';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 focus:outline-none"
    >
      <p className="text-brand-primary font-semibold tracking-widest uppercase text-sm mb-4">
        Erro 404
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-4">
        Página não encontrada
      </h1>
      <p className="text-gray-600 text-lg max-w-md mb-10">
        A página que você procura não existe ou foi movida. Volte para o início
        ou fale diretamente com a nossa equipe.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primary-light text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Voltar para o início
        </Link>
        <WhatsAppButton
          phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
          message="Olá! Cheguei numa página que não existe no site e gostaria de falar com um advogado."
          className="inline-flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-brand-secondary font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Falar no WhatsApp
        </WhatsAppButton>
      </div>
    </main>
  );
}
