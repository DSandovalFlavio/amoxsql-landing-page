/**
 * AmoxSQL Analytics — lightweight GA4 event tracking utility.
 *
 * Usage:
 *   import { trackEvent } from '../analytics';
 *   trackEvent('download_click', { location: 'hero' });
 */

export function trackEvent(eventName, params = {}) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, params);
    }
}
