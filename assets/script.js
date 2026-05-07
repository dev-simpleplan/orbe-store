// Initialize Lenis
const lenis = new Lenis();
window.lenis = lenis;

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

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
