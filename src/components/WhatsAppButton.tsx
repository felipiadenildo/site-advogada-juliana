import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string; // Ex: 5511999999999
  message: string;
  className?: string;
  children: React.ReactNode;
}

export default function WhatsAppButton({
  phoneNumber,
  message,
  className = '',
  children,
}: WhatsAppButtonProps) {
  // Converte a mensagem em um formato seguro para URLs (substitui espaços por %20, etc.)
  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
