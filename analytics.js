(function () {
  const measurementId = document.documentElement.dataset.ga4Id?.trim();
  const enabled = /^G-[A-Z0-9]+$/i.test(measurementId || '');

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  if (enabled) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });
  }

  window.trackVirtualPageView = function (pageName, pageTitle) {
    if (!enabled) return;
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: `${location.origin}${location.pathname}#${pageName}`,
      page_path: `/${pageName}`
    });
  };
})();
