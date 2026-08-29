'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import siteData from '@/content/site.json';
import WhatsAppButton from './WhatsAppButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white px-6 md:px-12 py-4 sticky top-0 z-40 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-wide">
          {siteData.firmName}
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6"
        >
          {siteData.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
          <WhatsAppButton
            phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
            message="Olá! Vim pelo menu do site e gostaria de fazer uma análise gratuita do meu caso."
            className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded-md transition-colors"
          >
            {siteData.ctaLabel}
          </WhatsAppButton>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          className="md:hidden text-white"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          aria-label="Navegação mobile"
          className="md:hidden max-w-5xl mx-auto flex flex-col gap-4 pt-6 pb-2"
        >
          {siteData.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
          <WhatsAppButton
            phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
            message="Olá! Vim pelo menu do site e gostaria de fazer uma análise gratuita do meu caso."
            className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold py-3 px-4 rounded-md text-center transition-colors"
          >
            {siteData.ctaLabel}
          </WhatsAppButton>
        </nav>
      )}
    </header>
  );
}
