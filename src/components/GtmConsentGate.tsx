'use client';

import { useEffect, useState } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import siteData from '@/content/site.json';

// ADR-0002: o GTM só é injetado depois do aceite no CookieBanner (Basic Mode).
export default function GtmConsentGate() {
  const [hasConsent, setHasConsent] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('lgpd_cookie_consent') === 'true';
  });

  useEffect(() => {
    if (hasConsent) return;

    const handleConsentAccepted = () => setHasConsent(true);
    window.addEventListener('lgpd-consent-accepted', handleConsentAccepted);
    return () =>
      window.removeEventListener(
        'lgpd-consent-accepted',
        handleConsentAccepted
      );
  }, [hasConsent]);

  if (!hasConsent) return null;

  return <GoogleTagManager gtmId={siteData.gtmId} />;
}
