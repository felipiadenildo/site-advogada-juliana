'use client';

import { useState } from 'react';

const faqList = [
  {
    id: 1,
    question: 'Preciso pagar alguma coisa para iniciar o processo?',
    answer:
      "Não. Na grande maioria dos casos previdenciários, nós trabalhamos com a modalidade 'ao êxito'. Ou seja, nossos honorários só são pagos quando você ganhar e receber o seu benefício.",
  },
  {
    id: 2,
    question: 'Quanto tempo demora para o INSS dar uma resposta?',
    answer:
      'O prazo legal é de 45 a 90 dias dependendo do benefício, mas na prática pode variar. Nós monitoramos o processo diariamente e, se houver atraso abusivo, entramos com um Mandado de Segurança.',
  },
  {
    id: 3,
    question: 'Meu benefício foi negado. Ainda tem jeito?',
    answer:
      'Sim. O INSS nega milhares de benefícios injustamente todos os dias por falta de documentos ou erros de análise. Nós podemos entrar com um recurso administrativo ou um processo judicial para reverter essa decisão.',
  },
];

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
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
                className="w-full text-left px-6 py-4 bg-slate-50 hover:bg-slate-100 flex justify-between items-center transition-colors focus:outline-none"
              >
                <span className="font-semibold text-blue-900">
                  {faq.question}
                </span>
                <span className="text-blue-600 text-2xl font-light">
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
      </div>
    </section>
  );
}
