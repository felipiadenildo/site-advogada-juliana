import { useSyncExternalStore } from 'react';

export const CONSENT_KEY = 'lgpd_cookie_consent';
export const CONSENT_EVENT = 'lgpd-consent-accepted';

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

function getSnapshot() {
  return localStorage.getItem(CONSENT_KEY) === 'true';
}

/**
 * True once the visitor has accepted the cookie banner. `serverValue` is
 * returned for SSR and for React's initial client render during hydration —
 * it must be a fixed value (not a real localStorage read) so both renders
 * agree and React never reports a hydration mismatch. `useSyncExternalStore`
 * then resyncs to the real client value right after, with no manual effect.
 *
 * Callers that must stay hidden until consent is real (GTM, the floating
 * WhatsApp button's extra offset) should pass `false`. `CookieBanner` itself
 * passes `true` instead, purely to avoid a one-frame flash of the banner for
 * returning visitors who already consented — the trade-off is fine there
 * since the banner staying hidden for one extra frame has no side effect.
 */
export function useCookieConsent(serverValue: boolean) {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverValue);
}
