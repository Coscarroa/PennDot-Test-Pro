declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      targetIdOrEventName: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Safely dispatches custom events to Google Analytics 4 (gtag.js) / Google Tag Manager
 * without throwing errors if an ad blocker or privacy extension blocks the script.
 */
export const trackEvent = (
  eventName: string,
  params: Record<string, unknown> = {}
): void => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch {
    // Silently ignore analytics errors when blocked by client extensions
  }
};
