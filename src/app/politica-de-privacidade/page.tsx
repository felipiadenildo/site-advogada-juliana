import type { Metadata } from 'next';
import siteData from '@/content/site.json';

export const metadata: Metadata = {
  title: `Política de Privacidade | ${siteData.firmName}`,
  robots: { index: true, follow: true },
};

export default function PoliticaDePrivacidade() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-neutral-50 py-16 px-6 md:px-12 focus:outline-none"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
          Política de Privacidade
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Última atualização: agosto de 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-brand-primary mb-2">
              1. Introdução e Identificação do Controlador
            </h2>
            <p>
              Esta Política de Privacidade descreve como {siteData.firmName} (
              {siteData.attorneyName}, {siteData.oabNumber}), na qualidade de
              controladora dos dados pessoais tratados por meio deste site,
              coleta, utiliza, armazena e protege as informações dos seus
              visitantes, em conformidade com a Lei Geral de Proteção de Dados
              Pessoais (Lei nº 13.709/2018 — LGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-primary mb-2">
              2. Quais Dados Coletamos
            </h2>
            <p className="mb-2">
              Coletamos apenas os dados que você mesmo nos fornece ao entrar em
              contato, e dados técnicos de navegação:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Dados de contato:</strong> nome, número de telefone e o
                conteúdo das mensagens que você envia ao iniciar uma conversa
                pelo WhatsApp ou ao nos escrever por e-mail.
              </li>
              <li>
                <strong>Dados de navegação:</strong> cookies e identificadores
                técnicos semelhantes, coletados apenas após o seu consentimento
                (ver seção 3).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-primary mb-2">
              3. Cookies e Rastreamento
            </h2>
            <p>
              Este site utiliza cookies apenas após o consentimento explícito do
              usuário, coletado por meio do banner exibido na primeira visita e
              registrado localmente no seu navegador. Nenhuma ferramenta de
              rastreamento ou analytics (como o Google Tag Manager) é carregada
              antes desse consentimento. Você pode revogar o consentimento a
              qualquer momento limpando os dados de navegação do seu navegador
              para este site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-primary mb-2">
              4. Finalidade e Base Legal do Tratamento
            </h2>
            <p>
              Utilizamos seus dados para: (i) responder ao seu contato e prestar
              orientação jurídica inicial, com base na execução de procedimentos
              preliminares a um possível contrato de prestação de serviços
              advocatícios (art. 7º, V, LGPD); e (ii), quando aplicável e com o
              seu consentimento, para medir o desempenho de campanhas de
              divulgação do escritório (art. 7º, I, LGPD). Não utilizamos seus
              dados para nenhuma outra finalidade sem autorização.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-primary mb-2">
              5. Compartilhamento de Dados
            </h2>
            <p>
              Seus dados não são vendidos a terceiros. O contato inicial ocorre
              por meio do WhatsApp (Meta Platforms, Inc.), sujeito também à
              política de privacidade dessa plataforma. Dados tratados no âmbito
              de um processo administrativo ou judicial podem ser compartilhados
              com o INSS, órgãos do Poder Judiciário e demais entidades
              estritamente necessárias à condução do seu caso, sempre sob sigilo
              profissional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-primary mb-2">
              6. Retenção dos Dados
            </h2>
            <p>
              Dados de contatos que não resultam em atendimento são mantidos
              apenas pelo tempo necessário para eventual retomada da conversa.
              Dados de clientes efetivos são retidos pelo prazo legal aplicável
              à guarda de documentos e informações relativas a processos
              administrativos e judiciais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-primary mb-2">
              7. Direitos do Titular dos Dados
            </h2>
            <p>
              Nos termos do art. 18 da LGPD, você tem direito a confirmar a
              existência de tratamento, acessar, corrigir, anonimizar, eliminar
              ou solicitar a portabilidade dos seus dados pessoais, a qualquer
              momento, mediante solicitação simples pelos canais de contato
              abaixo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-primary mb-2">
              8. Segurança
            </h2>
            <p>
              Adotamos medidas técnicas e administrativas razoáveis para
              proteger seus dados pessoais contra acessos não autorizados e
              situações de destruição, perda, alteração, comunicação ou qualquer
              forma de tratamento inadequado ou ilícito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-primary mb-2">
              9. Alterações desta Política
            </h2>
            <p>
              Esta política pode ser atualizada periodicamente para refletir
              mudanças em nossas práticas ou na legislação aplicável. A data da
              última atualização está indicada no topo desta página.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-primary mb-2">
              10. Contato
            </h2>
            <p>
              Dúvidas ou solicitações relacionadas a esta política e aos seus
              dados pessoais podem ser enviadas para{' '}
              {siteData.emails.map((email) => email.address).join(' ou ')} ou
              pelo WhatsApp.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
