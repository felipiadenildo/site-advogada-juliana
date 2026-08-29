import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';
import GtmConsentGate from '@/components/GtmConsentGate';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
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
    url: 'https://julianarangel.adv.br', // URL fictícia por enquanto
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased text-slate-900 bg-slate-50`}
      >
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
