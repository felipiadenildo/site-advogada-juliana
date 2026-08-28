import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

// Fonte para textos gerais e UI
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Fonte serifada clássica para títulos (Autoridade Jurídica)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Juliana Rangel | Advocacia Previdenciária',
  description:
    'Especialistas em benefícios do INSS, BPC/LOAS e Aposentadorias.',
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
        {children}
      </body>
    </html>
  );
}
