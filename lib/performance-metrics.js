export const capturePageMetrics = () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
        const navigationTiming = performance.getEntriesByType('navigation')[0];
        const paintTiming = performance.getEntriesByType('paint');

        // Calculate FCP (First Contentful Paint)
        const fcpEntry = paintTiming.find(entry => entry.name === 'first-contentful-paint');
        const fcp = fcpEntry ? fcpEntry.startTime : null;

        // Calculate TTFB (Time to First Byte)
        const ttfb = navigationTiming ? navigationTiming.responseStart - navigationTiming.requestStart : null;

        // Calculate DOM Load
        const domLoad = navigationTiming ? navigationTiming.domContentLoadedEventEnd - navigationTiming.fetchStart : null;

        // Calculate Page Load
        const pageLoad = navigationTiming ? navigationTiming.loadEventEnd - navigationTiming.fetchStart : null;

        return {
            fcp,
            ttfb,
            domLoad,
            pageLoad,
            timestamp: Date.now()
        };
    }
    return null;
};