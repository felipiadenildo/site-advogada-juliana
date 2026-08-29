'use client';

import { useSyncExternalStore } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import siteData from '@/content/site.json';

const CONSENT_KEY = 'lgpd_cookie_consent';
const CONSENT_EVENT = 'lgpd-consent-accepted';

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

function getSnapshot() {
  return localStorage.getItem(CONSENT_KEY) === 'true';
}

function getServerSnapshot() {
  return false;
}

// ADR-0002: o GTM só é injetado depois do aceite no CookieBanner (Basic Mode).
export default function GtmConsentGate() {
  const hasConsent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  if (!hasConsent) return null;

  return <GoogleTagManager gtmId={siteData.gtmId} />;
}
