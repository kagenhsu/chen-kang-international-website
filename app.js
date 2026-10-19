const pages = [...document.querySelectorAll('[data-page]')];
const links = [...document.querySelectorAll('[data-page-link]')];
const mobileMenuButton = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const backToTopButton = document.querySelector('.back-to-top');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionTargets = [...document.querySelectorAll([
  '[data-page] > .section',
  '[data-page] > .cta-panel',
  '[data-page] > .quote-band',
  '[data-page] > .contact-section',
  '[data-page] > .legal-content'
].join(','))];

motionTargets.forEach((element) => element.classList.add('motion-reveal'));

document.querySelectorAll('.journey-grid, .feature-grid, .website-feature-gallery, .steps, .audience-grid, .case-grid, .one-view-grid').forEach((group) => {
  [...group.children].forEach((item, index) => {
    item.classList.add('motion-item');
    item.style.setProperty('--motion-order', Math.min(index, 5));
  });
});

if (reduceMotion) {
  motionTargets.forEach((element) => element.classList.add('is-in-view'));
} else {
  const motionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  motionTargets.forEach((element) => motionObserver.observe(element));
}

const pageMeta = {
  home: { title: '辰漮國際｜品牌連結與網路行銷', description: '從電子名片、官方網站到通路曝光與多元合作，建立完整的品牌接觸旅程。' },
  about: { title: '關於辰漮｜辰漮國際', description: '了解辰漮國際如何協助個人與企業整合品牌資訊、數位工具與合作通路。' },
  card: { title: '電子名片製作｜辰漮國際', description: '整合聯絡方式、服務資訊、社群連結與品牌視覺的電子名片服務。' },
  website: { title: '官方網站製作｜辰漮國際', description: '兼顧品牌視覺、手機瀏覽、行動引導與廣告成效追蹤的官方網站製作。' },
  exposure: { title: '通路曝光｜辰漮國際', description: '透過夥伴商店與合作通路，增加品牌、產品與服務的市場接觸機會。' },
  partner: { title: '多元合作｜辰漮國際', description: '串連夥伴資源、轉介與專案合作，依需求規劃適合的合作方式。' },
  cases: { title: '案例與聯絡｜辰漮國際', description: '查看經授權的合作案例，並透過 LINE 或電話洽詢電子名片與網站服務。' },
  privacy: { title: '隱私權政策｜辰漮國際', description: '辰漮國際官方網站的個人資料蒐集、使用、保存及當事人權利說明。' },
  terms: { title: '網站使用條款｜辰漮國際', description: '辰漮國際官方網站的使用規範、智慧財產權、第三方連結與責任說明。' }
};

function showPage(name, updateHash = true, trackView = true) {
  const target = pages.find((page) => page.dataset.page === name) || pages[0];
  const pageName = target.dataset.page;
  const meta = pageMeta[pageName] || pageMeta.home;
  pages.forEach((page) => page.classList.toggle('active', page === target));
  target.classList.remove('page-motion-ready');
  requestAnimationFrame(() => target.classList.add('page-motion-ready'));
  links.forEach((link) => link.classList.toggle('active', link.dataset.pageLink === pageName));
  if (updateHash) history.replaceState(null, '', `#${pageName}`);
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  mobileNav.classList.remove('open');
  mobileMenuButton.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (trackView) window.trackVirtualPageView?.(pageName, meta.title);
}

links.forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  showPage(link.dataset.pageLink);
}));

document.querySelectorAll('[data-scroll]').forEach((button) => button.addEventListener('click', () => {
  document.getElementById(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
}));

mobileMenuButton.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
});

backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => {
  backToTopButton.classList.toggle('visible', window.scrollY > 420);
}, { passive: true });
window.addEventListener('hashchange', () => showPage(location.hash.slice(1) || 'home', false));
showPage(location.hash.slice(1) || 'home', false);
