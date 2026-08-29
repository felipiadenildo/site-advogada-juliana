'use client';

import { useState } from 'react';
import faqList from '@/content/faq.json';
import siteData from '@/content/site.json';
import WhatsAppButton from './WhatsAppButton';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-600 text-lg">
            Tire suas dúvidas antes de falar com nossa equipe.
          </p>
        </div>

        <div className="space-y-4">
          {faqList.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left px-6 py-4 bg-neutral-50 hover:bg-neutral-100 flex justify-between items-center transition-colors focus:outline-none"
              >
                <span className="font-semibold text-brand-primary">
                  {faq.question}
                </span>
                <span className="text-brand-primary text-2xl font-light">
                  {openId === faq.id ? '−' : '+'}
                </span>
              </button>

              {openId === faq.id && (
                <div className="px-6 py-4 bg-white text-gray-600 border-t border-gray-200 transition-all duration-300">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">Ainda com dúvidas?</p>
          <WhatsAppButton
            phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
            message="Olá! Vim pela seção de dúvidas do site e gostaria de falar com um advogado."
            className="inline-flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Tire sua Dúvida Agora
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
