// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Header hide/show using Lenis scroll event
(function () {
  const header = document.querySelector('header');
  let lastScrollY = 0;

  lenis.on('scroll', ({ scroll }) => {
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