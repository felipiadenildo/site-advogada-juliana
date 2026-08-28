import type { Metadata } from 'next';
import siteData from '@/content/site.json';

export const metadata: Metadata = {
  title: `Política de Privacidade | ${siteData.firmName}`,
  robots: { index: true, follow: true },
};

export default function PoliticaDePrivacidade() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          ⚠️ Texto provisório/template — pendente de revisão e validação
          jurídica pela Dra. Juliana Rangel antes da publicação final.
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
          Política de Privacidade
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-2">
              1. Introdução
            </h2>
            <p>
              Esta Política de Privacidade descreve como o {siteData.firmName}{' '}
              coleta, utiliza e protege os dados pessoais dos visitantes deste
              site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº
              13.709/2018 — LGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-2">
              2. Dados Coletados
            </h2>
            <p>
              [Descrever aqui, em conjunto com a Dra. Juliana, quais dados são
              efetivamente coletados: cookies de navegação, dados enviados via
              WhatsApp, formulários de contato, etc.]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-2">
              3. Cookies e Rastreamento
            </h2>
            <p>
              Este site utiliza cookies apenas após o consentimento explícito do
              usuário, coletado por meio do banner de cookies exibido na
              primeira visita. Nenhuma ferramenta de rastreamento ou analytics é
              carregada antes desse consentimento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-2">
              4. Direitos do Titular dos Dados
            </h2>
            <p>
              Nos termos da LGPD, você tem direito a confirmar a existência de
              tratamento, acessar, corrigir, anonimizar, eliminar ou solicitar a
              portabilidade dos seus dados pessoais. [Detalhar processo de
              solicitação junto ao escritório.]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-2">5. Contato</h2>
            <p>
              Dúvidas sobre esta política podem ser enviadas para{' '}
              {siteData.email}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
