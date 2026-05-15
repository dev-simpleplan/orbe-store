// Initialize Lenis
const lenis = new Lenis({
  duration: 1.35,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.99,
  touchMultiplier: 1.2,
  syncTouch: false,
});
window.lenis = lenis;

let scrollRefreshTimer;

function refreshScrollLayout() {
  clearTimeout(scrollRefreshTimer);

  scrollRefreshTimer = setTimeout(() => {
    if (window.lenis && typeof window.lenis.resize === 'function') {
      window.lenis.resize();
    }

    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
  }, 80);
}

window.orbeRefreshScrollLayout = refreshScrollLayout;

lenis.on('scroll', () => {
  if (window.ScrollTrigger) {
    window.ScrollTrigger.update();
  }
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

window.addEventListener('load', () => {
  refreshScrollLayout();
  setTimeout(refreshScrollLayout, 300);
  setTimeout(refreshScrollLayout, 900);
});

window.addEventListener('resize', refreshScrollLayout);

document.addEventListener('shopify:section:load', refreshScrollLayout);
document.addEventListener('shopify:section:unload', refreshScrollLayout);
document.addEventListener('shopify:section:reorder', refreshScrollLayout);

document.querySelectorAll('img').forEach((image) => {
  if (image.complete) return;
  image.addEventListener('load', refreshScrollLayout, { once: true });
  image.addEventListener('error', refreshScrollLayout, { once: true });
});

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(refreshScrollLayout);
}

// Header hide/show using Lenis scroll event
(function () {
  const header = document.querySelector('header');
  const homeBanners = document.querySelectorAll('#orbe-scroll-driver, #orbe-mobile-scroll-driver');
  let lastScrollY = 0;

  if (!header) return;

  function isInsideHomeBanner(scroll) {
    if (!homeBanners.length) return false;

    return Array.from(homeBanners).some((homeBanner) => {
      if (!homeBanner.offsetHeight) return false;

      const bannerTop = homeBanner.offsetTop;
      const bannerEnd = bannerTop + homeBanner.offsetHeight - window.innerHeight;

      return scroll >= bannerTop && scroll <= bannerEnd;
    });
  }

  lenis.on('scroll', ({ scroll }) => {
    if (isInsideHomeBanner(scroll)) {
      header.classList.remove('header--hidden');
      lastScrollY = scroll;
      return;
    }

    if (scroll > lastScrollY && scroll > 80) {
      // Scrolling down → hide
      header.classList.add('header--hidden');
    } else {
      // Scrolling up → show
      header.classList.remove('header--hidden');
    }

    lastScrollY = scroll;
  });
})();
