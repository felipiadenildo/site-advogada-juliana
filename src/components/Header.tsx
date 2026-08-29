'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import siteData from '@/content/site.json';
import WhatsAppButton from './WhatsAppButton';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur text-brand-secondary px-6 md:px-12 py-2 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" aria-label={siteData.firmName}>
          <Image
            src="/images/logo-horizontal-dark.svg"
            alt={siteData.firmName}
            width={320}
            height={98}
            className="h-[88px] w-auto"
            priority
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6"
        >
          {siteData.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-brand-primary transition-colors text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
          <WhatsAppButton
            phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
            message="Olá! Vim pelo menu do site e gostaria de fazer uma análise gratuita do meu caso."
            className="inline-flex items-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-brand-secondary text-sm font-semibold py-2 px-4 rounded-md transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {siteData.ctaLabel}
          </WhatsAppButton>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          className="md:hidden text-brand-secondary"
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
              className="text-gray-600 hover:text-brand-primary transition-colors text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
          <WhatsAppButton
            phoneNumber={siteData.whatsapp.numbers[0].phoneNumber}
            message="Olá! Vim pelo menu do site e gostaria de fazer uma análise gratuita do meu caso."
            className="inline-flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-brand-secondary text-sm font-semibold py-3 px-4 rounded-md text-center transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {siteData.ctaLabel}
          </WhatsAppButton>
        </nav>
      )}
    </header>
  );
}
