// Lenis 
// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
const header = document.querySelector('[data-header]');

lenis.on('scroll', ({ scroll, velocity }) => {
  if (velocity > 0 && scroll > 80) {
    header.classList.add('header-hide');
  } else if (velocity < 0) {
    header.classList.remove('header-hide');
  }
});