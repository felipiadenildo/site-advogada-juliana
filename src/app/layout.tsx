import type { Metadata } from 'next';
import { Montserrat, Cinzel } from 'next/font/google';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';
import GtmConsentGate from '@/components/GtmConsentGate';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import siteData from '@/content/site.json';

// Tipografia oficial da marca (docs/clients/juliana-rangel-advocacia/brand/BRAND_IDENTITY_GUIDELINES.md)
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
});

// Configuração de SEO Técnico e OpenGraph (Compartilhamento no WhatsApp/Redes Sociais)
export const metadata: Metadata = {
  title: 'Juliana Rangel | Especialista em Direito Previdenciário',
  description:
    'Advocacia especializada em benefícios do INSS, aposentadorias, BPC/LOAS e auxílio-doença. Atendimento ágil e humanizado.',
  openGraph: {
    title: 'Juliana Rangel | Advocacia Previdenciária',
    description:
      'Garantimos o seu direito previdenciário com ética e agilidade. Fale com um especialista.',
    // Domínio já registrado no Registro.br; deploy/DNS ainda pendentes (ver README §8).
    url: `https://${siteData.domain}`,
    siteName: 'Juliana Rangel Advocacia',
    locale: 'pt_BR',
    type: 'website',
    // images: [{ url: "/og-image.jpg" }] // Descomentaremos na revisão final quando a foto chegar
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Dados estruturados (schema.org LegalService) para SEO/rich results.
// Sem endereço físico: a atuação é remota/em todo o Brasil (ver siteData.serviceArea).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: siteData.firmName,
  founder: {
    '@type': 'Person',
    name: siteData.attorneyName,
  },
  description: siteData.serviceArea,
  url: `https://${siteData.domain}`,
  logo: `https://${siteData.domain}/images/logo-horizontal-dark.svg`,
  image: `https://${siteData.domain}/images/logo-horizontal-dark.svg`,
  telephone: `+${siteData.whatsapp.numbers[0].phoneNumber}`,
  email: siteData.emails[0].address,
  areaServed: 'BR',
  sameAs: siteData.social.map((entry) => entry.url),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '12:00',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${cinzel.variable} font-sans antialiased text-brand-secondary bg-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo principal
        </a>
        <TopBar />
        <Header />
        {children}
        <Footer />
        <FloatingWhatsApp />
        <CookieBanner />
      </body>

      {/* GTM só carrega após consentimento LGPD (ADR-0002) - ID real virá da equipe de tráfego */}
      <GtmConsentGate />
    </html>
  );
}
