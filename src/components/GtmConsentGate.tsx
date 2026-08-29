'use client';

import { GoogleTagManager } from '@next/third-parties/google';
import siteData from '@/content/site.json';
import { useCookieConsent } from '@/lib/useCookieConsent';

// ADR-0002: o GTM só é injetado depois do aceite no CookieBanner (Basic Mode).
export default function GtmConsentGate() {
  const hasConsent = useCookieConsent(false);

  if (!hasConsent) return null;

  return <GoogleTagManager gtmId={siteData.gtmId} />;
}
